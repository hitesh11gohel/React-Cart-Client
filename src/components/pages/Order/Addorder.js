import axios from 'axios';
import React from 'react'
import {useHistory} from 'react-router-dom'

const Addorder = () => {
    const [customer_id, setcustomer_id] = React.useState('')
    const [total_amount,setTotal_amount] = React.useState('')
    const [customer,setCustomer] = React.useState([])
    let history = useHistory();
    const addOrder = async () => {
        await axios.post('http://127.0.0.1:3333/api/order', { total_amount: total_amount,customer_id:customer_id}).then((response) => {
            history.push('/orders')
        }).catch((err) => {
            console.log(err);
        })
    }

    const loadCustomer = async () => {
        await axios.get('http://127.0.0.1:3333/api/customer').then(res => {
            setCustomer(res.data.customer)
        })
    }

    React.useEffect(()=>{
        loadCustomer();
    },[])

    return (
        <>
            <div className="h-screen flex bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 ...">
                <div className="m-auto flex flex-col">
                    <h1 className="mb-4 p-4 text-5xl">Add Order</h1>
                    <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                                        <option value="" selected disabled>Customer</option>
                                        {customer.map((data, index) => (
                                            <option value={data.customer_name} key={index} onClick={()=>setcustomer_id(data.customer_id)}>{data.customer_name}</option>
                                        ))}
                                    </select>
                    <input type="text" value={total_amount} onChange={(e) => setTotal_amount(e.target.value)} placeholder="Enter Total Amount" className="p-2 rounded-lg outline-none mt-2"></input>
                    
                    <button onClick={addOrder} className="p-4 mt-4 focus:outline-none rounded-lg text-lg font-extrabold">Add Order</button>
                </div>
            </div>
        </>)
}

export default Addorder
