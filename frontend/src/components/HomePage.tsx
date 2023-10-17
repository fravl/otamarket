import Navbar from "./Navbar";
import ProductList from "./ProductList";

const HomePage = () => (
    <>
        <Navbar />
        <div className="all-page" id="all-page">
            <ProductList />
        </div>
    </>
);

export default HomePage;
