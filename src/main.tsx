import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Toaster } from "sonner";
import { TanstackQueryProvider } from "./components/TanstackQueryProvider/TanstackQueryProvider";
import { RouterProvider } from "react-router-dom";
import router from "./config/routes";
import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Toaster position="top-right" closeButton />
        <Provider store={store}>
            <TanstackQueryProvider>
                <RouterProvider router={router} />
            </TanstackQueryProvider>
        </Provider>
    </React.StrictMode>
);
