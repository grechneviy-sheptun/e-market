'use client'
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const Register = () => {
    const router = useRouter();
    const [Error, setError] = useState<string>("");
    const [Verified, setisVerified] = useState<boolean>(false);
    const [PostData, setPostData] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
    });
    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        if(!PostData.email || !PostData.username || !PostData.password || !PostData.password2){
            alert("All fields are required!");
        }
        try{
            const res = await axios.post("http://127.0.0.1:8000/api/v1/auth/register/", PostData);
             if(res.status === 201){
                setisVerified(true);
                router.push("/register/verify");
            } else {
                alert("Incorrect data");
            }
        }catch(error){
            setError("Registration failed");
        } 
    }
    return(
        <div className="flex justify-center items-center h-[700px]">
            <form method="POST" onSubmit={handleSubmit}>
                <div className="flex flex-col justify-evently gap-7">
                    <input className="border rounded-xl border-gray-400" type="text" placeholder="Enter name" value={PostData.username} onChange={(e) => setPostData({...PostData, username: e.target.value})}>
                    </input>
                    <input className="border rounded-xl border-gray-400" type="text" placeholder="Enter email" value={PostData.email} onChange={(e) => setPostData({...PostData, email: e.target.value})}>
                    </input>
                    <input className="border rounded-xl border-gray-400" type="password" placeholder="Enter password" value={PostData.password} onChange={(e) => setPostData({...PostData, password: e.target.value})}>
                    </input>
                    <input className="border rounded-xl border-gray-400" type="password" placeholder="Repeat password" value={PostData.password2} onChange={(e) => setPostData({...PostData, password2: e.target.value})}>
                    </input>
                    
                        <button className="border rounded-xl border-gray-400" type="submit">
                            Sign up
                        </button>
                    
                </div>
            </form>
        </div>
    );

}

export default Register;