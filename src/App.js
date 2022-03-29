import React from "react";
import "./App.css";
import VirtualAccount from "./components/VirtualAccountComponent";
import ViewVirtualAccounts from "./components/ViewAllVirtualAccountsComponent";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<VirtualAccount />} />
      <Route path="/virtual" element={<ViewVirtualAccounts />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
