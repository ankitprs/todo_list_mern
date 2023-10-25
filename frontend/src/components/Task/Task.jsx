import React from 'react';
import moment from 'moment';
import { useContext } from 'react';
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';
import apiService from '../../Axios/apiConfig'

function Task({ task, id }) {
  const { dispatch } = useContext(TaskContext);
  const { userToken } = useContext(TokenContext)
  console.log(task);

  const handleRemove = async (e) => {
    // e.preventDefault();
    try {
      const result = await apiService.deleteTask({ id: task._id, userToken })
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    dispatch({
      type: "REMOVE_TASK",
      id
    })
  }

  const handleMarkDone = async (e) => {
    try {
      const result = await apiService.taskCompltedToggle({ id: task._id, isCompleted: !task.completed, userToken })
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    dispatch({
      type: "MARK_DONE",
      id
    })
  }

  return (
    <div className=' bg-gray-400 py-4 px-3 rounded-xl shadow-md flex items-center justify-center gap-2 mb-3'>
      <div className="mark-done p-3">
        <input type="checkbox" className="checkbox" onChange={handleMarkDone} checked={task.completed} />
      </div>
      <div className="task-info text-slate-900 text-sm w-10/12">
        <h4 className="task-title text-lg capitalize">{task.title}</h4>
        <p className="task-description">{task.description}</p>
        <div className=' italic opacity-60'>
          {
            task?.createdAt ? (
              <p>{moment(task.createdAt).fromNow()}</p>
            ) : (
              <p>just now</p>
            )
          }
        </div>
      </div>
      <div className="remove-task text-sm text-white">
        <button
          style={{ fontSize: 18, cursor: "pointer" }}
          // size="large"
          onClick={handleRemove}
          className="remove-task-btn bg-red-700 rounded-lg shadow-sm shadow-black p-1.5" >Delete</button>
      </div>
    </div>
  );
}

export default Task;