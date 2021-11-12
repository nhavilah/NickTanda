import React from "react";
import { useState, useEffect } from "react";

function UpdateOrganisations() {
  const [organisations,setOrganisations] = useState([])
  useEffect(()=>{
    fetch(
      'http://127.0.0.1:3000/organisations',
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
        setOrganisations(data)
      } 
    )
  },[])
  const [formData,setFormData] = useState({
    name: "",
    hourlyRate: 0
  })
  const [selection,setSelection] = useState("")

  const authenticate = (e) => {
    e.preventDefault()
    if(!formData.name || !formData.hourlyRate) {
      alert("Make sure you fill out all fields!")
    }else{
      fetch(
        `http://127.0.0.1:3000/organisations/${selection}`,
        {
          method: "put",
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
          alert("Successfully Updated "+formData.name)
        } 
      )
    }
  }

  if(organisations[0]){
    function DropDownOptions() {
      let test = organisations.map((organisation,i)=>{
        return <option value={organisation.id}>{organisation.name}</option>
      })
      return test
    }

    return (
      <div>
        <select placeholder="Select An Organisation" onChange={(e)=>setSelection(e.target.value)}>
          <option value="" disabled selected>Select An Organisation</option>
          <DropDownOptions />
        </select>
        <form onSubmit={authenticate}>
          <h1>Update Organisation</h1>
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

export default UpdateOrganisations;
