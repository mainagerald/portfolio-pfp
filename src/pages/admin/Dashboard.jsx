import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getAllPosts, deletePost } from '../../services/blogService';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Fetch all blog posts with React Query
  const { data: posts, isLoading, isError, refetch } = useQuery(
    'posts',
    getAllPosts,
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        refetch(); // Refresh the posts list
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-500">Error loading posts. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Maina's Blog</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-bold text-gray-600 hidden sm:block">
              {user?.email.startsWith('flavian') ? 'Admin' : 'User'}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <Link
            to="/admin/posts/new"
            className="w-full sm:w-auto px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-black transition-colors flex items-center justify-center"
          >
            <span className="text-lg mr-2">+</span> New Blog
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <li key={post.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <Link to={`/admin/posts/edit/${post.id}`} className="block">
                        <p className="text-lg font-semibold text-indigo-700 hover:text-indigo-800 truncate">
                          {post.title}
                        </p>
                      </Link>
                      <p className="mt-1 text-sm text-gray-500">
                        {post.published 
                          ? <span className="text-green-600 font-medium">Published</span> 
                          : <span className="text-yellow-600 font-medium">Draft</span>}
                        <span className="mx-2">·</span>
                        {format(new Date(post.created_at), 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0 w-full sm:w-auto">
                      <Link
                        to={`/admin/posts/edit/${post.id}`}
                        className="flex-1 sm:flex-initial justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-initial justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="flex-1 sm:flex-initial justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="p-6 text-center text-gray-500">
                <h3 className="text-lg font-medium">No blog posts yet</h3>
                <p className="mt-1">Click "Create New Post" to get started.</p>
              </li>
            )}
          </ul>
        </div>
        
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-sm text-indigo-600 hover:text-indigo-500 hover:underline"
          >
            ← Back to main website
          </Link>
        </div>
      </main>
    </div>
  );
}
