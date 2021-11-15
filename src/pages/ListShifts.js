import React from "react";
import {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import moment from "moment";

function ViewShifts() {
    let history = useHistory();
    //store the company data
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
        })
    }, [])
    //get users to add descriptions to the shifts
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

    //delete shift functionality
    function DeleteShift(id) {
        fetch(`http://127.0.0.1:3000/shifts/${id}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("sessionId")
            }
        }).then(() => {
            alert("Shift Deleted Successfully")
            window.location.reload(true)
        })
    }

    if (shifts[0]) {
        function Content() {
            let test = shifts.map((shift, i) => {
                for (let i = 0; i < users.length; i++) {
                    if (users[i].id === shift.userId) {
                      for(let i=0;i<organisations.length;i++){
                        if(organisations[i].id === users[i].organisationId){
                          let time = moment.utc(moment(shift.finish,"YYYY/MM/DD HH:mm").diff(moment(shift.start,"YYYY/MM/DD HH:mm"))).format("HH:mm")
                          let breakTime = (parseInt(shift.breakLength)/60).toFixed(2)
                          let hoursWorked = moment.utc(moment(shift.finish,"YYYY/MM/DD HH:mm").diff(moment(shift.start,"YYYY/MM/DD HH:mm"))).format("HH")
                          let cost = (hoursWorked - breakTime) * organisations[i].hourlyRate
                          return <div>
                          <h3>Shift Id: {
                              shift.id
                          }</h3>
                          <h3>User: {
                              users[i].name
                          }</h3>
                          <h3>Organisation: {organisations[i].name}</h3>
                          <h3>Start Time: {
                              shift.start
                          }</h3>
                          <h3>Finish Time: {
                              shift.finish
                          }</h3>
                          <h3>Break Length(minutes): {
                              shift.breakLength
                          }</h3>
                          <h3>
                            Shift Length: {
                              time
                            }
                          </h3>
                          <h3>
                            Shift Cost: ${
                              cost
                            }
                          </h3>
                          <button onClick={
                              () => {
                                  history.replace(`/updateshifts?id=${
                                      shift.id
                                  }`)
                              }
                          }>Update Shift</button>
                          <button onClick={
                              () => {
                                  DeleteShift(shift.id)
                              }
                          }>Delete Shift</button><hr/></div>
                        }
                      }
                    }
                }
            })
            return test
        }
        return <>
            <h1>
                <u>Shifts</u>
            </h1>
            <Content/>
        </>
    }
    return <h1>Loading Shifts....If You Can't See Anything Loading, Create A Shift!</h1>
}

export default ViewShifts;
