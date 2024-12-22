import { supabase } from '../../lib/supabase';
import { CreateVariationData } from '../../types/product';
import { uploadPhoto } from './photos';

export async function createVariations(productId: string, variations: CreateVariationData[]) {
  if (!variations.length) return;

  for (const variation of variations) {
    const { photos, ...variationData } = variation;

    // Create variation
    const { data: newVariation, error } = await supabase
      .from('product_variations')
      .insert([{
        ...variationData,
        product_id: productId
      }])
      .select()
      .single();

    if (error) throw new Error('Failed to create variation');

    // Handle photos if any
    if (photos?.length) {
      try {
        const mainPhoto = await uploadPhoto(photos[0], newVariation.id);
        
        // Set first photo as thumbnail
        await supabase
          .from('product_variations')
          .update({ thumbnail: mainPhoto.url })
          .eq('id', newVariation.id);

        // Upload remaining photos
        await Promise.all(
          photos.slice(1).map(photo => uploadPhoto(photo, newVariation.id))
        );
      } catch (error) {
        console.error('Failed to upload variation photos', error);
      }
    }
  }
}

export async function updateVariations(productId: string, variations: CreateVariationData[]) {
  // Delete existing variations (cascade will handle photos)
  await supabase
    .from('product_variations')
    .delete()
    .eq('product_id', productId);

  // Create new variations
  if (variations.length) {
    await createVariations(productId, variations);
  }
}