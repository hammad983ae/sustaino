// @ts-nocheck
import { serve } from "https://deno.land/std@0.170.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from '../_shared/cors.ts';
import { getErrorMessage } from '../_shared/error-handler.ts';

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const DEFAULT_SECTIONS: Record<string, string> = {
  rpdAndLocation: "Section 2: RPD and Location",
  legalAndPlanning: "Section 3: Legal and Planning", 
  marketCommentary: "Section 6: Market Commentary",
  propertyDetails: "Section 7: Property Details (Pre-Inspection)",
  environmental: "Section 8: Environmental & Sustainability Assessment",
  riskAssessment: "Section 10: Risk Assessment (Pre-Physical Inspection)",
};

serve(async (req) => {
  try {
    const { jobId, reviewed = false } = await req.json();

    // Fetch assessment with OCR data
    const { data: assessment, error } = await supabase
      .from("property_assessments")
      .select("*")
      .eq("job_id", jobId)
      .single();

    if (error || !assessment) {
      return new Response(JSON.stringify({ error: "Assessment not found" }), { status: 404 });
    }

    const config = assessment.report_config || { sections: {}, labels: {} };
    const ocrResults = assessment.ocr_results || {};
    const branding = assessment.branding || {};

    // Build sections with OCR integration
    const selectedSections = Object.keys(config.sections || {}).filter(
      (key) => config.sections[key]
    );

    const reportSections: Array<{ title: string; content: string }> = [];

    for (const sectionKey of selectedSections) {
      const title = config.labels?.[sectionKey] || DEFAULT_SECTIONS[sectionKey] || sectionKey;
      
      // Merge manual data + OCR data for each section
      let content = "";
      
      switch (sectionKey) {
        case "rpdAndLocation":
          content = [
            assessment.address || "",
            ocrResults.rpdAndLocation || "",
          ].filter(Boolean).join("\n\n");
          break;
        
        case "legalAndPlanning":
          content = [
            assessment.planning_data || "",
            ocrResults.legalAndPlanning || "",
          ].filter(Boolean).join("\n\n");
          break;
        
        case "marketCommentary":
          content = [
            assessment.market_analysis || "",
            ocrResults.marketCommentary || "",
          ].filter(Boolean).join("\n\n");
          break;
        
        case "propertyDetails":
          content = [
            assessment.property_description || "",
            ocrResults.propertyDetails || "",
          ].filter(Boolean).join("\n\n");
          break;
        
        case "environmental":
          content = [
            assessment.environmental_data || "",
            ocrResults.environmental || "",
          ].filter(Boolean).join("\n\n");
          break;
        
        case "riskAssessment":
          content = [
            assessment.risk_data || "",
            ocrResults.riskAssessment || "",
          ].filter(Boolean).join("\n\n");
          break;
        
        default:
          // Custom section - use OCR if available
          content = ocrResults[sectionKey] || "Custom section content";
      }

      if (content.trim()) {
        reportSections.push({ title, content });
      }
    }

    // Generate PDF with merged content
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    const pageSize = [595.28, 841.89]; // A4
    const [pageWidth, pageHeight] = pageSize;
    
    function addPage() {
      return pdfDoc.addPage(pageSize);
    }

    // Cover page with branding
    const cover = addPage();
    const primaryColor = branding.primary_color ? hexToRgb(branding.primary_color) : rgb(0, 0.4, 0.8);
    const company = branding.company || "Property Valuations";

    cover.drawRectangle({ 
      x: 0, y: pageHeight - 140, width: pageWidth, height: 140, 
      color: primaryColor 
    });
    cover.drawText(company.toUpperCase(), { 
      x: 50, y: pageHeight - 80, size: 22, font, color: rgb(1,1,1) 
    });
    cover.drawText(`Job ID: ${jobId}`, { 
      x: 50, y: pageHeight - 120, size: 12, font, color: rgb(1,1,1) 
    });

    // Add logo if provided
    if (branding.logo_url) {
      try {
        const resp = await fetch(branding.logo_url);
        if (resp.ok) {
          const logoBytes = new Uint8Array(await resp.arrayBuffer());
          let logoImg;
          try { logoImg = await pdfDoc.embedPng(logoBytes); }
          catch { logoImg = await pdfDoc.embedJpg(logoBytes); }
          const logoDims = logoImg.scale(0.2);
          cover.drawImage(logoImg, { 
            x: pageWidth - 120, y: pageHeight - 120, 
            width: logoDims.width, height: logoDims.height 
          });
        }
      } catch {}
    }

    // Table of Contents
    const tocPage = addPage();
    let tocY = pageHeight - 60;
    tocPage.drawText("Table of Contents", { x: 50, y: tocY, size: 18, font });
    tocY -= 30;

    // Content pages
    let currentPage = addPage();
    let y = pageHeight - 50;
    const marginLeft = 50;
    const maxWidth = pageWidth - 2 * marginLeft;

    function ensureSpace(required = 120) {
      if (y - required < 80) {
        currentPage = addPage();
        y = pageHeight - 50;
      }
    }

    function addTextWrapped(text: string, size = 12) {
      const words = (text || "").split(/\s+/);
      let line = "";
      for (const word of words) {
        const test = line ? line + " " + word : word;
        if (font.widthOfTextAtSize(test, size) > maxWidth) {
          currentPage.drawText(line, { x: marginLeft + 20, y, size, font });
          y -= size + 4;
          line = word;
          ensureSpace(40);
        } else {
          line = test;
        }
      }
      if (line) {
        currentPage.drawText(line, { x: marginLeft + 20, y, size, font });
        y -= size + 8;
      }
    }

    // Add all selected sections
    for (const section of reportSections) {
      ensureSpace(80);
      currentPage.drawText(section.title, { 
        x: marginLeft, y, size: 16, font, color: rgb(0,0,0.6) 
      });
      y -= 22;
      
      if (section.content.trim()) {
        addTextWrapped(section.content, 12);
      } else {
        addTextWrapped("No data available for this section.", 10);
      }
      y -= 20;
    }

    // Add property photos if available
    const { data: files } = await supabase.storage
      .from("property-images")
      .list(`${assessment.user_id}/job_${jobId}`, { limit: 100 });

    if (files && files.length > 0) {
      ensureSpace(60);
      currentPage.drawText("Property Photos", { 
        x: marginLeft, y, size: 16, font, color: rgb(0,0,0.6) 
      });
      y -= 30;

      for (const file of files) {
        if (!file.name.match(/\.(jpg|jpeg|png|webp)$/i)) continue;
        
        try {
          const { data: imgData } = await supabase.storage
            .from("property-images")
            .download(`${assessment.user_id}/job_${jobId}/${file.name}`);
          
          if (!imgData) continue;
          
          const imgBytes = new Uint8Array(await imgData.arrayBuffer());
          let img;
          if (file.name.toLowerCase().endsWith(".png")) {
            img = await pdfDoc.embedPng(imgBytes);
          } else {
            img = await pdfDoc.embedJpg(imgBytes);
          }

          const maxImgWidth = 450;
          const scale = Math.min(1, maxImgWidth / img.width);
          const imgW = img.width * scale;
          const imgH = img.height * scale;

          if (y - imgH < 100) {
            currentPage = addPage();
            y = pageHeight - 50;
          }
          
          currentPage.drawImage(img, { 
            x: marginLeft, y: y - imgH, width: imgW, height: imgH 
          });
          y -= imgH + 8;
          
          currentPage.drawText(file.name, { 
            x: marginLeft, y, size: 10, font, color: rgb(0.4,0.4,0.4) 
          });
          y -= 24;
        } catch {}
      }
    }

    // Update TOC
    const tocEntries = reportSections.map((section, i) => ({
      title: section.title,
      pageIndex: i + 2 // cover + toc + content pages
    }));

    let currentTocY = pageHeight - 100;
    for (const entry of tocEntries) {
      tocPage.drawText(`${entry.title} ........................ ${entry.pageIndex + 1}`, { 
        x: marginLeft, y: currentTocY, size: 12, font 
      });
      currentTocY -= 18;
    }

    // Footer with page numbers
    const totalPages = pdfDoc.getPageCount();
    for (let i = 0; i < totalPages; i++) {
      const page = pdfDoc.getPage(i);
      const footerY = 30;
      page.drawText(`Page ${i + 1} of ${totalPages}`, { 
        x: pageWidth / 2 - 30, y: footerY, size: 10, font, color: rgb(0.4,0.4,0.4) 
      });
      const footerText = branding.company ? 
        `${branding.company} • Confidential` : 
        "Property Valuation • Confidential";
      page.drawText(footerText, { 
        x: 50, y: footerY, size: 10, font, color: rgb(0.4,0.4,0.4) 
      });
    }

    // Save PDF
    const pdfBytes = await pdfDoc.save();
    const reportPath = `reports/${assessment.user_id}/job_${jobId}.pdf`;

    const { error: uploadError } = await supabase.storage
      .from("property-images")
      .upload(reportPath, pdfBytes, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (uploadError) {
      return new Response(JSON.stringify({ error: uploadError.message }), { status: 500 });
    }

    // Create signed URL
    const { data: signedUrl } = await supabase.storage
      .from("property-images")
      .createSignedUrl(reportPath, 60 * 60 * 24);

    // Update assessment record
    await supabase
      .from("property_assessments")
      .update({
        reviewed,
        report_url: signedUrl?.signedUrl || null,
      })
      .eq("job_id", jobId);

    return new Response(
      JSON.stringify({ 
        success: true,
        report_url: signedUrl?.signedUrl,
        sections_included: reportSections.length 
      }),
      { 
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
});

function hexToRgb(hex = "#003366") {
  const h = hex.replace("#", "");
  const bigint = parseInt(h, 16);
  const r = ((bigint >> 16) & 255) / 255;
  const g = ((bigint >> 8) & 255) / 255; 
  const b = (bigint & 255) / 255;
  return rgb(r, g, b);
}