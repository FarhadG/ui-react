// dependencies
import _ from 'lodash';
import React, { Component } from 'react';
import { render } from 'react-dom';

// local dependencies
import './styles.css'

class App extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      todos: {}
    };
  }

  componentDidMount() {
    this.setState({
      todos: {
        1: { id: 1, completed: false, description: 'task 1' },
        // set to true
        2: { id: 2, completed: true, description: 'task 2' },
        3: { id: 3, completed: false, description: 'task 3' },
        4: { id: 4, completed: false, description: 'task 4' }
      }
    });
  }

  toggleTodo(id, e) {
    e.preventDefault();
    const todos = _.clone(this.state.todos);
    todos[id].completed = !todos[id].completed;
    this.setState({ todos });
  }

  render() {
    const { todos } = this.state;
    return (
      <ul>
        {_.map(todos, (todo, id) =>
          <li key={id}
              className={todo.completed ? 'completed' : ''}
              onClick={(e) => this.toggleTodo(id, e)}>
            {todo.description}
          </li>
        )}
      </ul>
    );
  }
}

render(
  <App />,
  document.getElementById('root')
);