import { supabase } from '../lib/supabase';
import { 
  Product, 
  CreateProductData, 
  UpdateProductData,
  ProductPhoto,
  CreateVariationData
} from '../types/product';

// Product CRUD
export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_variations!inner (
        id,
        name,
        price,
        stock,
        status,
        thumbnail,
        created_at,
        updated_at
      ),
      product_photos!inner (
        id,
        url,
        order,
        is_main,
        created_at,
        updated_at
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch products', { error });
    throw new Error('Failed to fetch products');
  }
  
  return data as Product[];
}

export async function getProduct(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_variations!inner (
        id,
        name,
        price,
        stock,
        status,
        thumbnail,
        created_at,
        updated_at
      ),
      product_photos!inner (
        id,
        url,
        order,
        is_main,
        created_at,
        updated_at
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Failed to fetch product', { error });
    throw new Error('Failed to fetch product');
  }

  return data as Product;
}

export async function createProduct(data: CreateProductData & { variations?: CreateVariationData[]; photos?: File[] }) {
  const { variations, photos, ...productData } = data;
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User must be authenticated to create products');
  }

  // Create product
  const { data: product, error: productError } = await supabase
    .from('products')
    .insert([{
      ...productData,
      user_id: user.id
    }])
    .select()
    .single();

  if (productError) {
    console.error('Failed to create product', { productError });
    throw new Error('Failed to create product');
  }

  // Upload photos if any
  if (photos?.length) {
    try {
      const mainPhoto = await uploadPhoto(photos[0], product.id);
      
      // Set the first photo as thumbnail
      await supabase
        .from('products')
        .update({ thumbnail: mainPhoto.url })
        .eq('id', product.id);

      // Upload remaining photos
      for (let i = 1; i < photos.length; i++) {
        await uploadPhoto(photos[i], product.id);
      }
    } catch (error) {
      console.error('Failed to upload photos', { error });
    }
  }

  // Create variations if any
  if (variations?.length) {
    const { error: variationsError } = await supabase
      .from('product_variations')
      .insert(
        variations.map(variation => ({
          ...variation,
          product_id: product.id
        }))
      );

    if (variationsError) {
      console.error('Failed to create variations', { variationsError });
    }
  }

  return getProduct(product.id);
}

export async function updateProduct(id: string, data: UpdateProductData & { variations?: CreateVariationData[]; photos?: File[] }) {
  const { variations, photos, ...productData } = data;

  // Update product
  const { error: productError } = await supabase
    .from('products')
    .update(productData)
    .eq('id', id);

  if (productError) {
    console.error('Failed to update product', { productError });
    throw new Error('Failed to update product');
  }

  // Upload new photos if any
  if (photos?.length) {
    try {
      const mainPhoto = await uploadPhoto(photos[0], id);
      
      // Set the first new photo as thumbnail if no thumbnail exists
      const { data: product } = await supabase
        .from('products')
        .select('thumbnail')
        .eq('id', id)
        .single();

      if (!product?.thumbnail) {
        await supabase
          .from('products')
          .update({ thumbnail: mainPhoto.url })
          .eq('id', id);
      }

      // Upload remaining photos
      for (let i = 1; i < photos.length; i++) {
        await uploadPhoto(photos[i], id);
      }
    } catch (error) {
      console.error('Failed to upload photos', { error });
    }
  }

  // Update variations if provided
  if (variations) {
    // Delete existing variations
    const { error: deleteError } = await supabase
      .from('product_variations')
      .delete()
      .eq('product_id', id);

    if (deleteError) {
      console.error('Failed to delete existing variations', { deleteError });
    }

    // Create new variations
    if (variations.length > 0) {
      const { error: variationsError } = await supabase
        .from('product_variations')
        .insert(
          variations.map(variation => ({
            ...variation,
            product_id: id
          }))
        );

      if (variationsError) {
        console.error('Failed to create new variations', { variationsError });
      }
    }
  }

  return getProduct(id);
}

export async function deleteProduct(id: string) {
  const { error: deleteError } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (deleteError) {
    console.error('Failed to delete product', { deleteError });
    throw new Error('Failed to delete product');
  }
}

// Photos
export async function uploadPhoto(file: File, productId: string, variationId?: string): Promise<ProductPhoto> {
  const fileName = `${productId}/${Date.now()}-${file.name}`;
  
  const { error: uploadError } = await supabase
    .storage
    .from('product-photos')
    .upload(fileName, file);

  if (uploadError) {
    console.error('Failed to upload photo', { uploadError });
    throw new Error('Failed to upload photo');
  }

  const { data: { publicUrl } } = supabase
    .storage
    .from('product-photos')
    .getPublicUrl(fileName);

  const { data: photo, error: photoError } = await supabase
    .from('product_photos')
    .insert([{
      product_id: productId,
      variation_id: variationId,
      url: publicUrl,
      is_main: false
    }])
    .select()
    .single();

  if (photoError) {
    console.error('Failed to create photo record', { photoError });
    throw new Error('Failed to create photo record');
  }

  return photo as ProductPhoto;
}

export async function deletePhoto(id: string) {
  // Get photo info first to delete from storage
  const { data: photo, error: getError } = await supabase
    .from('product_photos')
    .select('url')
    .eq('id', id)
    .single();

  if (getError) {
    console.error('Failed to get photo info', { getError });
    throw new Error('Failed to get photo info');
  }

  // Extract file path from URL
  const urlParts = photo.url.split('/');
  const filePath = urlParts[urlParts.length - 2] + '/' + urlParts[urlParts.length - 1];

  // Delete from storage
  const { error: storageError } = await supabase
    .storage
    .from('product-photos')
    .remove([filePath]);

  if (storageError) {
    console.error('Failed to delete photo from storage', { storageError });
  }

  // Delete database record
  const { error: deleteError } = await supabase
    .from('product_photos')
    .delete()
    .eq('id', id);

  if (deleteError) {
    console.error('Failed to delete photo record', { deleteError });
    throw new Error('Failed to delete photo record');
  }
}

export async function setMainPhoto(photoId: string, productId: string) {
  // Update all photos to not be main
  await supabase
    .from('product_photos')
    .update({ is_main: false })
    .eq('product_id', productId);

  // Set the selected photo as main
  const { data: photo, error: photoError } = await supabase
    .from('product_photos')
    .update({ is_main: true })
    .eq('id', photoId)
    .select()
    .single();

  if (photoError) {
    console.error('Failed to set main photo', { photoError });
    throw new Error('Failed to set main photo');
  }

  // Update product thumbnail
  const { error: productError } = await supabase
    .from('products')
    .update({ thumbnail: photo.url })
    .eq('id', productId);

  if (productError) {
    console.error('Failed to update product thumbnail', { productError });
    throw new Error('Failed to update product thumbnail');
  }

  return photo;
}