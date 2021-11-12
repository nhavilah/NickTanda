import React from "react";
import { useState, useEffect } from "react";

function GetInformation() {

  const authenticate = (e) => {
    e.preventDefault()
    fetch(
      'http://127.0.0.1:3000/users/me',
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "Authorization": sessionStorage.getItem("sessionId")
        }
      }
    )
    .then(response => response.json())
    .then(data => 
      {
        console.log(data)
      } 
    )
  }

  return (
    <div>
      <h1>View Me</h1>
    </div>
  );
}

export default ListUsers;
