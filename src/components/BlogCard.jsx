import React from 'react';
import { Link } from 'react-router-dom';

// BlogCard component for displaying blog post previews in a list
export default function BlogCard({ post }) {
  if (!post) return null;
  
  return (
    <article className="grid md:grid-cols-12 gap-6 border-b border-gray-100 pb-8 mb-8 last:border-0">
      {/* Post image (4 columns on md+) */}
      <div className="md:col-span-4">
        <Link to={`/blog/${post.slug}`}>
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-48 md:h-full object-cover rounded-lg"
            loading="lazy"
          />
        </Link>
      </div>
      
      {/* Post content (8 columns on md+) */}
      <div className="md:col-span-8">
        <Link to={`/blog/${post.slug}`} className="block group">
          <h2 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 mb-2">
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-500 mb-4">{post.subtitle}</p>
        
        {/* Author and date info */}
        <div className="flex items-center mb-4">
          <img 
            src={post.authorImage} 
            alt={post.author}
            className="w-8 h-8 rounded-full mr-3"
            loading="lazy"
          />
          <div className="text-sm">
            <p className="text-gray-900 font-medium">{post.author}</p>
            <div className="flex items-center text-gray-500">
              <span className="mr-2">{post.publishedDate}</span>
              <span>·</span>
              <span className="ml-2">{post.readTime}</span>
            </div>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map(tag => (
            <span 
              key={tag} 
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
