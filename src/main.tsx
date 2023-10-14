import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Toaster } from "sonner";
import { TanstackQueryProvider } from "./components/TanstackQueryProvider/TanstackQueryProvider";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { router } from "./components/Router/Route";

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
