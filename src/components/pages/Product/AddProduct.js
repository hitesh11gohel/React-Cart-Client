import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const AddProduct = () => {
    const [product_name, setproduct_name] = React.useState('')
    const [product_price, setProduct_price] = React.useState('')
    let history = useHistory();
    const addCustomer = async () => {
        await axios.post('http://127.0.0.1:3333/api/product', { product_name: product_name, product_price: product_price }).then((response) => {
            history.push('/products')
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            <div className="h-screen flex bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 ...">
                <div className="m-auto flex flex-col">
                    <h1 className="mb-4 p-4 text-5xl">Add Product</h1>
                    <input type="text" value={product_name} onChange={(e) => setproduct_name(e.target.value)} placeholder="Enter Product Name" className="p-2 rounded-lg outline-none"></input>
                    <input type="text" value={product_price} onChange={(e) => setProduct_price(e.target.value)} placeholder="Enter Product Price" className="p-2 rounded-lg outline-none mt-2"></input>
                    <button onClick={addCustomer} className="p-4 mt-4 focus:outline-none rounded-lg text-lg font-extrabold">Add Product</button>
                </div>
            </div>
        </>)
}

export default AddProduct
