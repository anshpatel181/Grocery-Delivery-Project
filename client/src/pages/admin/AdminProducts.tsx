import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusIcon, EditIcon, XIcon } from "lucide-react";
import { Loading } from "../../components/Loading";
import { products } from "../../assets/assets";
import type { Product } from "../../types/types";
import axios from "axios";

export default function AdminProducts() {

    const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

    const [productsData, setProductsData] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("auth_token")
    const base_url = import.meta.env.VITE_BACKEND_URL

    localStorage.setItem("auth_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZkNTQxYzI2LTc1YTItNDZjZi1hODQ5LTI0ODQ2YWFjYWEwNSIsImlhdCI6MTc4NDA1NzA4MCwiZXhwIjoxNzg2NjQ5MDgwfQ.TdRx4NgfiZ5vnqO7bKooiAh50BhgasLEwACu93aBXNM")

    const fetchProducts = async () => {
        
        const data = await axios.get(base_url + "/products/allProducts", {
            headers: { Authorization: `Bearer ${token}` },
        })

        console.log(data)

        // setProductsData(products);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleMarkOutOfStock = async (id: string, name: string) => {
        if (!window.confirm(`Are you sure you want to mark "${name}" as out of stock?`)) return;
        console.log(id);
    };

    if (loading) return <Loading />

    return (
        <>
            <div className="bg-white rounded-2xl shadow-sm border border-app-border overflow-hidden">
                <div className="px-6 py-5 border-b border-app-border flex items-center justify-between gap-4 flex-wrap">
                    <h2 className="text-xl font-semibold text-zinc-900">Products</h2>
                    <Link to="/admin/products/new" className="flex items-center gap-2 px-4 py-2 bg-app-green text-white rounded-xl hover:bg-green-950 transition-colors font-medium text-sm">
                        <PlusIcon className="size-4" /> Add Product
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-app-cream/50 text-zinc-500 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">Product</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Stock</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-app-border">
                            {productsData.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">No products found.</td>
                                </tr>
                            ) : (
                                productsData.map(product => (
                                    <tr key={product._id} className="hover:bg-zinc-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={product.image} alt={product.name} className="size-12 rounded-lg object-cover" />
                                                <div>
                                                    <p className="font-semibold text-zinc-900">{product.name}</p>
                                                    <p className="text-xs text-zinc-500">{product.category || "Uncategorized"}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium">{currency}{product.price.toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link to={`/admin/products/${product._id}/edit`} className="p-2 text-zinc-500 hover:text-app-orange bg-zinc-100 hover:bg-orange-50 rounded-lg transition-colors">
                                                    <EditIcon className="size-4" />
                                                </Link>
                                                <button onClick={() => handleMarkOutOfStock(product._id, product.name)} title="Mark Out of Stock" className="p-2 text-zinc-500 hover:text-red-600 bg-zinc-100 hover:bg-red-50 rounded-lg transition-colors">
                                                    <XIcon className="size-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
