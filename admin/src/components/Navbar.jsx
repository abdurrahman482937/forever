import { assets } from '../assets/assets'

export default function Navbar({ setToken }) {
    return (
        <div className='flex items-center justify-between py-2 px-[4%]'>
            <img className='w-[max(10%, 80px)] max-w-36' src={assets.logo} alt="" />
            <button onClick={() => setToken("")} className='cursor-pointer bg-gray-800 text-white px-5 py-2 sm:px-7 rounded-full'>Logout</button>
        </div>
    )
}
