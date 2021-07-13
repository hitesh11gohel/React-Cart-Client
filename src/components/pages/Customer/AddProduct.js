import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const AddCustomer = () => {
    const [customer_name, setcustomer_name] = React.useState('')
    let history = useHistory();
    const addCustomer = async () => {
        await axios.post('http://127.0.0.1:3333/api/customer', { customer_name: customer_name}).then((response) => {
            history.push('/customers')
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            <div className="h-screen flex bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 ...">
                <div className="m-auto flex flex-col">
                    <h1 className="mb-4 p-4 text-5xl">Add Customer</h1>
                    <input type="text" value={customer_name} onChange={(e) => setcustomer_name(e.target.value)} placeholder="Enter Customer Name" className="p-2 rounded-lg outline-none"></input>
                    <button onClick={addCustomer} className="p-4 mt-4 focus:outline-none rounded-lg text-lg font-extrabold">Add Customer</button>
                </div>
            </div>
        </>)
}

export default AddCustomer
