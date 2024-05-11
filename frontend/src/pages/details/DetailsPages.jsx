import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { BsPencilSquare } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import { Context } from '../../context/Context';

const DetailsPages = () => {
  const { id } = useParams();
  const { user } = useContext(Context);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/posts/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid content type. Expected JSON.');
        }

        const data = await response.json();
        setPost(data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to fetch post. Please try again later.');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: user.username }),
      });

      history.push('/'); // Redirect to homepage after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading post details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="singlePage">
      <div className="container">
        {post && (
          <>
            <div className="left">
              {post.photo && <img src={`http://localhost:5000/images/${post.photo}`} alt="" />}
            </div>
            <div className="right">
              {post.username === user?.username && (
                <div className="buttons">
                  <button className="button" onClick={() => history.push(`/edit/${post._id}`)}>
                    <BsPencilSquare />
                  </button>
                  <button className="button" onClick={handleDelete}>
                    <AiOutlineDelete />
                  </button>
                </div>
              )}

              <h1>{post.title}</h1>
              <p>{post.desc}</p>

              <p>
                Author: <Link to={`/?user=${post.username}`}>{post.username}</Link>
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default DetailsPages;
