import React, { useEffect, useState } from 'react'
import { FaX } from "react-icons/fa6";
import { useIsEditOpen } from '../contexts/IsEditOpenContext';
import api from '../api/axios';
import { useUser } from '../contexts/UserContext';

const EditModal = () => {

    const { isEditOpen, setIsEditOpen, ID } = useIsEditOpen();
    const { users, setUsers } = useUser();

    const [user, setUser] = useState({
        name: "",
        age: "",
        email: ""
    });

    useEffect(() => {
        api.get(`user/${ID}`)
            .then((res) => {
                setUser({
                    name: res.data.name,
                    age: res.data.age,
                    email: res.data.email
                })
            })
            .catch()
    }, [])



    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            /* setUsers([...users, user]); */
            const res = await api.put(`/user/${ID}`, user);
            const allUsers = await api.get('/users');
            setUsers(allUsers.data);

            setIsEditOpen(false);

            /* setUsers([...users, res.data]); */
        }
        catch (err) {
            console.error(err);
        }
    }

    const handleClose = () => {
        setIsEditOpen(false);
    }

    return (

        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            {/* Modal box */}
            <div className="bg-gray-800 text-gray-100 p-6 rounded-2xl shadow-lg w-96 relative">
                <button onClick={handleClose}>
                    <FaX className=' absolute right-4 top-4 hover:scale-110 cursor-pointer' />
                </button>
                <form className=' flex flex-col items-center justify-evenly gap-4' onSubmit={handleSubmit}>
                    <div className=' space-x-2'>
                        <label className=' text-white text-xl'>Name: </label>
                        <input type="text" name='name' placeholder='Enter name' value={user.name} onChange={handleChange} className=' border p-2 text-white rounded-lg' />
                    </div>
                    <div className=' space-x-2'>
                        <label className=' text-white text-xl pr-4'>Age: </label>
                        <input type="number" name='age' placeholder='Enter age' value={user.age} onChange={handleChange} className=' border p-2 text-white rounded-lg' />
                    </div>
                    <div className=' space-x-2'>
                        <label className=' text-white text-xl'>Email: </label>
                        <input type="text" name='email' placeholder='Enter email' value={user.email} onChange={handleChange} className=' border p-2 text-white rounded-lg' />
                    </div>

                    <button type="submit" className="bg-green-500 text-white px-2 py-1 text-lg font-semibold rounded-lg hover:bg-green-600 cursor-pointer" onsum>Edit User</button>

                </form >
            </div>
        </div>
    )
}

export default EditModal
