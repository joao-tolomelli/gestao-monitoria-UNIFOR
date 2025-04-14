import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { createRoot } from "react-dom/client";
import "./index.css";
import 'primeicons/primeicons.css'; // Esta linha é ESSENCIAL para os ícones aparecerem
import 'primereact/resources/primereact.min.css'; // estilos base

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <PrimeReactProvider>
    <App />
  </PrimeReactProvider>
);
