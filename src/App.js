import React from "react";
import "./App.css";
import VirtualAccount from "./components/VirtualAccountComponent";
import ViewVirtualAccounts from "./components/ViewAllVirtualAccountsComponent";
// import PaymentStatus from "./components/PaymentStatusComponent";
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
      {/* <Route exact path="/payment/status/:paymentId" component={PaymentStatus} /> */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
