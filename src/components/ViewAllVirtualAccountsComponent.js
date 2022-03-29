import { useState, useEffect } from "react";
import "../App";
import axios from "axios";
import cross from "../cross_icon.png";
import { REACT_APP_BACKEND_URL,REACT_APP_FRONTEND_URL } from "../config";

const ViewVirtualAccount = () => {
  const [data, setData] = useState("");
  const [modal, setModal] = useState(false);
  const [date, setDate] = useState();

  // INTEGRATE API OF VIEW ALL VIRTUAL ACCOUNTS
  useEffect(() => {
    axios({
      method: "get",
      url: `${REACT_APP_BACKEND_URL}/all_virtual_accounts/callback`,
    })
      .then((response) => {
        setData(response.data.virtualAccounts.items);

        for (let i = 0; i <= response.data.virtualAccounts.items.length; i++) {
          const unixTime = response.data.virtualAccounts.items[i].created_at;
          const responseDate = new Date(unixTime * 1000);
          const newDate = responseDate.toLocaleDateString("en-US");
          setDate(newDate);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // INTEGRATE API OF CLOSE VIRTUAL ACCOUNT
  const closeAccount = (id) => {
    try {
      axios({
        method: "POST",
        url: `${REACT_APP_BACKEND_URL}/virtual_accounts/${id}/close`,
      }).then((response) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  // INTEGRATE API OF VIEW VIRTUAL ACCOUNTS BY ID
  const viewAccounts = (id) => {
    setModal(true);
    axios({
      method: "get",
      url: `${REACT_APP_BACKEND_URL}/virtual_accounts/${id}`,
    })
      .then((response) => {
        setData(response.data.response.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeModal = () => {
    setModal(false);
    window.location.reload();
  };

  const createAccount = () => {
    window.location.href = `${REACT_APP_FRONTEND_URL}`;
  };
  return (
    <>
      {modal && (
        <>
          <div className="close">
            <div className="modal">
              <img src={cross} className="logo" onClick={closeModal} />
              <table>
                <h1>View Payments</h1>
                <tr>
                  <th>Payment Id</th>
                  <th>Amount</th>
                  <th>Created At</th>
                  <th>Status</th>
                </tr>

                {data.length > 0 &&
                  data.map((item, key) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.amount / 100}</td>
                        <td>{date}</td>
                        <td>{item.status}</td>
                      </tr>
                    );
                  })}
              </table>
            </div>
          </div>
        </>
      )}
      <table>
        <h1>Virtual Accounts</h1>
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
              return items.status === "active";
            })
            .map((item, key) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{date}</td>
                  <td>{item.amount_paid / 100}</td>
                  <td>
                    <button
                      class="btn1 btn-danger"
                      onClick={() => closeAccount(item.id)}
                    >
                      Close Account
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => viewAccounts(item.id)}
                      type="button"
                      class="btn2 btn-success"
                    >
                      View Accounts
                    </button>
                  </td>
                </tr>
              );
            })}
      </table>
      <button onClick={() => createAccount()} type="button" class="btn-success">
        Create Virtual Account
      </button>
    </>
  );
};

export default ViewVirtualAccount;
