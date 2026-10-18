# Ashley’s Bakery

A React single-page application for browsing bakery products, managing menu items, and asking an AI assistant questions about the menu.

## Features

- Home page with a bakery background image.
- Responsive product cards showing names, descriptions, categories, and prices.
- Product search that updates as the user types.
- Admin form for adding products.
- Editing of existing product details.
- Persistent product data through JSON Server.
- Local AI assistant powered by Ollama.
- Markdown rendering for assistant responses.
- Loading feedback, error messages, and form validation.

## Technologies

- React and Vite
- React Router
- JSON Server 0.17.4
- Ollama with llama3.2:1b
- react-markdown and remark-gfm
- CSS
- ESLint

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/shop` | Shop |
| `/admin` | Admin Portal |
| `/assistant` | Bakery Assistant |

## Component Hierarchy

- App
  - NavBar
  - Home, Shop, AdminPortal, or BakeryAssistant, depending on the route
  - Shop contains SearchBar and ProductList
  - ProductList contains a ProductCard for each product
  - AdminPortal contains ProductForm and, when editing, EditProductForm

## State and Props

App calls the custom useProducts hook, which uses useState and useEffect
to fetch and manage products, loading status, and errors.

App passes product data and update callbacks to child components through
props. After a successful POST or PATCH request, callbacks update the
shared product state so the Shop displays the saved changes.

Shop manages its search text locally. Product forms manage their input
values, saving status, and feedback locally. BakeryAssistant manages
question input, conversation messages, loading status, and errors.

useId connects form labels to their corresponding inputs.

## Data Requests

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/products` | Load products |
| POST | `/products` | Add a product |
| PATCH | `/products/:id` | Update a product |

JSON Server runs at http://localhost:3001 and saves changes in db.json.

## Setup

### 1. Install project dependencies

Open a terminal in the project folder:

```bash
npm install
```

### 2. Start JSON Server

```bash
npx json-server --watch db.json --port 3001
```

Leave this terminal running.

### 3. Start the React application

In a separate terminal:

```bash
npm run dev
```

Open the local address printed by Vite, normally http://localhost:5173.

### 4. Set up the AI assistant

Install Ollama from https://ollama.com.

Download the model:

```bash
ollama pull llama3.2:1b
```

Keep Ollama running while using the Assistant page. The application sends
requests to http://localhost:11434/api/chat.

For this project’s Windows/WSL setup, Ollama runs on Windows and the
React development server and JSON Server run in Ubuntu.

## Usage

- Select Shop to browse or search the menu.
- Select Admin Portal to add a product or edit an existing item.
- Select Assistant to ask questions about bakery products.
- Refresh Shop to confirm that saved product changes persist.

## AI Implementation and Limitations

The assistant sends the current menu and conversation to a local Ollama
model. When a question contains recognized category keywords, JavaScript
filters the supplied menu to those categories.

This keyword matching is basic and does not fully interpret complex
questions or follow-up references. AI responses can still contain
incorrect information or formatting. Verify names and prices against
the Shop menu.

The assistant cannot change products or guarantee allergy or dietary
safety. Conversation history resets when the Assistant component
unmounts or the browser refreshes.

## Other Limitations

- This is a local educational prototype.
- The Admin Portal does not include authentication or authorization.
- JSON Server and Ollama must run separately.
- Uploading the code to GitHub does not host the application or its APIs.
- Cursive font appearance depends on fonts installed on the viewer’s device.

## Verification

Completed checks:

- Navigation between pages.
- Loading products from JSON Server.
- Searching with matching and nonmatching text.
- Adding a product and confirming persistence after refresh.
- Editing a product and confirming persistence after refresh.
- Mobile layout at a 375-pixel viewport.
- Product-fetch error handling and recovery.
- Assistant connection-error handling and recovery.
- Manual checks of assistant responses against the menu.
- ESLint and production build.

Run code checks with:

```bash
npm run lint
npm run build
```

No automated unit test suite is configured.

## Image

The home page background was generated with AI for this project.

## Author

Ashley Lopez