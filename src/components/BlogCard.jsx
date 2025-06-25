import React from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../utils/FormatDate';

// BlogCard component for displaying blog post previews in a list
export default function BlogCard({ post }) {
  if (!post) return null;
  
  return (
    <article className="grid md:grid-cols-12 gap-6 border-b border-gray-100 pb-8 mb-8 last:border-0">
      
      
      {/* Post content (8 columns on md+) */}
      <div className="md:col-span-8">
        <Link to={`/blog/${post.slug}`} className="block group">
          <h2 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 mb-2">
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-500 mb-4">{post.subtitle}</p>
        
        {/* Author and date info */}
        <div className="flex items-center mb-4 space-x-2">
          <img 
            src={`https://images.unsplash.com/photo-1708401540190-6aabea855d7e?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGdvYXR8ZW58MHx8MHx8fDA%3D`} 
            alt={post.author}
            className="w-12 h-12 rounded-full"
            loading="lazy"
          />
          <div className="text-sm flex flex-col gap-0 text-gray-900">
            <span className="text-gray-900 font-medium">{post.author.startsWith('flavian') ? 'Maina Gerald' : post.author}</span>
            <div className="flex items-center gap-3">
            <span className="text-gray-800 text-xs">{formatDate(post.created_at)}</span> 
            <span className="text-red-600 text-xs">· {post.read_time}{' '}min read ·</span>
            </div>
          </div>
        </div>
        {/* {content} */}
        <p className="text-gray-500 mb-1">{post.content.slice(0, 300)}...</p>
        <Link to={`/blog/${post.slug}`} className="mb-4 inline-flex items-center text-sm underline text-indigo-600 hover:text-indigo-500">
          read more
        </Link>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post?.tags.slice(0, 3).map(tag => (
            <span 
              key={tag} 
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
              {tag}
            </span>
          ))}
        </div>
        {/* Post image (4 columns on md+) */}
      <div className="md:col-span-4">
        <Link to={`/blog/${post.slug}`}>
          <img 
            src={post.cover_image} 
            alt={post.title}
            className="w-full h-48 md:h-full object-cover rounded-lg"
            loading="lazy"
          />
        </Link>
      </div>
      </div>
    </article>
  );
}
