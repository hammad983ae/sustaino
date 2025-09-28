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
      aggregator_performance: {
        Row: {
          achievements: Json | null
          active_representatives: number | null
          average_transaction_value: number | null
          compliance_score: number | null
          created_at: string
          crypto_volume: number | null
          growth_rate: number | null
          id: string
          performance_period: string
          performance_ranking: number | null
          sam_tokens_distributed: number | null
          total_commission_volume: number | null
          total_representatives: number | null
          total_transactions: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          achievements?: Json | null
          active_representatives?: number | null
          average_transaction_value?: number | null
          compliance_score?: number | null
          created_at?: string
          crypto_volume?: number | null
          growth_rate?: number | null
          id?: string
          performance_period: string
          performance_ranking?: number | null
          sam_tokens_distributed?: number | null
          total_commission_volume?: number | null
          total_representatives?: number | null
          total_transactions?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          achievements?: Json | null
          active_representatives?: number | null
          average_transaction_value?: number | null
          compliance_score?: number | null
          created_at?: string
          crypto_volume?: number | null
          growth_rate?: number | null
          id?: string
          performance_period?: string
          performance_ranking?: number | null
          sam_tokens_distributed?: number | null
          total_commission_volume?: number | null
          total_representatives?: number | null
          total_transactions?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      aggregator_relationships: {
        Row: {
          aggregator_afsl: string | null
          aggregator_name: string
          agreement_end_date: string | null
          agreement_start_date: string | null
          commission_structure: Json | null
          created_at: string
          id: string
          obligations: Json | null
          relationship_type: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          aggregator_afsl?: string | null
          aggregator_name: string
          agreement_end_date?: string | null
          agreement_start_date?: string | null
          commission_structure?: Json | null
          created_at?: string
          id?: string
          obligations?: Json | null
          relationship_type: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          aggregator_afsl?: string | null
          aggregator_name?: string
          agreement_end_date?: string | null
          agreement_start_date?: string | null
          commission_structure?: Json | null
          created_at?: string
          id?: string
          obligations?: Json | null
          relationship_type?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      aggregator_representatives: {
        Row: {
          business_abn: string | null
          business_name: string | null
          commission_structure: Json
          compliance_score: number | null
          created_at: string
          crypto_wallet_address: string | null
          id: string
          insurance_details: Json | null
          last_compliance_check: string | null
          license_details: Json | null
          onboarding_completed: boolean | null
          performance_metrics: Json | null
          representative_email: string | null
          representative_id: string
          representative_name: string
          representative_number: string | null
          representative_phone: string | null
          representative_type: string
          sam_integration_id: string | null
          status: string
          training_completed: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          business_abn?: string | null
          business_name?: string | null
          commission_structure?: Json
          compliance_score?: number | null
          created_at?: string
          crypto_wallet_address?: string | null
          id?: string
          insurance_details?: Json | null
          last_compliance_check?: string | null
          license_details?: Json | null
          onboarding_completed?: boolean | null
          performance_metrics?: Json | null
          representative_email?: string | null
          representative_id: string
          representative_name: string
          representative_number?: string | null
          representative_phone?: string | null
          representative_type: string
          sam_integration_id?: string | null
          status?: string
          training_completed?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          business_abn?: string | null
          business_name?: string | null
          commission_structure?: Json
          compliance_score?: number | null
          created_at?: string
          crypto_wallet_address?: string | null
          id?: string
          insurance_details?: Json | null
          last_compliance_check?: string | null
          license_details?: Json | null
          onboarding_completed?: boolean | null
          performance_metrics?: Json | null
          representative_email?: string | null
          representative_id?: string
          representative_name?: string
          representative_number?: string | null
          representative_phone?: string | null
          representative_type?: string
          sam_integration_id?: string | null
          status?: string
          training_completed?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      api_rate_limits: {
        Row: {
          created_at: string | null
          endpoint: string
          id: string
          request_count: number | null
          user_id: string | null
          window_start: string | null
        }
        Insert: {
          created_at?: string | null
          endpoint: string
          id?: string
          request_count?: number | null
          user_id?: string | null
          window_start?: string | null
        }
        Update: {
          created_at?: string | null
          endpoint?: string
          id?: string
          request_count?: number | null
          user_id?: string | null
          window_start?: string | null
        }
        Relationships: []
      }
      auction_bids: {
        Row: {
          auction_id: string
          bid_amount: number
          bid_time: string
          bidder_id: string
          created_at: string
          id: string
          is_winning_bid: boolean
        }
        Insert: {
          auction_id: string
          bid_amount: number
          bid_time?: string
          bidder_id: string
          created_at?: string
          id?: string
          is_winning_bid?: boolean
        }
        Update: {
          auction_id?: string
          bid_amount?: number
          bid_time?: string
          bidder_id?: string
          created_at?: string
          id?: string
          is_winning_bid?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "auction_bids_auction_id_fkey"
            columns: ["auction_id"]
            isOneToOne: false
            referencedRelation: "auction_platforms"
            referencedColumns: ["id"]
          },
        ]
      }
      auction_platforms: {
        Row: {
          auction_end_date: string
          auction_start_date: string
          auction_status: string
          category: string
          created_at: string
          current_bid: number
          description: string | null
          esg_score: number
          features: Json | null
          id: string
          monthly_revenue: number
          reserve_price: number | null
          starting_bid: number
          subtitle: string | null
          title: string
          updated_at: string
          user_id: string
          users_count: number
        }
        Insert: {
          auction_end_date: string
          auction_start_date?: string
          auction_status?: string
          category: string
          created_at?: string
          current_bid?: number
          description?: string | null
          esg_score?: number
          features?: Json | null
          id?: string
          monthly_revenue?: number
          reserve_price?: number | null
          starting_bid?: number
          subtitle?: string | null
          title: string
          updated_at?: string
          user_id: string
          users_count?: number
        }
        Update: {
          auction_end_date?: string
          auction_start_date?: string
          auction_status?: string
          category?: string
          created_at?: string
          current_bid?: number
          description?: string | null
          esg_score?: number
          features?: Json | null
          id?: string
          monthly_revenue?: number
          reserve_price?: number | null
          starting_bid?: number
          subtitle?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          users_count?: number
        }
        Relationships: []
      }
      blocked_ips: {
        Row: {
          blocked_at: string
          created_at: string
          expires_at: string | null
          id: string
          ip_address: string
          reason: string
          status: string
          user_id: string
        }
        Insert: {
          blocked_at?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          ip_address: string
          reason: string
          status?: string
          user_id: string
        }
        Update: {
          blocked_at?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          ip_address?: string
          reason?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      business_licenses: {
        Row: {
          annual_compliance_fee: number | null
          compliance_score: number | null
          conditions_attached: Json | null
          created_at: string
          expiry_date: string | null
          id: string
          issue_date: string | null
          issuing_authority: string
          license_holder_name: string
          license_number: string | null
          license_status: string
          license_type: string
          renewal_reminder_days: number | null
          responsible_managers: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          annual_compliance_fee?: number | null
          compliance_score?: number | null
          conditions_attached?: Json | null
          created_at?: string
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          issuing_authority: string
          license_holder_name: string
          license_number?: string | null
          license_status?: string
          license_type: string
          renewal_reminder_days?: number | null
          responsible_managers?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          annual_compliance_fee?: number | null
          compliance_score?: number | null
          conditions_attached?: Json | null
          created_at?: string
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          issuing_authority?: string
          license_holder_name?: string
          license_number?: string | null
          license_status?: string
          license_type?: string
          renewal_reminder_days?: number | null
          responsible_managers?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      clients: {
        Row: {
          branding: Json | null
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          branding?: Json | null
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          branding?: Json | null
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      commission_transactions: {
        Row: {
          aggregator_commission: number | null
          aggregator_id: string
          blockchain_confirmed: boolean | null
          client_name: string | null
          commission_rate: number | null
          created_at: string
          crypto_amount: number | null
          crypto_currency: string | null
          id: string
          loan_amount: number | null
          metadata: Json | null
          payment_method: string | null
          payment_status: string
          property_address: string | null
          property_value: number | null
          representative_commission: number | null
          representative_id: string
          sale_price: number | null
          settlement_date: string | null
          transaction_amount: number
          transaction_date: string
          transaction_hash: string | null
          transaction_type: string
          updated_at: string
        }
        Insert: {
          aggregator_commission?: number | null
          aggregator_id: string
          blockchain_confirmed?: boolean | null
          client_name?: string | null
          commission_rate?: number | null
          created_at?: string
          crypto_amount?: number | null
          crypto_currency?: string | null
          id?: string
          loan_amount?: number | null
          metadata?: Json | null
          payment_method?: string | null
          payment_status?: string
          property_address?: string | null
          property_value?: number | null
          representative_commission?: number | null
          representative_id: string
          sale_price?: number | null
          settlement_date?: string | null
          transaction_amount: number
          transaction_date?: string
          transaction_hash?: string | null
          transaction_type: string
          updated_at?: string
        }
        Update: {
          aggregator_commission?: number | null
          aggregator_id?: string
          blockchain_confirmed?: boolean | null
          client_name?: string | null
          commission_rate?: number | null
          created_at?: string
          crypto_amount?: number | null
          crypto_currency?: string | null
          id?: string
          loan_amount?: number | null
          metadata?: Json | null
          payment_method?: string | null
          payment_status?: string
          property_address?: string | null
          property_value?: number | null
          representative_commission?: number | null
          representative_id?: string
          sale_price?: number | null
          settlement_date?: string | null
          transaction_amount?: number
          transaction_date?: string
          transaction_hash?: string | null
          transaction_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      competitive_threats: {
        Row: {
          action_taken: string
          created_at: string
          details: Json | null
          endpoint: string
          id: string
          ip_address: string
          risk_score: number
          threat_type: string
          timestamp: string
          user_agent: string
          user_id: string
        }
        Insert: {
          action_taken?: string
          created_at?: string
          details?: Json | null
          endpoint: string
          id?: string
          ip_address: string
          risk_score?: number
          threat_type: string
          timestamp?: string
          user_agent: string
          user_id: string
        }
        Update: {
          action_taken?: string
          created_at?: string
          details?: Json | null
          endpoint?: string
          id?: string
          ip_address?: string
          risk_score?: number
          threat_type?: string
          timestamp?: string
          user_agent?: string
          user_id?: string
        }
        Relationships: []
      }
      compliance_requirements: {
        Row: {
          completion_status: string
          compliance_officer: string | null
          created_at: string
          due_date: string | null
          evidence_document_url: string | null
          evidence_required: boolean | null
          id: string
          license_id: string
          requirement_description: string
          requirement_type: string
          updated_at: string
        }
        Insert: {
          completion_status?: string
          compliance_officer?: string | null
          created_at?: string
          due_date?: string | null
          evidence_document_url?: string | null
          evidence_required?: boolean | null
          id?: string
          license_id: string
          requirement_description: string
          requirement_type: string
          updated_at?: string
        }
        Update: {
          completion_status?: string
          compliance_officer?: string | null
          created_at?: string
          due_date?: string | null
          evidence_document_url?: string | null
          evidence_required?: boolean | null
          id?: string
          license_id?: string
          requirement_description?: string
          requirement_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "compliance_requirements_license_id_fkey"
            columns: ["license_id"]
            isOneToOne: false
            referencedRelation: "business_licenses"
            referencedColumns: ["id"]
          },
        ]
      }
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
      data_extraction_jobs: {
        Row: {
          completed_at: string | null
          created_at: string
          error_log: Json | null
          extracted_data: Json | null
          id: string
          job_type: string
          max_retries: number | null
          quality_metrics: Json | null
          records_failed: number | null
          records_processed: number | null
          records_successful: number | null
          retry_count: number | null
          source_identifier: string
          source_type: string
          started_at: string | null
          status: string
          total_records_expected: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          error_log?: Json | null
          extracted_data?: Json | null
          id?: string
          job_type: string
          max_retries?: number | null
          quality_metrics?: Json | null
          records_failed?: number | null
          records_processed?: number | null
          records_successful?: number | null
          retry_count?: number | null
          source_identifier: string
          source_type: string
          started_at?: string | null
          status?: string
          total_records_expected?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          error_log?: Json | null
          extracted_data?: Json | null
          id?: string
          job_type?: string
          max_retries?: number | null
          quality_metrics?: Json | null
          records_failed?: number | null
          records_processed?: number | null
          records_successful?: number | null
          retry_count?: number | null
          source_identifier?: string
          source_type?: string
          started_at?: string | null
          status?: string
          total_records_expected?: number | null
          updated_at?: string
          user_id?: string
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
      hia_progress_stages: {
        Row: {
          created_at: string | null
          id: string
          inspection_requirements: Json | null
          stage_description: string | null
          stage_name: string
          stage_order: number
          standard_percentage: number
          typical_inclusions: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          inspection_requirements?: Json | null
          stage_description?: string | null
          stage_name: string
          stage_order: number
          standard_percentage: number
          typical_inclusions?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: string
          inspection_requirements?: Json | null
          stage_description?: string | null
          stage_name?: string
          stage_order?: number
          standard_percentage?: number
          typical_inclusions?: Json | null
        }
        Relationships: []
      }
      honeypot_accesses: {
        Row: {
          created_at: string
          details: Json | null
          endpoint: string
          id: string
          ip_address: string
          organization: string | null
          timestamp: string
          user_id: string
        }
        Insert: {
          created_at?: string
          details?: Json | null
          endpoint: string
          id?: string
          ip_address: string
          organization?: string | null
          timestamp?: string
          user_id: string
        }
        Update: {
          created_at?: string
          details?: Json | null
          endpoint?: string
          id?: string
          ip_address?: string
          organization?: string | null
          timestamp?: string
          user_id?: string
        }
        Relationships: []
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
      jobs: {
        Row: {
          actual_completion: string | null
          allowed_users: string[] | null
          assigned_to: string | null
          client_name: string
          client_type: string
          confidentiality_level: string
          created_at: string
          description: string | null
          estimated_completion: string | null
          id: string
          job_data: Json | null
          job_title: string
          job_type: string
          priority: string
          property_address: string | null
          property_type: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          actual_completion?: string | null
          allowed_users?: string[] | null
          assigned_to?: string | null
          client_name: string
          client_type?: string
          confidentiality_level?: string
          created_at?: string
          description?: string | null
          estimated_completion?: string | null
          id?: string
          job_data?: Json | null
          job_title: string
          job_type: string
          priority?: string
          property_address?: string | null
          property_type?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          actual_completion?: string | null
          allowed_users?: string[] | null
          assigned_to?: string | null
          client_name?: string
          client_type?: string
          confidentiality_level?: string
          created_at?: string
          description?: string | null
          estimated_completion?: string | null
          id?: string
          job_data?: Json | null
          job_title?: string
          job_type?: string
          priority?: string
          property_address?: string | null
          property_type?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      leasing_evidence: {
        Row: {
          adjustments: Json | null
          bathrooms: number | null
          bedrooms: number | null
          bond_amount: number | null
          building_area: number | null
          car_spaces: number | null
          comparable_rating: number | null
          created_at: string
          data_quality_score: number | null
          data_source: string
          days_to_lease: number | null
          extraction_date: string | null
          furnished: boolean | null
          id: string
          images: Json | null
          land_area: number | null
          latitude: number | null
          lease_end_date: string | null
          lease_start_date: string | null
          lease_type: string | null
          listing_rent: number | null
          longitude: number | null
          notes: string | null
          pets_allowed: boolean | null
          postcode: string | null
          property_address: string
          property_type: string | null
          rent_per_sqm: number | null
          rental_amount: number
          rental_period: string | null
          source_url: string | null
          state: string | null
          suburb: string | null
          tenant_type: string | null
          updated_at: string
          user_id: string
          utilities_included: Json | null
          verification_status: string | null
          yield_calculation: number | null
        }
        Insert: {
          adjustments?: Json | null
          bathrooms?: number | null
          bedrooms?: number | null
          bond_amount?: number | null
          building_area?: number | null
          car_spaces?: number | null
          comparable_rating?: number | null
          created_at?: string
          data_quality_score?: number | null
          data_source: string
          days_to_lease?: number | null
          extraction_date?: string | null
          furnished?: boolean | null
          id?: string
          images?: Json | null
          land_area?: number | null
          latitude?: number | null
          lease_end_date?: string | null
          lease_start_date?: string | null
          lease_type?: string | null
          listing_rent?: number | null
          longitude?: number | null
          notes?: string | null
          pets_allowed?: boolean | null
          postcode?: string | null
          property_address: string
          property_type?: string | null
          rent_per_sqm?: number | null
          rental_amount: number
          rental_period?: string | null
          source_url?: string | null
          state?: string | null
          suburb?: string | null
          tenant_type?: string | null
          updated_at?: string
          user_id: string
          utilities_included?: Json | null
          verification_status?: string | null
          yield_calculation?: number | null
        }
        Update: {
          adjustments?: Json | null
          bathrooms?: number | null
          bedrooms?: number | null
          bond_amount?: number | null
          building_area?: number | null
          car_spaces?: number | null
          comparable_rating?: number | null
          created_at?: string
          data_quality_score?: number | null
          data_source?: string
          days_to_lease?: number | null
          extraction_date?: string | null
          furnished?: boolean | null
          id?: string
          images?: Json | null
          land_area?: number | null
          latitude?: number | null
          lease_end_date?: string | null
          lease_start_date?: string | null
          lease_type?: string | null
          listing_rent?: number | null
          longitude?: number | null
          notes?: string | null
          pets_allowed?: boolean | null
          postcode?: string | null
          property_address?: string
          property_type?: string | null
          rent_per_sqm?: number | null
          rental_amount?: number
          rental_period?: string | null
          source_url?: string | null
          state?: string | null
          suburb?: string | null
          tenant_type?: string | null
          updated_at?: string
          user_id?: string
          utilities_included?: Json | null
          verification_status?: string | null
          yield_calculation?: number | null
        }
        Relationships: []
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
      property_assessments: {
        Row: {
          branding: Json | null
          client_id: string | null
          created_at: string | null
          id: string
          include_flags: Json | null
          job_id: string
          ocr_results: string | null
          report_type: string | null
          report_url: string | null
          reviewed: boolean | null
          updated_at: string | null
          user_id: string | null
          valuation_purpose: string | null
        }
        Insert: {
          branding?: Json | null
          client_id?: string | null
          created_at?: string | null
          id?: string
          include_flags?: Json | null
          job_id: string
          ocr_results?: string | null
          report_type?: string | null
          report_url?: string | null
          reviewed?: boolean | null
          updated_at?: string | null
          user_id?: string | null
          valuation_purpose?: string | null
        }
        Update: {
          branding?: Json | null
          client_id?: string | null
          created_at?: string | null
          id?: string
          include_flags?: Json | null
          job_id?: string
          ocr_results?: string | null
          report_type?: string | null
          report_url?: string | null
          reviewed?: boolean | null
          updated_at?: string | null
          user_id?: string | null
          valuation_purpose?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_assessments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      property_market_data: {
        Row: {
          average_rental: number | null
          average_sale_price: number | null
          average_yield: number | null
          created_at: string
          data_period_end: string | null
          data_period_start: string | null
          data_source: string
          days_on_market_average: number | null
          id: string
          last_updated: string | null
          market_strength: string | null
          median_rental: number | null
          median_sale_price: number | null
          postcode: string | null
          price_trend: string | null
          property_type: string
          rental_growth_12m: number | null
          sale_price_growth_12m: number | null
          state: string
          suburb: string
          supply_demand_ratio: number | null
          total_leases_12m: number | null
          total_sales_12m: number | null
          updated_at: string
          user_id: string
          vacancy_rate: number | null
        }
        Insert: {
          average_rental?: number | null
          average_sale_price?: number | null
          average_yield?: number | null
          created_at?: string
          data_period_end?: string | null
          data_period_start?: string | null
          data_source: string
          days_on_market_average?: number | null
          id?: string
          last_updated?: string | null
          market_strength?: string | null
          median_rental?: number | null
          median_sale_price?: number | null
          postcode?: string | null
          price_trend?: string | null
          property_type: string
          rental_growth_12m?: number | null
          sale_price_growth_12m?: number | null
          state: string
          suburb: string
          supply_demand_ratio?: number | null
          total_leases_12m?: number | null
          total_sales_12m?: number | null
          updated_at?: string
          user_id: string
          vacancy_rate?: number | null
        }
        Update: {
          average_rental?: number | null
          average_sale_price?: number | null
          average_yield?: number | null
          created_at?: string
          data_period_end?: string | null
          data_period_start?: string | null
          data_source?: string
          days_on_market_average?: number | null
          id?: string
          last_updated?: string | null
          market_strength?: string | null
          median_rental?: number | null
          median_sale_price?: number | null
          postcode?: string | null
          price_trend?: string | null
          property_type?: string
          rental_growth_12m?: number | null
          sale_price_growth_12m?: number | null
          state?: string
          suburb?: string
          supply_demand_ratio?: number | null
          total_leases_12m?: number | null
          total_sales_12m?: number | null
          updated_at?: string
          user_id?: string
          vacancy_rate?: number | null
        }
        Relationships: []
      }
      protection_config: {
        Row: {
          created_at: string
          decoy_endpoints: boolean
          honeypots_active: boolean
          id: string
          ip_blocking: boolean
          rate_limiting: boolean
          updated_at: string
          user_id: string
          watermarking: boolean
        }
        Insert: {
          created_at?: string
          decoy_endpoints?: boolean
          honeypots_active?: boolean
          id?: string
          ip_blocking?: boolean
          rate_limiting?: boolean
          updated_at?: string
          user_id: string
          watermarking?: boolean
        }
        Update: {
          created_at?: string
          decoy_endpoints?: boolean
          honeypots_active?: boolean
          id?: string
          ip_blocking?: boolean
          rate_limiting?: boolean
          updated_at?: string
          user_id?: string
          watermarking?: boolean
        }
        Relationships: []
      }
      rental_evidence: {
        Row: {
          adjusted_rental: number | null
          adjustment_summary: string | null
          adjustments: Json | null
          administrative_fund_balance: number | null
          air_conditioning: string | null
          asking_rent: number | null
          aspect: string | null
          auto_adjustment_enabled: boolean | null
          balcony_area: number | null
          bathrooms: number | null
          bedrooms: number | null
          body_corporate_name: string | null
          bond_amount: number | null
          break_clause: string | null
          building_area: number | null
          building_type: string | null
          bushfire_risk: string | null
          car_spaces: number | null
          coastal_erosion_risk: string | null
          common_property_description: string | null
          comparable_address: string
          comparable_rank: number | null
          comparable_rentals_analysis: string | null
          condition_rating: string | null
          construction_type: string | null
          contamination_risk: string | null
          county: string | null
          courtyard_area: number | null
          cpi_adjustment_rate: number | null
          created_at: string
          data_quality_score: number | null
          data_source_verified: boolean | null
          distance_km: number | null
          easements: string | null
          encumbrances: string | null
          energy_rating: string | null
          exclusive_use_areas: string | null
          external_walls: string | null
          extraction_confidence: number | null
          fixed_increase_rate: number | null
          flooding_risk: string | null
          furnished: boolean | null
          garden_area: number | null
          garden_maintenance: boolean | null
          green_star_rating: string | null
          greywater_system: boolean | null
          gross_rent: number | null
          gym: boolean | null
          heating: string | null
          heritage_listing: boolean | null
          hot_water_system: string | null
          id: string
          inspection_date: string | null
          internet_included: boolean | null
          is_strata: boolean | null
          land_area: number | null
          landlord_type: string | null
          last_review_date: string | null
          last_verified_date: string | null
          lease_conditions: string | null
          lease_date: string
          lease_end_date: string | null
          lease_renewal_options: string | null
          lease_start_date: string | null
          lease_term_months: number | null
          lease_type: string | null
          letting_rights: boolean | null
          lift_access: boolean | null
          local_government_area: string | null
          location_benefits: string | null
          location_detriments: string | null
          location_map_url: string | null
          lot_number: string | null
          management_rights: boolean | null
          market_commentary: string | null
          marketing_period_days: number | null
          nbers_rating: string | null
          net_rent: number | null
          next_review_date: string | null
          notes: string | null
          outgoings: number | null
          parish: string | null
          parking_included: boolean | null
          parking_spaces: number | null
          parking_type: string | null
          pet_policy: string | null
          plan_number: string | null
          plan_type: string | null
          pool: boolean | null
          pool_maintenance: boolean | null
          postcode: string | null
          previous_rentals: Json | null
          property_description: string | null
          property_id: string | null
          property_image_url: string | null
          property_type: string
          quality_rating: string | null
          rainwater_tank: boolean | null
          reliability_score: number | null
          rent_increase_percentage: number | null
          rent_per_month: number | null
          rent_per_sqm_annual: number | null
          rent_per_week: number | null
          rent_review_date: string | null
          rental_amount: number
          rental_guarantees: string | null
          rental_incentives: string | null
          rental_period: string
          review_frequency_months: number | null
          review_mechanism: string | null
          review_percentage: number | null
          roof_type: string | null
          sales_history: Json | null
          security_features: string | null
          services: string | null
          sinking_fund_balance: number | null
          soil_type: string | null
          solar_hot_water: boolean | null
          solar_panels: boolean | null
          source: string | null
          spa: boolean | null
          special_levies: number | null
          state: string | null
          storage_areas: string | null
          storage_included: boolean | null
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
          tenant_type: string | null
          tennis_court: boolean | null
          title_particulars: string | null
          topography: string | null
          unit_number: string | null
          user_id: string
          utilities_included: string | null
          vacancy_period_days: number | null
          valuation_id: string | null
          valuer_comments: string | null
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
          adjusted_rental?: number | null
          adjustment_summary?: string | null
          adjustments?: Json | null
          administrative_fund_balance?: number | null
          air_conditioning?: string | null
          asking_rent?: number | null
          aspect?: string | null
          auto_adjustment_enabled?: boolean | null
          balcony_area?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          body_corporate_name?: string | null
          bond_amount?: number | null
          break_clause?: string | null
          building_area?: number | null
          building_type?: string | null
          bushfire_risk?: string | null
          car_spaces?: number | null
          coastal_erosion_risk?: string | null
          common_property_description?: string | null
          comparable_address: string
          comparable_rank?: number | null
          comparable_rentals_analysis?: string | null
          condition_rating?: string | null
          construction_type?: string | null
          contamination_risk?: string | null
          county?: string | null
          courtyard_area?: number | null
          cpi_adjustment_rate?: number | null
          created_at?: string
          data_quality_score?: number | null
          data_source_verified?: boolean | null
          distance_km?: number | null
          easements?: string | null
          encumbrances?: string | null
          energy_rating?: string | null
          exclusive_use_areas?: string | null
          external_walls?: string | null
          extraction_confidence?: number | null
          fixed_increase_rate?: number | null
          flooding_risk?: string | null
          furnished?: boolean | null
          garden_area?: number | null
          garden_maintenance?: boolean | null
          green_star_rating?: string | null
          greywater_system?: boolean | null
          gross_rent?: number | null
          gym?: boolean | null
          heating?: string | null
          heritage_listing?: boolean | null
          hot_water_system?: string | null
          id?: string
          inspection_date?: string | null
          internet_included?: boolean | null
          is_strata?: boolean | null
          land_area?: number | null
          landlord_type?: string | null
          last_review_date?: string | null
          last_verified_date?: string | null
          lease_conditions?: string | null
          lease_date: string
          lease_end_date?: string | null
          lease_renewal_options?: string | null
          lease_start_date?: string | null
          lease_term_months?: number | null
          lease_type?: string | null
          letting_rights?: boolean | null
          lift_access?: boolean | null
          local_government_area?: string | null
          location_benefits?: string | null
          location_detriments?: string | null
          location_map_url?: string | null
          lot_number?: string | null
          management_rights?: boolean | null
          market_commentary?: string | null
          marketing_period_days?: number | null
          nbers_rating?: string | null
          net_rent?: number | null
          next_review_date?: string | null
          notes?: string | null
          outgoings?: number | null
          parish?: string | null
          parking_included?: boolean | null
          parking_spaces?: number | null
          parking_type?: string | null
          pet_policy?: string | null
          plan_number?: string | null
          plan_type?: string | null
          pool?: boolean | null
          pool_maintenance?: boolean | null
          postcode?: string | null
          previous_rentals?: Json | null
          property_description?: string | null
          property_id?: string | null
          property_image_url?: string | null
          property_type: string
          quality_rating?: string | null
          rainwater_tank?: boolean | null
          reliability_score?: number | null
          rent_increase_percentage?: number | null
          rent_per_month?: number | null
          rent_per_sqm_annual?: number | null
          rent_per_week?: number | null
          rent_review_date?: string | null
          rental_amount: number
          rental_guarantees?: string | null
          rental_incentives?: string | null
          rental_period: string
          review_frequency_months?: number | null
          review_mechanism?: string | null
          review_percentage?: number | null
          roof_type?: string | null
          sales_history?: Json | null
          security_features?: string | null
          services?: string | null
          sinking_fund_balance?: number | null
          soil_type?: string | null
          solar_hot_water?: boolean | null
          solar_panels?: boolean | null
          source?: string | null
          spa?: boolean | null
          special_levies?: number | null
          state?: string | null
          storage_areas?: string | null
          storage_included?: boolean | null
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
          tenant_type?: string | null
          tennis_court?: boolean | null
          title_particulars?: string | null
          topography?: string | null
          unit_number?: string | null
          user_id: string
          utilities_included?: string | null
          vacancy_period_days?: number | null
          valuation_id?: string | null
          valuer_comments?: string | null
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
          adjusted_rental?: number | null
          adjustment_summary?: string | null
          adjustments?: Json | null
          administrative_fund_balance?: number | null
          air_conditioning?: string | null
          asking_rent?: number | null
          aspect?: string | null
          auto_adjustment_enabled?: boolean | null
          balcony_area?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          body_corporate_name?: string | null
          bond_amount?: number | null
          break_clause?: string | null
          building_area?: number | null
          building_type?: string | null
          bushfire_risk?: string | null
          car_spaces?: number | null
          coastal_erosion_risk?: string | null
          common_property_description?: string | null
          comparable_address?: string
          comparable_rank?: number | null
          comparable_rentals_analysis?: string | null
          condition_rating?: string | null
          construction_type?: string | null
          contamination_risk?: string | null
          county?: string | null
          courtyard_area?: number | null
          cpi_adjustment_rate?: number | null
          created_at?: string
          data_quality_score?: number | null
          data_source_verified?: boolean | null
          distance_km?: number | null
          easements?: string | null
          encumbrances?: string | null
          energy_rating?: string | null
          exclusive_use_areas?: string | null
          external_walls?: string | null
          extraction_confidence?: number | null
          fixed_increase_rate?: number | null
          flooding_risk?: string | null
          furnished?: boolean | null
          garden_area?: number | null
          garden_maintenance?: boolean | null
          green_star_rating?: string | null
          greywater_system?: boolean | null
          gross_rent?: number | null
          gym?: boolean | null
          heating?: string | null
          heritage_listing?: boolean | null
          hot_water_system?: string | null
          id?: string
          inspection_date?: string | null
          internet_included?: boolean | null
          is_strata?: boolean | null
          land_area?: number | null
          landlord_type?: string | null
          last_review_date?: string | null
          last_verified_date?: string | null
          lease_conditions?: string | null
          lease_date?: string
          lease_end_date?: string | null
          lease_renewal_options?: string | null
          lease_start_date?: string | null
          lease_term_months?: number | null
          lease_type?: string | null
          letting_rights?: boolean | null
          lift_access?: boolean | null
          local_government_area?: string | null
          location_benefits?: string | null
          location_detriments?: string | null
          location_map_url?: string | null
          lot_number?: string | null
          management_rights?: boolean | null
          market_commentary?: string | null
          marketing_period_days?: number | null
          nbers_rating?: string | null
          net_rent?: number | null
          next_review_date?: string | null
          notes?: string | null
          outgoings?: number | null
          parish?: string | null
          parking_included?: boolean | null
          parking_spaces?: number | null
          parking_type?: string | null
          pet_policy?: string | null
          plan_number?: string | null
          plan_type?: string | null
          pool?: boolean | null
          pool_maintenance?: boolean | null
          postcode?: string | null
          previous_rentals?: Json | null
          property_description?: string | null
          property_id?: string | null
          property_image_url?: string | null
          property_type?: string
          quality_rating?: string | null
          rainwater_tank?: boolean | null
          reliability_score?: number | null
          rent_increase_percentage?: number | null
          rent_per_month?: number | null
          rent_per_sqm_annual?: number | null
          rent_per_week?: number | null
          rent_review_date?: string | null
          rental_amount?: number
          rental_guarantees?: string | null
          rental_incentives?: string | null
          rental_period?: string
          review_frequency_months?: number | null
          review_mechanism?: string | null
          review_percentage?: number | null
          roof_type?: string | null
          sales_history?: Json | null
          security_features?: string | null
          services?: string | null
          sinking_fund_balance?: number | null
          soil_type?: string | null
          solar_hot_water?: boolean | null
          solar_panels?: boolean | null
          source?: string | null
          spa?: boolean | null
          special_levies?: number | null
          state?: string | null
          storage_areas?: string | null
          storage_included?: boolean | null
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
          tenant_type?: string | null
          tennis_court?: boolean | null
          title_particulars?: string | null
          topography?: string | null
          unit_number?: string | null
          user_id?: string
          utilities_included?: string | null
          vacancy_period_days?: number | null
          valuation_id?: string | null
          valuer_comments?: string | null
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
      report_configurations: {
        Row: {
          created_at: string | null
          id: string
          job_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          job_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          job_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      report_sections: {
        Row: {
          config_id: string | null
          created_at: string | null
          data_completeness: number | null
          id: string
          is_included: boolean | null
          is_required: boolean | null
          manual_data: Json | null
          ocr_data: Json | null
          section_label: string
          section_name: string
          updated_at: string | null
        }
        Insert: {
          config_id?: string | null
          created_at?: string | null
          data_completeness?: number | null
          id?: string
          is_included?: boolean | null
          is_required?: boolean | null
          manual_data?: Json | null
          ocr_data?: Json | null
          section_label: string
          section_name: string
          updated_at?: string | null
        }
        Update: {
          config_id?: string | null
          created_at?: string | null
          data_completeness?: number | null
          id?: string
          is_included?: boolean | null
          is_required?: boolean | null
          manual_data?: Json | null
          ocr_data?: Json | null
          section_label?: string
          section_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "report_sections_config_id_fkey"
            columns: ["config_id"]
            isOneToOne: false
            referencedRelation: "report_configurations"
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
          adjustments: Json | null
          agent_commission: number | null
          agent_name: string | null
          bathrooms: number | null
          bedrooms: number | null
          building_area: number | null
          car_spaces: number | null
          comparable_rating: number | null
          conditions: string | null
          created_at: string
          data_quality_score: number | null
          data_source: string
          days_on_market: number | null
          extraction_date: string | null
          id: string
          images: Json | null
          land_area: number | null
          latitude: number | null
          listing_price: number | null
          longitude: number | null
          notes: string | null
          postcode: string | null
          price_per_sqm: number | null
          property_address: string
          property_type: string | null
          sale_date: string | null
          sale_method: string | null
          sale_price: number | null
          settlement_period: number | null
          source_url: string | null
          state: string | null
          suburb: string | null
          updated_at: string
          user_id: string
          vendor_type: string | null
          verification_status: string | null
        }
        Insert: {
          adjustments?: Json | null
          agent_commission?: number | null
          agent_name?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          building_area?: number | null
          car_spaces?: number | null
          comparable_rating?: number | null
          conditions?: string | null
          created_at?: string
          data_quality_score?: number | null
          data_source: string
          days_on_market?: number | null
          extraction_date?: string | null
          id?: string
          images?: Json | null
          land_area?: number | null
          latitude?: number | null
          listing_price?: number | null
          longitude?: number | null
          notes?: string | null
          postcode?: string | null
          price_per_sqm?: number | null
          property_address: string
          property_type?: string | null
          sale_date?: string | null
          sale_method?: string | null
          sale_price?: number | null
          settlement_period?: number | null
          source_url?: string | null
          state?: string | null
          suburb?: string | null
          updated_at?: string
          user_id: string
          vendor_type?: string | null
          verification_status?: string | null
        }
        Update: {
          adjustments?: Json | null
          agent_commission?: number | null
          agent_name?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          building_area?: number | null
          car_spaces?: number | null
          comparable_rating?: number | null
          conditions?: string | null
          created_at?: string
          data_quality_score?: number | null
          data_source?: string
          days_on_market?: number | null
          extraction_date?: string | null
          id?: string
          images?: Json | null
          land_area?: number | null
          latitude?: number | null
          listing_price?: number | null
          longitude?: number | null
          notes?: string | null
          postcode?: string | null
          price_per_sqm?: number | null
          property_address?: string
          property_type?: string | null
          sale_date?: string | null
          sale_method?: string | null
          sale_price?: number | null
          settlement_period?: number | null
          source_url?: string | null
          state?: string | null
          suburb?: string | null
          updated_at?: string
          user_id?: string
          vendor_type?: string | null
          verification_status?: string | null
        }
        Relationships: []
      }
      sam_token_rewards: {
        Row: {
          blockchain_tx_hash: string | null
          created_at: string
          distributed_at: string | null
          id: string
          performance_metrics: Json | null
          reason: string
          representative_id: string | null
          reward_status: string
          reward_type: string
          sam_amount: number
          updated_at: string
          usd_equivalent: number | null
          user_id: string
          wallet_address: string | null
        }
        Insert: {
          blockchain_tx_hash?: string | null
          created_at?: string
          distributed_at?: string | null
          id?: string
          performance_metrics?: Json | null
          reason: string
          representative_id?: string | null
          reward_status?: string
          reward_type: string
          sam_amount: number
          updated_at?: string
          usd_equivalent?: number | null
          user_id: string
          wallet_address?: string | null
        }
        Update: {
          blockchain_tx_hash?: string | null
          created_at?: string
          distributed_at?: string | null
          id?: string
          performance_metrics?: Json | null
          reason?: string
          representative_id?: string | null
          reward_status?: string
          reward_type?: string
          sam_amount?: number
          updated_at?: string
          usd_equivalent?: number | null
          user_id?: string
          wallet_address?: string | null
        }
        Relationships: []
      }
      security_audit_log: {
        Row: {
          action: string
          created_at: string | null
          error_message: string | null
          id: string
          ip_address: unknown | null
          metadata: Json | null
          resource_id: string | null
          resource_type: string | null
          success: boolean | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          error_message?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          resource_id?: string | null
          resource_type?: string | null
          success?: boolean | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          error_message?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          resource_id?: string | null
          resource_type?: string | null
          success?: boolean | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      system_logs: {
        Row: {
          created_at: string | null
          details: string | null
          id: string
          operation: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          details?: string | null
          id?: string
          operation: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          details?: string | null
          id?: string
          operation?: string
          user_id?: string | null
        }
        Relationships: []
      }
      tbe_progress_payments: {
        Row: {
          builder_name: string
          building_contract_number: string | null
          claimed_percentage: number
          construction_photos: Json | null
          contract_date: string | null
          contract_price: number
          cost_to_complete: number | null
          cost_to_date: number | null
          created_at: string | null
          current_stage: string
          estimated_next_inspection_date: string | null
          fund_release_recommendation: string | null
          hia_stage_reference: string | null
          id: string
          inspection_date: string | null
          inspector_notes: string | null
          invoice_amount_claimed: number | null
          invoice_documents: Json | null
          next_stage: string | null
          next_stage_percentage: number | null
          ocr_extracted_data: Json | null
          original_valuation_id: string | null
          out_of_contract_items: Json | null
          property_address: string
          recommendation_notes: string | null
          status: string
          updated_at: string | null
          user_id: string
          variations: Json | null
          verified_percentage: number
        }
        Insert: {
          builder_name: string
          building_contract_number?: string | null
          claimed_percentage?: number
          construction_photos?: Json | null
          contract_date?: string | null
          contract_price: number
          cost_to_complete?: number | null
          cost_to_date?: number | null
          created_at?: string | null
          current_stage: string
          estimated_next_inspection_date?: string | null
          fund_release_recommendation?: string | null
          hia_stage_reference?: string | null
          id?: string
          inspection_date?: string | null
          inspector_notes?: string | null
          invoice_amount_claimed?: number | null
          invoice_documents?: Json | null
          next_stage?: string | null
          next_stage_percentage?: number | null
          ocr_extracted_data?: Json | null
          original_valuation_id?: string | null
          out_of_contract_items?: Json | null
          property_address: string
          recommendation_notes?: string | null
          status?: string
          updated_at?: string | null
          user_id: string
          variations?: Json | null
          verified_percentage?: number
        }
        Update: {
          builder_name?: string
          building_contract_number?: string | null
          claimed_percentage?: number
          construction_photos?: Json | null
          contract_date?: string | null
          contract_price?: number
          cost_to_complete?: number | null
          cost_to_date?: number | null
          created_at?: string | null
          current_stage?: string
          estimated_next_inspection_date?: string | null
          fund_release_recommendation?: string | null
          hia_stage_reference?: string | null
          id?: string
          inspection_date?: string | null
          inspector_notes?: string | null
          invoice_amount_claimed?: number | null
          invoice_documents?: Json | null
          next_stage?: string | null
          next_stage_percentage?: number | null
          ocr_extracted_data?: Json | null
          original_valuation_id?: string | null
          out_of_contract_items?: Json | null
          property_address?: string
          recommendation_notes?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string
          variations?: Json | null
          verified_percentage?: number
        }
        Relationships: []
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
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          joined_at: string
          total_bids: number
          total_wins: number
          updated_at: string
          user_id: string
          verified: boolean
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          joined_at?: string
          total_bids?: number
          total_wins?: number
          updated_at?: string
          user_id: string
          verified?: boolean
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          joined_at?: string
          total_bids?: number
          total_wins?: number
          updated_at?: string
          user_id?: string
          verified?: boolean
        }
        Relationships: []
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
      calculate_adjusted_rental: {
        Args: {
          base_rental: number
          current_cpi_rate?: number
          months_since_last_review?: number
          review_mechanism: string
          review_percentage: number
        }
        Returns: number
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
      cleanup_rp_data_references: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_default_report_config: {
        Args: { p_job_id: string; p_user_id: string }
        Returns: string
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
      is_session_valid: {
        Args: Record<PropertyKey, never>
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
