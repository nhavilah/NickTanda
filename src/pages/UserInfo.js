import React from "react";
import {useState, useEffect} from "react";

function UserInfo() {
    const [formData, setFormData] = useState({name: "", email: ""})
    const [passwordData, setPasswordData] = useState({oldPassword: "", password: "", passwordConfirmation: ""})

    //store organisations in page state
    const [organisations, setOrganisations] = useState([])
    useEffect(() => {
        fetch('http://127.0.0.1:3000/organisations', {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("sessionId")
            }
        }).then(response => response.json()).then(data => {
            setOrganisations(data)
        })
    }, [])
    //store user information in page state
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
    //change details functionality
    const changeDetails = (e) => {
        e.preventDefault()
        //error handling
        if (!formData.name.length > 0 || !formData.email.length > 0) {
            alert("Make Sure You Fill In All Fields")
        } else {
            fetch('http://127.0.0.1:3000/users/me', {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": sessionStorage.getItem("sessionId")
                },
                body: JSON.stringify(
                    {name: formData.name, email: formData.email}
                )
            }).then(response => response.json()).then(data => {
                if (data.id) {
                    alert("Detail Change Successful")
                    window.location.reload(true);
                } else {
                    alert("Unknown Error: Please Try Again")
                }
            })
        }
    }

    //change password functionality
    const changePassword = (e) => {
        e.preventDefault();
        if (!passwordData.oldPassword.length > 0 || !passwordData.password.length > 0 || !passwordData.passwordConfirmation.length > 0) {
            alert("Make Sure You Fill Out All Fields")
        } else {
            if (passwordData.password !== passwordData.passwordConfirmation) {
                alert("New Passwords Do Not Match. Please Make Sure Your New Passwords Match")
            } else {
                fetch('http://127.0.0.1:3000/users/me/change_password', {
                    method: "put",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": sessionStorage.getItem("sessionId")
                    },
                    body: JSON.stringify(
                        {oldPassword: passwordData.oldPassword, newPassword: passwordData.password, newPasswordConfirmation: passwordData.passwordConfirmation}
                    )
                }).then(response => {
                    if (response.status !== 200) {
                        alert("Current Password Incorrect. Please Check Your Passwords Are Correct")
                    } else {
                        alert("Password Change Successful");
                        window.location.reload(true);
                    }
                })
            }
        }
    }

    if (info) {
        for (let i = 0; i < organisations.length; i++) {
            if (organisations[i].id === info.organisationId) {
                return (
                    <div>
                        <h1>
                            <u>About Me</u>
                        </h1>
                        <h2>Name: {
                            info.name
                        }</h2>
                        <h2>Organisation: {
                            organisations[i].name
                        }</h2>
                        <h2>Email: {
                            info.email
                        }</h2>
                        <br/>
                        <form onSubmit={changeDetails}>
                            <h1>Change My Details</h1>
                            <label>Name</label>
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
                            <input type="submit" className="submit" value="Submit"/>
                        </form>
                        <br/>
                        <form onSubmit={changePassword}>
                            <h1>Change My Password</h1>
                            <label>Old Password</label>
                            <input type="password" placeholder="Old Password" name="oldPassword"
                                onChange={
                                    (e) => {
                                        setPasswordData({
                                            ...passwordData,
                                            oldPassword: e.target.value
                                        })
                                    }
                                }
                                value={
                                    passwordData.oldPassword
                                }/>
                            <br/>
                            <label>New Password</label>
                            <input type="password" placeholder="Password" name="newPassword"
                                onChange={
                                    (e) => {
                                        setPasswordData({
                                            ...passwordData,
                                            password: e.target.value
                                        })
                                    }
                                }
                                value={
                                    passwordData.password
                                }/>
                            <br/>
                            <label>Password Confirmation</label>
                            <input type="password" placeholder="Password Confirmation" name="newPassword"
                                onChange={
                                    (e) => {
                                        setPasswordData({
                                            ...passwordData,
                                            passwordConfirmation: e.target.value
                                        })
                                    }
                                }
                                value={
                                    passwordData.passwordConfirmation
                                }/>
                            <br/>
                            <input type="submit" className="submit" value="Submit"/>
                        </form>
                    </div>
                );
            }
        }
    }
    return <h1>Loading</h1>
}

export default UserInfo;
