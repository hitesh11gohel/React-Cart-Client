import axios from 'axios'
import React, { useEffect, useState, memo } from 'react'
import { Link, useHistory } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';

const Addorderitem = () => {
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)
    const [customer, setCustomer] = useState([])
    const [product, setProduct] = useState([])
    const [order_no, setOrder_no] = useState()
    const [quantity, setQuanity] = useState(1)
    const [price, setprice] = useState(0)
    const [total_amount, settotalAmount] = useState(0)
    const [customer_id, setCustomer_id] = useState('')
    const [product_id, setProduct_id] = useState('')
    const [order, setOrder] = useState([])
    const [data, setData] = useState([])
    const [Product_name, setProduct_name] = useState()
    const loadCustomer = async () => {
        await axios.get('http://127.0.0.1:3333/api/customer').then(res => {
            if (res.status === 201) {
                setIsLoading(true)
            } else {
                setCustomer(res.data.customer)
                setIsLoading(false)
            }
        })
    }

    const loadProduct = async () => {
        await axios.get('http://127.0.0.1:3333/api/product').then(res => {
            if (res.status === 201) {
                setIsLoading(true)
            } else {
                setProduct(res.data)
                setIsLoading(false)
            }
        })
    }


    useEffect(() => {
        loadCustomer();
        loadProduct();
    }, [])
    const message = () => {
        return (
            <div className="text-white">
                No  order place plz contact to admin..........
            </div>
        )
    }
    const [productData, setProductData] = useState([])

    const addorder = async () => {
        setData([
            ...data.findIndex(), {
                product_id: product_id,
                Product_name: Product_name,
                quantity: quantity,
                price: price,
                total_amount: total_amount
            }])

        setMainTotal(mainTotal + total_amount)
    }
    const addQuamity = () => {
        if (quantity === 1) {
            setQuanity(1)
        } else {
            setQuanity(quantity - 1)
        }
    }
    console.log(data)
    useEffect(() => {
        settotalAmount(price * quantity)
    }, [quantity])
    const [mainTotal, setMainTotal] = useState(0)
    const [ErrorMassage, setErrorMassage] = useState('')

    const addMainOrder = async () => {
        if (customer_id == "") {
            setErrorMassage('Select Customer.....')
        } else {

            setErrorMassage('')
            await axios.post('http://127.0.0.1:3333/api/order', { total_amount: mainTotal, customer_id: customer_id }).then(res => {
                if (res.status === 200) {
                    console.log(res.data.order.order_no)
                    data.map((data, index) => (
                        axios.post('http://127.0.0.1:3333/api/order/addorderitems', {
                            order_no: res.data.order.order_no,
                            product_id: data.product_id,
                            quantity: data.quantity,
                            price_per_item: data.price,
                            amount: data.total_amount
                        }).then(res => history.push('/orders'))
                    ))
                }
            })
        }
    }

    const deleteDataProduct = async (product_id) => {
        setData([...data.filter(id => id.product_id !== product_id)])
    }

    const remove = async () => {
        setData([])
    }
    return (
        <div className="h-screen pt-10 flex bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 ...">
            <div className="container">
                {
                    isLoading ? message() :
                        <div>
                            <div className="row">

                                <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                                    <option value="mayur" selected disabled>Customber</option>
                                    {customer.map((data, index) => (
                                        <option value={data.customer_id} key={index} onClick={() => {
                                            setErrorMassage('')
                                            remove()
                                            setCustomer_id(data.customer_id)
                                        }}>{data.customer_name}</option>
                                    ))}
                                </select>
                                <div className=" mb-3" style={{ marginTop: '-15px' }}>{ErrorMassage}</div>
                                <div className="row">
                                    <div className="col-4">
                                        <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                                            <option value="" selected disabled>Product</option>
                                            {product.map((data, index) => (

                                                <option value={data.product_name} onClick={() => {
                                                    setProduct_id(data.product_id)
                                                    setProduct_name(data.product_name)
                                                    settotalAmount(data.product_price)
                                                    setprice(data.product_price)
                                                    setQuanity(1)
                                                }} >{data.product_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <div className="flex mb-3">
                                            <div className="w-1/5 rounded-l-md border-1 text-center p-2 bg-white" onClick={() => addQuamity()}><RemoveIcon /></div>
                                            <div className="w-1/5 border-1 text-center p-2 bg-white">{quantity}</div>
                                            <div className="w-1/5 rounded-r-md border-1 p-2 bg-white text-center" onClick={() => setQuanity(quantity + 1)}><AddIcon /></div>
                                        </div>
                                    </div>
                                </div>



                                <div className="text-white pb-3">
                                    Product Price : {price}.00
                                    <br></br>
                                    Total Amount : {total_amount}.00
                                </div>
                            </div>
                            <button type="button" className="btn btn-primary" onClick={addorder}><AddIcon /> Add Product</button>

                        </div>
                }
                <div className="table-responsive">
                    <table className="table">
                        <thead className="text-dark">
                            <tr>
                                <td>Product No</td>
                                <td>Quantity</td>
                                <td>Price</td>
                                <td>Total Price</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody className="text-dark">
                            {data.map((data, index) => (
                                <tr key={index} className="text-dark">
                                    <td>Product ID: {data.product_id}
                                        <div>Product Name: {data.Product_name}
                                        </div></td>
                                    <td>{data.quantity}</td>
                                    <td>{data.price}</td>
                                    <td>{data.total_amount}</td>
                                    <td>
                                        <Link to={`/customer/${data.customer_id}/edit`}> <button type="button" className="btn btn-primary"><EditIcon /></button></Link>
                                        <Link to={`/customer/${data.customer_id}`}><button type="button" className="btn btn-outline-primary ml-2 mr-2"><VisibilityIcon /></button></Link>
                                        <button type="button" className="btn btn-danger" onClick={() => { deleteDataProduct(data.product_id) }}><DeleteIcon /></button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
                <div className="flex justify-content-end">
                    <div className="p-4 font-bold">
                        <div className="mb-2">Total Amount: {mainTotal}</div>
                        <button type="button" className="btn btn-primary w-full" onClick={addMainOrder}><AddIcon /> Add Order</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Addorderitem)
