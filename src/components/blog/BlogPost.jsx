import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function BlogPost({ post }) {
  if (!post) return null;

  const getSanitizedHtml = (htmlContent) => {
    const dirtyHtml = marked(htmlContent);
    return { __html: DOMPurify.sanitize(dirtyHtml) };
  };
  
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Article header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <p className="text-xl text-gray-500 mb-6">{post.subtitle}</p>
        
        {/* Author and date info */}
        <div className="flex items-center mb-6">
          <img 
            src={`https://images.unsplash.com/photo-1708401540190-6aabea855d7e?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGdvYXR8ZW58MHx8MHx8fDA%3D`} 
            alt={post.author}
            className="w-12 h-12 rounded-full mr-4"
            loading="lazy"
          />
          <div>
            <p className="text-gray-900 font-medium">{post.author.startsWith('flavian') ? 'Maina Gerald' : post.author}</p>
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar size={14} className="mr-1" />
              <span className="mr-3">{formatDate(post.created_at)}</span>
              <Clock size={14} className="mr-1" />
              <span>{post.read_time}</span>
            </div>
          </div>
        </div>
        
        {/* Cover image */}
        {post.cover_image && (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-auto rounded-lg object-cover mb-8"
            style={{ maxHeight: '500px' }}
            loading="eager"
          />
        )}
      </header>
      
      {/* Article content */}
      <div 
        className="prose prose-lg max-w-none text-black"
        dangerouslySetInnerHTML={getSanitizedHtml(post.content)}
      />
      
      {/* Tags */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          {post?.tags.map(tag => (
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
