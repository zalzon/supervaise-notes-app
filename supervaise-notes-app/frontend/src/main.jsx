// Entry point for the React application
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Mount the App component to the DOM, wrapped in React StrictMode for highlighting potential problems
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
