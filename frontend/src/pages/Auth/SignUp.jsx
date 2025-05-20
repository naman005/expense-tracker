import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthLayout from "../../components/layouts/AuthLayout"
import Input from "../../components/Inputs/Input";
import { validateUsername } from "../../utlis/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utlis/axiosInstance";
import { API_PATHS } from "../../utlis/apiPaths";
import  uploadImage  from '../../utlis/uploadImage'


export default function SignUp() {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);

    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    // Handle Sign Up form Submit
    const handleSignUp = async (e) => {
        e.preventDefault();

        let profileImageUrl = "";

        if(!fullName) {
            setError("Please enter your name");
            return;
        }

        if(!validateUsername(username)) {
            setError("Please enter a valid username");
            return;
        }

        if(!password) {
            setError("Please enter the password");
            return;
        }

        setError("");

        // Sign Up API Call
        try {

            // Upload image if present
            if (profilePic) {
                const imgUploadRes = await uploadImage(profilePic);
                profileImageUrl = imgUploadRes.profileUrl || "";
            }

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName,
                username,
                password,
                profileUrl: profileImageUrl, 
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
            <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Create an Account</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Join us today by entering your details below.
                </p>

                <form onSubmit={handleSignUp}>
                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
                    <div className="col-span-2 ">
                        <Input 
                            value={fullName}
                            onChange={({target}) => setFullName(target.value)}
                            label="Full Name"
                            placeholder="John Doe"
                            type="text"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

                    <button type="submit" className="btn-primary">SIGN UP</button>
                    <p className="text-[13px] text-slate-800 mt-3">
                        Already have an account{" "}
                        <Link className="font-medium text-primary underline" to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}