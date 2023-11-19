import Header from "@/components/header"
import ModalPopup from "@/components/modalPopup"
import { useEffect, useState } from "react";
import DashboardDisplay from "@/components/dashboardDisplay";
import Cookies from 'cookies';
import { useBearStore } from "../store/authStorage";
import CardSkeleton from "@/components/cardSkeleton";
export default function Dashboard() {

    const [modal, openModal] = useState(false);
    const [data, setDataList] = useState();
    const [loading, setLoading] = useState(true);

    const bears = useBearStore((state) => state.bears)


    useEffect(() => {

        setDataList(bears);

        if (bears.length > 0) {
            setTimeout(() => {
                setLoading(false);

            }, 1000)
        }



    }, [bears])



    return (
        <div className="h-[100vh] flex flex-col md:justify-center">
            <Header />

            <ModalPopup toggle={modal} onClose={e => { openModal(false) }} />


            {data && data.length > 0 ?
                <div className="flex justify-center py-24 h-[100vh]">
                    {loading ? <CardSkeleton /> : <DashboardDisplay />}



                </div>
                : <div className={`container-square md:w-[304px] flex items-center md:m-auto mt-[80px] w-auto rounded-[12px]`}>
                    <div className={`font-bold text-[#537178] mb-[24px] text-[20px]`}>
                        You have no task.
                    </div>


                    <button onClick={e => { openModal(true) }} className={`px-[22px] rounded-[8px] text-[14px] bg-[#5285EC] font-bold text-white py-[11px]`}>+ New Task</button>

                </div>}


        </div>
    )

}

Dashboard.getInitialProps = async ({ req, res }) => {
    // Create a cookies instance
    const cookies = new Cookies(req, res)

    if (req && cookies && !cookies.get('name')) {
        await res.writeHead(301, {
            Location: `/`,
        });
        await res.end();

    } else {
        return { modal: true }

    }
}