import { useState } from "react";
import ProductForm from "../components/ProductForm";
import EditProductForm from "../components/EditProductForm";

function AdminPortal({
  products,
  isLoading,
  error,
  onAddProduct,
  onUpdateProduct,
}) {
  const [editingProduct, setEditingProduct] = useState(null);
  const [success, setSuccess] = useState("");

  function handleUpdate(updatedProduct) {
    onUpdateProduct(updatedProduct);
    setEditingProduct(null);
    setSuccess("Product updated successfully!");
  }

  return (
    <section className="admin-portal">
      <h1>Admin Portal</h1>
      <p>Add new products and update existing bakery items here.</p>

      <ProductForm onAddProduct={onAddProduct} />

      <h2>Manage Products</h2>

      {success && <p role="status">{success}</p>}

      {editingProduct && (
        <EditProductForm
          key={editingProduct.id}
          product={editingProduct}
          onUpdateProduct={handleUpdate}
          onCancel={() => setEditingProduct(null)}
        />
      )}

      {isLoading ? (
        <p role="status">Loading products...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} — ${product.price.toFixed(2)}{" "}
              <button
                type="button"
                onClick={() => {
                  setEditingProduct(product);
                  setSuccess("");
                }}
              >
                Edit {product.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default AdminPortal;