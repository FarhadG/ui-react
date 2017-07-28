// dependencies
import _ from 'lodash';
import React, { Component } from 'react';
import { Style, StyleRoot } from 'radium';
import normalize from 'radium-normalize';

// local dependencies
import TodosList from '../TodosList/TodosList';
import TodosListItem from '../TodosListItem/TodosListItem';
import TodosListInfo from '../TodosListInfo/TodosListInfo';
import globalStyles from '../../styles/globals.styles';
import styles from './App.styles';

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

  toggleTodo = (id) => (e) => {
    e.preventDefault();
    const todos = _.clone(this.state.todos);
    todos[id].completed = !todos[id].completed;
    this.setState({ todos });
  };

  generateTodosListItem = (todo, id) => (
    <TodosListItem key={id}
                   todo={todo}
                   pStyles={styles}
                   handleClick={this.toggleTodo} />
  );

  render() {
    const { todos } = this.state;
    return (
      <StyleRoot>
        <Style rules={normalize} />
        <Style rules={globalStyles} />
        <div style={styles.app}>
          <TodosList pStyles={styles}>
            {_.map(todos, this.generateTodosListItem)}
            <TodosListInfo todos={todos} />
          </TodosList>
        </div>
      </StyleRoot>
    );
  }
}

export default App;