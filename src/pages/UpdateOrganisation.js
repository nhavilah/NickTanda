import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function UpdateOrganisations() {
  let history = useHistory();
  const [formData,setFormData] = useState({
    name: "",
    hourlyRate: 0
  })
  const params = new URLSearchParams(window.location.search);
  let id = params.get("id")
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
        for(let i=0;i<data.length;i++){
          if(data[i].id == id){
            console.log("yes")
            setFormData({...formData, name: data[i].name, hourlyRate: data[i].hourlyRate})
          }
        }
      } 
    )
  },[])
  
  const [selection,setSelection] = useState("")

  const authenticate = (e) => {
    e.preventDefault()
    if(!formData.name || !formData.hourlyRate) {
      alert("Make sure you fill out all fields!")
    }else{
      fetch(
        `http://127.0.0.1:3000/organisations/${id}`,
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
      .then(() => 
        {
          history.replace("/listorganisation")
        } 
      )
    }
  }

  if(organisations[0] && formData.name.length !== 0){

    return (
      <div>
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
