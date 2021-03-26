import React, { Component } from "react";


class PersonClass extends Component {
    state = {
        name: 'Ankit',
        age: '19'
    }
    switchNameHandler = (newName) => {
        this.setState({name: newName});
        console.log('click!');
    }
    render() {
        const style = {
            width: '80%',
            border: '1px solid #eee',
            margin: '16px auto',
            boxShadow: '0 2px 3px #ccc',
            padding: '16px',
            textAlign: 'center'
        }
        return (
            <div style={style}>
                <button onClick={this.switchNameHandler.bind(this, 'Ankit1')}>Switch Name</button>
                <button onClick={() => this.switchNameHandler('Sharma1')}>Switch Name1</button>
                <p>I'm a {this.state.name} and I am {this.state.age} years old!</p>
                <input type="text" onChange={e => this.setState({name: e.target.value})}></input>
            </div>
        )
    }
}

export default PersonClass;