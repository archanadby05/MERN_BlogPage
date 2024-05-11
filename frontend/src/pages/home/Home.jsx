import React, { useState, useEffect } from 'react';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/posts');
        console.log('past response.');

        const contentType = response.headers.get('Content-Type');
        console.log('Content-Type:', contentType);

        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Unexpected response format: Not JSON');
        }

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json(); // Parse response body as JSON
        console.log('is json then:', data);

        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error.message);
        setError('Failed to fetch posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Latest Posts</h1>
      {posts.map(post => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.desc}</p>
          <p>Created By: {post.username}</p>
          <p>Categories: {post.categories.join(', ')}</p>
          <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
          <p>Updated At: {new Date(post.updatedAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
