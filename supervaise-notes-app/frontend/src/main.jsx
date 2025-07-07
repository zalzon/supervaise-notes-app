// Entry point for the React application
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);

// Mount the App component to the DOM, wrapped in React StrictMode for highlighting potential problems
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Authenticator>
      <App />
    </Authenticator>
  </StrictMode>
);
