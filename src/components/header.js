import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { useBearStore } from "../store/authStorage";


export default function Header() {
    const [name, setName] = useState();
    const router = useRouter()
    const bears = useBearStore((state) => state.bears)
    const removeAll = useBearStore((state) => state.removeAll)

    useEffect(() => {

        if (Cookies.get('name')) {
            const name = JSON.parse(Cookies.get('name'));

            setName(name.username)
        }


    }, [])

    return (
        <div className={`boxShadow1 fixed h-[72px] md:px-24 w-full  top-0 left-0 bg-white text-blue-600`}>
            <div className="flex items-center md:px-[0px] px-[20px]">
                <div className="py-[12px] flex items-center">
                    <img width={"48px"} height={"48px"} src="./person.png" />
                    <span className='pl-[16px] text-[#6D8187] font-bold text-[16px]'>{name}</span>

                </div>

                <div onClick={e => {
                    router.push('/');
                    Cookies.remove('name');
                    localStorage.clear();
                    removeAll();


                }} className="ml-auto cursor-pointer text-[#6D8187] font-bold text-[16px]">
                    Logout
                </div>
            </div>
        </div>
    )
}
