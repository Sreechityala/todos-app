// src/components/TaskList.js
import React, { Component } from 'react';
import './index.css';

class TaskList extends Component {
    render() {
        return (
            <ul className="task-list">
                {this.props.tasks.map((task, index) => (
                    
                    <li key={index} className={task.completed ? 'completed' : ''}>
                        <input 
                            type="checkbox" 
                            id="checkbox"
                            checked={task.completed} 
                            onChange={() => this.props.toggleComplete(index)} 
                        />
                        <label htmlFor="checkbox">{task.text}</label>
                        <button onClick={() => this.props.editTask(index)}>Edit</button>
                        <button onClick={() => this.props.deleteTask(index)}>Delete</button>
                    </li>
                    
                ))}
            </ul>
        );
    }
}

export default TaskList;

