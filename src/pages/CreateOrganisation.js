import React from "react";
import { useState, useEffect } from "react";

function CreateOrganisations() {
  const [formData,setFormData] = useState({
    name: "",
    hourlyRate: 0
  })

  const authenticate = (e) => {
    e.preventDefault()
    if(!formData.name || !formData.hourlyRate) {
      alert("Make sure you fill out all fields!")
    }else{
      fetch(
        'http://127.0.0.1:3000/organisations/create_join',
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("sessionId")
          },
          body: JSON.stringify({
            name: formData.name,
            hourlyRate: formData.hourlyRate
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

export default CreateOrganisations;
