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
      audit_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      document_uploads: {
        Row: {
          admin_notes: string | null
          created_at: string
          document_type: string
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          mime_type: string | null
          partner_id: string | null
          property_id: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          updated_at: string
          user_id: string
          verification_status: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          document_type: string
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          partner_id?: string | null
          property_id?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          updated_at?: string
          user_id: string
          verification_status?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          document_type?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          partner_id?: string | null
          property_id?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          updated_at?: string
          user_id?: string
          verification_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_uploads_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_uploads_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_inquiries: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          property_id: string
          vendor_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          property_id: string
          vendor_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          property_id?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_inquiries_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "marketplace_properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketplace_inquiries_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "marketplace_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company_name: string | null
          created_at: string
          email: string
          id: string
          name: string
          phone: string | null
          role: Database["public"]["Enums"]["marketplace_user_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company_name?: string | null
          created_at?: string
          email: string
          id?: string
          name: string
          phone?: string | null
          role?: Database["public"]["Enums"]["marketplace_user_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company_name?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["marketplace_user_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      marketplace_properties: {
        Row: {
          address: string
          bathrooms: number | null
          bedrooms: number | null
          car_spaces: number | null
          created_at: string
          description: string | null
          id: string
          land_size: number | null
          latitude: number | null
          longitude: number | null
          main_image: string | null
          postcode: string | null
          price: number
          state: string | null
          status: Database["public"]["Enums"]["marketplace_property_status"]
          suburb: string | null
          title: string
          type: Database["public"]["Enums"]["marketplace_property_type"]
          updated_at: string
          vendor_id: string
          views_count: number | null
        }
        Insert: {
          address: string
          bathrooms?: number | null
          bedrooms?: number | null
          car_spaces?: number | null
          created_at?: string
          description?: string | null
          id?: string
          land_size?: number | null
          latitude?: number | null
          longitude?: number | null
          main_image?: string | null
          postcode?: string | null
          price: number
          state?: string | null
          status?: Database["public"]["Enums"]["marketplace_property_status"]
          suburb?: string | null
          title: string
          type: Database["public"]["Enums"]["marketplace_property_type"]
          updated_at?: string
          vendor_id: string
          views_count?: number | null
        }
        Update: {
          address?: string
          bathrooms?: number | null
          bedrooms?: number | null
          car_spaces?: number | null
          created_at?: string
          description?: string | null
          id?: string
          land_size?: number | null
          latitude?: number | null
          longitude?: number | null
          main_image?: string | null
          postcode?: string | null
          price?: number
          state?: string | null
          status?: Database["public"]["Enums"]["marketplace_property_status"]
          suburb?: string | null
          title?: string
          type?: Database["public"]["Enums"]["marketplace_property_type"]
          updated_at?: string
          vendor_id?: string
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_properties_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "marketplace_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_property_images: {
        Row: {
          alt_text: string | null
          created_at: string
          id: string
          image_url: string
          order_index: number | null
          property_id: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          id?: string
          image_url: string
          order_index?: number | null
          property_id: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          id?: string
          image_url?: string
          order_index?: number | null
          property_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_property_images_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "marketplace_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          setting_key: string
          setting_value: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key: string
          setting_value: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: string
          updated_at?: string
        }
        Relationships: []
      }
      marketplace_transactions: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          property_id: string | null
          status: Database["public"]["Enums"]["marketplace_transaction_status"]
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          updated_at: string
          vendor_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: string
          property_id?: string | null
          status?: Database["public"]["Enums"]["marketplace_transaction_status"]
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          vendor_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          property_id?: string | null
          status?: Database["public"]["Enums"]["marketplace_transaction_status"]
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_transactions_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "marketplace_properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketplace_transactions_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "marketplace_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_users: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          partner_id: string
          role: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          partner_id: string
          role?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          partner_id?: string
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "partner_users_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          company_name: string
          contact_email: string | null
          created_at: string
          domain: string | null
          features: Json | null
          id: string
          is_active: boolean | null
          license_type: string | null
          logo_url: string | null
          max_properties: number | null
          max_users: number | null
          partner_code: string
          primary_color: string | null
          secondary_color: string | null
          updated_at: string
        }
        Insert: {
          company_name: string
          contact_email?: string | null
          created_at?: string
          domain?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          license_type?: string | null
          logo_url?: string | null
          max_properties?: number | null
          max_users?: number | null
          partner_code: string
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string
        }
        Update: {
          company_name?: string
          contact_email?: string | null
          created_at?: string
          domain?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          license_type?: string | null
          logo_url?: string | null
          max_properties?: number | null
          max_users?: number | null
          partner_code?: string
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          partner_id: string | null
          role: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          partner_id?: string | null
          role?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          partner_id?: string | null
          role?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          address: string
          created_at: string
          description: string | null
          id: string
          partner_id: string | null
          property_type: string | null
          status: string | null
          sustainability_score: number | null
          updated_at: string
          user_id: string
          verification_required: boolean | null
        }
        Insert: {
          address: string
          created_at?: string
          description?: string | null
          id?: string
          partner_id?: string | null
          property_type?: string | null
          status?: string | null
          sustainability_score?: number | null
          updated_at?: string
          user_id: string
          verification_required?: boolean | null
        }
        Update: {
          address?: string
          created_at?: string
          description?: string | null
          id?: string
          partner_id?: string | null
          property_type?: string | null
          status?: string | null
          sustainability_score?: number | null
          updated_at?: string
          user_id?: string
          verification_required?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          created_at: string
          file_path: string | null
          file_size: string | null
          generated_date: string
          id: string
          property_address: string
          property_id: string | null
          report_type: string
          status: string
          sustainability_score: number | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          file_path?: string | null
          file_size?: string | null
          generated_date?: string
          id?: string
          property_address: string
          property_id?: string | null
          report_type?: string
          status?: string
          sustainability_score?: number | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          file_path?: string | null
          file_size?: string | null
          generated_date?: string
          id?: string
          property_address?: string
          property_id?: string | null
          report_type?: string
          status?: string
          sustainability_score?: number | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      valuations: {
        Row: {
          comparable_properties: Json | null
          confidence_score: number | null
          created_at: string
          estimated_value: number
          id: string
          market_factors: Json | null
          methodology: string | null
          notes: string | null
          property_address: string
          property_id: string | null
          status: string | null
          updated_at: string
          user_id: string
          valuation_date: string
          valuation_type: string
        }
        Insert: {
          comparable_properties?: Json | null
          confidence_score?: number | null
          created_at?: string
          estimated_value: number
          id?: string
          market_factors?: Json | null
          methodology?: string | null
          notes?: string | null
          property_address: string
          property_id?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
          valuation_date?: string
          valuation_type?: string
        }
        Update: {
          comparable_properties?: Json | null
          confidence_score?: number | null
          created_at?: string
          estimated_value?: number
          id?: string
          market_factors?: Json | null
          methodology?: string | null
          notes?: string | null
          property_address?: string
          property_id?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
          valuation_date?: string
          valuation_type?: string
        }
        Relationships: []
      }
      verification_requests: {
        Row: {
          admin_notes: string | null
          assigned_to: string | null
          client_notes: string | null
          completed_at: string | null
          created_at: string
          due_date: string | null
          id: string
          partner_id: string | null
          priority: string | null
          property_id: string | null
          request_type: string
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          assigned_to?: string | null
          client_notes?: string | null
          completed_at?: string | null
          created_at?: string
          due_date?: string | null
          id?: string
          partner_id?: string | null
          priority?: string | null
          property_id?: string | null
          request_type?: string
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          assigned_to?: string | null
          client_notes?: string | null
          completed_at?: string | null
          created_at?: string
          due_date?: string | null
          id?: string
          partner_id?: string | null
          priority?: string | null
          property_id?: string | null
          request_type?: string
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "verification_requests_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verification_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_partner_branding: {
        Args: { domain_name?: string }
        Returns: {
          company_name: string
          features: Json
          logo_url: string
          partner_code: string
          primary_color: string
          secondary_color: string
        }[]
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_marketplace_admin: {
        Args: { user_uuid?: string }
        Returns: boolean
      }
    }
    Enums: {
      marketplace_property_status:
        | "draft"
        | "pending_payment"
        | "active"
        | "inactive"
        | "archived"
      marketplace_property_type: "for_sale" | "for_rent"
      marketplace_transaction_status:
        | "pending"
        | "completed"
        | "failed"
        | "refunded"
      marketplace_user_role: "vendor" | "admin"
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
      marketplace_property_status: [
        "draft",
        "pending_payment",
        "active",
        "inactive",
        "archived",
      ],
      marketplace_property_type: ["for_sale", "for_rent"],
      marketplace_transaction_status: [
        "pending",
        "completed",
        "failed",
        "refunded",
      ],
      marketplace_user_role: ["vendor", "admin"],
    },
  },
} as const
