import React from 'react';
import ArticleCard from '../components/ArticleCard';

const HomePage = () => {
  const articles = [
    { id: 1, title: 'React Basics', description: 'Learn the basics of React.' },
    { id: 2, title: 'TypeScript with React', description: 'Use TypeScript for type safety.' },
    { id: 3, title: 'SPA Routing', description: 'Implement SPA routing with React Router.' },
  ];

  return (
    <main className="home-page">
      <h2>Featured Articles</h2>
      <div className="articles-grid">
        {articles.map(article => (
          <ArticleCard
            key={article.id}
            title={article.title}
            description={article.description}
            onRead={() => alert(`Read "${article.title}"`)}
          />
        ))}
      </div>
    </main>
  );
};

export default HomePage;
