import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./account.css";
import { IoIosAddCircleOutline } from "react-icons/io";

export const Account = () => {
  const { user, dispatch } = useContext(Context);

  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [succ, setSucc] = useState(false);
  const PublicFlo = "http://localhost:3000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });

    const updateUser = {
      userId: user._id,
      username: username || user.username, 
      email: email || user.email, 
      password,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updateUser.profilePic = filename;

      try {
        const uploadResponse = await fetch("http://localhost:3000/upload", {
          method: "POST",
          body: data,
        });
        if (!uploadResponse.ok) {
          throw new Error("Failed to upload file");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    try {
      const updateResponse = await fetch(`http://localhost:3000/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateUser),
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to update user");
      }

      setSucc(true);
      dispatch({ type: "UPDATE_SUCC", payload: updateUser });
      window.location.reload();
    } catch (error) {
      console.error("Error updating user:", error);
      dispatch({ type: "UPDATE_FAILED" });
    }
  };

  return (
    <section className="accountInfo">
      <div className="container boxItems">
        <h1>Account Information</h1>
        <div className="content">
          <div className="left">
            <div className="img flexCenter">
              {user && ( // Check if user is defined before accessing profilePic
                <img src={file ? URL.createObjectURL(file) : PublicFlo + (user.profilePic || "")} alt="" />
              )}
              <label htmlFor="inputfile">
                <IoIosAddCircleOutline className="icon" />
              </label>
              <input type="file" id="inputfile" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
            </div>
          </div>
          <form className="right" onSubmit={handleSubmit}>
            <label htmlFor="">Username</label>
            <input type="text" placeholder={user?.username} onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="">Email</label>
            <input type="email" placeholder={user?.email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="">Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
            <button className="button" type="submit">
              Update
            </button>
            {succ && <span>Profile is Updated</span>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Account;
