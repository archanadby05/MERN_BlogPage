import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./create.css";
import { IoIosAddCircleOutline } from "react-icons/io";

const Create = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const history = useHistory(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title,
      desc,
    };

    try {
      const response = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      // Post creation successful
      const resData = await response.json();
      console.log("New post created:", resData);
      window.alert("Post created successfully");
      history.push("/home"); 

    } catch (error) {
      console.error("Error creating post:", error);
      window.alert("Failed to create post");
    }
  };

  return (
    <>
      <section className="newPost">
        <div className="container boxItems">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <button type="submit" className="button">
              Create Post
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Create;
