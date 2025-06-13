import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BlogPost from '../components/BlogPost';
import BlogCard from '../components/BlogCard';

// Sample blog data (replace with your actual data source later)
const samplePosts = [
  {
    id: 1,
    slug: 'building-scalable-systems',
    title: 'Building Scalable Systems for Modern Applications',
    subtitle: 'Lessons learned from designing high-performance architectures',
    content: `
      <p class="lead">Scalability is one of the most critical aspects of modern application design. As user bases grow and data volumes expand, the ability to scale efficiently becomes a key differentiator.</p>
      
      <p>In my experience working with distributed systems, I've found that several principles consistently lead to more scalable architectures:</p>
      
      <h2>1. Design for Horizontal Scaling</h2>
      <p>Vertical scaling (adding more resources to a single server) has natural limits. Horizontal scaling—adding more machines to your resource pool—offers virtually unlimited growth potential. This requires stateless application design where possible, with shared state externalized to purpose-built data stores.</p>
      
      <blockquote>
        "Don't scale by making things bigger; scale by making big things from small pieces."
      </blockquote>
      
      <h2>2. Embrace Asynchronous Processing</h2>
      <p>Synchronous request/response patterns create tight coupling and limit throughput. By embracing message queues and event-driven architectures, systems can process work at their own pace, absorbing traffic spikes and degrading gracefully under load.</p>
      
      <h2>3. Cache Strategically</h2>
      <p>Caching is a powerful tool, but it must be applied thoughtfully. Identify hot spots in your data access patterns and apply appropriate caching strategies—whether that's client-side caching, CDNs, application caches, or database result caching.</p>
      
      <p>The journey to building truly scalable systems is ongoing. As technologies evolve and user expectations grow, our approaches must adapt. What remains constant is the need for thoughtful architecture that anticipates growth and embraces change.</p>
    `,
    author: 'Maina Gerald',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    publishedDate: '2025-05-28',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80',
    tags: ['Architecture', 'Scalability', 'System Design']
  },
  {
    id: 2,
    slug: 'future-of-llm-applications',
    title: 'The Future of LLM Applications in Enterprise Software',
    subtitle: 'How large language models are transforming business applications',
    content: `
      <p class="lead">Large Language Models (LLMs) are rapidly transforming how we build and interact with software. The implications for enterprise applications are particularly profound.</p>
      
      <p>As someone working at the intersection of traditional software engineering and AI, I've observed several key trends emerging:</p>
      
      <h2>Natural Language Interfaces</h2>
      <p>The most immediate impact of LLMs is the ability to create natural language interfaces for complex systems. Rather than navigating menus and forms, users can simply describe what they want to accomplish. This dramatically reduces training time and increases productivity, especially for occasional users of complex enterprise systems.</p>
      
      <h2>Context-Aware Assistance</h2>
      <p>Beyond simple command processing, LLMs excel at understanding context and providing relevant suggestions. This enables a new class of "AI copilots" that can assist users throughout their workflow, offering relevant information, suggesting next steps, and automating routine tasks.</p>
      
      <blockquote>
        "The best interface is often no interface at all. LLMs help us move toward ambient computing where technology recedes into the background."
      </blockquote>
      
      <h2>Knowledge Synthesis</h2>
      <p>Enterprise knowledge is often fragmented across documents, emails, chat logs, and tribal knowledge. LLMs can connect these dots, synthesizing information from disparate sources to answer complex questions or generate comprehensive reports.</p>
      
      <p>While challenges remain—particularly around accuracy, hallucinations, and data privacy—the trajectory is clear. LLMs will become a fundamental component of enterprise software, augmenting human capabilities and enabling new ways of working.</p>
    `,
    author: 'Maina Gerald',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    publishedDate: '2025-06-05',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1677442135136-760c813dce95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80',
    tags: ['AI', 'LLM', 'Enterprise Software']
  }
];

// Blog component that handles both list and single post views
export default function Blog() {
  const { slug } = useParams();
  const [posts, setPosts] = useState(samplePosts);
  const [currentPost, setCurrentPost] = useState(null);
  
  useEffect(() => {
    // In a real app, you would fetch posts from an API
    // For now, we're using the sample data
    
    // If a slug is provided, find the matching post
    if (slug) {
      const post = posts.find(p => p.slug === slug);
      setCurrentPost(post || null);
    } else {
      setCurrentPost(null);
    }
    
    // Scroll to top when changing posts
    window.scrollTo(0, 0);
  }, [slug, posts]);
  
  // If we have a slug but no matching post was found
  if (slug && !currentPost) {
    return (
      <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-900">Post Not Found</h1>
        <p className="mt-2 text-gray-600">The post you're looking for doesn't exist or has been removed.</p>
        <Link to="/blog" className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-500">
          <ArrowLeft size={16} className="mr-1" /> Back to all posts
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
          <Link to="/blog" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft size={16} className="mr-1" /> All posts
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
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Thoughts, ideas, and insights on software engineering, architecture, and technology.
          </p>
        </header>
        
        <div className="grid gap-12">
          {posts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
