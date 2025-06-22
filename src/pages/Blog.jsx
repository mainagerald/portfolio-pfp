import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useQuery } from 'react-query';
import BlogPost from '../components/BlogPost';
import BlogCard from '../components/BlogCard';
import { getAllPosts, getPostBySlug } from '../services/blogService';

// Blog component that handles both list and single post views
export default function Blog() {
  const { slug } = useParams();
  
  // Fetch all blog posts
  const { data: posts = [], isLoading: postsLoading, error: postsError } = useQuery(
    'posts',
    getAllPosts,
    {
      staleTime: 1000 * 60 * 1, // 1 minute
      enabled: !slug, // Only fetch posts when not viewing a single post
    }
  );

  console.log(posts);
  
  // Fetch single post if slug is provided
  const { data: currentPost, isLoading: postLoading, error: postError } = useQuery(
    ['post', slug],
    () => getPostBySlug(slug),
    {
      enabled: !!slug, // Only fetch when slug is available
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );
  
  // Scroll to top when changing posts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  // Handle loading states
  const isLoading = (slug && postLoading) || (!slug && postsLoading);
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 max-w-3xl mx-auto">
          
          {/* Title placeholder */}
          <div className="skeleton h-8 w-3/4 mx-auto" />
  
          {/* Author and date */}
          <div className="flex items-center space-x-4">
            <div className="skeleton h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <div className="skeleton h-4 w-24" />
              <div className="skeleton h-4 w-16" />
            </div>
          </div>
  
          {/* Cover image placeholder */}
          <div className="skeleton w-full h-64 rounded" />
  
          {/* Paragraph lines */}
          <div className="space-y-4">
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-5/6" />
            <div className="skeleton h-4 w-4/6" />
            <div className="skeleton h-4 w-3/6" />
            <div className="skeleton h-4 w-4/6" />
            <div className="skeleton h-4 w-5/6" />
          </div>
  
          {/* Tags or category */}
          <div className="flex space-x-2 pt-4">
            <div className="skeleton h-6 w-16 rounded-full" />
            <div className="skeleton h-6 w-20 rounded-full" />
          </div>
        </div>
  
        {/* Add shimmer CSS */}
        <style>{`
          .skeleton {
            position: relative;
            background-color: #e2e8f0;
            overflow: hidden;
          }
          .skeleton::after {
            content: "";
            position: absolute;
            top: 0;
            left: -150%;
            height: 100%;
            width: 150%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.6),
              transparent
            );
            animation: shimmer 1.5s infinite;
          }
          @keyframes shimmer {
            100% {
              left: 100%;
            }
          }
        `}</style>
      </div>
    );
  }
  
  
  // Handle error states
  const hasError = (slug && postError) || (!slug && postsError);
  if (hasError) {
    return (
      <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-900">Error Loading Content</h1>
        <p className="mt-2 text-gray-600">There was a problem loading the blog content. Please try again later.</p>
        <Link to="/" className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-500">
          <ArrowLeft size={16} className="mr-1" /> Return to Home
        </Link>
      </div>
    );
  }
  
  // If we have a slug but no matching post was found
  if (slug && !currentPost) {
    return (
      <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-900">Post Not Found</h1>
        <p className="mt-2 text-gray-600">The post you're looking for doesn't exist or has been removed.</p>
        <Link to="/blog" className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-500">
          <ArrowLeft size={16} className="mr-1" /> Back to Blog
        </Link>
      </div>
    );
  }
  
  // If we're viewing a single post
  if (currentPost) {
    return (
      <div className="bg-white min-h-screen">
        {/* Back button */}
        <div className="max-w-3xl mx-auto pt-10 px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="mt-10 inline-flex items-center text-gray-600 hover:text-gray-900 border px-2 py-1 rounded-full">
            <ArrowLeft size={20} className="mr-1 border rounded-full bg-black text-white" /> Back
          </Link>
        </div>
        
        <BlogPost post={currentPost} />
      </div>
    );
  }
  
  // Otherwise, show the list of posts
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12 mt-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Thoughts, ideas, and insights on software engineering, architecture, and technology.
          </p>
        </header>
        
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No blog posts found.</p>
          </div>
        ) : (
          <div className="grid gap-12">
            {posts.filter(post => post.published !== false).map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
