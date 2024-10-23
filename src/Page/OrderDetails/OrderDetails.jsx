import React, { useEffect, useState } from "react";
import TrackOrder from "./TrackOrder";

const OrderDetails = () => {
    const [orderData, setOrderData] = useState(null);
    const [orderItems, setOrderItems] = useState(null);


    useEffect(() => {
        const storedOrderData = localStorage.getItem('admissionData');
        const storedOrderItems = localStorage.getItem('orderedItem');
        if (storedOrderData) {
            setOrderData(JSON.parse(storedOrderData));
        }
        if (storedOrderItems) {
            setOrderItems(JSON.parse(storedOrderItems));
        }
    }, []);

    if (!orderData) {
        return <p>Loading...</p>;
    }

    return (
        <div className=" m-mt_16px">
            <div className="w-full flex flex-col lg:flex-row items-start justify-center h-full gap-2 ">
                <div className="bg-white lg:p-p_30px w-full">
                    <div className="text-center flex flex-col justify-center items-center">
                        <p className="text-xl font-bold">Order Information</p>
                        <p className="p-3 rounded-md lg:my-2 my-1 w-fit border bg-[#D2C5A2] font-bold text-lg">
                            Order Id: 
                            <span className="font-semibold">
                                {orderData.nid_no + orderData.course_id  || "N/A"}
                            </span>
                        </p>
                    </div>

                    <div className="w-full border flex flex-col md:flex-row md:items-start md:mt-4 mt-3 bg-[#D2C5A2] rounded-md p-4">
                        <div className="md:text-base text-sm flex-1 font-semibold md:border-r-2 md:border-black md:pr-10">
                            <p className="font-bold md:mb-4 w-full">Customer Information</p>
                            <div className="space-y-1 w-full">
                                <div className="flex items-center justify-between">
                                    <p>Full Name:</p>
                                    <p>{orderData.name || "N/A"}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p>Country:</p>
                                    <p>{orderData.country || "N/A"}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p>District Thana:</p>
                                    <p>{orderData.thana || "N/A"}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p>Address:</p>
                                    <p>{orderData.present_address || "N/A"}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p>Order Notes:</p>
                                    <p>{orderData.notes || "N/A"}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p>Mobile:</p>
                                    <p>{orderData.phone_no || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:my-8 md:my-6 my-8 px-p_4px">
                        <p className="md:my-2 font-semibold">Courses:</p>
                        <table className="overflow-x-auto border w-full">
                            <thead>
                                <tr className="text-sm">
                                    <th className="lg:w-20 md:w-16 w-8 py-2 md:py-4 lg:py-6 border">Image</th>
                                    <th className="lg:w-72 md:w-64 w-40 py-2 md:py-4 lg:py-6 border">Course Name</th>
                                    <th className="lg:w-72 md:w-64 w-40 py-2 md:py-4 lg:py-6 border">Student Name</th>
                                    <th className="lg:w-20 md:w-20 w-16 py-2 md:py-4 lg:py-6 border">Quantity</th>
                                    <th className="lg:w-20 md:w-20 w-16 py-2 md:py-4 lg:py-6 border text-center">Price</th>
                                    <th className="lg:w-20 md:w-20 w-16 py-2 md:py-4 lg:py-6 border text-center">Total</th>
                                </tr>
                            </thead>
                            <tbody className="md:text-base text-sm font-semibold">
                          
                                    <tr >
                                        <td className="border text-center w-10 h-12 px-2">
                                            <img className="w-full h-full object-cover mx-auto" src={orderItems[0]?.photo || ''} alt="" />
                                        </td>
                                        <td className="lg:py-6 md:py-4 py-2 text-center border">
                                            {orderItems[0]?.course_name}
                                        </td>
                                        <td className="lg:py-6 md:py-4 py-2 text-center border">
                                            {orderData?.name}
                                        </td>
                                        <td className="lg:py-6 md:py-4 py-2 text-center border">
                                            {orderItems[0]?.quantity}
                                        </td>
                                        <td className="lg:py-6 md:py-4 py-2 text-center border">
                                            {orderItems[0]?.discount_price}
                                        </td>
                                        <td className="lg:py-6 md:py-4 py-2 text-center border">
                                            {orderData?.sub_total_course_fee}
                                        </td>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
