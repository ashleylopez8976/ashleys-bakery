import { useState } from "react";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";

function Shop({ products, isLoading, error }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  if (isLoading) {
    return <p role="status">Loading bakery products...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <section>
      <h1>Shop Our Menu</h1>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <p role="status">
        {filteredProducts.length} products found
      </p>

      {filteredProducts.length === 0 ? (
        <p>No products match your search.</p>
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </section>
  );
}

export default Shop;