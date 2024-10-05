'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Target } from "lucide-react";
const UserProfile = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isOpenCreation, setIsOpenCreation] = useState<boolean>(false);
    const [deleteMenu, setDeleteMenu] = useState<boolean>(false);
    const [deleteData, setDeleteData] = useState<string>("");
    const [PostData, setPostData] = useState<{
        photo: File | null; 
        name: string;
        type_item: string;
        description: string;
        price: string;
    }>({
        photo: null,
        name: "",
        type_item: "",
        description: "",
        price: ""
    });

    const creationMenu = () => {
        setIsOpenCreation(!isOpenCreation);
    }
    const deletingMenu = () => {
        setDeleteMenu(!deleteMenu);
    }


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPostData({ ...PostData, photo: e.target.files[0] });
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const access_token = Cookies.get('access_token');
        if (!access_token) {
            console.error('Access token not found');
            return;
        }
                try{
                    const res = axios.post("http://127.0.0.1:8000/api/v1/item/item-create/", PostData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${JSON.parse(access_token)}`,
                        },
                    });
                } catch (error){
                    console.log(error);
                } 

    }

    const handleSubmitDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        const access_token = Cookies.get('access_token');
        if (!access_token) {
            console.error('Access token not found');
            return;
        } try{
            const res = await axios.delete(`http://127.0.0.1:8000/api/v1/item/item-create/${deleteData}`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                }
            });
        } catch (error){
            console.log(error);
        } 


    }


    return(<div className="h-screen">
        <div className="flex flex-col items-start gap-40 h-screen w-[calc(100vw/7)] border-2">
            <button className="border-b-2 w-full hover:bg-gray-500 transition" onClick={creationMenu}>
                Create item
            </button>
            <button className="border-b-2 border-t-2 w-full hover:bg-gray-500 transition" onClick={deletingMenu}>
                Delete item
            </button>
            <button className="border-b-2 border-t-2 w-full hover:bg-gray-500 transition">
                Edit item
            </button>
        </div>
        { isOpenCreation && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="p-6 bg-white flex flex-col border-2 border-black rounded-xl w-1/3 text-center">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <input type="file" accept="image/" onChange={handleFileChange}>
                            </input>
                            <input type="text" placeholder="Enter name" value={PostData.name} onChange={(e) => setPostData({...PostData, name: e.target.value})}>
                            </input>
                            <input type="text" placeholder="Enter description" value={PostData.description} onChange={(e) => setPostData({...PostData, description: e.target.value})}>
                            </input>
                            <input type="text" placeholder="Enter type" value={PostData.type_item} onChange={(e) => setPostData({...PostData, type_item: e.target.value})}>
                            </input>
                            <input type="text" placeholder="Enter price" value={PostData.price} onChange={(e) => setPostData({...PostData, price: e.target.value})}>
                            </input>
                            <button type="submit" className="border hover:bg-gray-500 p-2">
                                Create
                            </button>
                            <button className="border hover:bg-gray-500 transition p-2" onClick={creationMenu}>
                            close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
        {!deleteMenu &&(
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="p-6 bg-white flex flex-col border-2 border-black rounded-xl w-1/3 text-center">
                    <form onSubmit={handleSubmitDelete}>
                        <div className="flex flex-col">
                            <input type="text" placeholder="Enter item id" value={deleteData} onChange={(e) => setDeleteData(e.target.value)}></input>
                            <button className="border hover:bg-gray-500 transition p-2" type="submit">
                                Delete
                            </button>
                            <button onClick={deletingMenu} className="border hover:bg-gray-500 transition p-2">
                                close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    )}
    </div>);
}

export default UserProfile;