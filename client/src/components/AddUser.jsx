import React, { use, useEffect, useState } from 'react'
import api from '../api/axios';
import { useUser } from '../contexts/UserContext';

const AddUser = () => {

    const [isEmailAreadyExist, setIsEmailAlreadyExist] = useState(false);
    const { users, setUsers } = useUser();

    const [user, setUser] = useState({
        name: "",
        age: "",
        email: ""
    });

    const [errMsg, setErrMsg] = useState("");

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
        setIsEmailAlreadyExist(false);
        setErrMsg("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.name.trim() === "") {
            setErrMsg("Provide all the details");
            return;
        }
        if (user.age.trim() === "") {
            setErrMsg("Provide all the details");
            return;
        }
        if (user.email.trim() === "") {
            setErrMsg("Provide all the details");
            return;
        }
        if (user.age <= 0) {
            setErrMsg("Age should be greater than 0");
            return;
        }

        try {

            const isAlreadyExist = await api.post("/isUserExist", user);
            setIsEmailAlreadyExist(false);
            const res = await api.post("/user", user);
            setUsers([...users, res.data]);
            // make all of the fields to empty after submitting
            setUser(null);
        }
        catch (err) {
            setIsEmailAlreadyExist(true);
            console.error(err);
        }
    }

    return (
        <>

            {isEmailAreadyExist && <h1 className=' text-red-400 text-xl'>The User with this email already exist</h1>}
            {<h1 className=' text-xl text-red-400'>{errMsg}</h1>}
            <form className=' flex flex-col items-center justify-evenly gap-4' onSubmit={handleSubmit} >
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
                    <input type="email" name='email' placeholder='Enter email' value={user.email} onChange={handleChange} className=' border p-2 text-white rounded-lg' />
                </div>

                <button type="submit" className="bg-green-500 text-white px-2 py-1 text-lg font-semibold rounded-lg hover:bg-green-600 cursor-pointer">Add User</button>

            </form >
        </>
    )
}

export default AddUser
