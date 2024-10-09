import Popup from "./Popup"
import Link from "next/link";
const Navbar = () => {
    return(
    <header>
        <nav>
            <div className="bg-white relative top-0 left-0 right-0 shadow-md z-50 size-auto">
                <div className="relative flex justify-center">
                    <input
                    type="text"
                    className="border border-gray-300 rounded-full px-4 py-2 w-64 focus:outline-none focus:border-black"
                    placeholder="Пошук"
                    />
                </div>
                <div className="md:flex list-none relative justify-center">
                    <ul className="flex space-x-8">

                        <li className="text-gray-700 hover:text-black">Телефони</li>

                        <li className="text-gray-700 hover:text-black"> 
                            <Link href="items/[slug]" as={`items/Laptop`}>
                                Ноутбуки 
                            </Link>
                        </li>
                   
                        <li className="text-gray-700 hover:text-black">Планшети</li>
                        <li className="text-gray-700 hover:text-black">Накопичувачі</li>
                        <li className="text-gray-700 hover:text-black">Процесори</li>
                        <li className="text-gray-700 hover:text-black">Відеокарти</li>
                    </ul>
                    <div className="relative justify-end left-80">                
                        <Popup/>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    )
}

export default Navbar