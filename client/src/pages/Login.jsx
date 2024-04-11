import { useState } from "react";

export default function Login(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useStatetate('');
    function login(){
        fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
    }
    return(
      
           <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input type="text" placeholder="username" value={username} onChange={e=> setUsername(e.target.value)} />
            <input type="password" placeholder="password "value={password} onChange={e=> setPassword(e.target.value)} />
            <button>Login</button>
           </form>
       
    )
}