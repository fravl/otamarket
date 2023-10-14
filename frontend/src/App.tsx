import React, {useState, useEffect} from 'react'
import Navbar from "./components/Navbar";
import AllPage from "./components/AllPage";
import ProductList from './components/ProductList';
import ProductService from './services/ProductService'
import { Product } from './types/Product'

function App() {
    const [products, setProducts] = useState<Product[]>([])

    //Fetch all products. This fetches only 6 first since we dont wanna fill site with 100+ dummy products while developin
    useEffect(() => {
        ProductService
            .getAll()
            .then(initialProducts => {
                setProducts(initialProducts.slice(0,6))
            })
    })

    return (
        <div className="App">
            <Navbar />
            <ProductList products={products}/>
        </div>
    );
}

export default App;
