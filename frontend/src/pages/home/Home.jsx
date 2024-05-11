import React, { useEffect, useState } from "react"
import Card from "../../components/blog/Card"
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/posts');
        const contentType = response.headers.get('Content-Type');

        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Unexpected response format: Not JSON');
        }

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json(); 
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
    <>
      <Card posts={posts} />
    </>
  )
}
export default Home;
