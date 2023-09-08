import { useContext } from "react"
import { MyContext } from "./storeContext"

export const useStores=()=>{
    const store=useContext(MyContext)
    return store
}