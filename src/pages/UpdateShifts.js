import React from "react";
import { useState, useEffect } from "react";

function JoinOrganisations() {
  const [formData,setFormData] = useState({
    start: "2018-01-01 10:15",
    finish: "2018-01-01 12:20",
    breakLength: 50
  })

  const authenticate = (e) => {
    e.preventDefault()
    if(!formData.name || !formData.hourlyRate) {
      alert("Make sure you fill out all fields!")
    }else{
      fetch(
        'http://127.0.0.1:3000/shifts/:id',
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

  return (
    <div>
      <form onSubmit={authenticate}>
        <h1>Update Organisation</h1>
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

export default JoinOrganisations;
