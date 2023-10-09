import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Toaster } from "sonner";
import { TanstackQueryProvider } from "./components/TanstackQueryProvider/TanstackQueryProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Toaster position="top-right" closeButton />
        <TanstackQueryProvider>
            <>Hello world</>
        </TanstackQueryProvider>
    </React.StrictMode>
);
