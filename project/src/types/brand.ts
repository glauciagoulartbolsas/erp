export interface Brand {
  id: string;
  name: string;
  description: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateBrandData {
  name: string;
  description?: string;
}

export interface UpdateBrandData extends Partial<CreateBrandData> {}