function ProductCard({ product }) {
  return (
    <article className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <p className="product-price">${product.price.toFixed(2)}</p>
    </article>
  );
}

export default ProductCard;