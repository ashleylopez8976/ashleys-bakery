import { useEffect, useState } from "react";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:3001/products", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load bakery products.");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchProducts();

    return () => controller.abort();
  }, []);

  return { products, setProducts, isLoading, error };
}

export default useProducts;