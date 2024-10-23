import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../ContextAPIs/CartProvider";
import { axiosPost } from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const Checkout = () => {
    const { items, removeFromCart, subTotal ,clearCart } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        father_name: '',
        father_phone_no: '',
        school_collage_name: '',
        job_title: '',
        email: '',
        gender: '',
        present_address: '',
        permanent_address: '',
        nid_no: '',
        phone_no: '',
        local_guardian_name: '',
        date_of_birth: '',
        blood_group: '',
        local_guardian_phone_no: '',
        admission_date: '',
        photo: null,
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formPayload = new FormData();    
        const purchaseData = {
            ...formData,
            course_id: items[0].id,
            course_fee: Number(items[0].discount_price),
            course_qty: items[0].quantity,
            total_course_fee: items[0].discount_price * items[0].quantity,
            discount_course_fee: items[0].discount || 0,
            sub_total_course_fee: items[0].discount_price * items[0].quantity,
        };
    
        Object.keys(purchaseData).forEach((key) => {
            formPayload.append(key, purchaseData[key]);
        });
      
        localStorage.setItem("admissionData", JSON.stringify(purchaseData));
        localStorage.setItem("orderedItem", JSON.stringify(items));
        await axiosPost('course-purchase', formPayload) 
        navigate("/order-details");
        toast.success("order successfull", {
            position: "top-center"
          });
          clearCart()
    };

    return (
        <div className="mt-5 border mx-2">
            <div className="bg-[#6f42c1] text-white p-6 text-center mb-5">
                <h2 className='text-5xl font-bold'>Trainee Admission Form</h2>
            </div>
            <form className="bg-white shadow-md rounded-lg p-6" onSubmit={handleSubmit}>
                {/* Trainee Information Section */}
                <div className="form-section">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="name" className="block font-semibold text-base mb-2">Full Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full border border-gray-300 rounded-md p-2"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="admission_date" className="block font-semibold text-base mb-2">Admission Date:</label>
                            <input
                                type="date"
                                id="admission_date"
                                name="admission_date"
                                className="w-full border border-gray-300 rounded-md p-2"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="father_name" className="block font-semibold text-base mb-2">Father/Mother Name:</label>
                            <input
                                type="text"
                                id="father_name"
                                name="father_name"
                                className="w-full border border-gray-300 rounded-md p-2"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="father_phone_no" className="block font-semibold text-base mb-2">Number:</label>
                            <input
                                type="text"
                                id="father_phone_no"
                                name="father_phone_no"
                                className="w-full border border-gray-300 rounded-md p-2"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="school_collage_name" className="block font-semibold text-base mb-2">School/College:</label>
                            <input
                                type="text"
                                id="school_collage_name"
                                name="school_collage_name"
                                className="w-full border border-gray-300 rounded-md p-2"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="job_title" className="block font-semibold text-base mb-2">Job Information:</label>
                            <input
                                type="text"
                                id="job_title"
                                name="job_title"
                                className="w-full border border-gray-300 rounded-md p-2"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="email" className="block font-semibold text-base mb-2">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full border border-gray-300 rounded-md p-2"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="gender" className="block font-semibold text-base mb-2">Gender:</label>
                            <select
                                id="gender"
                                name="gender"
                                className="w-full border border-gray-300 rounded-md p-2"
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled selected>Select Gender</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option value="Others">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="present_address" className="block font-semibold text-base mb-2">Present Address:</label>
                            <textarea
                                id="present_address"
                                name="present_address"
                                className="w-full border border-gray-300 rounded-md p-2"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="permanent_address" className="block font-semibold text-base mb-2">Permanent Address:</label>
                            <textarea
                                id="permanent_address"
                                name="permanent_address"
                                className="w-full border border-gray-300 rounded-md p-2"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="nid_no" className="block font-semibold text-base mb-2">NID Number:</label>
                            <input
                                type="text"
                                id="nid_no"
                                name="nid_no"
                                className="w-full border border-gray-300 rounded-md p-2"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="phone_no" className="block font-semibold text-base mb-2">Mobile No:</label>
                            <input
                                type="text"
                                id="phone_no"
                                name="phone_no"
                                className="w-full border border-gray-300 rounded-md p-2"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="local_guardian_name" className="block font-semibold text-base mb-2">Local Guardian’s Name:</label>
                            <input
                                type="text"
                                id="local_guardian_name"
                                name="local_guardian_name"
                                className="w-full border border-gray-300 rounded-md p-2"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="date_of_birth" className="block font-semibold text-base mb-2">Date of Birth:</label>
                            <input
                                type="date"
                                id="date_of_birth"
                                name="date_of_birth"
                                className="w-full border border-gray-300 rounded-md p-2"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="blood_group" className="block font-semibold text-base mb-2">Blood Group:</label>
                            <select
                                id="blood_group"
                                name="blood_group"
                                className="w-full border border-gray-300 rounded-md p-2"
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled selected>Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="local_guardian_phone_no" className="block font-semibold text-base mb-2">Guardian Mobile No:</label>
                            <input
                                type="text"
                                id="local_guardian_phone_no"
                                name="local_guardian_phone_no"
                                className="w-full border border-gray-300 rounded-md p-2"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                       
                        <div>
                            <label htmlFor="photo" className="block font-semibold text-base mb-2">Upload Image:</label>
                            <input
                                type="file"
                                id="photo"
                                name="photo"
                                accept="image/*"
                                className="w-full border border-gray-300 rounded-md p-2"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="m-mt_16px">
                    <div className="pt-p_16px">
                        <div className="lg:flex items-start gap-3">
                            <div className="w-full lg:w-[58%] bg-white border-2">
                                <table className="overflow-x-auto w-full">
                                    <thead>
                                        <tr className="border-b-4 border-gray-300">
                                            <th className="text-[14.4px] w-6/12 font-bold p-[7px] text-black">Course</th>
                                            <th className="text-[14.4px] font-bold p-[7px] text-black">Price</th>
                                            <th className="text-[14.4px] font-bold p-[7px] text-black">Quantity</th>
                                            <th className="text-[14.4px] font-bold p-[7px] text-black">Sub Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.length > 0 ? (
                                            items.map((item) => (
                                                <tr key={item.id} className="border-b border-gray-300">
                                                    <td>
                                                        <div className="flex items-center justify-center">
                                                            <div className="w-[20%] text-center flex items-center justify-center">
                                                                <RiDeleteBin5Line
                                                                    className="text-xl hover:text-footer_color cursor-pointer"
                                                                    onClick={() => removeFromCart(item.id)}
                                                                />
                                                            </div>
                                                            <div className="flex flex-col text-center justify-center items-center py-2 w-[80%]">
                                                                <img className="h-[40px] w-[70px]" src={item.photo} alt={item.name} />
                                                                <p className="text-[14.4px] px-[7px] text-center flex">
                                                                    {item.name} <span className="hidden lg:flex">- {item.unit}</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="text-[14.4px] font-bold p-[7px] text-black text-center">Tk {item.discount_price}</p>
                                                    </td>
                                                    <td>
                                                        <div className="flex justify-center">
                                                            <div className="border">
                                                                <button className="px-4 w-[30px] font-bold my-1.5">-</button>
                                                            </div>
                                                            <div className="border-y">
                                                                <input
                                                                    type="number"
                                                                    className="font-bold w-[30px] lg:w-[60px] text-center mx-auto h-full"
                                                                    value={item.quantity}
                                                                />
                                                            </div>
                                                            <div className="border">
                                                                <button className="px-4 w-[30px] font-bold my-1.5">+</button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="text-[14.4px] font-bold p-[7px] text-black text-center">Tk {item.discount_price * item.quantity}</p>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center py-4">Your cart is empty.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="lg:w-[41%] bg-white border-2">
                                <div className="px-[30px]">
                                    <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">Cart Summary</h2>
                                    <div className="py-3 flex justify-between border-b border-gray-300">
                                        <p className="text-black font-bold">Total Price</p>
                                        <p className="text-black font-bold">Tk {subTotal}</p>
                                    </div>
                                    <button
                                        type="submit"
                                        className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4 block text-center mx-auto w-full"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Checkout;
