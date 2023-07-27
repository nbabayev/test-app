import React, { useState } from 'react'
import { useEffect } from 'react'
import { get_products } from '../services/user-service'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

const Home = () => {
    const [products, set_products] = useState([]);
    const [order_type, set_order_type] = useState("ASC");
    const [order_value, set_order_value] = useState(1);

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        let res = await get_products()
        set_products(res.data?.products);
    }

    function handle_title(value) {
        set_products(products?.filter(p => p?.title?.toLowerCase()?.includes(value)))
    }
    function handle_brand(value) {
        set_products(products?.filter(p => p?.brand?.toLowerCase()?.includes(value)))
    }
    function handle_rating(value) {
        set_products(products?.filter(p => p?.rating?.toString().includes(value)))
    }

    function handle_order() {
        if (order_value == 1) {
            set_products(products?.sort((p1, p2) => {
                if (order_type == 'ASC') {
                    return p1.title?.toLowerCase() > p2.title?.toLowerCase() ? 1 : (p2.title?.toLowerCase() > p1.title?.toLowerCase()) ? -1 : 0
                } else {
                    return p1.title?.toLowerCase() < p2.title?.toLowerCase() ? 1 : (p2.title?.toLowerCase() < p1.title?.toLowerCase()) ? -1 : 0
                }
            }))
        }
        if (order_value == 2) {
            set_products(products?.sort((p1, p2) => {
                if (order_type == 'ASC') {
                    return p1.brand?.toLowerCase() > p2.brand?.toLowerCase() ? 1 : (p2.brand?.toLowerCase() > p1.brand?.toLowerCase()) ? -1 : 0
                } else {
                    return p1.brand?.toLowerCase() < p2.brand?.toLowerCase() ? 1 : (p2.brand?.toLowerCase() < p1.brand?.toLowerCase()) ? -1 : 0
                }
            }))
        }
        if (order_value == 3) {
            set_products(products?.sort((p1, p2) => {
                if (order_type == 'ASC') {
                    return p1?.rating > p2?.rating ? 1 : (p2?.rating > p1?.rating) ? -1 : 0
                } else {
                    return p1?.rating < p2?.rating ? 1 : (p2?.rating < p1?.rating) ? -1 : 0
                }
            }))
        }
        set_order_type(order_type == "ASC" ? "DESC" : "ASC")
    }

    const reset = () => getData()
    return (
        <div style={{
            maxWidth: "90%",
            overflowX: "scroll",
            margin: "0 auto"
        }}>
            <div className='mb-4 mt-4 d-flex align-items-center justify-content-center'>
                <input type="text" className="me-2" placeholder='axtar' onChange={(e) => handle_title(e.target.value)} />
                <input type="text" className="me-2" placeholder='axtar' onChange={(e) => handle_brand(e.target.value)} />
                <input type="number" className="me-2" placeholder='axtar' onChange={(e) => handle_rating(e.target.value)} />
                <select name="" id="" onChange={(e) => set_order_value(e.target.value)} className="me-2">
                    <option value="1">Title order</option>
                    <option value="2">Brand order</option>
                    <option value="3">Rating order</option>
                </select>
                <Button className="me-2" onClick={handle_order}>{order_type == "ASC" ? "ASC" : "DESC"}</Button>
                <Button className="me-2" onClick={reset}>Reset</Button>
            </div>
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Brand</th>
                            <th>Rating</th>
                            <th>Stock</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.map(p => (

                                <tr>
                                    <td>{p?.title}</td>
                                    <td>{p?.brand}</td>
                                    <td>{p?.rating}</td>
                                    <td>{p?.stock}</td>
                                </tr>
                            ))

                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}


export default Home