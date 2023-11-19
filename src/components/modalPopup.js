import { useEffect, useState } from "react"
import { useBearStore } from "../store/authStorage";
import { v4 as uuid } from "uuid";


export default function ModalPopup({ toggle, onClose }) {
    const [modal, openModal] = useState();
    const [value, setValue] = useState();

    useEffect(() => {
        openModal(toggle);


    }, [toggle])




    const increasePopulation = useBearStore((state) => state.updateList)



    const toggleModal = (e) => {

        if (e.target.classList.contains('modal-popup')) {
            onClose()
        }


    }
    if (modal) {
        return (
            <div className="relative">
                <div onClick={e => toggleModal(e)} className="modal-popup md:justify-center top-[20px]">

                    <div className="container-square mx-[20px] rounded-[12px] mt-[80px] md:mt-[0px] w-[90%] md:w-[296px]">
                        <div className="text-left">
                            + New Task
                        </div>

                        <input onChange={e => { setValue(e.target.value) }} className={`w-full bg-[#EEF1F8] text-[14px] rounded-[8px] font py-[9px] px-[14px] input-text mt-[24px]`} placeholder='Task Name' type="text" />


                        <button onClick={e => { increasePopulation({ id: uuid(), name: value, edit: false }); onClose() }} className={`w-full rounded-[8px] text-[14px] bg-[#5285EC] text-white py-[11px] px-[22px] mt-[12px] mb-[20px]`}>+ New Task</button>


                    </div>

                </div>

            </div>
        )
    } else {
        return null
    }

}