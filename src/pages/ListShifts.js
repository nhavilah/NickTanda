import React from "react";
import { useState, useEffect } from "react";

function ViewShifts() {
  const [shifts,setShifts] = useState([])
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
        setShifts(data)
      } 
    )
  },[])

  if(shifts[0]) {
    let test = shifts.map((shift,i)=>{
      return <div><h3>User Id: {shift.userId}</h3></div>
    })
    return test
  }
  return <h1>Loading</h1>
}

export default ViewShifts;
