import axios from 'axios'
import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const Product = () => {

    const id = useParams()

    const [product, setProduct] = useState([])
    const LoadProduct = async () => {
        const data = await axios.get(`http://127.0.0.1:3333/api/product/${id.id}`);
        setProduct(data.data.product)
    }

    React.useEffect(() => {
        LoadProduct()
    }, [])

    return (
        <div className="root_add pt-10">
           
            <div className="container ">
            <Link to="/products">
                <button type="button" class="btn btn-secondary"><ArrowBackIcon/></button>
            </Link>
                <div className="table-responsive">
                    <table className="table">
                        <thead className="text-white">
                            <tr>
                                <td>#</td>
                                <td>Product Name</td>
                                <td>Product Price</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-white">
                                <td>{product.product_id}</td>
                                <td>{product.product_name}</td>
                                <td>{product.product_price}.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Product
