
// import {Link} from 'react-router-dom'
import '../Home.css'

const Navbar = () => {
  return (
    <div className='home-container'>
    <header className="header">
    <div className="logo">MyShop</div>
    <nav className="nav">
        <ul>
        <li><a href="/">Home</a></li>
            <li><a href="/register">Register</a></li>
            <li><a href="/login">LogIn</a></li>
            </ul>
            </nav>
            </header>
    </div>
  )
}

<header className="header">
        <div className="logo">MyShop</div>
        <nav className="nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/register">Register</a></li>
            <li><a href="/login">LogIn</a></li>
            
          </ul>
        </nav>
      </header>
      

export default Navbar