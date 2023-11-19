import { useEffect, useState } from "react"
import ModalPopup from "./modalPopup"
import { useBearStore } from "../store/authStorage";

export default function DashboardDisplay() {
    const [modal, openModal] = useState(false)
    const [dataList, setList] = useState();
    const [mainList, setMainList] = useState();
    const bears = useBearStore((state) => state.bears)


    const removeList = useBearStore((state) => state.removeList)
    const editList = useBearStore((state) => state.editList)
    const checkList = useBearStore((state) => state.checkList)


    useEffect(() => {

        setList(bears);
        setMainList(bears);

    }, [bears])

    const checkFilter = (value) => {

        if (value != '') {
            const datafilter = bears.filter((o) => {
                if (o.name.includes(value)) {
                    return o
                }


            })


            setList(datafilter);

        } else {
            setList(bears);
        }


    }



    return (
        <div className="w-full">

            <ModalPopup toggle={modal} onClose={e => { openModal(false) }} />
            <div className="flex flex-col md:flex-row justify-center">
                <div className="container-square md:rounded-[12px] md:mx-3 my-3 w-full md:w-[33.33%]">
                    <div className="text-[#537178] font-bold text-[20px]">
                        Tasks Completed

                    </div>

                    <div className="flex">
                        <div className="text-[64px] text-[#5285EC]">{bears.filter((o) => { return o.check }).length}</div>
                        <div className="text-[20px] text-[#8F9EA2] mt-[auto]">/ {bears.length}</div>
                    </div>
                </div>

                <div className="container-square md:rounded-[12px] md:mx-3 my-3 w-full md:w-[33.33%]">
                    <div className="text-[#537178] font-bold text-[20px]">
                        Latest created tasks

                    </div>
                    <ul className="ml-[20px] pt-[12px]">
                        {mainList && mainList.map((o, key) => {

                            return (
                                <li className="text-[#8F9EA2]" style={{ textDecoration: o.check ? 'line-through' : null }} key={key}>{o.name}</li>

                            )


                        })}


                    </ul>
                </div>

                <div className="container-square justify-center items-center md:rounded-[12px] md:mx-3 my-3 w-full md:w-[33.33%]">


                    <div className="blue-pie-chart">

                    </div>


                </div>

            </div>


            <div style={{ padding: '20px' }}>
                <div className="flex items-center py-3 md:flex-row flex-col">

                    <div className="text-[#537178] text-center font-bold text-[20px] mt-3">
                        Tasks

                    </div>

                    <div className="ml-auto flex  md:w-auto w-full md:flex-row flex-col items-center">

                        <div className="relative my-3 md:w-auto w-full">
                            <input onChange={e => { checkFilter(e.target.value) }} className={` md:w-[244px] w-full bg-[#D9DFEB] text-[14px] rounded-[8px] font py-[11px] px-[30px] md:mx-3 input-text `} placeholder='Search by task name' type="text" />
                            <img src="./search-solid.png" className="absolute top-[12px]  md:left-[20px] left-[10px] pr-[20px]" />
                        </div>

                        <button onClick={e => { openModal(true) }} className={`w-full rounded-[8px] text-[14px] bg-[#5285EC] text-white py-[11px] px-[22px] font-bold`}>+ New Task</button>


                    </div>


                </div>

                {dataList ? <div className="container-square md:rounded-[12px]">
                    <div className="md:p-4">
                        {dataList && dataList.map((o, key) => {
                            let value = o.name;
                            return (
                                <div key={key}>
                                    <div className="flex md:p-4 py-3">
                                        <label class="container">
                                            <input checked={o.check} onChange={e => { checkList(o.id, e.target.checked) }} type="checkbox" />
                                            <span class="checkmark"></span>
                                        </label>
                                        <span onClick={e => { e.target.focus() }} style={{ textDecoration: o.check ? 'line-through' : null, color: o.check ? "#537178" : "#5285EC" }} className="task-list-content md:max-w-full max-w-[200px] pl-[2px]" onInput={e => { value = e.target.innerText }} contentEditable="true">{o.name}</span>

                                        <div className="justify-end flex ml-auto mt-[5px]">
                                            <img onClick={e => { editList(o.id, value) }} className="img-logo mx-2" src="./pen-solid.png" />

                                            <img onClick={e => { removeList(o.id) }} className="img-logo mx-2" src="./trash-solid.png" />

                                        </div>
                                    </div>

                                    <hr />
                                </div>
                            )



                        })}


                    </div>

                </div> : null}




            </div>

        </div>

    )



}