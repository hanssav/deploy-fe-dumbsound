import React, { useEffect, useState } from 'react'

import { Container, Table, Dropdown, Image, Button } from 'react-bootstrap'

import Navbar from '../../component/Navbarr'

import { API } from "../../config/api"
import "./listTransactions.css"


function DropDown(props) {
    // console.log(props)
    return (
        <Dropdown>
            <Dropdown.Toggle className="dropdown-toggle" style={{backgroundColor: "rgba(76, 175, 80, 0)", border: "none"}}
            id="dropdown-basic">
            </Dropdown.Toggle>

            <Dropdown.Menu className="bg-dark">
                <Dropdown.Item onClick={() => props.approved(props.id)} className="text-success" >Approved</Dropdown.Item>
                <Dropdown.Item onClick={() => props.cancel(props.id)} className="text-danger" >Cancel</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}


export default function ListTransactions() {
    // console.clear()

    const [payment, setPayment] = useState([])
    // const [day, setDay] = useState()

    const getTransactions = async () => {
        // console.clear()
        try {
            const response = await API.get("/getpayments")
            setPayment(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTransactions();
    },[])

    function convertDate(date) {
        let dd = date.getDate()
        let mm = date.getMonth() + 1
        let yyyy = date.getFullYear()

        return mm + '/' + dd + '/' + yyyy
    }

    const getDay = (dueDate, startDate) => {
        // console.log(dueDate)
        let day1 = convertDate(dueDate)
        let day2 = convertDate(startDate)
        console.log(day2)


        let difference= Math.abs(new Date(day1) - new Date(day2));
        return difference / (1000 * 3600 * 24)
    }

    const handleApproved = async (id) => {
        console.log(id)
        try {
            const response = await API.put(`/updatestatusapproved/${id}`)
            console.log(response.data)

            getTransactions();
        } catch (error) {
            console.log(error)
        }
    }

    const handleCancel = async (id) => {
        console.log(id)
        try {
            const response = await API.put(`/updatestatuscancel/${id}`)
            console.log(response.data.newData)

            getTransactions();
        } catch (error) {
            console.log(error)
        }
    }

    const attacheName = (atthache) => {
        console.log(atthache)
        let title = atthache
        const newTitle = title.split("-")
        return newTitle.slice(1).join(" ")
    }

    return (
        <>
            <Navbar />
            <Container style={{ marginTop: "50px", marginBottom: "100px" }}>

                <h3 className='text-light mb-5'>Incoming Transactions</h3>

                <Table variant="dark" striped bordered hover>
                    <thead className="text-danger">
                        <tr>
                        <th>No</th>
                        <th>Users</th>
                        <th>Bukti Transfer</th>
                        <th>Remaining Active</th>
                        <th>Status User</th>
                        <th>Status User</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            payment.map((items, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{items.user.fullName}</td>
                                    <td class='cursor-pointer' onClick={() =>
                                        window.open(items.attache , 'blank').focus()
                                    }>
                                        <Button variant="outline-light" className='border-0'>
                                            {attacheName(items.attache)}
                                        </Button> 
                                    </td>
                                    {new Date(items.dueDate) > new Date() ? (
                                            <td>{getDay(new Date(items.dueDate), new Date())} / Hari</td>
                                        ) : (
                                            <td>0 / Hari</td>
                                    )}

                                    {new Date(items.dueDate) > new Date() ? (
                                            <td className='text-success'>Active</td>
                                        ) :
                                            new Date(items.dueDate) < new Date() ? (
                                            <td className='text-danger'>Not Active</td>
                                        ) : (
                                            <td className='text-danger'>Not Active</td>
                                        )}

                                    {items.status === 'approved' ? (
                                        <td className="text-success">{items.status}</td>
                                        ) :
                                        items.status === 'pending' ? (
                                            <td className="text-warning">{items.status}</td>
                                        ) : (
                                            <td className="text-danger">{items.status}</td>
                                        )}

                                    <td>
                                        <DropDown key={items.id}
                                            approved={() => handleApproved(items.id)}
                                            cancel={() => handleCancel(items.id)}
                                        /></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

