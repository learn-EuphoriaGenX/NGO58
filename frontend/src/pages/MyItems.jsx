import React, { useEffect, useState } from "react";
import axios from "axios";
import BACKENDURL from "../config/url.config";

const MyItems = ({ user }) => {
    const [items, setItems] = useState([]);
    const [status, setStatus] = useState("available");

    const token = localStorage.getItem("token"); // store JWT token

    // fetch items
    const fetchItems = async () => {
        try {
            const res = await axios.get(
                `${BACKENDURL}ngo/items?status=${status}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            // filter items owned by the logged in user
            const myItems = res.data.items.filter(
                (item) => item.owner._id == user.id || localStorage.getItem('userid')
            );
            setItems(myItems);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [status]);

    // delete item
    const deleteItem = async (id) => {
        try {
            await axios.delete(`${BACKENDURL}ngo/items/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setItems(items.filter((item) => item._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">My Items</h2>

            {/* Status Filter */}
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border p-2 mb-4"
            >
                <option value="available">Available</option>
                <option value="claimed">Claimed</option>
                <option value="received">Received</option>
            </select>

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

                            {
                                status !== 'received' &&
                                <button
                                    onClick={() => deleteItem(item._id)}
                                    className="mt-3 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            }
                        </div>
                    )) : <p>No Data Found</p>
                }
            </div>
        </div>
    );
};

export default MyItems;
