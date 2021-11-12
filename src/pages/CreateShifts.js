import React from "react";
import { useState, useEffect } from "react";

function CreateShifts() {
  const [users,setUsers] = useState([])
  const [selection,setSelection] = useState(0)
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
    .then(data => {
      setUsers(data)
    })
  },[])
  const [formData,setFormData] = useState({
    userId: 0,
    start: "2018-01-01 10:15",
    finish: "2018-01-01 12:20",
    breakLength: 50
  })

  const createShift = (e) => {
    e.preventDefault()
    if(!formData.userId || !formData.start || !formData.finish) {
      alert("Make sure you fill out all fields!")
    }else{
      fetch(
        'http://127.0.0.1:3000/shifts',
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("sessionId")
          },
          body: JSON.stringify({
            userId: selection,
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

  if(users[0]){
    function DropDownOptions() {
      let test = users.map((user,i)=>{
        return <option value={user.id}>{user.name}</option>
      })
      return test
    }

  return (
    <div>
      <select onChange={(e)=>{setSelection(e.target.value)}}>
        <DropDownOptions />
      </select>
      <form onSubmit={createShift}>
        <h1>Create Organisation</h1>
        <label>
          Name:
          <input type="text" name="name" onChange={(e)=>{setFormData({...formData, name: e.target.value})}} value={formData.name}/>
        </label>
        <br />
        <label>
          Hourly Rate:
          <input type="number" name="hourlyRate" onChange={(e)=>{setFormData({...formData, hourlyRate: e.target.value})}} value={formData.hourlyRate}/>
        </label>
        <br />
        <br />
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
  }
  return <h1>Loading</h1>
}

export default CreateShifts;
