import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'
// import Navbar from './Navbar';
import CartNavbar2 from './CartNavbar2';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert("Please log in to view your cart.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://mern-ecommerce-backend1-ukg2.onrender.com/cart/getcart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const items = data.cart.items || [];
        setCartItems(items);

        const total = items.reduce(
          (sum, item) => sum + item.productId.price * item.quantity,
          0
        );
        setTotalPrice(total);
      } else {
        const errorData = await response.json();
        alert(errorData.msg || "Failed to fetch cart.");
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      alert("An error occurred while fetching the cart.");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please log in to modify your cart.");
      return;
    }

    try {
      const response = await fetch(`https://mern-ecommerce-backend1-ukg2.onrender.com/cart/delete/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Product removed from cart.");
        fetchCart();
      } else {
        const errorData = await response.json();
        alert(errorData.msg || "Failed to remove product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product.");
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please log in to modify your cart.");
      return;
    }

    try {
      const response = await fetch('https://mern-ecommerce-backend1-ukg2.onrender.com/cart/clear', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Cart cleared successfully.");
        setCartItems([]);
        setTotalPrice(0);
      } else {
        const errorData = await response.json();
        alert(errorData.msg || "Failed to clear cart.");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      alert("An error occurred while clearing the cart.");
    }
  };

  const buyNow = (product) => {
    navigate('/order', { state: { product } }); // Navigate to OrderProduct page with product data
  };

  if (loading) {
    return <p>Loading your cart...</p>;
  }

  return (
<>
    <CartNavbar2/>

    <div className='clearcart'>
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <>
          <div>
            <button onClick={clearCart} style={{ color: 'red' }}>
              <h2>clear cart</h2>
            </button>
          </div>

          <div className='parentcartdiv'>
            {cartItems.map((item, index) => (
              <div className='cartDiv' key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                <img
                  src={item.productId.imageUrl}
                  alt={item.productId.name}
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <h3>{item.productId.name}</h3>
                <p>Description: {item.productId.description}</p>
                <p>Price: ${item.productId.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button className='cartremovebtn' onClick={() => deleteProduct(item.productId._id)}>
                  Remove
                </button>
                <button className='cartbuybtn' onClick={() => buyNow(item)}>
                  Buy Now
                </button>
              </div>
            ))}
          </div>
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        </>
      ) : (
        <p className='cartempty'>Your cart is empty.</p>
      )}
    </div>
    </>
  );
};

export default Cart;
