
import '../Home.css';
// import SlideShow from './SlideShow';
// import SlideShow from './SlideShow';

const Home = () => {
  

  return (

    <>
    <div className="home-container">
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
      
      <section className="hero">
        <h1>Welcome to MyShop</h1>
        <p>Your one-stop destination for amazing products!</p>
        <li><a style={{color:"white"}} href="/product">Shop Now</a></li>
      </section>

      <section className="products">
        <h2>Featured Products</h2>
        
        
    
      </section>

      <footer className="footer">
        <p>&copy; 2024 MyShop. All rights reserved.</p>
      </footer>
    </div>

    <div>

    </div>

<div>
{/* <SlideShow/> */}
</div>
    </>
  );
}

export default Home;
