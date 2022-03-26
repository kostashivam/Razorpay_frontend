import { useState, useEffect } from "react";
import "../App";
import axios from "axios";
import cross from "../cross_icon.png";

const ViewVirtualAccount = () => {
  const [data, setData] = useState("");
  const [modal, setModal] = useState(false);
console.log(data)
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/v1/all_virtual_accounts/callback`,
    })
      .then((response) => {
        setData(response.data.virtualAccounts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const closeAccount = (id,id2) => {
    try {
      let url = `http://localhost:5000/v1/virtual_accounts/${id}`;
      axios.post(url).then((res) => {
        // window.location.reload()
        console.log("res", res);
      });
      try {
        let url2 = `https://api.razorpay.com/v1/virtual_accounts/${id}/close`;
      axios.post(url2, "", {
        headers: {
          "Authorizations": "Basic cnpwX3Rlc3RfZG53VGV1T3c4NlEyckI6T1NpY0hWSlY3VkhtaDh1RldYMW0yeVpB",
          "Access-Control-Allow-Origin": "*"
        }
      }).then((err,resp) => {
        if(resp){
          console.log(resp);
        }
      })
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const makePayment = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };
  return (
    <>
      {modal && (
        <>
          <div className="close">
            <div className="modal">
              <img src={cross} className="logo" onClick={closeModal} />
              <div className="text67">
                <div style={{ fontSize: "28px" }}>Create Test Payment</div>
                <div className="text98">Amount(INR)</div>
                <input
                  type="text"
                  placeholder="Amount"
                  name="amount"
                />
                <div className="text98">Method</div>
                <select name="cars" id="cars" className="text98">
                  <option value="neft">NEFT</option>
                  <option value="rtgs">RTGS</option>
                  <option value="imps">IMPS</option>
                </select>
                <div></div>
                <button type="button" class="btn btn-primary">
                  Create
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <table>
        <tr>
          <th>Account Id</th>
          <th>created date</th>
          <th>Amount paid</th>
          <th>Action</th>
          <th>Payment</th>
        </tr>

        {data.length > 0 &&
          data
            .filter((items) => {
              return items.isDeleted === "true";
            })
            .map((item, key) => {
              return (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.updatedAt}</td>
                  <td>{item.amount}</td>

                  <td>
                    <button
                      class="btn1 btn-danger"
                      onClick={() => closeAccount(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => makePayment(item._id)}
                      type="button"
                      class="btn2 btn-success"
                    >
                      Make Payment
                    </button>
                  </td>
                </tr>
              );
            })}
      </table>
    </>
  );
};

export default ViewVirtualAccount;
