import { supabase } from '../lib/supabase';

// Get all blog posts
export async function getAllPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

// Get a single blog post by slug
export async function getPostBySlug(slug) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) throw error;
  return data;
}

// Create a new blog post
export async function createPost(postData) {
  const { data, error } = await supabase
    .from('posts')
    .insert([postData])
    .select();
  
  if (error) throw error;
  return data[0];
}

// Update an existing blog post
export async function updatePost(id, postData) {
  const { data, error } = await supabase
    .from('posts')
    .update(postData)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
}

// Delete a blog post
export async function deletePost(id) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

// Upload an image to Supabase storage
export async function uploadImage(file, path) {
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = `${path}/${fileName}`;
  
  const { data, error } = await supabase
    .storage
    .from('blog-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });
  
  if (error) throw error;
  
  // Get public URL for the uploaded image
  const { data: publicUrlData } = supabase
    .storage
    .from('blog-images')
    .getPublicUrl(filePath);
  
  return publicUrlData.publicUrl;
}
