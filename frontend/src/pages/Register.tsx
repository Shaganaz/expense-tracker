import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleRegister = async () => {
        try {
            const response = await api.post("/auth/register", {
                name,
                email,
                password
            });

            console.log(response.data);
            navigate("/login");
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <div>

            <h1>Register</h1>

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <br />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br />

        
            <button onClick={handleRegister}>
                Register
            </button>

        </div>
    );
}

export default Register;