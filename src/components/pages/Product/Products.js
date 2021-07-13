import axios from 'axios'
import React, { useState } from 'react'


import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

const Products = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [product, setProduct] = useState([])
    const LoadProduct = async () => {
        const data = await axios.get('http://127.0.0.1:3333/api/product').then(res=>{
            if(res.status === 201){
                setIsLoading(true)
            }else{
                setProduct(res.data)
                setIsLoading(false)
            }
        })
    }

    React.useEffect(() => {
        LoadProduct()
    }, [])

    const deleteProduct = async (id) => {
        const data = await axios.delete(`http://127.0.0.1:3333/api/product/${id}`)
        LoadProduct()
    }

    const message = () =>{
        return(<>
            <div className="text-white">
                No Product avilable....
            </div>
        </>)
    }


    return (
        <div className="root_table pt-10">

            <div className="container ">
                <div className="flex justify-content-end">
                    <Link to="/addproduct"><button type="button" className="btn btn-primary "><AddIcon /> Add Product</button></Link>
                </div>
                {
                    isLoading ? message() :
                
                <div className="table-responsive">
                    <table className="table">
                        <thead className="text-white">
                            <tr>
                                <td>#</td>
                                <td>Product Name</td>
                                <td>Product Price</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {product.map((data, index) => (
                                <tr key={index} className="text-white">
                                    <td >{index + 1}</td>
                                    <td>{data.product_name}</td>
                                    <td>{data.product_price}.00</td>
                                    <td>
                                        <Link to={`/product/${data.product_id}/edit`}> <button type="button" className="btn btn-primary"><EditIcon /></button></Link>
                                        <Link to={`/product/${data.product_id}`}><button type="button" className="btn btn-outline-primary ml-2 mr-2"><VisibilityIcon /></button></Link>
                                        <button type="button" className="btn btn-danger" onClick={() => deleteProduct(data.product_id)}><DeleteIcon /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                }
            </div>
        </div>
    )
}

export default Products
