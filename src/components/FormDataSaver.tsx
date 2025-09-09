import React, { useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface FormDataSaverProps {
  children: React.ReactNode;
  sectionKey: string;
  reportData?: any;
  onDataChange?: (data: any) => void;
}

const FormDataSaver = ({ children, sectionKey, reportData, onDataChange }: FormDataSaverProps) => {
  const { toast } = useToast();

  // Save data to localStorage every time the component mounts or data changes
  const saveData = useCallback(() => {
    try {
      // Get all form inputs within this section
      const formElements = document.querySelectorAll(`[data-section="${sectionKey}"] input, [data-section="${sectionKey}"] textarea, [data-section="${sectionKey}"] select`);
      const sectionData: Record<string, any> = {};

      formElements.forEach((element) => {
        const input = element as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        if (input.name || input.id) {
          const key = input.name || input.id;
          sectionData[key] = input.value;
        }
      });

      // Update the report data
      if (onDataChange && Object.keys(sectionData).length > 0) {
        onDataChange({
          ...reportData,
          [sectionKey]: sectionData
        });
      }

      // Also save to localStorage as backup
      const existingData = JSON.parse(localStorage.getItem('report_section_data') || '{}');
      localStorage.setItem('report_section_data', JSON.stringify({
        ...existingData,
        [sectionKey]: sectionData
      }));

    } catch (error) {
      console.error('Failed to save section data:', error);
    }
  }, [sectionKey, reportData, onDataChange]);

  // Auto-save when form data changes
  useEffect(() => {
    const handleFormChange = () => {
      saveData();
    };

    // Listen for input changes
    const formContainer = document.querySelector(`[data-section="${sectionKey}"]`);
    if (formContainer) {
      formContainer.addEventListener('input', handleFormChange);
      formContainer.addEventListener('change', handleFormChange);

      return () => {
        formContainer.removeEventListener('input', handleFormChange);
        formContainer.removeEventListener('change', handleFormChange);
      };
    }
  }, [saveData, sectionKey]);

  return (
    <div data-section={sectionKey}>
      {children}
    </div>
  );
};

export default FormDataSaver;