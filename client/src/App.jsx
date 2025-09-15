import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import api from './api/axios.js'
import { useUser } from './contexts/UserContext.jsx'
import UserTable from './components/UserTable.jsx'
import AddUser from './components/AddUser.jsx'
import EditModal from './components/EditModal.jsx'
import { useIsEditOpen } from './contexts/isEditOpenContext.jsx'

function App() {
  const { users, setUsers } = useUser();
  const { isEditOpen, setIsEditOpen } = useIsEditOpen();

  //GET users
  useEffect(() => {

    api.get("/users")
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => console.error(err))
  }, []);

  return (
    <main className=' h-screen flex flex-col justify-evenly items-center bg-gray-900'>
      <div className=' flex flex-row-reverse gap-4'>
        <h1 className=' text-2xl text-white font-bold'>MERN CRUD APP</h1>
        <img className=' size-12 pb-4' src="/app-logo.png" alt="" />
      </div>
      <AddUser />
      <UserTable />
      {
        isEditOpen && <EditModal />
      }

    </main>
  )
}

export default App
