import React from "react";
import {useState, useEffect} from "react";

function ListUsers() {
  //store organisations so we can see where the users belong to
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
    //store the users in page state
    const [users, setUsers] = useState([])
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

    //check for users in state
    if (users[0]) {
        function Content() {
            let test = users.map((user, i) => {
                for (let i = 0; i < organisations.length; i++) {
                    if (organisations[i].id === user.organisationId) {
                        return <div>
                            <h3>Name: {
                                user.name
                            }</h3>
                            <h3>Organisation: {
                                organisations[i].name
                            }</h3>
                            <h3>Email: {
                                user.email
                            }</h3>
                            <hr />
                        </div>
                    }
                }
            })
            return test
        }
        return <>
            <h1>
                <u>Users</u>
            </h1>
            <Content/>
        </>
    }
    return <h1>Loading Users....If You Can't See Anything Loading, Make Sure You've Joined An Organisation!</h1>
}

export default ListUsers;
