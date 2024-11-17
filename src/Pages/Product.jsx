import { useEffect, useState } from 'react';
import '../Product.css';

import CartNavbar from './CartNavbar';


function Product() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending

  // http://localhost:5001/product/allProduct
  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://mern-ecommerce-backend1-ukg2.onrender.com/product/allProduct');
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data.products || []); // Handle cases where `products` might be undefined
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Error fetching products. Please try again later.");
    }
  };

  // Function to add product to cart
  const addToCart = async (productId) => {
    const token = localStorage.getItem('token'); // JWT token stored in localStorage

    if (!token) {
      alert("User not logged in!");
      return;
    }

    try {
      const response = await fetch('https://mern-ecommerce-backend1-ukg2.onrender.com/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Sending token in the Authorization header
        },
        body: JSON.stringify({
          productId,
          quantity: 1, // Default quantity set to 1
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.msg || "Product added to cart successfully!");
      } else {
        const errorData = await response.json();
        alert(errorData.msg || "Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("An error occurred while adding the product to the cart.");
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter(prod =>
    prod.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort products by price based on sortOrder
  const sortedProducts = filteredProducts.sort((a, b) => {
    return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
  });

  // Handle sort order change
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (

    <>
    
<CartNavbar/>


    <div>
      {/* Search input */}
      <input className='searchinput'
        style={{ width: "250px", marginBottom: "10px" }}
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Sort dropdown */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="sortOrder">Sort by price: </label>
        <select className='sortproduct'
          id="sortOrder"
          value={sortOrder}
          onChange={handleSortChange}
        >
          <option value="asc">Low To High Range</option>
          <option value="desc">High To Low Range</option>
        </select>
      </div>

      {/* Product List */}
      <h2>Explore Trending Product</h2>

      <div className='productDiv'>
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product, id) => (
            <div key={id} className="productCard">
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{ width: "200px", marginBottom: "10px" }}
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <button onClick={() => addToCart(product._id)}>Add TO Cart</button>
            </div>
          ))
        ) : (
          <p>No products available or no match found.</p>
        )}
      </div>
    </div>

    {/* <SlideShow/> */}
    </>
  );
}

export default Product;
