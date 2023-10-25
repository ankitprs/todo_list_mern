import React, { useState } from 'react';
import { useContext } from 'react';
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';
import axios from "../../Axios/axios.js"


function CreateTask() {
  const { dispatch } = useContext(TaskContext)
  const { userToken } = useContext(TokenContext)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/task/addTask", { title, description }, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
    } catch (error) {
      console.log(error);
    }
    dispatch({
      type: "ADD_TASK",
      title,
      description
    })
    setTitle("")
    setDescription("")
  }

  return (
    <div className="addContainer md:w-1/3 md:mx-auto mx-3 mt-3 flex justify-center text-blue-50">
      <div className='w-11/12'>
        <form onSubmit={handleAdd}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' />
          </div>
          <div className='my-3'>
            <label htmlFor="description">Description</label>
            <textarea
              rows={5}
              name="description"
              id="description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              style={{ resize: "none" }}
              className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' />
          </div>
          <div className='flex justify-center'>
            <button
              type='submit'
              className='bg-blue-700 rounded-md text-white  w-full p-2.5 shadow-sm shadow-gray-400'
            >Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;