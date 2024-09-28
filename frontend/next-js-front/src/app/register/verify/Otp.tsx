'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const Otp = () => {
    const router = useRouter();
    const [Otp, setOtp] = useState<string>("");
    const [error, setError] = useState<string>("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!Otp){
            alert("Please enter OTP");
        } else {
            try{
                const res = await axios.post("http://127.0.0.1:8000/api/v1/auth/verify-email/", {'otp': Otp});
                if(res.status === 200){
                    router.push("/")
                }
            } catch(error){
                setError("Can`t confirm your otp");
            }
        }
    }

    return(
    <div className="flex justify-center items-center h-[700px]">
        <form method="POST" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-7">
                <input type="text" placeholder="Enter otp code" className="border rounded-xl border-zinc-500" value={Otp} onChange={(e) => setOtp(e.target.value)}>
                </input>
                <button type="submit" className="border rounded-xl border-zinc-500">
                    Verify
                </button>
            </div>
        </form>

    </div>
);

}

export default Otp;