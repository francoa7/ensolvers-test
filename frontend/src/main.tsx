import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import theme from "./theme";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

axios.defaults.baseURL =
    import.meta.env.VITE_APP_API || "http://localhost:5000";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <Auth0Provider
                    domain="dev-uu7cywer.us.auth0.com"
                    clientId="BHfTfnqUKmITYTqy5JN0yibzTK4dxIS8"
                    redirectUri={`${window.location.origin}`}
                >
                    <Provider store={store}>
                        <App />
                    </Provider>
                </Auth0Provider>
            </ChakraProvider>
        </BrowserRouter>
    </React.StrictMode>
);
