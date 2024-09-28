'use client'
import { UserRound } from "lucide-react"
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import {user} from "../lib/definitions";
const Popup = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() =>{
        const handleClickOutside = (event: any) =>{
            if(!event.target.closest("#menu-button")&& !event.target.closest("#menu-dropdown") && !event.target.closest(".no-close")){
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const [PostData, setPostData] = useState<user>({
        username: "",
        password: "",
        email: ""
    });
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setisLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        if(!PostData.email || !PostData.username || !PostData.password){
            setError("All fileds are required");
        }else {
        try{
            setisLoading(true);
            const res = await axios.post("http://127.0.0.1:8000/api/v1/auth/login/", PostData);
            const response = res.data;
            if(res.status === 200){
                Cookies.set('access_token', response.access_token, {sameSite:"Lax"});
                setResponseData(response);
            }
        } catch(error){
            setError("Login failed");
        }
    }

    }
return(
    <div>
        <div>
        <button className="inline-flex w-full justify-center gap-x-1.5 
            rounded-md px-3 py-2 text-sm font-semibold" aria-expanded={isOpen} aria-haspopup="true"
            onClick={toggleMenu}>
            {<UserRound />}
        </button>
        </div>
        {  isOpen && (
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 
            ring-black ring-opacity-5 focus:outline-none" 
            role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                <div>
                    <form className="no-close" method="POST" action="#" role="none" onSubmit={handleSubmit}>
                        <input className="no-close mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
                         focus:ring-black focus:border-indigo-500 sm:text-sm" 
                        type="text" placeholder="Enter your name" value={PostData.username} onChange={(e) => setPostData({...PostData, username: e.target.value})}>
                        </input>
                        <input className="no-close mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
                         focus:ring-black focus:border-indigo-500 sm:text-sm" 
                        type="text" placeholder="Enter your email" value={PostData.email} onChange={(e) => setPostData({...PostData, email: e.target.value})}>
                        </input>
                        <input className="no-close mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
                         focus:ring-black focus:border-indigo-500 sm:text-sm" 
                        type="password" placeholder="Enter your password" value={PostData.password} onChange={(e) => setPostData({...PostData, password: e.target.value})}>
                        </input>
                            <button type="submit" className="block w-full px-4 py-2 text-left text-sm text-gray-700" role="menuitem">Sign in</button>
                            <Link href="/register">
                                <button className="block w-full px-4 py-2 text-left text-sm text-gray-700">Sign up</button>
                            </Link>
                    </form>
                </div>
            </div>
        )}
    </div>
);
}

export default Popup;