import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import MDEditor from '@uiw/react-md-editor';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import imageCompression from 'browser-image-compression';
import { getPostBySlug, createPost, updatePost, uploadImage } from '../../services/blogService';
import { useAuth } from '../../context/AuthContext';


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
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Fetch post data if in edit mode
  const { isLoading: isLoadingPost } = useQuery(
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
  const handleCoverImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const options = {
      maxSizeMB: 2, // Max file size in MB
      maxWidthOrHeight: 1920, // Max width or height
      useWebWorker: true, // Use web worker for faster compression
    };

    try {
      const compressedFile = await imageCompression(file, options);
      setCoverImage(compressedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error('Error compressing image:', error);
      // If compression fails, you might want to fall back to the original file
      // or show an error message to the user.
      setError('Image compression failed. Please try a different image.');
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

  const mobileCommands = [
    'title', 'bold', 'italic', 'strikethrough', '|',
    'link', 'quote', 'code', 'image', '|',
    'unordered-list', 'ordered-list'
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)}>
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                {isEditMode ? 'Edit Post' : 'Create New Post'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 transition-colors"
              >
                {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Post' : 'Publish Post')}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/dashboard')}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8 xl:col-span-9">
              <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  {...register('title', { required: 'Title is required' })}
                  onChange={handleTitleChange}
                  className="mt-1 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Your Post Title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div className="mt-6" data-color-mode="light">
                <MDEditor
                  value={content}
                  onChange={setContent}
                  height={600}
                  commands={isDesktop ? undefined : mobileCommands.map((cmd) => ({ ...cmd, key: cmd.name || cmd }))}
                  preview={isDesktop ? 'live' : 'edit'}
                />
              </div>
            </div>

            <aside className="lg:col-span-4 xl:col-span-3 mt-6 lg:mt-0 space-y-6">
              <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Post Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      id="subtitle"
                      {...register('subtitle')}
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                      Slug
                    </label>
                    <input
                      type="text"
                      id="slug"
                      {...register('slug', { required: 'Slug is required' })}
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50"
                      readOnly={isEditMode}
                    />
                     {errors.slug && (
                      <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      id="tags"
                      {...register('tags')}
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      {...register('published')}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      defaultValue="false"
                    >
                      <option value="true">Published</option>
                      <option value="false">Draft</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Cover Image</h3>
                <input
                  type="file"
                  id="coverImage"
                  onChange={handleCoverImageChange}
                  accept="image/*"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                {coverImagePreview && (
                  <div className="mt-4">
                    <img src={coverImagePreview} alt="Cover preview" className="w-full h-auto rounded-md" />
                  </div>
                )}
              </div>
            </aside>
          </div>
        </main>
      </form>
    </div>
  );
}