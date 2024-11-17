import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../App.css'
import CartNavbar2 from './CartNavbar2';

const OrderProduct = () => {

const navigate=useNavigate()

  const location = useLocation();
  const product = location.state?.product?.productId;

  const confirmOrder = () => {
    if (product) {
      alert(`Hurray! Your order for ${product.name} (${product.price} USD) has been confirmed!  Thankyou for Shopping`);
      navigate('/product')
    } else {
      alert("No product data found.");
    }
  };

  if (!product) {
    return <p>No product selected for ordering.</p>;
  }

  return (

    <>
    <CartNavbar2/>
    <>    <h2>Order Product</h2> 
    <div className='orderProddiv1'>
      
      <div className='orderProddiv2' style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
        <img className='irderprodimg'
          src={product.imageUrl}
          alt={product.name}
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
        <h3>{product.name}</h3>
        <p>Description: {product.description}</p>
        <h3>Price: ${product.price}</h3>
        <button className='confirmOrder' onClick={confirmOrder}>Order</button>
      </div>
    </div>
    </>
</>
  );
};

export default OrderProduct;
