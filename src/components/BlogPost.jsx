import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';

// BlogPost component for displaying a single post in Medium style
export default function BlogPost({ post }) {
  if (!post) return null;
  
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Article header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <p className="text-xl text-gray-500 mb-6">{post.subtitle}</p>
        
        {/* Author and date info */}
        <div className="flex items-center mb-6">
          <img 
            src={post.authorImage} 
            alt={post.author}
            className="w-12 h-12 rounded-full mr-4"
            loading="lazy"
          />
          <div>
            <p className="text-gray-900 font-medium">{post.author}</p>
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar size={14} className="mr-1" />
              <span className="mr-3">{post.publishedDate}</span>
              <Clock size={14} className="mr-1" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
        
        {/* Cover image */}
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-auto rounded-lg object-cover mb-8"
            style={{ maxHeight: '500px' }}
            loading="lazy"
          />
        )}
      </header>
      
      {/* Article content */}
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      {/* Tags */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span 
              key={tag} 
              className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
