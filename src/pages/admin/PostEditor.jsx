import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import MDEditor from '@uiw/react-md-editor';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getPostBySlug, createPost, updatePost, uploadImage } from '../../services/blogService';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

export default function PostEditor() {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  
  // Fetch post data if in edit mode
  const { data: post, isLoading: isLoadingPost } = useQuery(
    ['post', id],
    () => getPostBySlug(id),
    {
      enabled: isEditMode,
      onSuccess: (data) => {
        if (data) {
          // Populate form with existing post data
          reset({
            title: data.title,
            subtitle: data.subtitle,
            slug: data.slug,
            published: data.published,
            tags: data.tags ? data.tags.join(', ') : '',
          });
          setContent(data.content);
          if (data.cover_image) {
            setCoverImagePreview(data.cover_image);
          }
        }
      },
    }
  );
  
  // Create post mutation
  const createPostMutation = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      navigate('/admin/dashboard');
    },
  });
  
  // Update post mutation
  const updatePostMutation = useMutation(
    (data) => updatePost(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
        queryClient.invalidateQueries(['post', id]);
        navigate('/admin/dashboard');
      },
    }
  );
  
  // Handle form submission
  const onSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      setError('');
      
      let coverImageUrl = coverImagePreview;
      
      // Upload cover image if a new one is selected
      if (coverImage) {
        coverImageUrl = await uploadImage(coverImage, 'covers');
      }
      
      // Prepare post data
      const postData = {
        title: formData.title,
        subtitle: formData.subtitle,
        slug: formData.slug,
        content: content,
        published: formData.published === 'true',
        cover_image: coverImageUrl,
        author: user?.email || 'Admin',
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
      };
      
      // Create or update post
      if (isEditMode) {
        await updatePostMutation.mutateAsync(postData);
      } else {
        await createPostMutation.mutateAsync(postData);
      }
    } catch (error) {
      console.error('Error saving post:', error);
      setError('Failed to save post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle cover image change
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  };
  
  // Auto-generate slug when title changes
  const handleTitleChange = (e) => {
    const title = e.target.value;
    setValue('title', title);
    if (!isEditMode) {
      setValue('slug', generateSlug(title));
    }
  };
  
  if (isEditMode && isLoadingPost) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading post data...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? 'Edit Post' : 'Create New Post'}
          </h1>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Post Details</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Basic information about your blog post.
                </p>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      {...register('title', { required: true })}
                      onChange={handleTitleChange}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600">Title is required</p>
                    )}
                  </div>
                  
                  <div className="col-span-6">
                    <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      id="subtitle"
                      {...register('subtitle')}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div className="col-span-6">
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                      Slug
                    </label>
                    <input
                      type="text"
                      id="slug"
                      {...register('slug', { required: true })}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    {errors.slug && (
                      <p className="mt-1 text-sm text-red-600">Slug is required</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      This will be used in the URL: /blog/your-slug
                    </p>
                  </div>
                  
                  <div className="col-span-6">
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                      Tags
                    </label>
                    <input
                      type="text"
                      id="tags"
                      {...register('tags')}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Comma-separated list of tags (e.g., React, JavaScript, Web Development)
                    </p>
                  </div>
                  
                  <div className="col-span-6">
                    <label className="block text-sm font-medium text-gray-700">
                      Cover Image
                    </label>
                    <div className="mt-1 flex items-center">
                      {coverImagePreview && (
                        <div className="mb-4">
                          <img
                            src={coverImagePreview}
                            alt="Cover preview"
                            className="h-32 object-cover rounded-md"
                          />
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageChange}
                        className="mt-1 block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-indigo-50 file:text-indigo-700
                          hover:file:bg-indigo-100"
                      />
                    </div>
                  </div>
                  
                  <div className="col-span-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content
                    </label>
                    <MDEditor
                      value={content}
                      onChange={setContent}
                      height={400}
                    />
                  </div>
                  
                  <div className="col-span-6">
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <div className="mt-2 space-y-4">
                      <div className="flex items-center">
                        <input
                          id="published-true"
                          type="radio"
                          value="true"
                          {...register('published')}
                          defaultChecked
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label htmlFor="published-true" className="ml-3 block text-sm font-medium text-gray-700">
                          Published
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="published-false"
                          type="radio"
                          value="false"
                          {...register('published')}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label htmlFor="published-false" className="ml-3 block text-sm font-medium text-gray-700">
                          Draft
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSubmitting ? 'Saving...' : isEditMode ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
