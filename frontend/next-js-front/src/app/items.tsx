'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { item } from "./lib/definitions";
import { Heart } from "lucide-react";
const CreateItem = () => {
    const [items, setItems] = useState<item[]>([]);
    const [isLoading, setisLoading] = useState(true);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    }

    useEffect(() => {
        const fetchItems = async () =>{
            try {
            const res = await axios.get("http://127.0.0.1:8000/api/v1/item/items-get/");
            const data = res.data;
            setItems(data.items);
            } catch(error) {
                console.log(error);
            } finally{
                setisLoading(false);
            }
        }

        fetchItems();
    }, []);
    if(isLoading){
        return <div>Loading...</div>
    }
    return (<div className="flex gap-10">
        {items.map((item, index) => (
                <div key={index} className="border-2 border-indigo-300 rounded-xl">
                    <h2>{item.name}</h2>
                    <img src={`http://127.0.0.1:8000${item.photo}`} alt=""/>
                    <p>Description: {item.description}</p>
                    <p>Type: {item.type_item}</p>
                    <p>Price: {item.price}</p>
                    <p>ID: {item.id}</p>
                    <button onClick={handleClick}><Heart fill = {isClicked ? "#e01b24" : 'none'} /></button>
                </div>
            ))}

    </div>);
}

export default CreateItem;