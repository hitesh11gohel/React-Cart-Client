import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const ProductData = (props) => {
    const [product, setProduct] = useState([])

    const loadproduct = async () => {
        await axios.get(`http://127.0.0.1:3333/api/product/${props.id}`).then(res => {
            setProduct(res.data.product)
            console.log(res)
        }).catch(err => console.log(err))
    }
    useEffect(() => {
        loadproduct()
    }, [])
    return (<>
        <div>Produc Name : {product.product_name}</div>
        <div>Product Price : {product.product_price}</div>
    </>)
}

const Orderitem = () => {
    const { order_no } = useParams()
    const [isLoading, setIsLoadning] = useState(true)
    const [orderItem, setOrderItem] = useState([])
    const loadOrderItems = async () => {
        await axios.get(`http://127.0.0.1:3333/api/order/${order_no}/orderitems`).then(res => {
            console.log(res)
            if (res.status == 201) {
                setIsLoadning(true)
            } else {
                setOrderItem(res.data)
                setIsLoadning(false)
            }
        }).catch(err => {
            setIsLoadning(true)
            console.log(err)
        })
    }
    useEffect(() => {
        loadOrderItems()
    }, [])
    const message = () => {
        return (
            <div className="text-white">
                No order Items avilable....
            </div>
        )
    }

    return (
        <div className="root_table pt-10">
            <div className="container">
                <Link to="/orders">
                    <button type="button" className="btn btn-secondary"><ArrowBackIcon /></button>
                </Link>
                {
                    isLoading ? message() :
                        <div>
                            <div className="text-white pt-2 pb-2">Order No: {order_no}</div>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="text-white">
                                        <tr>
                                            <td>Order Item No</td>
                                            <td>Product Detail</td>
                                            <td>Quantity</td>
                                            <td>price_per_item</td>
                                            <td>Amount</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orderItem.map((data, index) => (
                                                <tr key={index} className="text-white">
                                                    <td>{data.order_item_no}</td>
                                                    <td>Product ID : #{data.product_id}
                                                        <ProductData id={data.product_id} />
                                                    </td>
                                                    <td>{data.quantity}</td>
                                                    <td>{data.price_per_item}</td>
                                                    <td>{data.amount}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default Orderitem
