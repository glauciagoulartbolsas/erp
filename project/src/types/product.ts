export interface Product {
  id: string;
  code: string;
  name: string;
  sku: string | null;
  category_id: string | null;
  brand_id: string | null;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
  user_id: string;
  variations?: ProductVariation[];
}

export interface ProductVariation {
  id: string;
  product_id: string;
  name: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  thumbnail?: string;
  created_at: string;
  updated_at: string;
  photos?: ProductPhoto[];
}

export interface ProductPhoto {
  id: string;
  variation_id: string;
  url: string;
  order: number;
  is_main: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateProductData {
  name: string;
  sku?: string;
  category_id?: string;
  brand_id?: string;
  price: number;
  stock?: number;
  status?: 'active' | 'inactive';
}

export interface CreateVariationData {
  name: string;
  price: number;
  stock?: number;
  status?: 'active' | 'inactive';
  photos?: File[];
}

export interface UpdateProductData extends Partial<CreateProductData> {}
export interface UpdateVariationData extends Partial<CreateVariationData> {}