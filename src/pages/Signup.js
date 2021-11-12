import React from "react";
import { useState, useEffect } from "react";

function SignUp() {
  const [formData,setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const authenticate = (e) => {
    e.preventDefault()
    if(formData.password !== formData.confirmPassword) {
      alert("Make sure your passwords match!")
    }else{
      console.log("yes")
      fetch(
        'http://127.0.0.1:3000/auth/signup',
        {
          method: "post",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            passwordConfirmation: formData.confirmPassword
          })
        }
      )
      .then(response => response.json())
      .then(data => 
        {
          if(data.sessionId){
            sessionStorage.setItem("sessionId",data.sessionId)
          }else{
            alert("User already exists! Please log in")
          }
        } 
      )
    }
  }

  return (
    <div>
      <form onSubmit={authenticate}>
        <h1>Sign Up</h1>
        <label>
          Name:
          <input type="text" name="name" onChange={(e)=>{setFormData({...formData, name: e.target.value})}} value={formData.name}/>
        </label>
        <br />
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
        <label>
          Confirm Password:
          <input type="password" name="confirmPassword" onChange={(e)=>{setFormData({...formData, confirmPassword: e.target.value})}} value={formData.confirmPassword}/>
        </label>
        <br />
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
}

export default SignUp;
