import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Register.css'

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    gender: "",
    mobileNumber: ""
  });

  const [error, setError] = useState(""); // New state to handle error messages

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const response = await fetch(`https://mern-ecommerce-backend1-ukg2.onrender.com/user/register`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      // Check if the response status is not OK (not 200)
      if (response.status !== 200) {
        setError(result.msg || "Registration failed.");
        return;
      }
      
      console.log(result);
      alert('User registered successfully!');
      navigate("/login");

    } catch (error) {
      alert(`Error in registration: ${error.message}`);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  }


  function movetoregister(){
    navigate('/login')
  }

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2>Register</h2>
        <input className='inputbox' placeholder="Name.." value={data.name} name="name" onChange={handleChange} />
        <input className='inputbox' placeholder="Age.." value={data.age} name="age" onChange={handleChange} />
        <input className='inputbox' placeholder="MobileNumber.." value={data.mobileNumber} name="mobileNumber" onChange={handleChange} />
        <input className='inputbox' placeholder="Gender.." value={data.gender} name="gender" onChange={handleChange} />
        <input className='inputbox' placeholder="Email.." value={data.email} name="email" onChange={handleChange} />
        <input className='inputbox' placeholder="Password.." type="password" value={data.password} name="password" onChange={handleChange} />
        
        <input type="submit" value="Register" />
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
    }} onClick={movetoregister}>Already Have Account?</button>
        
        {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error message */}
      </form>
    </div>
  );
};

export default Register;
