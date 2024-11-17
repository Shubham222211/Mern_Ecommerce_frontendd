import { Route,Routes } from "react-router-dom"
import Product from "./Pages/Product"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import Cart from "./Pages/Cart"
import OrderProduct from "./Pages/OrderProduct"
import Home from "./Pages/Home"
import Logout from "./Pages/Logout"


function App() {

    return(

    <>
    
<Routes>

<Route path="/" element={<Home/>}/>
    <Route path="/product" element={<Product/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/order" element={<OrderProduct />} />
    <Route path="/logout" element={<Logout />} />
</Routes>
    </>
    )
  
}

export default App
