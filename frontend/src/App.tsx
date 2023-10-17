import React, {useState, useEffect} from 'react'
import Navbar from "./components/Navbar";
import ProductDetailsPage from "./components/ProductDetailsPage";
import ProductList from './components/ProductList';
import ProductService from './services/ProductService'
import { Product } from './types/Product'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useParams
  } from 'react-router-dom'

function App() {
    const [products, setProducts] = useState<Product[]>([])

    //Fetch all products. This fetches only 6 first since we dont wanna fill site with 100+ dummy products while developin
    useEffect(() => {
        ProductService
            .getAll()
            .then(initialProducts => {
                setProducts(initialProducts.slice(0,6))
            })
    }, [])

    return (
        <div className="App">
            <Navbar />
            <Router>
                <Routes>
                    <Route path="/" element={<ProductList products={products}/>}/>

                    <Route path="/:id" element={<ProductDetailsPage products={products}/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
