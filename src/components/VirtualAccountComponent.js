import { useState } from "react";
import '../App'

function VirtualAccount() {

  const [customer_name, setCustomer_name] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleClick(e) {
    e.preventDefault();
    fetch("http://localhost:5000/v1/virtual_accounts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customer_name, description }),
    }).then((result) => {
      result
        .json()
        .then((resp) => {
          if (result.status === 201) {
            window.location.href = "http://localhost:3000/virtual";
            setCustomer_name("");
            setDescription("");
          } else {
            const error1 = "Invalid Login";
            setError(error1);
          }
        })
        .catch((error) => {
          console.log("Data not saved", error);
        });
    });
  }

  return (
    <>
      <div className="container_sign">
        <div className="contain_sign">
          <div className="text67">
            <div style={{ fontSize: "28px" }}>Create Virtual Account</div>

            <div className="text98">Username</div>
            <input
              type="text"
              placeholder="UserName"
              name="customer_name"
              value={customer_name}
              onChange={(e) => setCustomer_name(e.target.value)}
            />
            <div className="text98">Description</div>
            <input
              type="text"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              value={description}
            />
            <div></div>
            <span className="invalid_error">{error}</span>
            <button className="btn" onClick={handleClick} >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default VirtualAccount;
