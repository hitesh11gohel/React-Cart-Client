import React from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'

const EditProduct = () => {
    const { id } = useParams()
    const [customer_id, setcustomer_id] = React.useState('')
    const [customer_name, setcustomer_name] = React.useState('')
    let history = useHistory();

    const loadCustomer = async () => {
        const data = await axios.get(`http://127.0.0.1:3333/api/customer/${id}`);
        setcustomer_name(data.data.customer.customer_name)
        setcustomer_id(data.data.customer.customer_id)
    }

    React.useEffect(() => {
        loadCustomer()
    }, [])
    const editCustomer = async () => {
        await axios.patch(`http://127.0.0.1:3333/api/customer/${customer_id}/edit`, { customer_name: customer_name }).then((response) => {
            history.push('/customers')
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            <div className=" root_edit h-screen flex ">
                <div className="m-auto flex flex-col">
                    <h1 className="mb-4 p-4 text-5xl text-white">Add Product</h1>
                    <input type="text" value={customer_name} onChange={(e) => setcustomer_name(e.target.value)} placeholder="Enter Customer Name" className="p-2 rounded-lg outline-none"></input>
                    <button onClick={() => editCustomer(customer_id)} className="p-4 mt-4 focus:outline-none rounded-lg text-lg font-extrabold text-white">Edit Customer</button>
                </div>
            </div>
        </>)
}

export default EditProduct
