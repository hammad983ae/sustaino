export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      esg_assessments: {
        Row: {
          carbon_footprint: number | null
          climate_risk_assessment: Json | null
          created_at: string
          energy_efficiency_rating: string | null
          environmental_score: number | null
          esg_compliance_status: string | null
          estimated_esg_premium: number | null
          governance_score: number | null
          id: string
          overall_esg_score: number | null
          property_id: string
          social_score: number | null
          sustainability_features: Json | null
          updated_at: string
          user_id: string
          valuation_id: string | null
          water_efficiency_rating: string | null
        }
        Insert: {
          carbon_footprint?: number | null
          climate_risk_assessment?: Json | null
          created_at?: string
          energy_efficiency_rating?: string | null
          environmental_score?: number | null
          esg_compliance_status?: string | null
          estimated_esg_premium?: number | null
          governance_score?: number | null
          id?: string
          overall_esg_score?: number | null
          property_id: string
          social_score?: number | null
          sustainability_features?: Json | null
          updated_at?: string
          user_id: string
          valuation_id?: string | null
          water_efficiency_rating?: string | null
        }
        Update: {
          carbon_footprint?: number | null
          climate_risk_assessment?: Json | null
          created_at?: string
          energy_efficiency_rating?: string | null
          environmental_score?: number | null
          esg_compliance_status?: string | null
          estimated_esg_premium?: number | null
          governance_score?: number | null
          id?: string
          overall_esg_score?: number | null
          property_id?: string
          social_score?: number | null
          sustainability_features?: Json | null
          updated_at?: string
          user_id?: string
          valuation_id?: string | null
          water_efficiency_rating?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "esg_assessments_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "esg_assessments_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "esg_assessments_valuation_id_fkey"
            columns: ["valuation_id"]
            isOneToOne: false
            referencedRelation: "valuations"
            referencedColumns: ["id"]
          },
        ]
      }
      market_summaries: {
        Row: {
          created_at: string
          economic_indicators: Json | null
          forecast_outlook: string | null
          id: string
          interest_rates: Json | null
          market_trends: Json | null
          month_year: string
          price_movements: Json | null
          property_type_performance: Json | null
          regional_analysis: Json | null
          rental_yields: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          economic_indicators?: Json | null
          forecast_outlook?: string | null
          id?: string
          interest_rates?: Json | null
          market_trends?: Json | null
          month_year: string
          price_movements?: Json | null
          property_type_performance?: Json | null
          regional_analysis?: Json | null
          rental_yields?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          economic_indicators?: Json | null
          forecast_outlook?: string | null
          id?: string
          interest_rates?: Json | null
          market_trends?: Json | null
          month_year?: string
          price_movements?: Json | null
          property_type_performance?: Json | null
          regional_analysis?: Json | null
          rental_yields?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          company_name: string | null
          created_at: string
          display_name: string | null
          id: string
          phone: string | null
          professional_license: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          company_name?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          phone?: string | null
          professional_license?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          company_name?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          phone?: string | null
          professional_license?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string | null
          address_line_1: string
          address_line_2: string | null
          bathrooms: number | null
          bedrooms: number | null
          building_area: number | null
          car_spaces: number | null
          council: string | null
          country: string | null
          created_at: string
          id: string
          land_area: number | null
          latitude: number | null
          longitude: number | null
          lot_number: string | null
          plan_number: string | null
          postcode: string
          property_type: string
          state: string
          street_name: string | null
          street_number: string | null
          street_type: string | null
          suburb: string
          unit_number: string | null
          updated_at: string
          user_id: string
          year_built: number | null
          zoning: string | null
        }
        Insert: {
          address?: string | null
          address_line_1: string
          address_line_2?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          building_area?: number | null
          car_spaces?: number | null
          council?: string | null
          country?: string | null
          created_at?: string
          id?: string
          land_area?: number | null
          latitude?: number | null
          longitude?: number | null
          lot_number?: string | null
          plan_number?: string | null
          postcode: string
          property_type: string
          state: string
          street_name?: string | null
          street_number?: string | null
          street_type?: string | null
          suburb: string
          unit_number?: string | null
          updated_at?: string
          user_id: string
          year_built?: number | null
          zoning?: string | null
        }
        Update: {
          address?: string | null
          address_line_1?: string
          address_line_2?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          building_area?: number | null
          car_spaces?: number | null
          council?: string | null
          country?: string | null
          created_at?: string
          id?: string
          land_area?: number | null
          latitude?: number | null
          longitude?: number | null
          lot_number?: string | null
          plan_number?: string | null
          postcode?: string
          property_type?: string
          state?: string
          street_name?: string | null
          street_number?: string | null
          street_type?: string | null
          suburb?: string
          unit_number?: string | null
          updated_at?: string
          user_id?: string
          year_built?: number | null
          zoning?: string | null
        }
        Relationships: []
      }
      rental_evidence: {
        Row: {
          adjusted_rental: number | null
          adjustments: Json | null
          bathrooms: number | null
          bedrooms: number | null
          building_area: number | null
          car_spaces: number | null
          comparable_address: string
          created_at: string
          distance_km: number | null
          id: string
          land_area: number | null
          lease_date: string
          lease_term_months: number | null
          notes: string | null
          property_id: string | null
          property_type: string
          rental_amount: number
          rental_period: string
          source: string | null
          user_id: string
          valuation_id: string | null
          weight_percentage: number | null
        }
        Insert: {
          adjusted_rental?: number | null
          adjustments?: Json | null
          bathrooms?: number | null
          bedrooms?: number | null
          building_area?: number | null
          car_spaces?: number | null
          comparable_address: string
          created_at?: string
          distance_km?: number | null
          id?: string
          land_area?: number | null
          lease_date: string
          lease_term_months?: number | null
          notes?: string | null
          property_id?: string | null
          property_type: string
          rental_amount: number
          rental_period: string
          source?: string | null
          user_id: string
          valuation_id?: string | null
          weight_percentage?: number | null
        }
        Update: {
          adjusted_rental?: number | null
          adjustments?: Json | null
          bathrooms?: number | null
          bedrooms?: number | null
          building_area?: number | null
          car_spaces?: number | null
          comparable_address?: string
          created_at?: string
          distance_km?: number | null
          id?: string
          land_area?: number | null
          lease_date?: string
          lease_term_months?: number | null
          notes?: string | null
          property_id?: string | null
          property_type?: string
          rental_amount?: number
          rental_period?: string
          source?: string | null
          user_id?: string
          valuation_id?: string | null
          weight_percentage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rental_evidence_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rental_evidence_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rental_evidence_valuation_id_fkey"
            columns: ["valuation_id"]
            isOneToOne: false
            referencedRelation: "valuations"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          completed_at: string | null
          created_at: string
          current_section: string | null
          esg_assessment_id: string | null
          id: string
          pdf_file_path: string | null
          progress: number | null
          property_id: string
          report_type: string
          sections_data: Json | null
          status: string
          title: string
          updated_at: string
          user_id: string
          valuation_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          current_section?: string | null
          esg_assessment_id?: string | null
          id?: string
          pdf_file_path?: string | null
          progress?: number | null
          property_id: string
          report_type: string
          sections_data?: Json | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
          valuation_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          current_section?: string | null
          esg_assessment_id?: string | null
          id?: string
          pdf_file_path?: string | null
          progress?: number | null
          property_id?: string
          report_type?: string
          sections_data?: Json | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
          valuation_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_esg_assessment_id_fkey"
            columns: ["esg_assessment_id"]
            isOneToOne: false
            referencedRelation: "esg_assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_valuation_id_fkey"
            columns: ["valuation_id"]
            isOneToOne: false
            referencedRelation: "valuations"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_evidence: {
        Row: {
          adjusted_price: number | null
          adjustments: Json | null
          bathrooms: number | null
          bedrooms: number | null
          building_area: number | null
          car_spaces: number | null
          comparable_address: string
          created_at: string
          distance_km: number | null
          id: string
          land_area: number | null
          notes: string | null
          property_id: string | null
          property_type: string
          sale_date: string
          sale_price: number
          source: string | null
          user_id: string
          valuation_id: string | null
          weight_percentage: number | null
        }
        Insert: {
          adjusted_price?: number | null
          adjustments?: Json | null
          bathrooms?: number | null
          bedrooms?: number | null
          building_area?: number | null
          car_spaces?: number | null
          comparable_address: string
          created_at?: string
          distance_km?: number | null
          id?: string
          land_area?: number | null
          notes?: string | null
          property_id?: string | null
          property_type: string
          sale_date: string
          sale_price: number
          source?: string | null
          user_id: string
          valuation_id?: string | null
          weight_percentage?: number | null
        }
        Update: {
          adjusted_price?: number | null
          adjustments?: Json | null
          bathrooms?: number | null
          bedrooms?: number | null
          building_area?: number | null
          car_spaces?: number | null
          comparable_address?: string
          created_at?: string
          distance_km?: number | null
          id?: string
          land_area?: number | null
          notes?: string | null
          property_id?: string | null
          property_type?: string
          sale_date?: string
          sale_price?: number
          source?: string | null
          user_id?: string
          valuation_id?: string | null
          weight_percentage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_evidence_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_evidence_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_evidence_valuation_id_fkey"
            columns: ["valuation_id"]
            isOneToOne: false
            referencedRelation: "valuations"
            referencedColumns: ["id"]
          },
        ]
      }
      test_results: {
        Row: {
          calculated_at: string | null
          category: string
          confidence_score: number | null
          created_at: string
          id: number
          market_value: number | null
          methodology: string | null
          property_id: string | null
          result: Json
          success: boolean
          test_name: string
          updated_at: string
          user_id: string
          valuation_id: string | null
        }
        Insert: {
          calculated_at?: string | null
          category: string
          confidence_score?: number | null
          created_at?: string
          id?: never
          market_value?: number | null
          methodology?: string | null
          property_id?: string | null
          result: Json
          success?: boolean
          test_name: string
          updated_at?: string
          user_id: string
          valuation_id?: string | null
        }
        Update: {
          calculated_at?: string | null
          category?: string
          confidence_score?: number | null
          created_at?: string
          id?: never
          market_value?: number | null
          methodology?: string | null
          property_id?: string | null
          result?: Json
          success?: boolean
          test_name?: string
          updated_at?: string
          user_id?: string
          valuation_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "test_results_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "test_results_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "test_results_valuation_id_fkey"
            columns: ["valuation_id"]
            isOneToOne: false
            referencedRelation: "valuations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      valuation_jobs: {
        Row: {
          actual_hours: number | null
          assigned_to: string | null
          client_email: string | null
          client_name: string
          client_phone: string | null
          client_type: string | null
          created_at: string
          due_date: string | null
          estimated_hours: number | null
          estimated_value: number | null
          fee_charged: number | null
          fee_quoted: number | null
          id: string
          instruction_date: string
          job_description: string | null
          job_number: string
          job_title: string | null
          job_type: string
          notes: string | null
          priority: string | null
          property_address: string | null
          property_id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          actual_hours?: number | null
          assigned_to?: string | null
          client_email?: string | null
          client_name: string
          client_phone?: string | null
          client_type?: string | null
          created_at?: string
          due_date?: string | null
          estimated_hours?: number | null
          estimated_value?: number | null
          fee_charged?: number | null
          fee_quoted?: number | null
          id?: string
          instruction_date?: string
          job_description?: string | null
          job_number: string
          job_title?: string | null
          job_type: string
          notes?: string | null
          priority?: string | null
          property_address?: string | null
          property_id: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          actual_hours?: number | null
          assigned_to?: string | null
          client_email?: string | null
          client_name?: string
          client_phone?: string | null
          client_type?: string | null
          created_at?: string
          due_date?: string | null
          estimated_hours?: number | null
          estimated_value?: number | null
          fee_charged?: number | null
          fee_quoted?: number | null
          id?: string
          instruction_date?: string
          job_description?: string | null
          job_number?: string
          job_title?: string | null
          job_type?: string
          notes?: string | null
          priority?: string | null
          property_address?: string | null
          property_id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "valuation_jobs_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "valuation_jobs_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_addresses"
            referencedColumns: ["id"]
          },
        ]
      }
      valuations: {
        Row: {
          assumptions: string | null
          created_at: string
          effective_date: string
          forced_sale_value: number | null
          id: string
          limiting_conditions: string | null
          market_value: number | null
          methodology: string | null
          property_id: string
          rental_value: number | null
          status: string
          updated_at: string
          user_id: string
          valuation_date: string
          valuation_purpose: string
          valuation_type: string
          yield_percentage: number | null
        }
        Insert: {
          assumptions?: string | null
          created_at?: string
          effective_date?: string
          forced_sale_value?: number | null
          id?: string
          limiting_conditions?: string | null
          market_value?: number | null
          methodology?: string | null
          property_id: string
          rental_value?: number | null
          status?: string
          updated_at?: string
          user_id: string
          valuation_date?: string
          valuation_purpose: string
          valuation_type: string
          yield_percentage?: number | null
        }
        Update: {
          assumptions?: string | null
          created_at?: string
          effective_date?: string
          forced_sale_value?: number | null
          id?: string
          limiting_conditions?: string | null
          market_value?: number | null
          methodology?: string | null
          property_id?: string
          rental_value?: number | null
          status?: string
          updated_at?: string
          user_id?: string
          valuation_date?: string
          valuation_purpose?: string
          valuation_type?: string
          yield_percentage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "valuations_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "valuations_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_addresses"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      property_addresses: {
        Row: {
          full_address: string | null
          id: string | null
          postcode: string | null
          state: string | null
          street_name: string | null
          street_number: string | null
          street_type: string | null
          suburb: string | null
          unit_number: string | null
        }
        Insert: {
          full_address?: never
          id?: string | null
          postcode?: never
          state?: never
          street_name?: never
          street_number?: never
          street_type?: never
          suburb?: never
          unit_number?: never
        }
        Update: {
          full_address?: never
          id?: string | null
          postcode?: never
          state?: never
          street_name?: never
          street_number?: never
          street_type?: never
          suburb?: never
          unit_number?: never
        }
        Relationships: []
      }
    }
    Functions: {
      analyze_sales_evidence: {
        Args: { comparable_sales: Json[]; subject_property: Json }
        Returns: Json
      }
      calculate_esg_score: {
        Args: {
          environmental_factors: Json
          governance_factors: Json
          social_factors: Json
        }
        Returns: Json
      }
      calculate_property_valuation: {
        Args: {
          comparable_sales?: Json
          market_data: Json
          property_data: Json
        }
        Returns: Json
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      upsert_property_from_address: {
        Args: { address_text: string; property_type_text?: string }
        Returns: string
      }
    }
    Enums: {
      app_role: "admin" | "user" | "owner"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user", "owner"],
    },
  },
} as const
