import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App"; // 확장자 .tsx로 만들었으면 .jsx 안 써도 됨

const container = document.getElementById("root");

if (container) {
  createRoot(container as HTMLElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
