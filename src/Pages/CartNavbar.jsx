

import '../Home.css'
import { useNavigate } from 'react-router-dom';

const CartNavbar = () => {
    const navigate=useNavigate()


    const Logout = () => {
        
        
            localStorage.removeItem("token");
                navigate("/login");
        }


  return (
    <div className='home-container'>
    <header className="header">
    <div className="logo">MyShop</div>
    <nav className="nav">
        <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/cart">Cart</a></li>
        <li><a href="/login">LogIn</a></li>
        <li><button onClick={Logout} style={{
      border: "1px solid red", 
      backgroundColor: "white", 
      color: "red", 
      padding: "4px 2px", 
      borderRadius: "4px", 
      cursor: "pointer",
    //   marginBottom:"10px"
    }} >Logout</button></li>
            </ul>
            </nav>
            </header>
    </div>
  )
}

      

export default CartNavbar