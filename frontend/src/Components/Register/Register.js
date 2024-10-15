import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

function Register() {

    const navigate = useNavigate();
    const [treasurer, setTreasurer] = useState({
        name: "",
        gmail: "",
        password: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTreasurer((prevTreasurer) => ({
            ...prevTreasurer,
            [name]: value,
        }));
    }; 

    const handleSubmit =  (event) => {
        event.preventDefault();
        sendRequest().then(()=>{
            alert("Registered Successfully");
            navigate("/requestdetails");
        }).catch((err)=>{
            alert(err.message);
        });
    }; 

    const sendRequest = async () => {
        await axios.post("http://localhost:5000/register",{
            name: String (treasurer.name),
            gmail: String (treasurer.gmail),
            password: String (treasurer.password),
            
        })
        .then((res) => res.data);
    }
  return (
    <div>
     <h1>Treasurer Registration</h1>
     <form onSubmit={handleSubmit}>
     <label>Name</label><br></br>
     <input type="text" name="name" value = {treasurer.name} onChange={handleInputChange} required></input><br></br><br></br>

     <label>Gmail</label><br></br>
     <input type="email" name="gmail" value={treasurer.gmail} onChange={handleInputChange} required></input><br></br><br></br>

     <label>Password</label><br></br>
     <input type="password" name="password" value={treasurer.password} onChange={handleInputChange} required></input><br></br><br></br>

     <button>Register</button>
    
     </form>
    </div>
  )
}

export default Register
