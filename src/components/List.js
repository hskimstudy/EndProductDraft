import { useState } from 'react';
import React from 'react'

const List = ({
  id,
  title,
  completed,
  todoData,
  setTodoData,
  provided,
  snapshot
}) => {

  const [isEditing, setisEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title)


  const handleClick = (id) => {
    let newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData);
    localStorage.setItem("todoData", JSON.stringify(newTodoData));
  };

  const handleCompleChange = (id) => {
    let newTodoData = todoData.map(data => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });

    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData))
  };


  const handleEditChange = (event) => {
    setEditedTitle(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let newTodoData = todoData.map(data => {
      if (data.id === id) {
        data.title = editedTitle;
      }
      return data;
    });
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData))
    setisEditing(false);
  };


  if (isEditing) {
    return (
      <div
        className={`flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}>
        <div className='item-center'>
          <form onSubmit={handleSubmit}>
            <input
              value={editedTitle}
              onChange={handleEditChange}
              className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
            />
          </form>

        </div>
        <div className='item-center'>
          <button className="px-4 py-2 float-right" onClick={() => setisEditing(false)}>x
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 float-right" type='submit'>
            save
          </button>
        </div>
      </div>
    )
  } else {
    return (

      <div
        key={id}
        {...provided.draggableProps}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
          } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-500 bg-gray-100 border rounded`}
      >

        <div className='item-center'>
          <input
            type='checkbox'
            onChange={() => handleCompleChange(id)}
            defaultChecked={completed}
          />{" "}
          <span
            className={completed ? 'line-through' : undefined
            }
          >
            {title}
          </span>
        </div>
        <div className='item-center'>
          <button className="px-4 py-2 float-right" onClick={() => handleClick(id)}>x
          </button>
          <button className="px-4 py-2 float-right" onClick={() => setisEditing(true)}>edit</button>
        </div>
      </div>)
  }
};

export default List
