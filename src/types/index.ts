// ===========================================
// NanoBanana Pro - Type Definitions
// ===========================================

// Job Status Types
export type JobStatus = 'pending' | 'running' | 'completed' | 'failed';

// Job Input - what the user provides
export interface JobInput {
  personImage: string;      // Base64 encoded image
  objectImage: string;      // Base64 encoded image
  prompt?: string;          // Optional custom instructions
}

// Job Output - what n8n returns
export interface JobOutput {
  imageUrl?: string;        // URL to stored image
  imageBase64?: string;     // Base64 of generated image
  mimeType: string;         // image/png
  generatedAt: string;      // ISO timestamp
  metadata?: {
    processingTime?: number;
    model?: string;
  };
}

// Job Error - when something goes wrong
export interface JobError {
  code: string;             // Error code (e.g., 'GEMINI_ERROR')
  message: string;          // Human readable message
  details?: unknown;        // Additional details
  retryable: boolean;       // Can retry?
}

// Complete Job type
export interface Job {
  id: string;
  user_id: string;
  status: JobStatus;
  input: JobInput;
  output?: JobOutput | null;
  error?: JobError | null;
  created_at: string;
  updated_at: string;
  completed_at?: string | null;
  n8n_execution_id?: string | null;
  attempts: number;
}

// API Request/Response types
export interface CreateJobRequest {
  personImage: string;
  objectImage: string;
  prompt?: string;
}

export interface CreateJobResponse {
  id: string;
  status: JobStatus;
  createdAt: string;
}

export interface JobDetailResponse extends Job {}

// n8n Callback types
export interface N8nCallbackRequest {
  job_id: string;
  status: 'completed' | 'failed';
  output?: {
    imageBase64: string;
    mimeType: string;
  };
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  timestamp: string;
  signature?: string;
}

// User Profile type
export interface Profile {
  id: string;
  user_id: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// Database types for Supabase
export interface Database {
  public: {
    Tables: {
      jobs: {
        Row: Job;
        Insert: Omit<Job, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Job, 'id'>>;
      };
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id'>>;
      };
    };
  };
}
