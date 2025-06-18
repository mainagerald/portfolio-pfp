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
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Blog Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Logged in as: {user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md mb-6">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Blog Posts</h2>
            <Link
              to="/admin/posts/new"
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Create New Post
            </Link>
          </div>
          <ul className="divide-y divide-gray-200">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <li key={post.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-medium text-indigo-600 truncate">
                        {post.title}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {post.published 
                          ? `Published on ${format(new Date(post.created_at), 'MMM dd, yyyy')}` 
                          : 'Draft'}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/posts/edit/${post.id}`}
                        className="px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/blog/${post.slug}`}
                        target="_blank"
                        className="px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-6 sm:px-6 text-center text-gray-500">
                No blog posts found. Create your first post!
              </li>
            )}
          </ul>
        </div>
        
        <div className="mt-6">
          <Link
            to="/"
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
