import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Toaster } from "sonner";
import { TanstackQueryProvider } from "./components/TanstackQueryProvider/TanstackQueryProvider";
import { RouterProvider } from "react-router-dom";
import router from "./config/routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Toaster position="top-right" closeButton />
        <TanstackQueryProvider>
            <RouterProvider router={router} />
        </TanstackQueryProvider>
    </React.StrictMode>
);
