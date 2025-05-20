import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthLayout from "../../components/layouts/AuthLayout"
import Input from "../../components/Inputs/Input";
import { validateUsername } from "../../utlis/helper";
import axiosInstance from "../../utlis/axiosInstance";
import { API_PATHS } from "../../utlis/apiPaths";
import { UserContext } from "../../context/UserContext";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const { updateUser } = useContext(UserContext);

    const navigate = useNavigate();

    // Handle Login Form Submit
    const handleLogin = async (e) => {
        e.preventDefault();

        if(!validateUsername(username)) {
            setError("Please enter a valid username");
            return;
        }

        if(!password) {
            setError("Please enter a password");
            return;
        }

        setError("");

        //Login API Call
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                username,
                password,
            });
            const { token, user } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                updateUser(user);
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again");
            }
        }
    }

    return (
        <AuthLayout>
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Please enter your details to login
                </p>
                <form onSubmit={handleLogin}>
                    <Input 
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                        label="Username"
                        placeholder="Username"
                        type="text"
                    />

                    <Input 
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label="Password"
                        placeholder="Password"
                        type="password"
                    />
                    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
                    <button type="submit" className="btn-primary">LOGIN</button>
                    <p className="text-[13px] text-slate-800 mt-3">
                        Don't have an account{" "}
                        <Link className="font-medium text-primary underline" to="/signup">SignUp</Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}