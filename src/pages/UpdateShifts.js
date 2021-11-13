import React from "react";
import { useState, useEffect } from "react";

function UpdateShifts() {
  const [selection,setSelection] = useState("")
  //get users
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
  //get shifts
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

  const [formData,setFormData] = useState({
    start: "2018-01-01 10:15",
    finish: "2018-01-01 12:20",
    breakLength: 50
  })

  const authenticate = (e) => {
    e.preventDefault()
    if(!formData.start || !formData.finish || !selection.length > 0 ) {
      alert("Make sure you fill out all fields!")
    }else{
      fetch(
        `http://127.0.0.1:3000/shifts/${selection}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("sessionId")
          },
          body: JSON.stringify({
            start: formData.start,
            finish: formData.finish,
            breakLength: formData.breakLength
          })
        }
      )
      .then(response => response.json())
      .then(data => 
        {
          console.log(data)
        } 
      )
    }
  }

  function ShiftDropdown() {
    let test = shifts.map((shift,item)=>{
      for(let i=0;i<users.length;i++){
        if(users[i].id===shift.userId){
          return <option value={shift.id}>{shift.id} {users[i].name} Starting {shift.start} Finishing {shift.finish}</option>
        }
      }
    })  
    return test
  }

  return (
    <div>
      <form onSubmit={authenticate}>
        <h1>Update Shifts</h1>
        <h3>Choose Shift</h3>
        <select onChange={(e)=>{setSelection(e.target.value)}}>
          <option selected disabled>Select A Shift</option>
          <ShiftDropdown />
        </select>
        <br />
        <label>
          Start:
          <input type="text" name="name" onChange={(e)=>{setFormData({...formData, start: e.target.value})}} value={formData.start}/>
        </label>
        <br />
        <label>
          Finish:
          <input type="text" name="name" onChange={(e)=>{setFormData({...formData, finish: e.target.value})}} value={formData.finish}/>
        </label>
        <br />
        <label>
          Break Length:
          <input type="text" name="name" onChange={(e)=>{setFormData({...formData, breakLength: e.target.value})}} value={formData.breakLength}/>
        </label>
        <br />
        <br />
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
}

export default UpdateShifts;
