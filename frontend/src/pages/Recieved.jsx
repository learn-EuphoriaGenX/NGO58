import React, { useEffect, useState } from "react";
import axios from "axios";
import BACKENDURL from "../config/url.config";
const Recieved = () => {
    const [items, setItems] = useState([]);

    const token = localStorage.getItem("token"); // store JWT token

    // fetch items
    const fetchItems = async () => {
        try {
            const res = await axios.get(
                `${BACKENDURL}ngo/items?status=received`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log(res.data);

            setItems(res.data.items);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchItems();
    }, []);


    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Recieved Items</h2>

            {/* Items List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {
                    items.length > 0 ? items.map((item) => (
                        <div
                            key={item._id}
                            className="border rounded-lg shadow p-4 flex flex-col"
                        >
                            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{item.description}</p>

                            {/* Images */}
                            <div className="flex gap-2 overflow-x-auto mb-2">
                                {item.images.map((img, index) => (
                                    <img
                                        key={index}
                                        src={`http://localhost:5000${img}`}
                                        alt="item"
                                        className="w-24 h-24 object-cover rounded"
                                    />
                                ))}
                            </div>

                            <p className="text-sm mb-1">
                                <b>Category:</b> {item.category}
                            </p>
                            <p className="text-sm mb-1">
                                <b>Quantity:</b> {item.quantity}
                            </p>
                            <p className="text-sm mb-1  ">
                                <b>Status:</b> <span className="italic text-green-900"> {item.status.toUpperCase()}</span>
                            </p>

                        </div>
                    )) : <p>No Data Found</p>
                }
            </div>
        </div>
    );
};

export default Recieved;
