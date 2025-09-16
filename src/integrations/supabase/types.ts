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
      construction_cost_index: {
        Row: {
          asset_class: string
          base_price_per_sqm: number
          cost_index: number
          created_at: string
          id: string
          month: string
          percentage_movement: number
          updated_at: string
          year: number
        }
        Insert: {
          asset_class: string
          base_price_per_sqm: number
          cost_index: number
          created_at?: string
          id?: string
          month: string
          percentage_movement: number
          updated_at?: string
          year: number
        }
        Update: {
          asset_class?: string
          base_price_per_sqm?: number
          cost_index?: number
          created_at?: string
          id?: string
          month?: string
          percentage_movement?: number
          updated_at?: string
          year?: number
        }
        Relationships: []
      }
      cpi_index: {
        Row: {
          cpi_value: number
          created_at: string
          id: string
          month: string
          percentage_change: number
          updated_at: string
          year: number
        }
        Insert: {
          cpi_value: number
          created_at?: string
          id?: string
          month: string
          percentage_change: number
          updated_at?: string
          year: number
        }
        Update: {
          cpi_value?: number
          created_at?: string
          id?: string
          month?: string
          percentage_change?: number
          updated_at?: string
          year?: number
        }
        Relationships: []
      }
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
      evidence_files: {
        Row: {
          bucket_id: string | null
          bucket_name: string
          classification: string | null
          created_at: string
          evidence_type: string
          extracted_data: Json | null
          extraction_status: string | null
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          is_public: boolean | null
          mime_type: string | null
          name: string | null
          path: string | null
          property_address: string | null
          size_bytes: number | null
          source_url: string | null
          tags: string[] | null
          updated_at: string
          upload_method: string | null
          user_id: string
        }
        Insert: {
          bucket_id?: string | null
          bucket_name: string
          classification?: string | null
          created_at?: string
          evidence_type: string
          extracted_data?: Json | null
          extraction_status?: string | null
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          is_public?: boolean | null
          mime_type?: string | null
          name?: string | null
          path?: string | null
          property_address?: string | null
          size_bytes?: number | null
          source_url?: string | null
          tags?: string[] | null
          updated_at?: string
          upload_method?: string | null
          user_id: string
        }
        Update: {
          bucket_id?: string | null
          bucket_name?: string
          classification?: string | null
          created_at?: string
          evidence_type?: string
          extracted_data?: Json | null
          extraction_status?: string | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          is_public?: boolean | null
          mime_type?: string | null
          name?: string | null
          path?: string | null
          property_address?: string | null
          size_bytes?: number | null
          source_url?: string | null
          tags?: string[] | null
          updated_at?: string
          upload_method?: string | null
          user_id?: string
        }
        Relationships: []
      }
      financial_metrics: {
        Row: {
          accounts_receivable: number
          annual_dividends_per_share: number | null
          biodiversity_score: number | null
          cogs: number
          common_stock_outstanding: number
          community_investment: number | null
          company_name: string | null
          created_at: string
          current_assets: number
          current_liabilities: number
          current_market_price_per_share: number | null
          depreciation: number | null
          ebit: number
          financing_cash_flow: number | null
          ghg_emissions_tons: number | null
          gross_profit: number
          id: string
          interest_expense: number
          inventory: number
          investing_cash_flow: number | null
          long_term_debt: number
          net_profit: number
          operating_cash_flow: number | null
          operating_income: number
          period_end: string
          period_start: string
          renewable_energy_percentage: number | null
          sales: number
          total_assets: number
          total_liabilities: number
          total_stockholders_equity: number
          updated_at: string
          user_id: string
          waste_recycled_percentage: number | null
          water_usage_ml: number | null
        }
        Insert: {
          accounts_receivable?: number
          annual_dividends_per_share?: number | null
          biodiversity_score?: number | null
          cogs?: number
          common_stock_outstanding?: number
          community_investment?: number | null
          company_name?: string | null
          created_at?: string
          current_assets?: number
          current_liabilities?: number
          current_market_price_per_share?: number | null
          depreciation?: number | null
          ebit?: number
          financing_cash_flow?: number | null
          ghg_emissions_tons?: number | null
          gross_profit?: number
          id?: string
          interest_expense?: number
          inventory?: number
          investing_cash_flow?: number | null
          long_term_debt?: number
          net_profit?: number
          operating_cash_flow?: number | null
          operating_income?: number
          period_end: string
          period_start: string
          renewable_energy_percentage?: number | null
          sales?: number
          total_assets?: number
          total_liabilities?: number
          total_stockholders_equity?: number
          updated_at?: string
          user_id: string
          waste_recycled_percentage?: number | null
          water_usage_ml?: number | null
        }
        Update: {
          accounts_receivable?: number
          annual_dividends_per_share?: number | null
          biodiversity_score?: number | null
          cogs?: number
          common_stock_outstanding?: number
          community_investment?: number | null
          company_name?: string | null
          created_at?: string
          current_assets?: number
          current_liabilities?: number
          current_market_price_per_share?: number | null
          depreciation?: number | null
          ebit?: number
          financing_cash_flow?: number | null
          ghg_emissions_tons?: number | null
          gross_profit?: number
          id?: string
          interest_expense?: number
          inventory?: number
          investing_cash_flow?: number | null
          long_term_debt?: number
          net_profit?: number
          operating_cash_flow?: number | null
          operating_income?: number
          period_end?: string
          period_start?: string
          renewable_energy_percentage?: number | null
          sales?: number
          total_assets?: number
          total_liabilities?: number
          total_stockholders_equity?: number
          updated_at?: string
          user_id?: string
          waste_recycled_percentage?: number | null
          water_usage_ml?: number | null
        }
        Relationships: []
      }
      financial_ratios: {
        Row: {
          accounts_receivable_turnover: number | null
          created_at: string
          current_ratio: number | null
          debt_to_equity_ratio: number | null
          debt_to_total_assets_ratio: number | null
          earnings_per_share: number | null
          gross_profit_margin: number | null
          id: string
          inventory_turnover: number | null
          metrics_id: string
          net_profit_margin: number | null
          operating_profit_margin: number | null
          price_earnings_ratio: number | null
          quick_ratio: number | null
          return_on_assets: number | null
          return_on_stockholders_equity: number | null
          times_interest_earned_ratio: number | null
          updated_at: string
          user_id: string
          working_capital: number | null
        }
        Insert: {
          accounts_receivable_turnover?: number | null
          created_at?: string
          current_ratio?: number | null
          debt_to_equity_ratio?: number | null
          debt_to_total_assets_ratio?: number | null
          earnings_per_share?: number | null
          gross_profit_margin?: number | null
          id?: string
          inventory_turnover?: number | null
          metrics_id: string
          net_profit_margin?: number | null
          operating_profit_margin?: number | null
          price_earnings_ratio?: number | null
          quick_ratio?: number | null
          return_on_assets?: number | null
          return_on_stockholders_equity?: number | null
          times_interest_earned_ratio?: number | null
          updated_at?: string
          user_id: string
          working_capital?: number | null
        }
        Update: {
          accounts_receivable_turnover?: number | null
          created_at?: string
          current_ratio?: number | null
          debt_to_equity_ratio?: number | null
          debt_to_total_assets_ratio?: number | null
          earnings_per_share?: number | null
          gross_profit_margin?: number | null
          id?: string
          inventory_turnover?: number | null
          metrics_id?: string
          net_profit_margin?: number | null
          operating_profit_margin?: number | null
          price_earnings_ratio?: number | null
          quick_ratio?: number | null
          return_on_assets?: number | null
          return_on_stockholders_equity?: number | null
          times_interest_earned_ratio?: number | null
          updated_at?: string
          user_id?: string
          working_capital?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "financial_ratios_metrics_id_fkey"
            columns: ["metrics_id"]
            isOneToOne: false
            referencedRelation: "financial_metrics"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_reports: {
        Row: {
          ai_analysis: string | null
          created_at: string
          id: string
          metrics_id: string
          report_data: Json
          report_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_analysis?: string | null
          created_at?: string
          id?: string
          metrics_id: string
          report_data: Json
          report_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_analysis?: string | null
          created_at?: string
          id?: string
          metrics_id?: string
          report_data?: Json
          report_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "financial_reports_metrics_id_fkey"
            columns: ["metrics_id"]
            isOneToOne: false
            referencedRelation: "financial_metrics"
            referencedColumns: ["id"]
          },
        ]
      }
      investment_pools: {
        Row: {
          created_at: string
          current_pool_size: number
          id: string
          investment_property_id: string
          lock_in_period_months: number | null
          management_fee_percentage: number | null
          maximum_pool_size: number | null
          minimum_pool_size: number
          number_of_investors: number
          performance_fee_percentage: number | null
          pool_description: string | null
          pool_name: string
          pool_status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_pool_size?: number
          id?: string
          investment_property_id: string
          lock_in_period_months?: number | null
          management_fee_percentage?: number | null
          maximum_pool_size?: number | null
          minimum_pool_size?: number
          number_of_investors?: number
          performance_fee_percentage?: number | null
          pool_description?: string | null
          pool_name: string
          pool_status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_pool_size?: number
          id?: string
          investment_property_id?: string
          lock_in_period_months?: number | null
          management_fee_percentage?: number | null
          maximum_pool_size?: number | null
          minimum_pool_size?: number
          number_of_investors?: number
          performance_fee_percentage?: number | null
          pool_description?: string | null
          pool_name?: string
          pool_status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "investment_pools_investment_property_id_fkey"
            columns: ["investment_property_id"]
            isOneToOne: false
            referencedRelation: "investment_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      investment_properties: {
        Row: {
          created_at: string
          description: string | null
          expected_annual_return: number | null
          funding_progress: number | null
          id: string
          investment_deadline: string
          investment_status: string
          location_score: number | null
          maximum_investment: number | null
          minimum_investment: number
          property_address: string
          property_id: string | null
          property_images: Json | null
          property_type: string
          raised_amount: number
          rental_yield: number | null
          target_amount: number
          title: string
          total_property_value: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          expected_annual_return?: number | null
          funding_progress?: number | null
          id?: string
          investment_deadline: string
          investment_status?: string
          location_score?: number | null
          maximum_investment?: number | null
          minimum_investment?: number
          property_address: string
          property_id?: string | null
          property_images?: Json | null
          property_type: string
          raised_amount?: number
          rental_yield?: number | null
          target_amount: number
          title: string
          total_property_value: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          expected_annual_return?: number | null
          funding_progress?: number | null
          id?: string
          investment_deadline?: string
          investment_status?: string
          location_score?: number | null
          maximum_investment?: number | null
          minimum_investment?: number
          property_address?: string
          property_id?: string | null
          property_images?: Json | null
          property_type?: string
          raised_amount?: number
          rental_yield?: number | null
          target_amount?: number
          title?: string
          total_property_value?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "investment_properties_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investment_properties_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_addresses"
            referencedColumns: ["id"]
          },
        ]
      }
      investment_returns: {
        Row: {
          created_at: string
          distribution_date: string | null
          id: string
          investment_property_id: string
          pool_id: string
          return_per_unit: number
          return_period: string
          return_status: string
          return_type: string
          total_return_amount: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          distribution_date?: string | null
          id?: string
          investment_property_id: string
          pool_id: string
          return_per_unit: number
          return_period: string
          return_status?: string
          return_type: string
          total_return_amount: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          distribution_date?: string | null
          id?: string
          investment_property_id?: string
          pool_id?: string
          return_per_unit?: number
          return_period?: string
          return_status?: string
          return_type?: string
          total_return_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "investment_returns_investment_property_id_fkey"
            columns: ["investment_property_id"]
            isOneToOne: false
            referencedRelation: "investment_properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investment_returns_pool_id_fkey"
            columns: ["pool_id"]
            isOneToOne: false
            referencedRelation: "investment_pools"
            referencedColumns: ["id"]
          },
        ]
      }
      investment_transactions: {
        Row: {
          amount: number
          created_at: string
          id: string
          investment_property_id: string | null
          net_amount: number | null
          notes: string | null
          payment_method: string | null
          pool_id: string | null
          pool_investment_id: string | null
          processed_at: string | null
          transaction_fee: number | null
          transaction_reference: string | null
          transaction_status: string
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          investment_property_id?: string | null
          net_amount?: number | null
          notes?: string | null
          payment_method?: string | null
          pool_id?: string | null
          pool_investment_id?: string | null
          processed_at?: string | null
          transaction_fee?: number | null
          transaction_reference?: string | null
          transaction_status?: string
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          investment_property_id?: string | null
          net_amount?: number | null
          notes?: string | null
          payment_method?: string | null
          pool_id?: string | null
          pool_investment_id?: string | null
          processed_at?: string | null
          transaction_fee?: number | null
          transaction_reference?: string | null
          transaction_status?: string
          transaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "investment_transactions_investment_property_id_fkey"
            columns: ["investment_property_id"]
            isOneToOne: false
            referencedRelation: "investment_properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investment_transactions_pool_id_fkey"
            columns: ["pool_id"]
            isOneToOne: false
            referencedRelation: "investment_pools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investment_transactions_pool_investment_id_fkey"
            columns: ["pool_investment_id"]
            isOneToOne: false
            referencedRelation: "pool_investments"
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
      monthly_update_notifications: {
        Row: {
          created_at: string
          id: string
          notification_date: string
          notification_type: string
          sent_at: string | null
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          notification_date: string
          notification_type: string
          sent_at?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          notification_date?: string
          notification_type?: string
          sent_at?: string | null
          status?: string
        }
        Relationships: []
      }
      pool_investments: {
        Row: {
          actual_returns: number | null
          created_at: string
          expected_returns: number | null
          id: string
          investment_amount: number
          investment_date: string
          investment_property_id: string
          investment_status: string
          investment_units: number
          investor_id: string
          ownership_percentage: number | null
          pool_id: string
          unit_price: number
          updated_at: string
        }
        Insert: {
          actual_returns?: number | null
          created_at?: string
          expected_returns?: number | null
          id?: string
          investment_amount: number
          investment_date?: string
          investment_property_id: string
          investment_status?: string
          investment_units: number
          investor_id: string
          ownership_percentage?: number | null
          pool_id: string
          unit_price: number
          updated_at?: string
        }
        Update: {
          actual_returns?: number | null
          created_at?: string
          expected_returns?: number | null
          id?: string
          investment_amount?: number
          investment_date?: string
          investment_property_id?: string
          investment_status?: string
          investment_units?: number
          investor_id?: string
          ownership_percentage?: number | null
          pool_id?: string
          unit_price?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pool_investments_investment_property_id_fkey"
            columns: ["investment_property_id"]
            isOneToOne: false
            referencedRelation: "investment_properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pool_investments_pool_id_fkey"
            columns: ["pool_id"]
            isOneToOne: false
            referencedRelation: "investment_pools"
            referencedColumns: ["id"]
          },
        ]
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
          adjustment_summary: string | null
          adjustments: Json | null
          administrative_fund_balance: number | null
          agent_commission: number | null
          air_conditioning: string | null
          aspect: string | null
          auction_result: string | null
          balcony_area: number | null
          bathrooms: number | null
          bedrooms: number | null
          body_corporate_name: string | null
          building_area: number | null
          building_type: string | null
          bushfire_risk: string | null
          capital_growth_rate: number | null
          car_spaces: number | null
          coastal_erosion_risk: string | null
          common_property_description: string | null
          comparable_address: string
          comparable_rank: number | null
          comparable_sales_analysis: string | null
          condition_rating: string | null
          construction_type: string | null
          contamination_risk: string | null
          county: string | null
          courtyard_area: number | null
          created_at: string
          data_quality_score: number | null
          data_source_verified: boolean | null
          days_on_market: number | null
          distance_km: number | null
          easements: string | null
          encumbrances: string | null
          energy_rating: string | null
          exclusive_use_areas: string | null
          external_walls: string | null
          extraction_confidence: number | null
          flooding_risk: string | null
          garden_area: number | null
          green_star_rating: string | null
          greywater_system: boolean | null
          gross_rental_yield: number | null
          gym: boolean | null
          heating: string | null
          heritage_listing: boolean | null
          hot_water_system: string | null
          id: string
          inspection_date: string | null
          is_deceased_estate: boolean | null
          is_mortgagee_sale: boolean | null
          is_new_build: boolean | null
          is_off_the_plan: boolean | null
          is_related_party_sale: boolean | null
          is_strata: boolean | null
          land_area: number | null
          last_verified_date: string | null
          legal_costs: number | null
          letting_rights: boolean | null
          lift_access: boolean | null
          listing_price: number | null
          local_government_area: string | null
          location_benefits: string | null
          location_detriments: string | null
          lot_number: string | null
          management_rights: boolean | null
          market_commentary: string | null
          marketing_costs: number | null
          marketing_period_days: number | null
          nbers_rating: string | null
          net_rental_yield: number | null
          notes: string | null
          parish: string | null
          parking_spaces: number | null
          parking_type: string | null
          plan_number: string | null
          plan_type: string | null
          pool: boolean | null
          postcode: string | null
          previous_sales: Json | null
          price_per_sqm_building: number | null
          price_per_sqm_land: number | null
          property_description: string | null
          property_id: string | null
          property_type: string
          purchaser_type: string | null
          quality_rating: string | null
          rainwater_tank: boolean | null
          reliability_score: number | null
          rental_history: Json | null
          reserve_price: number | null
          roof_type: string | null
          sale_conditions: string | null
          sale_date: string
          sale_price: number
          sale_type: string | null
          security_features: string | null
          services: string | null
          settlement_date: string | null
          sinking_fund_balance: number | null
          soil_type: string | null
          solar_hot_water: boolean | null
          solar_panels: boolean | null
          source: string | null
          spa: boolean | null
          special_levies: number | null
          stamp_duty: number | null
          state: string | null
          storage_areas: string | null
          strata_fees_annual: number | null
          strata_fees_quarterly: number | null
          strata_lot_number: string | null
          strata_manager: string | null
          strata_plan_number: string | null
          strata_scheme_number: string | null
          street_name: string | null
          street_number: string | null
          street_type: string | null
          suburb: string | null
          tennis_court: boolean | null
          title_particulars: string | null
          topography: string | null
          unit_number: string | null
          user_id: string
          valuation_id: string | null
          valuer_comments: string | null
          vendor_type: string | null
          view_rating: string | null
          ward: string | null
          water_rating: string | null
          weight_percentage: number | null
          wheelchair_access: boolean | null
          year_built: number | null
          year_renovated: number | null
          zoning: string | null
        }
        Insert: {
          adjusted_price?: number | null
          adjustment_summary?: string | null
          adjustments?: Json | null
          administrative_fund_balance?: number | null
          agent_commission?: number | null
          air_conditioning?: string | null
          aspect?: string | null
          auction_result?: string | null
          balcony_area?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          body_corporate_name?: string | null
          building_area?: number | null
          building_type?: string | null
          bushfire_risk?: string | null
          capital_growth_rate?: number | null
          car_spaces?: number | null
          coastal_erosion_risk?: string | null
          common_property_description?: string | null
          comparable_address: string
          comparable_rank?: number | null
          comparable_sales_analysis?: string | null
          condition_rating?: string | null
          construction_type?: string | null
          contamination_risk?: string | null
          county?: string | null
          courtyard_area?: number | null
          created_at?: string
          data_quality_score?: number | null
          data_source_verified?: boolean | null
          days_on_market?: number | null
          distance_km?: number | null
          easements?: string | null
          encumbrances?: string | null
          energy_rating?: string | null
          exclusive_use_areas?: string | null
          external_walls?: string | null
          extraction_confidence?: number | null
          flooding_risk?: string | null
          garden_area?: number | null
          green_star_rating?: string | null
          greywater_system?: boolean | null
          gross_rental_yield?: number | null
          gym?: boolean | null
          heating?: string | null
          heritage_listing?: boolean | null
          hot_water_system?: string | null
          id?: string
          inspection_date?: string | null
          is_deceased_estate?: boolean | null
          is_mortgagee_sale?: boolean | null
          is_new_build?: boolean | null
          is_off_the_plan?: boolean | null
          is_related_party_sale?: boolean | null
          is_strata?: boolean | null
          land_area?: number | null
          last_verified_date?: string | null
          legal_costs?: number | null
          letting_rights?: boolean | null
          lift_access?: boolean | null
          listing_price?: number | null
          local_government_area?: string | null
          location_benefits?: string | null
          location_detriments?: string | null
          lot_number?: string | null
          management_rights?: boolean | null
          market_commentary?: string | null
          marketing_costs?: number | null
          marketing_period_days?: number | null
          nbers_rating?: string | null
          net_rental_yield?: number | null
          notes?: string | null
          parish?: string | null
          parking_spaces?: number | null
          parking_type?: string | null
          plan_number?: string | null
          plan_type?: string | null
          pool?: boolean | null
          postcode?: string | null
          previous_sales?: Json | null
          price_per_sqm_building?: number | null
          price_per_sqm_land?: number | null
          property_description?: string | null
          property_id?: string | null
          property_type: string
          purchaser_type?: string | null
          quality_rating?: string | null
          rainwater_tank?: boolean | null
          reliability_score?: number | null
          rental_history?: Json | null
          reserve_price?: number | null
          roof_type?: string | null
          sale_conditions?: string | null
          sale_date: string
          sale_price: number
          sale_type?: string | null
          security_features?: string | null
          services?: string | null
          settlement_date?: string | null
          sinking_fund_balance?: number | null
          soil_type?: string | null
          solar_hot_water?: boolean | null
          solar_panels?: boolean | null
          source?: string | null
          spa?: boolean | null
          special_levies?: number | null
          stamp_duty?: number | null
          state?: string | null
          storage_areas?: string | null
          strata_fees_annual?: number | null
          strata_fees_quarterly?: number | null
          strata_lot_number?: string | null
          strata_manager?: string | null
          strata_plan_number?: string | null
          strata_scheme_number?: string | null
          street_name?: string | null
          street_number?: string | null
          street_type?: string | null
          suburb?: string | null
          tennis_court?: boolean | null
          title_particulars?: string | null
          topography?: string | null
          unit_number?: string | null
          user_id: string
          valuation_id?: string | null
          valuer_comments?: string | null
          vendor_type?: string | null
          view_rating?: string | null
          ward?: string | null
          water_rating?: string | null
          weight_percentage?: number | null
          wheelchair_access?: boolean | null
          year_built?: number | null
          year_renovated?: number | null
          zoning?: string | null
        }
        Update: {
          adjusted_price?: number | null
          adjustment_summary?: string | null
          adjustments?: Json | null
          administrative_fund_balance?: number | null
          agent_commission?: number | null
          air_conditioning?: string | null
          aspect?: string | null
          auction_result?: string | null
          balcony_area?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          body_corporate_name?: string | null
          building_area?: number | null
          building_type?: string | null
          bushfire_risk?: string | null
          capital_growth_rate?: number | null
          car_spaces?: number | null
          coastal_erosion_risk?: string | null
          common_property_description?: string | null
          comparable_address?: string
          comparable_rank?: number | null
          comparable_sales_analysis?: string | null
          condition_rating?: string | null
          construction_type?: string | null
          contamination_risk?: string | null
          county?: string | null
          courtyard_area?: number | null
          created_at?: string
          data_quality_score?: number | null
          data_source_verified?: boolean | null
          days_on_market?: number | null
          distance_km?: number | null
          easements?: string | null
          encumbrances?: string | null
          energy_rating?: string | null
          exclusive_use_areas?: string | null
          external_walls?: string | null
          extraction_confidence?: number | null
          flooding_risk?: string | null
          garden_area?: number | null
          green_star_rating?: string | null
          greywater_system?: boolean | null
          gross_rental_yield?: number | null
          gym?: boolean | null
          heating?: string | null
          heritage_listing?: boolean | null
          hot_water_system?: string | null
          id?: string
          inspection_date?: string | null
          is_deceased_estate?: boolean | null
          is_mortgagee_sale?: boolean | null
          is_new_build?: boolean | null
          is_off_the_plan?: boolean | null
          is_related_party_sale?: boolean | null
          is_strata?: boolean | null
          land_area?: number | null
          last_verified_date?: string | null
          legal_costs?: number | null
          letting_rights?: boolean | null
          lift_access?: boolean | null
          listing_price?: number | null
          local_government_area?: string | null
          location_benefits?: string | null
          location_detriments?: string | null
          lot_number?: string | null
          management_rights?: boolean | null
          market_commentary?: string | null
          marketing_costs?: number | null
          marketing_period_days?: number | null
          nbers_rating?: string | null
          net_rental_yield?: number | null
          notes?: string | null
          parish?: string | null
          parking_spaces?: number | null
          parking_type?: string | null
          plan_number?: string | null
          plan_type?: string | null
          pool?: boolean | null
          postcode?: string | null
          previous_sales?: Json | null
          price_per_sqm_building?: number | null
          price_per_sqm_land?: number | null
          property_description?: string | null
          property_id?: string | null
          property_type?: string
          purchaser_type?: string | null
          quality_rating?: string | null
          rainwater_tank?: boolean | null
          reliability_score?: number | null
          rental_history?: Json | null
          reserve_price?: number | null
          roof_type?: string | null
          sale_conditions?: string | null
          sale_date?: string
          sale_price?: number
          sale_type?: string | null
          security_features?: string | null
          services?: string | null
          settlement_date?: string | null
          sinking_fund_balance?: number | null
          soil_type?: string | null
          solar_hot_water?: boolean | null
          solar_panels?: boolean | null
          source?: string | null
          spa?: boolean | null
          special_levies?: number | null
          stamp_duty?: number | null
          state?: string | null
          storage_areas?: string | null
          strata_fees_annual?: number | null
          strata_fees_quarterly?: number | null
          strata_lot_number?: string | null
          strata_manager?: string | null
          strata_plan_number?: string | null
          strata_scheme_number?: string | null
          street_name?: string | null
          street_number?: string | null
          street_type?: string | null
          suburb?: string | null
          tennis_court?: boolean | null
          title_particulars?: string | null
          topography?: string | null
          unit_number?: string | null
          user_id?: string
          valuation_id?: string | null
          valuer_comments?: string | null
          vendor_type?: string | null
          view_rating?: string | null
          ward?: string | null
          water_rating?: string | null
          weight_percentage?: number | null
          wheelchair_access?: boolean | null
          year_built?: number | null
          year_renovated?: number | null
          zoning?: string | null
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
      create_report: {
        Args: { report_data: Json }
        Returns: string
      }
      create_valuation_job: {
        Args: { job_data: Json }
        Returns: string
      }
      get_construction_cost_index: {
        Args: Record<PropertyKey, never>
        Returns: {
          asset_class: string
          base_price_per_sqm: number
          cost_index: number
          created_at: string
          id: string
          month: string
          percentage_movement: number
          year: number
        }[]
      }
      get_cpi_index: {
        Args: Record<PropertyKey, never>
        Returns: {
          cpi_value: number
          created_at: string
          id: string
          month: string
          percentage_change: number
          year: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      trigger_monthly_cost_update: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      upsert_property_for_job: {
        Args: { address_text: string; property_type_text?: string }
        Returns: string
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
