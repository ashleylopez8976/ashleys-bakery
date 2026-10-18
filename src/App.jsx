import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import AdminPortal from "./pages/AdminPortal";
import useProducts from "./hooks/useProducts";
import BakeryAssistant from "./components/BakeryAssistant";

function App() {
  const { products, setProducts, isLoading, error } = useProducts();

  function handleAddProduct(newProduct) {
  setProducts((currentProducts) => [...currentProducts, newProduct]);
}

function handleUpdateProduct(updatedProduct) {
  setProducts((currentProducts) =>
    currentProducts.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    )
  );
}

  return (
    <BrowserRouter>
      <NavBar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/shop"
            element={
              <Shop
                products={products}
                isLoading={isLoading}
                error={error}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <AdminPortal
                products={products}
                isLoading={isLoading}
                error={error}
                onAddProduct={handleAddProduct}
                onUpdateProduct={handleUpdateProduct}
              />
            }
          />
          <Route
            path="/assistant"
            element={<BakeryAssistant products={products} />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;