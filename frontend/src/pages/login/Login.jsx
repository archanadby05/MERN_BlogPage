import React, { useContext, useRef } from "react"
import "./login.css"
import back from "../../assets/images/my-account.jpg"
import { Link } from "react-router-dom"
import { Context } from "../../context/Context"

export const Login = () => {
  const userRef = useRef()
  const passRef = useRef()
  const { dispatch, FetchData } = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: "LOGINSTART" })
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userRef.current.value,
          password: passRef.current.value,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      dispatch({ type: "LOGINSUCC", payload: data });
      window.location.replace("/");
    } catch (error) {
      console.error('Error during login:', error);
      dispatch({ type: "LOGINFAILED" });
    }
  };

  console.log(FetchData);

  return (
    <>
      <section className='login'>
        <div className='container'>
          <div className='backImg'>
            <img src={back} alt='' />
            <div className='text'>
              <h3>Login</h3>
              <h1>My account</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <span>Username or email address *</span>
            <input type='text' required ref={userRef} />
            <span>Password *</span>
            <input type='password' required ref={passRef} />
            <button className='button' type='submit' disabled={FetchData}>
              Log in
            </button>

            <Link to='/register' className='link'>
              Register
            </Link>
          </form>
        </div>
      </section>
    </>
  )
}
