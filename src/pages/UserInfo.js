import React from "react";
import {useState, useEffect} from "react";

function UserInfo() {
    const [formData, setFormData] = useState({name: "", email: ""})
    const [passwordData, setPasswordData] = useState({oldPassword: "", password: "", passwordConfirmation: ""})

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

    const changeDetails = (e) => {
        e.preventDefault()
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

    const changePassword = (e) => {
        e.preventDefault();
        if (!passwordData.oldPassword.length > 0 || !passwordData.password.length > 0 || !passwordData.passwordConfirmation.length > 0) {
            alert("Make Sure You Fill Out All Fields")
        } else {
            fetch('http://127.0.0.1:3000/users/me/change_password', {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": sessionStorage.getItem("sessionId")
                },
                body: JSON.stringify(
                    {oldPassword: passwordData.oldPassword, newPassword: passwordData.password, newPassowrdConfirmation: passwordData.passwordConfirmation}
                )
            }).then(() => {
                alert("Password Change Successful");
                window.location.reload(true);
            })
        }
    }

    if (info) {
        for (let i = 0; i < organisations.length; i++) {
            if (organisations[i].id === info.organisationId) {
                return (
                    <div>
                        <h1>About Me</h1>
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
                            <label>
                                Name:
                                <input type="text" name="name"
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
                            </label>
                        <br/>
                        <label>
                            Email:
                            <input type="email" name="email"
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
                        </label>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
                <br/>
                <form onSubmit={changePassword}>
                    <h1>Change My Password</h1>
                    <label>
                        Old Password:
                        <input type="password" name="oldPassword"
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
                    </label>
                <br/>
                <label>
                    Password:
                    <input type="password" name="newPassword"
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
                </label>
            <br/>
            <label>
                Password Confirmation:
                <input type="password" name="newPassword"
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
            </label>
        <br/>
        <input type="submit" value="Submit"/>
    </form>
</div>
                );
            }
        }
    }
    return <h1>Loading</h1>
}

export default UserInfo;
