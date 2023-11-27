import React from "react";
import { createRoot } from "react-dom/client";
import { HelloComponent } from "./hello.component";
const root = createRoot(document.getElementById("root"));

root.render(
    <div>
        {process.env.NODE_ENV}
        <HelloComponent />
    </div>
);