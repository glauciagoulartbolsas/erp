import { supabase } from '../../lib/supabase';
import { ProductPhoto } from '../../types/product';

export async function uploadPhoto(file: File, variationId: string): Promise<ProductPhoto> {
  const fileName = `${variationId}/${Date.now()}-${file.name}`;
  
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
  const { data: photo, error: getError } = await supabase
    .from('product_photos')
    .select('url')
    .eq('id', id)
    .single();

  if (getError) throw new Error('Failed to get photo info');

  // Delete from storage
  const urlParts = photo.url.split('/');
  const filePath = urlParts.slice(-2).join('/');
  
  await supabase.storage.from('product-photos').remove([filePath]);

  // Delete database record
  const { error: deleteError } = await supabase
    .from('product_photos')
    .delete()
    .eq('id', id);

  if (deleteError) throw new Error('Failed to delete photo record');
}

export async function setMainPhoto(photoId: string, variationId: string) {
  // Reset all photos for this variation
  await supabase
    .from('product_photos')
    .update({ is_main: false })
    .eq('variation_id', variationId);

  // Set new main photo
  const { data: photo, error: photoError } = await supabase
    .from('product_photos')
    .update({ is_main: true })
    .eq('id', photoId)
    .select()
    .single();

  if (photoError) throw new Error('Failed to set main photo');

  // Update variation thumbnail
  await supabase
    .from('product_variations')
    .update({ thumbnail: photo.url })
    .eq('id', variationId);

  return photo;
}