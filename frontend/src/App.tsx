import React, {useState, useEffect} from 'react'
import ProductService from './services/ProductService'
import { Product } from './types/Product'
import AppHeader from './components/AppHeader';
import { Outlet } from 'react-router-dom';
import ProductOutletContext from './components/Contexts/ProductOutletContext'

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
        <>
            <AppHeader />
            <Outlet context={{products} satisfies ProductOutletContext}/>
        </>
    );
}

export default App;
