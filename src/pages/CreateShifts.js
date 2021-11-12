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
      console.log(data)
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
    if(!selection || !formData.start || !formData.finish) {
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
          if(data.length === 5) {
            alert("Shift Created Successfully")
          }
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
      <h1>Add User</h1>
      <select onChange={(e)=>{setSelection(e.target.value)}}>
        <option value="" disabled selected>Select A User</option>
        <DropDownOptions />
      </select>
      <form onSubmit={createShift}>
        <h1>Create Shift</h1>
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
  return <h1>Loading</h1>
}

export default CreateShifts;
