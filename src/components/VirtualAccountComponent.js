import { useState } from "react";
import "../App";
import { REACT_APP_BACKEND_URL, REACT_APP_FRONTEND_URL } from "../config";

function VirtualAccount() {
  const [customer_name, setCustomer_name] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  // INTEGRATE API OF CREATE VIRTUAL ACCOUNT
  function handleSubmit(e) {
    e.preventDefault();
    if (description === "" && customer_name === "") {
      setError(true);
      return false;
    } else if (description === "") {
      setError(true);
      return false;
    } else {
      fetch(`${REACT_APP_BACKEND_URL}/virtual_accounts`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customer_name, description }),
      }).then((result) => {
        result
          .json()
          .then(() => {
            if (result.status === 201) {
              window.location.href = `${REACT_APP_FRONTEND_URL}/virtual`;
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
            {error && customer_name.trim() === "" && (
              <p className="invalid_error">Customer is required</p>
            )}
            <div className="text98">Description</div>
            <input
              type="text"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              value={description}
            />
            {error && description.trim() === "" && (
              <p className="invalid_error">Description is required</p>
            )}
            <button className="btn" onClick={handleSubmit}>
              Create Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default VirtualAccount;
