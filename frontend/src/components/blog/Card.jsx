import React from "react";
import "./blog.css";
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai";
import { Link } from "react-router-dom";

const Card = ({ posts }) => {

  return (
    <section className="blog">
      <div className="container">
        {posts.map((item, index) => (
          <div className="box boxItems" key={item.id || index}>
            <div className="details">
              <div className="tag">
                <AiOutlineTags className="icon" />
                {item.categories.map((c, idx) => (
                  <a href="/" key={c.name || idx}>#{c.name}</a>
                ))}
              </div>
              <Link to={`/post/${item._id}`}>
                <h3>{item.title}</h3>
              </Link>
              <p>{item.desc.slice(0, 180)}...</p>
              <div className="date">
                <AiOutlineClockCircle className="icon" />
                <span>{new Date(item.createdAt).toDateString()}</span>
                <AiOutlineComment className="icon" />
                <span>27</span>
                <AiOutlineShareAlt className="icon" />
                <span>SHARE</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Card;
