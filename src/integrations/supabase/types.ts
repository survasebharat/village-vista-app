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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          announcement_date: string
          content: string
          created_at: string | null
          id: string
          priority: string | null
          title: string
          type: string | null
          updated_at: string | null
          village_id: string | null
        }
        Insert: {
          announcement_date: string
          content: string
          created_at?: string | null
          id?: string
          priority?: string | null
          title: string
          type?: string | null
          updated_at?: string | null
          village_id?: string | null
        }
        Update: {
          announcement_date?: string
          content?: string
          created_at?: string | null
          id?: string
          priority?: string | null
          title?: string
          type?: string | null
          updated_at?: string | null
          village_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "announcements_village_id_fkey"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "villages"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_form_submissions: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          message: string
          mobile: string
          name: string
          status: string | null
          subject: string | null
          updated_at: string | null
          village_id: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          message: string
          mobile: string
          name: string
          status?: string | null
          subject?: string | null
          updated_at?: string | null
          village_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          message?: string
          mobile?: string
          name?: string
          status?: string | null
          subject?: string | null
          updated_at?: string | null
          village_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_form_submissions_village_id_fkey"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "villages"
            referencedColumns: ["id"]
          },
        ]
      }
      development_works: {
        Row: {
          budget: string | null
          completion_date: string | null
          created_at: string | null
          description: string | null
          expected_completion: string | null
          id: string
          progress: number | null
          start_date: string | null
          status: string
          title: string
          updated_at: string | null
          village_id: string | null
        }
        Insert: {
          budget?: string | null
          completion_date?: string | null
          created_at?: string | null
          description?: string | null
          expected_completion?: string | null
          id?: string
          progress?: number | null
          start_date?: string | null
          status: string
          title: string
          updated_at?: string | null
          village_id?: string | null
        }
        Update: {
          budget?: string | null
          completion_date?: string | null
          created_at?: string | null
          description?: string | null
          expected_completion?: string | null
          id?: string
          progress?: number | null
          start_date?: string | null
          status?: string
          title?: string
          updated_at?: string | null
          village_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "development_works_village_id_fkey"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "villages"
            referencedColumns: ["id"]
          },
        ]
      }
      emergency_contacts: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          name: string
          number: string
          updated_at: string | null
          village_id: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          number: string
          updated_at?: string | null
          village_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          number?: string
          updated_at?: string | null
          village_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "emergency_contacts_village_id_fkey"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "villages"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback_submissions: {
        Row: {
          created_at: string
          id: string
          message: string
          mobile: string
          name: string
          status: string | null
          type: string
          updated_at: string
          village_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          mobile: string
          name: string
          status?: string | null
          type: string
          updated_at?: string
          village_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          mobile?: string
          name?: string
          status?: string | null
          type?: string
          updated_at?: string
          village_id?: string | null
        }
        Relationships: []
      }
      market_prices: {
        Row: {
          created_at: string
          crop_name: string
          id: string
          last_updated: string
          price: number
          unit: string
          updated_at: string
          village_id: string | null
        }
        Insert: {
          created_at?: string
          crop_name: string
          id?: string
          last_updated?: string
          price: number
          unit?: string
          updated_at?: string
          village_id?: string | null
        }
        Update: {
          created_at?: string
          crop_name?: string
          id?: string
          last_updated?: string
          price?: number
          unit?: string
          updated_at?: string
          village_id?: string | null
        }
        Relationships: []
      }
      notices: {
        Row: {
          attachment_url: string | null
          category: string
          created_at: string
          description: string
          id: string
          is_active: boolean | null
          notice_date: string
          title: string
          updated_at: string
          village_id: string | null
        }
        Insert: {
          attachment_url?: string | null
          category: string
          created_at?: string
          description: string
          id?: string
          is_active?: boolean | null
          notice_date?: string
          title: string
          updated_at?: string
          village_id?: string | null
        }
        Update: {
          attachment_url?: string | null
          category?: string
          created_at?: string
          description?: string
          id?: string
          is_active?: boolean | null
          notice_date?: string
          title?: string
          updated_at?: string
          village_id?: string | null
        }
        Relationships: []
      }
      page_visibility: {
        Row: {
          id: string
          is_visible: boolean | null
          page_key: string
          page_label: string
          updated_at: string | null
          updated_by: string | null
          village_name: string
        }
        Insert: {
          id?: string
          is_visible?: boolean | null
          page_key: string
          page_label: string
          updated_at?: string | null
          updated_by?: string | null
          village_name: string
        }
        Update: {
          id?: string
          is_visible?: boolean | null
          page_key?: string
          page_label?: string
          updated_at?: string | null
          updated_by?: string | null
          village_name?: string
        }
        Relationships: []
      }
      panchayat_members: {
        Row: {
          contact: string | null
          created_at: string | null
          department: string | null
          education: string | null
          email: string | null
          id: string
          image_url: string | null
          message: string | null
          name: string
          office_hours: string | null
          role: string
          tenure: string | null
          updated_at: string | null
          village_id: string | null
          ward: string | null
        }
        Insert: {
          contact?: string | null
          created_at?: string | null
          department?: string | null
          education?: string | null
          email?: string | null
          id?: string
          image_url?: string | null
          message?: string | null
          name: string
          office_hours?: string | null
          role: string
          tenure?: string | null
          updated_at?: string | null
          village_id?: string | null
          ward?: string | null
        }
        Update: {
          contact?: string | null
          created_at?: string | null
          department?: string | null
          education?: string | null
          email?: string | null
          id?: string
          image_url?: string | null
          message?: string | null
          name?: string
          office_hours?: string | null
          role?: string
          tenure?: string | null
          updated_at?: string | null
          village_id?: string | null
          ward?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "panchayat_members_village_id_fkey"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "villages"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          content: string
          created_at: string
          id: string
          image_url: string | null
          title: string
          updated_at: string
          user_id: string
          village_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          title: string
          updated_at?: string
          user_id: string
          village_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          village_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_village_id_fkey"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "villages"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      quick_service_submissions: {
        Row: {
          additional_data: Json | null
          address: string | null
          applicant_name: string
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          father_mother_name: string | null
          id: string
          mobile_number: string
          service_type: string
          status: string | null
          updated_at: string | null
          village_id: string | null
        }
        Insert: {
          additional_data?: Json | null
          address?: string | null
          applicant_name: string
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          father_mother_name?: string | null
          id?: string
          mobile_number: string
          service_type: string
          status?: string | null
          updated_at?: string | null
          village_id?: string | null
        }
        Update: {
          additional_data?: Json | null
          address?: string | null
          applicant_name?: string
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          father_mother_name?: string | null
          id?: string
          mobile_number?: string
          service_type?: string
          status?: string | null
          updated_at?: string | null
          village_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quick_service_submissions_village_id_fkey"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "villages"
            referencedColumns: ["id"]
          },
        ]
      }
      schemes: {
        Row: {
          application_process: string | null
          benefits: string | null
          created_at: string | null
          description: string | null
          documents: Json | null
          eligibility: string | null
          id: string
          name: string
          updated_at: string | null
          village_id: string | null
        }
        Insert: {
          application_process?: string | null
          benefits?: string | null
          created_at?: string | null
          description?: string | null
          documents?: Json | null
          eligibility?: string | null
          id?: string
          name: string
          updated_at?: string | null
          village_id?: string | null
        }
        Update: {
          application_process?: string | null
          benefits?: string | null
          created_at?: string | null
          description?: string | null
          documents?: Json | null
          eligibility?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          village_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "schemes_village_id_fkey"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "villages"
            referencedColumns: ["id"]
          },
        ]
      }
      service_ratings: {
        Row: {
          created_at: string
          id: string
          rating: number
          service_id: string
          session_id: string
          updated_at: string
          village_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          rating: number
          service_id: string
          session_id: string
          updated_at?: string
          village_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          rating?: number
          service_id?: string
          session_id?: string
          updated_at?: string
          village_id?: string | null
        }
        Relationships: []
      }
      tax_payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          order_id: string
          payer_email: string | null
          payer_mobile: string
          payer_name: string
          payment_date: string | null
          payment_id: string | null
          payment_status: string
          tax_type: string
          updated_at: string
          village_account: string | null
          village_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          order_id: string
          payer_email?: string | null
          payer_mobile: string
          payer_name: string
          payment_date?: string | null
          payment_id?: string | null
          payment_status?: string
          tax_type: string
          updated_at?: string
          village_account?: string | null
          village_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          order_id?: string
          payer_email?: string | null
          payer_mobile?: string
          payer_name?: string
          payment_date?: string | null
          payment_id?: string | null
          payment_status?: string
          tax_type?: string
          updated_at?: string
          village_account?: string | null
          village_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tax_payments_village_id_fkey"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "villages"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      village_config: {
        Row: {
          config_data: Json
          created_at: string
          id: string
          language: string
          updated_at: string
          updated_by: string | null
          village_id: string
        }
        Insert: {
          config_data: Json
          created_at?: string
          id?: string
          language?: string
          updated_at?: string
          updated_by?: string | null
          village_id: string
        }
        Update: {
          config_data?: Json
          created_at?: string
          id?: string
          language?: string
          updated_at?: string
          updated_by?: string | null
          village_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "village_config_village_id_fkey"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "villages"
            referencedColumns: ["id"]
          },
        ]
      }
      village_gallery: {
        Row: {
          created_at: string | null
          date: string | null
          id: string
          image_url: string | null
          title: string
          type: string | null
          updated_at: string | null
          village_id: string | null
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          id?: string
          image_url?: string | null
          title: string
          type?: string | null
          updated_at?: string | null
          village_id?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string | null
          id?: string
          image_url?: string | null
          title?: string
          type?: string | null
          updated_at?: string | null
          village_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "village_gallery_village_id_fkey"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "villages"
            referencedColumns: ["id"]
          },
        ]
      }
      village_population: {
        Row: {
          created_at: string | null
          female: number | null
          id: string
          literacy_rate: string | null
          male: number | null
          total: number | null
          updated_at: string | null
          village_id: string | null
        }
        Insert: {
          created_at?: string | null
          female?: number | null
          id?: string
          literacy_rate?: string | null
          male?: number | null
          total?: number | null
          updated_at?: string | null
          village_id?: string | null
        }
        Update: {
          created_at?: string | null
          female?: number | null
          id?: string
          literacy_rate?: string | null
          male?: number | null
          total?: number | null
          updated_at?: string | null
          village_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "village_population_village_id_fkey"
            columns: ["village_id"]
            isOneToOne: true
            referencedRelation: "villages"
            referencedColumns: ["id"]
          },
        ]
      }
      village_services: {
        Row: {
          address: string | null
          category: string
          contact: string | null
          created_at: string | null
          hours: string | null
          id: string
          image_url: string | null
          name: string
          owner: string | null
          speciality: string | null
          updated_at: string | null
          village_id: string | null
        }
        Insert: {
          address?: string | null
          category: string
          contact?: string | null
          created_at?: string | null
          hours?: string | null
          id?: string
          image_url?: string | null
          name: string
          owner?: string | null
          speciality?: string | null
          updated_at?: string | null
          village_id?: string | null
        }
        Update: {
          address?: string | null
          category?: string
          contact?: string | null
          created_at?: string | null
          hours?: string | null
          id?: string
          image_url?: string | null
          name?: string
          owner?: string | null
          speciality?: string | null
          updated_at?: string | null
          village_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "village_services_village_id_fkey"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "villages"
            referencedColumns: ["id"]
          },
        ]
      }
      villages: {
        Row: {
          altitude: string | null
          area: string | null
          created_at: string | null
          description: string | null
          district: string
          established: string | null
          id: string
          is_active: boolean | null
          latitude: string | null
          longitude: string | null
          name: string
          pincode: string
          state: string
          updated_at: string | null
          vision: string | null
        }
        Insert: {
          altitude?: string | null
          area?: string | null
          created_at?: string | null
          description?: string | null
          district: string
          established?: string | null
          id?: string
          is_active?: boolean | null
          latitude?: string | null
          longitude?: string | null
          name: string
          pincode: string
          state: string
          updated_at?: string | null
          vision?: string | null
        }
        Update: {
          altitude?: string | null
          area?: string | null
          created_at?: string | null
          description?: string | null
          district?: string
          established?: string | null
          id?: string
          is_active?: boolean | null
          latitude?: string | null
          longitude?: string | null
          name?: string
          pincode?: string
          state?: string
          updated_at?: string | null
          vision?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user" | "gramsevak"
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
      app_role: ["admin", "user", "gramsevak"],
    },
  },
} as const
