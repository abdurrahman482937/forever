import axios from "axios"
import { useEffect, useState } from "react"
import { backendUrl, currency } from "../App"
import { toast } from "react-toastify"

export default function List({ token }) {
    const [list, setList] = useState([])
    const fetchList = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/product/list")
            if (response.data.success) {
                setList(response.data.products);
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const removeProduct = async (id) => {
        try {
            const response = await axios.post(backendUrl + "/api/product/remove", { id }, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)
                await fetchList();
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchList()
    }, [])
    return (
        <>
            <p className="mb-2 mt-5">All Products List</p>
            <div className="flex flex-col gap-2">
                {/* ---List Table Title--- */}
                <div className="hidden md:grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 mb-2 border border-gray-300 bg-gray-100 text-sm">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b className="text-center">Action</b>
                </div>
                {/* ----- product list ------ */}
                {
                    list.map((item, inx) => (
                        <div className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-300 text-sm" key={inx}>
                            <img className="w-12" src={item.image[0]} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{currency}{item.price}</p>
                            <p onClick={() => removeProduct(item._id)} className="text-right md:text-center cursor-pointer text-2xl">x</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
