import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/app.tsx";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/index.ts";
import { decideThemeBasedOnOSSettings } from "./app/utils.ts";

decideThemeBasedOnOSSettings();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);