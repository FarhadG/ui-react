// dependencies
import _ from 'lodash';
import React, { Component } from 'react';
import { Style, StyleRoot } from 'radium';
import normalize from 'radium-normalize';
import { ThemeWrapProvider } from 'theme-wrap';

// local dependencies
import TodosList from '../TodosList/TodosList';
import TodosListItem from '../TodosListItem/TodosListItem';
import TodosListInfo from '../TodosListInfo/TodosListInfo';
import globalStyles from '../../styles/globals.styles';
import styles from './App.styles';
import theme from '../../styles/theme';
import mixins from '../../styles/mixins';

class App extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      todos: {},
      dynamicTheme: theme
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

  randomizeTheme = () => {
    const colorPalette = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'cyan'];
    const dynamicTheme = {
      ...this.state.dynamicTheme,
      $primaryColor: _.sample(colorPalette),
      $secondaryColor: _.sample(colorPalette),
      $tertiaryColor: _.sample(colorPalette)
    };
    this.setState({ dynamicTheme });
  };

  toggleTodo = (id) => (e) => {
    e.preventDefault();
    const todos = _.clone(this.state.todos);
    todos[id].completed = !todos[id].completed;
    this.setState({ todos });
    this.randomizeTheme();
  };

  generateTodosListItem = (todo, id) => (
    <TodosListItem key={id}
                   todo={todo}
                   pStyles={styles}
                   handleClick={this.toggleTodo} />
  );

  render() {
    const { dynamicTheme, todos } = this.state;
    return (
      <StyleRoot>
        <Style rules={normalize} />
        <Style rules={globalStyles} />
        <ThemeWrapProvider theme={dynamicTheme}
                           mixins={mixins}>
          <div style={styles.app}>
            <TodosList pStyles={styles}>
              {_.map(todos, this.generateTodosListItem)}
              <TodosListInfo todos={todos} />
            </TodosList>
          </div>
        </ThemeWrapProvider>
      </StyleRoot>
    );
  }
}

export default App;