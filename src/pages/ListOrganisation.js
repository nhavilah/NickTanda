import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function ViewOrganisations() {
  let history = useHistory();
  const [info, setInfo] = useState([])
    useEffect(() => {
        fetch('http://127.0.0.1:3000/users/me', {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("sessionId")
            }
        }).then(response => response.json()).then(data => {
            console.log(data)
            setInfo(data)
        })
    }, [])
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

  function JoinOrganisation(id,name) {
    fetch(
      'http://127.0.0.1:3000/organisations/join',
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": sessionStorage.getItem("sessionId")
        },
        body: JSON.stringify({organisationId:id})
      }
    )
    .then(response => response.json())
    .then(() => 
      {
        alert("Joined "+name)
        window.location.reload(true);
      } 
    )
  }

  function LeaveOrganisation(name) {
    fetch(
      'http://127.0.0.1:3000/organisations/leave',
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": sessionStorage.getItem("sessionId")
        }
      }
    )
    .then(()=>{
      alert("Left "+name)
      window.location.reload(true);
    })
  }

  if(organisations[0]){
    let test = organisations.map((organisation,i)=>{
      if(organisation.id === info.organisationId){
        return <div><h3>Name: {organisation.name}(You Are Part Of This)</h3><h3>Hourly Rate: {organisation.hourlyRate}</h3><button onClick={()=>JoinOrganisation(organisation.id,organisation.name)}>Join</button><button onClick={()=>{history.replace(`/updateorganisation?id=${organisation.id}`)}}>Update</button><button onClick={()=>LeaveOrganisation(organisation.name)}>Leave</button></div> 
      }else{
        return <div><h3>Name: {organisation.name}</h3><h3>Hourly Rate: {organisation.hourlyRate}</h3><button onClick={()=>JoinOrganisation(organisation.id,organisation.name)}>Join</button><button onClick={()=>{history.replace(`/updateorganisation?id=${organisation.id}`)}}>Update</button><button onClick={()=>LeaveOrganisation(organisation.name)}>Leave</button></div>
      }
    })
    return test
  }

  return <h1>Loading Organisations....If You Can't See Anything Loading, Create An Organisation!</h1>
}

export default ViewOrganisations;
