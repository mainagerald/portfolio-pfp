import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getAllPosts, deletePost } from '../../services/blogService';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import { Popover, Button, Box, Typography } from '@mui/material';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [postToDelete, setPostToDelete] = useState(null);
  
  // Fetch all blog posts with React Query
  const { data: posts, isLoading, isError, refetch } = useQuery(
    'posts',
    getAllPosts,
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );

  const handleDeleteClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setPostToDelete(id);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setPostToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await deletePost(postToDelete);
      refetch(); // Refresh the posts list
      handleClosePopover();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
      handleClosePopover();
    }
  };

  const open = Boolean(anchorEl);

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
    <div className="min-h-screen bg-white text-gray-800">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">MainaGerald</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-bold text-gray-600 hidden sm:block">
              {user?.email.startsWith('flavian') ? 'Admin' : 'User'}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <Link
            to="/admin/mg/posts/new"
            className="w-full sm:w-auto px-2 py-1 border border-transparent text-sm font-medium rounded-xl text-white bg-black transition-colors flex items-center justify-center"
          >
            <span className="text-lg mr-2">+</span> New Blog
          </Link>
        </div>

        <div className="space-y-6">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Cover Image */}
                  {post.cover_image && (
                    <div className="md:w-64 flex-shrink-0">
                      <img 
                        src={post.cover_image} 
                        alt={post.title} 
                        className="w-full h-48 md:h-full object-cover" 
                      />
                    </div>
                  )}

                  {/* Content and Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        {post.published 
                          ? <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-800">Published</span> 
                          : <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">Draft</span>}
                        <span className="mx-2.5">·</span>
                        <span>{format(new Date(post.created_at), 'MMM dd, yyyy')}</span>
                      </div>

                      <Link to={`/admin/mg/posts/edit/${post.slug}`} className="block">
                        <h3 className="text-xl font-bold text-gray-800 hover:text-indigo-700 transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      
                      <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                        {post.content.slice(0, 150)}...
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex items-center space-x-5">
                      <Link
                        to={`/admin/mg/posts/edit/${post.slug}`}
                        className="flex items-center text-sm text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                      >
                        <FaEdit className="mr-2" />
                        <span>Edit</span>
                      </Link>
                      <Link
                        to={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                      >
                        <FaEye className="mr-2" />
                        <span>View</span>
                      </Link>
                      <button
                        onClick={(e) => handleDeleteClick(e, post.id)}
                        className="flex items-center text-sm text-red-600 hover:text-red-800 font-medium transition-colors"
                      >
                        <FaTrashAlt className="mr-2" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium">No blog posts yet</h3>
              <p className="mt-1">Click "Create New Post" to get started.</p>
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-sm text-indigo-600 hover:text-indigo-500 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Delete Confirmation Popover */}
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box sx={{ p: 2, maxWidth: 280 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Are you sure you want to delete this post?
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button 
                size="small" 
                onClick={handleClosePopover}
                sx={{ color: 'text.secondary' }}
              >
                Cancel
              </Button>
              <Button 
                size="small" 
                variant="contained" 
                color="error" 
                onClick={handleConfirmDelete}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Popover>
      </main>
    </div>
  );
}
