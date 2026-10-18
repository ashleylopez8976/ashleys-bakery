import { useId, useState } from "react";

const emptyForm = {
  name: "",
  description: "",
  category: "Muffins",
  price: "",
};

function ProductForm({ onAddProduct }) {
  const formId = useId();
  const [formData, setFormData] = useState(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setSuccess("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const price = Number(formData.price);

    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.price.trim() ||
      !Number.isFinite(price) ||
      price <= 0
    ) {
      setError("Enter a name, description, and a price greater than zero.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim(),
          category: formData.category,
          price,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to save the product. Please try again.");
      }

      const newProduct = await response.json();

      onAddProduct(newProduct);
      setFormData(emptyForm);
      setSuccess("Product added successfully!");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a Product</h2>

      <fieldset disabled={isSaving}>
        <legend>Product details</legend>

        <div>
          <label htmlFor={`${formId}-name`}>Product name</label>
          <input
            id={`${formId}-name`}
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor={`${formId}-description`}>Description</label>
          <textarea
            id={`${formId}-description`}
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor={`${formId}-category`}>Category</label>
          <select
            id={`${formId}-category`}
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Muffins">Muffins</option>
            <option value="Coffee">Coffee</option>
            <option value="Smoothies">Smoothies</option>
            <option value="Cookies">Cookies</option>
            <option value="Cinnamon Rolls">Cinnamon Rolls</option>
          </select>
        </div>

        <div>
          <label htmlFor={`${formId}-price`}>Price ($)</label>
          <input
            id={`${formId}-price`}
            name="price"
            type="number"
            min="0.01"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">
          {isSaving ? "Saving..." : "Add Product"}
        </button>
      </fieldset>

      {error && <p role="alert">{error}</p>}
      {success && <p role="status">{success}</p>}
    </form>
  );
}

export default ProductForm;