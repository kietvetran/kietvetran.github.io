import React from "react";
import { createRoot } from "react-dom/client";

import Application from "./container/Application/Application";

const app = document.getElementById("app");
if (app) {
  createRoot(app).render(<Application />);
}
