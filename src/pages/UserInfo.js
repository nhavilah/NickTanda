import React from "react";
import { useState,useEffect } from "react";

function UserInfo() {
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
    const [info,setInfo] = useState([])
    useEffect(()=>{
        fetch(
            'http://127.0.0.1:3000/users/me',
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
              setInfo(data)
            } 
          )
    },[])

    if(info){
        for(let i=0;i<organisations.length;i++){
            if(organisations[i].id === info.organisationId){
                return (
                    <div>
                        <h1>About Me</h1>
                        <h2>Name: {info.name}</h2>
                        <h2>Organisation: {organisations[i].name}</h2>
                        <h2>Email: {info.email}</h2>
                    </div>
                );
            }
        }
    }
    return <h1>Loading</h1>
}

export default UserInfo;