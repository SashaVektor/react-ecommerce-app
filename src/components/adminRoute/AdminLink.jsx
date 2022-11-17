import React from 'react'
import { useSelector } from 'react-redux'
import { selectEmail } from '../../redux/slice/authSlice'

const AdminLink = ({children}) => {
    const userEmail = useSelector(selectEmail);

    if(userEmail === 'sasha1@mail.ua'){
        return children
    } else {
        return null
    }
}

export default AdminLink

