import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login.css"


const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await fetch('https://mern-ecommerce-backend1-ukg2.onrender.com/user/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });
      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('token', result.token);
        alert('Login successful!');
        navigate('/product');
      } else {
        alert(`Login failed: ${result.msg || "Unknown error"}`);
      }
    } catch (error) {
      alert(`Error in login: ${error.message}`);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value
    }));
  }


  function movetoregister(){
navigate('/register')
  }

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <input 
          type="text"
          value={loginData.email}
          name="email"
          onChange={handleChange}
          placeholder="Email"
        />
        <input 
          type="password"
          value={loginData.password}
          name="password"
          onChange={handleChange}
          placeholder="Password"
        />
        <input type="submit" value="Login" />
        <button style={{
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '20px 0',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.3s ease',
    }} onClick={movetoregister}>Register First For Login</button>
      </form>
    </div>
  );
};

export default Login;
