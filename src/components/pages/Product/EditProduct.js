import React from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'

const EditProduct = () => {
    const { id } = useParams()
    const [product_id, setproduct_id] = React.useState('')
    const [product_price, setProduct_price] = React.useState('')
    const [product_name, setproduct_name] = React.useState('')
    let history = useHistory();

    const loadProduct = async () => {
        const data = await axios.get(`http://127.0.0.1:3333/api/product/${id}`);
        setProduct_price(data.data.product.product_price)
        setproduct_id(data.data.product.product_id)
        setproduct_name(data.data.product.product_name)
    }

    React.useEffect(() => {
        loadProduct()
    }, [])
    const editProduct = async () => {
        await axios.patch(`http://127.0.0.1:3333/api/product/${product_id}/edit`, { product_name: product_name, product_price: product_price }).then((response) => {
            history.push('/products')
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            <div className=" root_edit h-screen flex ">
                <div className="m-auto flex flex-col">
                    <h1 className="mb-4 p-4 text-5xl text-white">Add Product</h1>
                    <input type="text" value={product_name} onChange={(e) => setproduct_name(e.target.value)} placeholder="Enter Product Name" className="p-2 rounded-lg outline-none"></input>
                    <input type="text" value={product_price} onChange={(e) => setProduct_price(e.target.value)} placeholder="Enter Product Price" className="p-2 rounded-lg outline-none mt-2"></input>
                    <button onClick={() => editProduct(product_id)} className="p-4 mt-4 focus:outline-none rounded-lg text-lg font-extrabold text-white">Add Product</button>
                </div>
            </div>
        </>)
}

export default EditProduct
