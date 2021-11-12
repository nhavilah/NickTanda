import React from "react";
import { useState, useEffect } from "react";

function Logout() {

  const authenticate = (e) => {
    e.preventDefault()
    fetch(
      'http://127.0.0.1:3000/auth/logout',
      {
        method: 'DELETE',
        headers: {
          "Authorization": sessionStorage.getItem("sessionId")
        }
      }
    )
    .then(response => response.json())
    .then(data => console.log(data))
  }

  return (
    <div>
      <form onSubmit={authenticate}>
        <h1>Log Out</h1>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
}

export default Logout;
