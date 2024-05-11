import React, { useState } from "react"
import "./login.css"
import back from "../../assets/images/my-account.jpg"

export const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(false)
    
    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      if (data) {
        window.location.replace("/login");
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError(true);
    }
  }

  return (
    <>
      <section className='login'>
        <div className='container'>
          <div className='backImg'>
            <img src={back} alt='' />
            <div className='text'>
              <h3>Register</h3>
              <h1>My account</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <span>Username *</span>
            <input type='text' required onChange={(e) => setUsername(e.target.value)} />
            <span>Email address *</span>
            <input type='email' required onChange={(e) => setEmail(e.target.value)} />
            <span>Password *</span>
            <input type='password' required onChange={(e) => setPassword(e.target.value)} />
            <button type='submit' className='button'>
              Register
            </button>
          </form>
          {error && <span>Something went wrong</span>}
        </div>
      </section>
    </>
  )
}
