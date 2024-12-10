import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOMetadata = ({ 
  title = 'Mainagerald - Professional Portfolio', 
  description = 'Professional portfolio showcasing software development skills, projects, and expertise',
  keywords = 'portfolio, software, engineer, backend, java, spring, django, web development, react, frontend, developer, projects',
  imageUrl = '/og-image.jpg'
}) => {
  const canonicalUrl = 'https://mainagerald.netlify.app';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': 'Mainagerald Developer',
    'jobTitle': 'Software Developer',
    'url': canonicalUrl,
    'sameAs': [
      'https://www.linkedin.com/in/flavian-maina-gerald/',
      'https://github.com/mainagerald'
    ]
  };

  return (
    <Helmet>
      {/* Basic SEO */}
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Social Media */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEOMetadata;