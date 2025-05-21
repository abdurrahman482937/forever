import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

export default function Add({ token }) {
    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [price, setPrice] = useState("");
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()

            if (image1) formData.append("image1", image1);
            if (image2) formData.append("image2", image2);
            if (image3) formData.append("image3", image3);
            if (image4) formData.append("image4", image4);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("price", price);
            formData.append("bestseller", bestseller);
            formData.append("sizes", JSON.stringify(sizes));

            const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
                setName("");
                setDescription("");
                setPrice("");
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }

    }
    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3 mt-5">
            <div className="">
                <p className="mb-2 ">Upload Image</p>
                <div className=" flex gap-2">

                    <label htmlFor="image1">
                        <img className="w-24" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                        <input
                            type="file"
                            id="image1"
                            hidden
                            onChange={e => setImage1(e.target.files[0])}
                        />
                    </label>

                    <label htmlFor="image2">
                        <img className="w-24" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                        <input
                            type="file"
                            id="image2"
                            hidden
                            onChange={e => setImage2(e.target.files[0])}
                        />
                    </label>

                    <label htmlFor="image3">
                        <img className="w-24" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                        <input
                            type="file"
                            id="image3"
                            hidden
                            onChange={e => setImage3(e.target.files[0])}
                        />
                    </label>

                    <label htmlFor="image4">
                        <img className="w-24" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                        <input
                            type="file"
                            id="image4"
                            hidden
                            onChange={e => setImage4(e.target.files[0])}
                        />
                    </label>

                </div>
            </div>
            <div className="w-full">
                <p className="mb-2">Product Name</p>
                <input
                    className="w-full max-w-[500px] px-3 py-2"
                    type="text"
                    placeholder="Type Hare.."
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div className="w-full">
                <p className="mb-2">Product Description</p>
                <textarea
                    className="w-full max-w-[500px] px-3 py-2"
                    type="text"
                    placeholder="Write content hare.."
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
                <div className="">
                    <p className="mb-2">Product Category</p>
                    <select
                        className="w-full px-3 py-2"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>
                <div className="">
                    <p className="mb-2">Sub Category</p>
                    <select
                        className="w-full px-3 py-2"
                        value={subCategory}
                        onChange={e => setSubCategory(e.target.value)}
                    >
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>
                <div className="">
                    <p className="mb-2">Product Price</p>
                    <input
                        className="w-full px-3 py-2 sm:w-[120px]"
                        type="number"
                        placeholder="25"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                </div>
            </div>
            <div className="">
                <p className="mb-2">Product Sizes</p>
                <div className="flex gap-3">
                    {["S", "M", "L", "XL", "XXL"].map(size => (
                        <div key={size}>
                            <p
                                className={` px-3 py-1 cursor-pointer ${sizes.includes(size) ? "bg-pink-200 text-white" : ""}bg-slate-200`}
                                onClick={() =>
                                    setSizes(sizes =>
                                        sizes.includes(size)
                                            ? sizes.filter(s => s !== size)
                                            : [...sizes, size]
                                    )
                                }
                            >
                                {size}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex gap-2 mt-2">
                <input
                    type="checkbox"
                    id="bestseller"
                    onChange={() => setBestseller(prev => !prev)}
                    checked={bestseller}
                />
                <label className="cursor-pointer" htmlFor="bestseller">Add To Bestseller</label>
            </div>
            <button type="submit" className="cursor-pointer w-28 py-2 mt-4 bg-black text-white">ADD</button>
        </form>
    )
}
