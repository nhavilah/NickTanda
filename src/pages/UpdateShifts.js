import React from "react";
import {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";

function UpdateShifts() {
    let history = useHistory();
    const params = new URLSearchParams(window.location.search);
    let id = params.get("id")
    const [formData, setFormData] = useState({start: "2018-01-01 10:15", finish: "2018-01-01 12:20", breakLength: 50})
    const [selection, setSelection] = useState("")
    // get users
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetch('http://127.0.0.1:3000/users', {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("sessionId")
            }
        }).then(response => response.json()).then(data => {
            setUsers(data)
        })
    }, [])
    // get shifts
    const [shifts, setShifts] = useState([])
    useEffect(() => {
        fetch('http://127.0.0.1:3000/shifts', {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("sessionId")
            }
        }).then(response => response.json()).then(data => {
            setShifts(data)
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == id) {
                    setFormData({
                        ...formData,
                        start: data[i].start,
                        finish: data[i].finish,
                        breakLength: data[i].breakLength
                    })
                }
            }
        })
    }, [])

    const authenticate = (e) => {
        e.preventDefault()
        if (!formData.start || !formData.finish) {
            alert("Make sure you fill out all fields!")
        } else {
            fetch(`http://127.0.0.1:3000/shifts/${id}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": sessionStorage.getItem("sessionId")
                },
                body: JSON.stringify(
                    {start: formData.start, finish: formData.finish, breakLength: formData.breakLength}
                )
            }).then(() => {
                alert("Successfully updated shift")
                history.replace("/listshifts")
            })
        }
    }


    return (
        <div>
            <form onSubmit={authenticate}>
                <h1>
                    <u>Update Shifts</u>
                </h1>
                <br/>
                <input type="text" placeholder="Start" name="name"
                    onChange={
                        (e) => {
                            setFormData({
                                ...formData,
                                start: e.target.value
                            })
                        }
                    }
                    value={
                        formData.start
                    }/>
                <br/>
                <input type="text" placeholder="Finish" name="name"
                    onChange={
                        (e) => {
                            setFormData({
                                ...formData,
                                finish: e.target.value
                            })
                        }
                    }
                    value={
                        formData.finish
                    }/>
                <br/>
                <input type="text" placeholder="Break Length" name="name"
                    onChange={
                        (e) => {
                            setFormData({
                                ...formData,
                                breakLength: e.target.value
                            })
                        }
                    }
                    value={
                        formData.breakLength
                    }/>
                <br/>
                <br/>
                <input type="submit" className="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default UpdateShifts;
