import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function ViewShifts() {
  let history = useHistory();
  const [updateTrigger,setUpdateTrigger] = useState("")
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
  const [users,setUsers] = useState([])
  useEffect(()=>{
    fetch(
      'http://127.0.0.1:3000/users',
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
        setUsers(data)
      } 
    )
  },[])

  function DeleteShift(id) {
    fetch(
      `http://127.0.0.1:3000/shifts/delete/${id}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          "Authorization": sessionStorage.getItem("sessionId")
        }
      }
    )
    //use state update to trigger page refresh so the fetched stuff gets reloaded
    setUpdateTrigger("updated")
  }

  if(shifts[0]) {
    let test = shifts.map((shift,i)=>{
      for(let i=0; i<users.length;i++){
        if(users[i].id === shift.userId){
          return <div><h3>Shift Id: {shift.id}</h3><h3>User: {users[i].name}</h3><h3>Start Time: {shift.start}</h3><h3>Finish Time: {shift.finish}</h3><h3>Break Length: {shift.breakLength}</h3><button onClick={()=>{history.replace(`/updateshifts?id=${shift.id}`)}}>Update</button><button onClick={()=>{DeleteShift(shift.id)}}>Delete Shift</button></div>
        }
      }
    })
    return test
  }
  return <h1>Loading</h1>
}

export default ViewShifts;
