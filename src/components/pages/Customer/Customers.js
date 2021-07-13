import axios from 'axios'
import React, { useEffect, useState } from 'react'

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
import {Link} from 'react-router-dom'
import { useHistory} from 'react-router';
const Customers = () => {
    let history = useHistory();
    const [data, setData] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [error,setError] = useState('')
    const deleteCustomer = async(id) =>{
        const delete1 = await axios.delete(`http://127.0.0.1:3333/api/customer/${id}`).then((res)=>{
            setError('Customber Is delete')
            getData()
            history.push('/customers')
        }).catch((err)=>{
            setError(id+ 'is not delete <br>' +err)
        })
    }

    const getData = async () => {
        const data = await axios.get('http://127.0.0.1:3333/api/customer').then(res=>{
            if(res.status===201){
                setIsLoading(true)
            }else{
                setData(res.data.customer)
                setIsLoading(false)
            }
        })


    }
    useEffect(() => {
      
        getData()
    }, [])

    const message = () => {
        return (
            <div className="text-white">
                No Customer available.......
            </div>
        )
    }
    return (
        <div className="root_table pt-10">

        <div className="container ">
        <div className="flex justify-content-end">
        <Link to="/addcustomer"><button type="button" className="btn btn-primary "><AddIcon/> Add Customer</button></Link>

        </div>
            {isLoading ? message() :
            <div className="table-responsive">
                <table className="table">
                    <thead className="text-white">
                        <tr>
                            <td>#</td>
                            <td>Customer Name</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((data, index) => (
                            <tr key={index} className="text-white">
                                <td >{index + 1}</td>
                                <td>{data.customer_name}</td>
                                <td>
                                    <Link to={`/customer/${data.customer_id}/edit`}> <button type="button" className="btn btn-primary"><EditIcon/></button></Link>
                                    <Link to={`/customer/${data.customer_id}`}><button type="button" className="btn btn-outline-primary ml-2 mr-2"><VisibilityIcon/></button></Link>
                                    <button type="button" className="btn btn-danger" onClick={()=> deleteCustomer(data.customer_id)}><DeleteIcon/></button>
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

export default Customers
