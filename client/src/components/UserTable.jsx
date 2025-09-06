import React, { useState } from 'react'
import user from '../api/axios';
import { useUser } from '../contexts/UserContext';
import { MdDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import api from '../api/axios';
import { useIsEditOpen } from '../contexts/isEditOpenContext';

const Display = () => {
  const { users, setUsers } = useUser();
  const { isEditOpen, setIsEditOpen, ID, setID } = useIsEditOpen();

  const handleDelete = async (id) => {
    const res = await api.delete(`user/${id}`);
    const allUsers = await api.get("/users");
    setUsers(allUsers.data);
  }

  const handleEdit = async (id) => {
    setID(id);
    setIsEditOpen(true);
  }

  return (
    <div className=''>
      <table className=' min-w-full border border-gray-300 text-sm text-left'>
        <thead className=' bg-gray-100 text-gray-700 uppercase text-xs'>
          <tr>
            <th className=' px-4 py-2 border text-center'>ID</th>
            <th className=' px-4 py-2 border text-center'>Name</th>
            <th className=' px-4 py-2 border text-center'>Age</th>
            <th className=' px-4 py-2 border text-center'>Email</th>
            <th className=' px-4 py-2 border text-center'>Edit</th>
            <th className=' px-4 py-2 border text-center'>Delete</th>

          </tr>
        </thead>

        <tbody className=' bg-gray-100 text-gray-700'>
          {users.map((user) => (
            <tr key={user._id}>
              <td className=' px-4 py-2 border'>{user._id}</td>
              <td className=' px-4 py-2 border'>{user.name}</td>
              <td className=' px-4 py-2 border'>{user.age}</td>
              <td className=' px-4 py-2 border'>{user.email}</td>
              <td onClick={() => handleEdit(user._id)} className=' bg-green-400 border-2 border-gray-500'><MdEdit className=' text-white size-8 hover:scale-110 cursor-pointer mx-auto' /></td>
              <td onClick={() => handleDelete(user._id)} className=' bg-red-400 border-2 border-gray-500'><MdDeleteOutline className=' text-white size-8 hover:scale-110 cursor-pointer mx-auto' /></td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default Display
