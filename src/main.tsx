import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Toaster position="top-right" closeButton />
        <>Hello world</>
    </React.StrictMode>
);
