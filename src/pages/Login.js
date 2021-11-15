import React from "react";
import {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";

function Login() {
    let history = useHistory();
    const [formData, setFormData] = useState({email: "", password: ""})
    //remember me functionality
    useEffect(()=>{
      if(sessionStorage.getItem("username") && sessionStorage.getItem("password")){
        setFormData({
          ...formData,
          email: sessionStorage.getItem("username"),
          password: sessionStorage.getItem("password")
        })
      }
    },[])
    //login functionality
    const authenticate = (e) => {
        e.preventDefault()
        //error handling
        if (!formData.password || !formData.email) {
            alert("Make sure you fill in the fields!")
        } else {
            fetch('http://127.0.0.1:3000/auth/login', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": sessionStorage.getItem("sessionId")
                },
                body: JSON.stringify(
                    {email: formData.email, password: formData.password}
                )
            }).then(response => response.json()).then(data => {
                if (data.sessionId) {
                    alert("Login Successful")
                    console.log(data.sessionId)
                    sessionStorage.setItem("sessionId", data.sessionId)
                    let checkbox = document.getElementById("checkbox")
                    //store the user credentials if remember me is ticked
                    if(checkbox.checked){
                      sessionStorage.setItem("username",formData.email)
                      sessionStorage.setItem("password",formData.password)
                    }else{
                      if(sessionStorage.getItem("username") && sessionStorage.getItem("password")){
                        sessionStorage.removeItem("username")
                        sessionStorage.removeItem("password")
                      }
                    }
                    history.replace("/listorganisation")
                    window.location.reload(true);
                } else {
                  //error handling
                    alert("Login Details Are Incorrect. Check Username And Password, Or Sign Up!")
                }
            })
        }
    }

    return (
        <div>
            <form onSubmit={authenticate}>
                <h1>
                    <u>Log In</u>
                </h1>
                <label>Email</label>
                <br />
                <input type="email" placeholder="Email" name="email"
                    onChange={
                        (e) => {
                            setFormData({
                                ...formData,
                                email: e.target.value
                            })
                        }
                    }
                    value={
                        formData.email
                    }/>
                <br/>
                <label>Password</label>
                <br />
                <input type="password" placeholder="Password" name="password"
                    onChange={
                        (e) => {
                            setFormData({
                                ...formData,
                                password: e.target.value
                            })
                        }
                    }
                    value={
                        formData.password
                    }/>
                <br/>
                <input type="submit" className="submit" value="Submit"/>
            </form>
            <label>Remember Me</label>
            <br />
            <input type="checkbox" id="checkbox"/>
        </div>
    );
}

export default Login;
