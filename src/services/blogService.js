import { supabase } from '../lib/supabase';

const BUCKET_NAME = import.meta.env.VITE_SUPABASE_BUCKET;

// Fetch all blog posts
export async function getAllPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, published, content, created_at, slug, cover_image, author, author, tags')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

// Fetch a single blog post by its slug
export async function getPostBySlug(slug) {
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, published, content, created_at, slug, cover_image, author, author, tags')
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
}

// Upload an image to the storage bucket
export async function uploadImage(file, folder) {
  const fileName = `${folder}/${Date.now()}-${file.name}`;
  
  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });
    
  if (uploadError) {
    throw uploadError;
  }
  
  const { data, error: signedUrlError } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(fileName, 315360000); // 10 years
    
  if (signedUrlError) {
    throw signedUrlError;
  }
    
  return data.signedUrl;
}
