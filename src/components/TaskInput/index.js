// src/components/TaskInput.js
import React, { Component } from 'react';
import './index.css';

class TaskInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: ''
        };
    }

    handleChange = (e) => {
        this.setState({ task: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.task.trim()) {
            this.props.addTask(this.state.task);
            this.setState({ task: '' });
        }
    }

    render() {
        return (
            <form className="task-input" onSubmit={this.handleSubmit}>
                <input 
                    type="text" 
                    value={this.state.task} 
                    onChange={this.handleChange} 
                    placeholder="Add a new task" 
                />
                <button type="submit">Add Task</button>
            </form>
        );
    }
}

export default TaskInput;

