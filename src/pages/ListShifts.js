import React from "react";
import { useState, useEffect } from "react";

function ViewShifts() {
  useEffect(()=>{
    fetch(
      'http://127.0.0.1:3000/shifts',
      {
        method: "get",
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
  },[])

  return (
    <div>
      <h1>View Shifts</h1>
    </div>
  );
}

export default ViewShifts;
