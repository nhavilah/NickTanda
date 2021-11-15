import React from "react";
import {useHistory} from "react-router-dom";

function Logout() {
  let history = useHistory()
  const authenticate = (e) => {
      e.preventDefault()
      fetch('http://127.0.0.1:3000/auth/logout', {
          method: 'DELETE',
          headers: {
              "Authorization": sessionStorage.getItem("sessionId")
          }
      })
      .then(() => {
          alert("Logging Out")
          sessionStorage.removeItem("sessionId")
          history.replace("/login")
          window.location.reload(true);
      })
    }

    return (
        <div>
            <form onSubmit={authenticate}>
                <h1>
                    <u>Log Out</u>
                </h1>
                <input type="submit" className="submit" value="Log Out"/>
            </form>
        </div>
    );
}

export default Logout;
