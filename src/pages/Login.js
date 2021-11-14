import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Login() {
  let history = useHistory();
  const [formData,setFormData] = useState({
    email: "",
    password: ""
  })

  const authenticate = (e) => {
    e.preventDefault()
    if(!formData.password || !formData.email) {
      alert("Make sure you fill in the fields!")
    }else{
      fetch(
        'http://127.0.0.1:3000/auth/login',
        {
          method: "post",
          headers: {
            "Content-Type":"application/json",
            "Authorization":sessionStorage.getItem("sessionId")
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        }
      )
      .then(response => response.json())
      .then(data => 
        {
          if(data.sessionId){
            alert("Login Successful")
            console.log(data.sessionId)
            sessionStorage.setItem("sessionId",data.sessionId)
            history.replace("/listorganisation")
            window.location.reload(true);
          }else{
            alert("Login Details Are Incorrect. Check Username And Password, Or Sign Up!")
          }
        } 
      )
    }
  }

  return (
    <div>
      <form onSubmit={authenticate}>
        <h1>Log In</h1>
        <label>
          Email:
          <input type="email" name="email" onChange={(e)=>{setFormData({...formData, email: e.target.value})}} value={formData.email}/>
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" onChange={(e)=>{setFormData({...formData, password: e.target.value})}} value={formData.password}/>
        </label>
        <br />
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
}

export default Login;
