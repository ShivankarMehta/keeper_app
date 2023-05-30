import React, {useState} from "react";
import "./addKeeper.css";
import axios from "axios";
const Addkeeper=()=>{
    const [keeperobj, setKeeperObj]=useState({
      title:"",
      description:""
    })
    const handleChange= e=>{
        const {name,value}= e.target
        setKeeperObj({
            ...keeperobj,
            [name]: value
        })
    }
    const add=()=>{
        if(keeperobj.title){
            axios.post("http://localhost:3001/api/addnew",keeperobj)
            .then(res=>console.log(res))
            setKeeperObj({
                title:"",
                description:"",
            })
        }
    }
    return (
        <div className="addKeeper">
            <input
                className="inputBox titleInput"
                type="text"
                name="title"
                autoComplete="off"
                placeholder="Add Title"
                onChange={handleChange}
                value={keeperobj.title}
            />
            <textarea 
            className="inputBox description"
            name="description" 
            placeholder="Add Description Here"
            onChange={handleChange}
            value={keeperobj.description}
            />
            <div className="addButton" onClick={add}>Add</div>
        </div>
    )
}
export default Addkeeper