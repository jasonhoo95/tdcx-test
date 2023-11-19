import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useBearStore = create(
	persist(
		(set, get) => ({
			bears: [],
			removeAll:(values:any) => set((state:any) => ({bears:[]})),
			updateList: (values:any) => set((state: any) => ({ bears: state.bears.concat(values) })),
			removeList: (values:any) => set((state: any) => ({ bears: state.bears.filter((o:any)=>{return o.id != values}) })),
			editList: (id:any, name:any) => set((state: any) => ({ bears: state.bears.map((o:any)=>{if(o.id == id){return {...o, name:name} }else {return o}}) })),
			checkList: (id:any, check:any) => set((state: any) => ({ bears: state.bears.map((o:any)=>{if(o.id == id){return {...o, check:check} }else {return o}}) })),

		}),
		{
			name: "list-storage", // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
		}
	),

);




