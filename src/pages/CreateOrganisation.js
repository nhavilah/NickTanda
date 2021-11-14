import React from "react";
import {useState, useEffect} from "react";

function CreateOrganisations() {
  //store the results of the form
    const [formData, setFormData] = useState({name: "", hourlyRate: ""})

    const authenticate = (e) => {
        e.preventDefault()
        //make sure everything is filled out
        if (!formData.name || !formData.hourlyRate) {
            alert("Make sure you fill out all fields!")
        } else {
          //send the fetch request
            fetch('http://127.0.0.1:3000/organisations/create_join', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": sessionStorage.getItem("sessionId")
                },
                body: JSON.stringify(
                    {name: formData.name, hourlyRate: formData.hourlyRate}
                )
            }).then(response => response.json()).then(data => {
                console.log(data)
            })
        }
    }

    return (
        <div>
            <form onSubmit={authenticate}>
                <h1>
                    <u>Create Organisation</u>
                </h1>
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
                <input type="number" placeholder="Hourly Rate" name="hourlyRate"
                    onChange={
                        (e) => {
                            setFormData({
                                ...formData,
                                hourlyRate: e.target.value
                            })
                        }
                    }
                    value={
                        formData.hourlyRate
                    }/>
                <br/>
                <br/>
                <input type="submit" className="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default CreateOrganisations;
