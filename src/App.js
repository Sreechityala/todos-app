// src/App.js
import React, { Component } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.state = {
            tasks: savedTasks,
            taskToEdit: null,
            editText: '',
        };
    }

    addTask = (taskText) => {
        const newTask = { text: taskText, completed: false };
        this.setState((prevState) => {
            const newTasks = [...prevState.tasks, newTask];
            localStorage.setItem('tasks', JSON.stringify(newTasks));
            return { tasks: newTasks };
        });
    }

    deleteTask = (index) => {
        this.setState((prevState) => {
            const newTasks = prevState.tasks.filter((_, i) => i !== index);
            localStorage.setItem('tasks', JSON.stringify(newTasks));
            return { tasks: newTasks };
        });
    }

    editTask = (index) => {
        const task = this.state.tasks[index];
        this.setState({ taskToEdit: index, editText: task.text });
    }

    updateTask = () => {
        const { taskToEdit, editText } = this.state;
        this.setState((prevState) => {
            const tasks = [...prevState.tasks];
            tasks[taskToEdit].text = editText;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            return { tasks, taskToEdit: null, editText: '' };
        });
    }

    handleEditChange = (e) => {
        this.setState({ editText: e.target.value });
    }

    toggleComplete = (index) => {
      this.setState((prevState) => {
          const tasks = [...prevState.tasks];
          tasks[index].completed = !tasks[index].completed;
          localStorage.setItem('tasks', JSON.stringify(tasks));
          return { tasks };
      });
  }

    render() {
        return (
            <div className="app">
              <div className='todos-container'>
                <h1 className='main-heading'>Create New Task</h1>
                <TaskInput addTask={this.addTask} />
                
                <h1 className='todos-list'>Todos List</h1>
                <TaskList 
                    tasks={this.state.tasks} 
                    deleteTask={this.deleteTask} 
                    editTask={this.editTask}
                    toggleComplete={this.toggleComplete}
                />
                {this.state.taskToEdit !== null && (
                    <div className="edit-form">
                        <input 
                            type="text" 
                            value={this.state.editText} 
                            onChange={this.handleEditChange} 
                            className='input'
                        />
                        <button className="button" onClick={this.updateTask}>Update Task</button>
                    </div>
                )}
            </div>
            </div>
        );
    }
}

export default App;
