import React from "react";
import {useState} from "react";

function SignUp() {
    const [formData, setFormData] = useState({name: "", email: "", password: "", confirmPassword: ""})

    const authenticate = (e) => {
        e.preventDefault()
        //error handling
        if (formData.password !== formData.confirmPassword) {
            alert("Make sure your passwords match!")
        } else if (formData.name.length === 0 || formData.email.length === 0 || formData.password.length === 0 || formData.confirmPassword.length === 0) {
            alert("Please Fill In All Fields!")
        } else {
            fetch('http://127.0.0.1:3000/auth/signup', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {name: formData.name, email: formData.email, password: formData.password, passwordConfirmation: formData.confirmPassword}
                )
            }).then(response => response.json()).then(data => {
                if (data.sessionId) {
                    sessionStorage.setItem("sessionId", data.sessionId)
                } else {
                    alert("User already exists! Please log in")
                }
            })
        }
    }

    return (
        <div>
            <form onSubmit={authenticate}>
                <h1>
                    <u>Sign Up</u>
                </h1>
                <label>Name</label>
                <br />
                <input type="text" placeholder="Name" name="name"
                    onChange={
                        (e) => {
                            setFormData({
                                ...formData,
                                name: e.target.value
                            })
                        }
                    }
                    value={
                        formData.name
                    }/>
                <br/>
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
                <label>Confirm Password</label>
                <br />
                <input type="password" placeholder="Confirm Password" name="confirmPassword"
                    onChange={
                        (e) => {
                            setFormData({
                                ...formData,
                                confirmPassword: e.target.value
                            })
                        }
                    }
                    value={
                        formData.confirmPassword
                    }/>
                <br/>
                <input type="submit" className="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default SignUp;
