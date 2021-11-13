import React from "react";
import { useState, useEffect } from "react";

function ListUsers() {
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
        console.log(data)
        setUsers(data)
      } 
    )
  },[])

  if(users[0]){
    let test = users.map((user,i)=>{
      for(let i=0;i<organisations.length;i++){
        if(organisations[i].id === user.organisationId){
          return <div><h3>Name: {user.name}</h3><h3>Organisation: {organisations[i].name}</h3><h3>Email: {user.email}</h3></div>
        }
      }
    })
    return test
  }
  return <h1>Loading</h1>
}

export default ListUsers;
