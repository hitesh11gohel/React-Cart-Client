import axios from 'axios'
import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const Customer = () => {

    const id = useParams()

    const [customer, setCustomer] = useState([])
    const LoadCustomer = async () => {
        const data = await axios.get(`http://127.0.0.1:3333/api/customer/${id.id}`);
        setCustomer(data.data.customer)
    }

    React.useEffect(() => {
        LoadCustomer()
    }, [])

    return (
        <div className="root_add pt-10">
           
            <div className="container ">
            <Link to="/customers">
                <button type="button" className="btn btn-secondary"><ArrowBackIcon/></button>
            </Link>
                <div className="table-responsive">
                    <table className="table">
                        <thead className="text-white">
                            <tr>
                                <td>#</td>
                                <td>Customer Name</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-white">
                                <td>{customer.customer_id}</td>
                                <td>{customer.customer_name}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Customer
