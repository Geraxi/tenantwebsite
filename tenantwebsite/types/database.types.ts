// Database schema types - Generated from Supabase schema
// These types represent the database structure

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          agency_id: string | null
          role: 'admin' | 'agent' | 'owner' | 'tenant'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          agency_id?: string | null
          role?: 'admin' | 'agent' | 'owner' | 'tenant'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          agency_id?: string | null
          role?: 'admin' | 'agent' | 'owner' | 'tenant'
          created_at?: string
          updated_at?: string
        }
      }
      agencies: {
        Row: {
          id: string
          name: string
          logo_url: string | null
          address: string | null
          phone: string | null
          email: string | null
          website: string | null
          subscription_tier: 'free' | 'pro' | 'enterprise'
          subscription_status: 'active' | 'cancelled' | 'past_due'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          logo_url?: string | null
          address?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          subscription_tier?: 'free' | 'pro' | 'enterprise'
          subscription_status?: 'active' | 'cancelled' | 'past_due'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo_url?: string | null
          address?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          subscription_tier?: 'free' | 'pro' | 'enterprise'
          subscription_status?: 'active' | 'cancelled' | 'past_due'
          created_at?: string
          updated_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          agency_id: string
          owner_id: string | null
          title: string
          description: string | null
          property_type: 'apartment' | 'house' | 'commercial' | 'land'
          listing_type: 'rent' | 'sale'
          address: string
          city: string
          state: string
          zip_code: string
          country: string
          bedrooms: number | null
          bathrooms: number | null
          square_feet: number | null
          price: number
          status: 'available' | 'rented' | 'sold' | 'maintenance' | 'off_market'
          images: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          agency_id: string
          owner_id?: string | null
          title: string
          description?: string | null
          property_type: 'apartment' | 'house' | 'commercial' | 'land'
          listing_type: 'rent' | 'sale'
          address: string
          city: string
          state: string
          zip_code: string
          country: string
          bedrooms?: number | null
          bathrooms?: number | null
          square_feet?: number | null
          price: number
          status?: 'available' | 'rented' | 'sold' | 'maintenance' | 'off_market'
          images?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          agency_id?: string
          owner_id?: string | null
          title?: string
          description?: string | null
          property_type?: 'apartment' | 'house' | 'commercial' | 'land'
          listing_type?: 'rent' | 'sale'
          address?: string
          city?: string
          state?: string
          zip_code?: string
          country?: string
          bedrooms?: number | null
          bathrooms?: number | null
          square_feet?: number | null
          price?: number
          status?: 'available' | 'rented' | 'sold' | 'maintenance' | 'off_market'
          images?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      owners: {
        Row: {
          id: string
          agency_id: string
          full_name: string
          email: string
          phone: string | null
          address: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          agency_id: string
          full_name: string
          email: string
          phone?: string | null
          address?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          agency_id?: string
          full_name?: string
          email?: string
          phone?: string | null
          address?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tenants: {
        Row: {
          id: string
          agency_id: string
          property_id: string | null
          full_name: string
          email: string
          phone: string | null
          address: string | null
          rental_status: 'active' | 'pending' | 'past' | 'prospective'
          lease_start: string | null
          lease_end: string | null
          monthly_rent: number | null
          deposit: number | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          agency_id: string
          property_id?: string | null
          full_name: string
          email: string
          phone?: string | null
          address?: string | null
          rental_status?: 'active' | 'pending' | 'past' | 'prospective'
          lease_start?: string | null
          lease_end?: string | null
          monthly_rent?: number | null
          deposit?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          agency_id?: string
          property_id?: string | null
          full_name?: string
          email?: string
          phone?: string | null
          address?: string | null
          rental_status?: 'active' | 'pending' | 'past' | 'prospective'
          lease_start?: string | null
          lease_end?: string | null
          monthly_rent?: number | null
          deposit?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          agency_id: string
          property_id: string
          tenant_id: string
          amount: number
          payment_type: 'rent' | 'deposit' | 'fee' | 'other'
          status: 'pending' | 'completed' | 'failed' | 'refunded'
          due_date: string
          paid_date: string | null
          invoice_number: string | null
          receipt_number: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          agency_id: string
          property_id: string
          tenant_id: string
          amount: number
          payment_type: 'rent' | 'deposit' | 'fee' | 'other'
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          due_date: string
          paid_date?: string | null
          invoice_number?: string | null
          receipt_number?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          agency_id?: string
          property_id?: string
          tenant_id?: string
          amount?: number
          payment_type?: 'rent' | 'deposit' | 'fee' | 'other'
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          due_date?: string
          paid_date?: string | null
          invoice_number?: string | null
          receipt_number?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          agency_id: string
          property_id: string | null
          tenant_id: string | null
          title: string
          description: string | null
          task_type: 'maintenance' | 'reminder' | 'inspection' | 'other'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          status: 'todo' | 'in_progress' | 'completed' | 'cancelled'
          due_date: string | null
          assigned_to: string | null
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          agency_id: string
          property_id?: string | null
          tenant_id?: string | null
          title: string
          description?: string | null
          task_type?: 'maintenance' | 'reminder' | 'inspection' | 'other'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          status?: 'todo' | 'in_progress' | 'completed' | 'cancelled'
          due_date?: string | null
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          agency_id?: string
          property_id?: string | null
          tenant_id?: string | null
          title?: string
          description?: string | null
          task_type?: 'maintenance' | 'reminder' | 'inspection' | 'other'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          status?: 'todo' | 'in_progress' | 'completed' | 'cancelled'
          due_date?: string | null
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      files: {
        Row: {
          id: string
          agency_id: string
          property_id: string | null
          tenant_id: string | null
          owner_id: string | null
          file_name: string
          file_path: string
          file_type: string
          file_size: number
          uploaded_by: string
          created_at: string
        }
        Insert: {
          id?: string
          agency_id: string
          property_id?: string | null
          tenant_id?: string | null
          owner_id?: string | null
          file_name: string
          file_path: string
          file_type: string
          file_size: number
          uploaded_by: string
          created_at?: string
        }
        Update: {
          id?: string
          agency_id?: string
          property_id?: string | null
          tenant_id?: string | null
          owner_id?: string | null
          file_name?: string
          file_path?: string
          file_type?: string
          file_size?: number
          uploaded_by?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

