import { useId, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function BakeryAssistant({ products }) {
  const inputId = useId();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const question = input.trim();

    if (!question || isLoading || products.length === 0) return;

    const nextMessages = [
      ...messages,
      { role: "user", content: question },
    ];

    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    // Turn the current products into one readable menu line per item.
        const questionText = question.toLowerCase();

    const categoryKeywords = [
      { keyword: "muffin", category: "Muffins" },
      { keyword: "coffee", category: "Coffee" },
      { keyword: "smoothie", category: "Smoothies" },
      { keyword: "cookie", category: "Cookies" },
      { keyword: "cinnamon roll", category: "Cinnamon Rolls" },
    ];

    const matchingCategories = categoryKeywords
      .filter(({ keyword }) => questionText.includes(keyword))
      .map(({ category }) => category);

    const relevantProducts =
      matchingCategories.length > 0
        ? products.filter((product) =>
            matchingCategories.includes(product.category)
          )
        : products;

    const menuText = relevantProducts
      .map(
        (product) =>
          `${product.name} | Category: ${product.category} | Price: $${product.price.toFixed(2)} | Description: ${product.description}`
      )
      .join("\n");

    try {
      const response = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3.2:1b",
          stream: false,
          messages: [
            {
              role: "system",
              content: `
You are the assistant for Ashley's Bakery.
Answer briefly using the CURRENT MENU below as your source.
Each line represents an available product.
Include every matching product when asked about a category.
Copy product names and prices accurately.
When listing products, use a Markdown bulleted list.
Put each product on its own separate line.
Format each bullet as: - **Product Name** — **$0.00**
Never put multiple products on the same line.
Do not invent products, prices, hours, or policies.
Do not make allergy or dietary safety guarantees.
If information is missing, say you do not know.
You can explain how to search, add, and edit products,
but you cannot change products yourself.
If previous conversation messages conflict with this menu,
use this current menu.

CURRENT MENU:
${menuText}
              `,
            },
            ...nextMessages,
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Ollama could not answer. Please try again.");
      }

      const data = await response.json();
      const answer = data.message?.content;

      if (typeof answer !== "string" || !answer.trim()) {
        throw new Error("The assistant returned an empty response.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: answer },
      ]);
    } catch (error) {
      setError(`${error.message} Make sure Ollama is running.`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      className="bakery-assistant"
      aria-labelledby="assistant-heading"
    >
      <h2 id="assistant-heading">Bakery Assistant</h2>
      <p>Ask about our menu or how to manage products.</p>

      <div
        role="log"
        aria-label="Bakery conversation"
        aria-live="polite"
      >
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <strong>
              {message.role === "user" ? "You" : "Bakery Assistant"}
            </strong>

            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        ))}
      </div>

      {isLoading && <p role="status">Thinking...</p>}
      {error && <p role="alert">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor={inputId}>Your question</label>
        <input
          id={inputId}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="What muffins do you sell?"
          maxLength={1000}
          required
        />

        <button
          type="submit"
          disabled={
            isLoading || !input.trim() || products.length === 0
          }
        >
          {isLoading ? "Thinking..." : "Send"}
        </button>
      </form>
    </section>
  );
}

export default BakeryAssistant;