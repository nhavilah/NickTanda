import React from "react";
import {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";

function CreateShifts() {
  //allows for page navigation
    let history = useHistory();
    //get user data so we can display on the page
    const [users, setUsers] = useState([])
    const [selection, setSelection] = useState(0)
    useEffect(() => {
        fetch('http://127.0.0.1:3000/users', {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("sessionId")
            }
        }).then(response => response.json()).then(data => {
            console.log(data)
            setUsers(data)
        })
    }, [])

    //store form results
    const [formData, setFormData] = useState({userId: 0, start: "2018-01-01 10:15", finish: "2018-01-01 12:20", breakLength: 50})

    const createShift = (e) => {
        e.preventDefault()
        //make sure form is filled out
        if (!selection || !formData.start || !formData.finish) {
            alert("Make sure you fill out all fields!")
        } else {
            fetch('http://127.0.0.1:3000/shifts', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": sessionStorage.getItem("sessionId")
                },
                body: JSON.stringify(
                    {userId: selection, start: formData.start, finish: formData.finish, breakLength: formData.breakLength}
                )
            }).then(response => response.json()).then(data => {
                if (data.start) {
                    alert("Shift Created Successfully")
                    history.replace("/listshifts")
                }
            })
        }
    }

    //create dropdown to select users with
    if (users[0]) {
        function DropDownOptions() {
            let test = users.map((user, i) => {
                return <option value={
                    user.id
                }>
                    {
                    user.name
                }</option>
            })
            return test
        }

        return (
            <div>
                <h1>Add User</h1>
                <select onChange={
                    (e) => {
                        setSelection(e.target.value)
                    }
                }>
                    <option value="" disabled selected>Select A User</option>
                    <DropDownOptions/>
                </select>
                <form onSubmit={createShift}>
                    <h1>
                        <u>Create Shift</u>
                    </h1>
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
    return <h1>Loading</h1>
}

export default CreateShifts;
