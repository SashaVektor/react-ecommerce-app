import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { selectEmail } from '../../redux/slice/authSlice'

const AdminRoute = ({children}) => {
    const userEmail = useSelector(selectEmail);

    if(userEmail === 'sasha1@mail.ua'){
        return children
    } 
    return (
        <section style={{height: "80vh"}}>
            <div className='container'>
                <h2>Permisson Denied.</h2>
                <p>This page can only view by an Admin user.</p>
                <br />
                <Link to="/home">
                <button className='--btn '>&larr; Back To Home</button>
                </Link>
            </div>
        </section>
    )
}

export default AdminRoute
