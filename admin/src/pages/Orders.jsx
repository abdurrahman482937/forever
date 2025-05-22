import { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

export default function Orders({ token }) {
    const [orders, setOrders] = useState([])

    const fetchAllOrders = async () => {
        if (!token) {
            return null
        }

        try {

            const response = await axios.post(backendUrl + "/api/order/list", {}, { headers: { token } })
            if (response.data.success) {
                setOrders(response.data.orders)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const statusHandler = async (e, orderId) => {
        try {
            const response = await axios.post(backendUrl + "/api/order/status", { orderId, status: e.target.value }, { headers: { token } })
            if (response.data.success) {
                await fetchAllOrders()
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchAllOrders()
    }, [token])
    return (
        <div>
            <h3>Order Page</h3>
            <div className="">
                {
                    orders.reverse().map((order, inx) => (
                        <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700" key={inx}>
                            <img className='w-12 ' src={assets.parcel_icon} alt="" />

                            <div className="">
                                <div className="">
                                    {
                                        order.items.map((item, inx) => {
                                            if (inx === order.items.length - 1) {
                                                return <p className='py-0.5' key={inx}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                                            } else {
                                                return <p className='py-0.5' key={inx}>{item.name} x {item.quantity} <span>{item.size}</span>,</p>
                                            }
                                        })
                                    }
                                </div>
                                <p className='mt-2 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                                <div className="">
                                    <p>{order.address.street + ", "}</p>
                                    <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                                </div>
                                <p className='bg-yellow-200 w-fit'>{order.address.phone}</p>
                            </div>
                            <div className="">
                                <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                                <p className='mt-3'>Method : {order.paymentMethod}</p>
                                <p>Payment : {order.payment ? "Done" : "Pending"}</p>
                                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
                            <select onChange={(e) => statusHandler(e, order._id)} value={order.status} className='font-semibold p-2'>
                                <option value="Order Placed">Order Placed</option>
                                <option value="Packing">Packing</option>
                                <option value="Shipping">Shipping</option>
                                <option value="Out for delivery">Out for delivery</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
