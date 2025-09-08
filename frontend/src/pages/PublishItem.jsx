import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import BACKENDURL from "../config/url.config";

export default function PublishItem() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        quantity: "",
        category: "",
    });
    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login first");
            return;
        }

        try {
            const data = new FormData();
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });
            for (let i = 0; i < images.length; i++) {
                data.append("images", images[i]);
            }

            const res = await axios.post(`${BACKENDURL}ngo/items`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success(res.data.message || "Item published successfully");
            setFormData({ title: "", description: "", quantity: "", category: "" });
            setImages([]);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to publish item");
        }
    };

    return (
        <div className="flex justify-center py-10 items-center min-h-[80vh] bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
                    Publish Item
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-gray-600 mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter item title"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-600 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter description"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                            required
                        />
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="block text-gray-600 mb-1">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            placeholder="Enter quantity"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-gray-600 mb-1">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Enter category (e.g. wall, toys)"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                            required
                        />
                    </div>

                    {/* Images */}
                    <div>
                        <label className="block text-gray-600 mb-1">Upload Images</label>
                        <input
                            type="file"
                            multiple
                            onChange={handleImageChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                            accept="image/*"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                    >
                        Publish
                    </button>
                </form>
            </div>
        </div>
    );
}
