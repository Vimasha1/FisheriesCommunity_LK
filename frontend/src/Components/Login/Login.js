import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [treasurer, setTreasurer] = useState({
        name: "",
        gmail: "",
        
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTreasurer((prevTreasurer) => ({
            ...prevTreasurer,
            [name]: value,
        }));
    }; 

    const handleSubmit =  async (event) => {
        event.preventDefault();
        try{
            const response =  await sendRequest();
            if(response.status === "ok"){
                alert("Login Successful");
                navigate("/requestdetails");
                
            }else{
                alert("Please Enter Valid Credentials!");
            }
            }catch(err){
                alert("error" + err.message);
            }
        
    }; 
 
    const sendRequest = async () => {
        return await axios.post("http://localhost:5000/login",{
            
            gmail:treasurer.gmail,
            password:treasurer.password,
            
        })
        .then((res) => res.data);
    };
    
  return (
    <div>
       <h1>Treasurer Login</h1>
     <form onSubmit={handleSubmit}>
     <br></br><br></br>

     <label>Gmail</label><br></br>
     <input type="email" name="gmail" value={treasurer.gmail} onChange={handleInputChange} required></input><br></br><br></br>

     <label>Password</label><br></br>
     <input type="password" name="password" value={treasurer.password} onChange={handleInputChange} required></input><br></br><br></br>

     <button>Login</button>
    
     </form>
    </div>
  )
}

export default Login
