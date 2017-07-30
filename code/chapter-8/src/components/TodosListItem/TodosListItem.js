// dependencies
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Radium from 'radium';

// local dependencies
import styles from './TodosListItem.styles';

const TodosListItem = ({ pStyles, todo, handleClick }) => (
  <li
    style={[
      styles.todosListItem,
      pStyles.todosListItem,
      todo.completed && styles.completedTodosListItem,
      todo.completed && pStyles.completedTodosListItem
    ]}
    onClick={handleClick(todo.id)}>
    {todo.description}
  </li>
);

TodosListItem.defaultProps = {
  todo: {},
  toggleTodo: _.noop,
  pStyles: {
    todosListItem: {},
    completedTodosListItem: {}
  }
};

TodosListItem.propTypes = {
  handleClick: PropTypes.func,
  todo: PropTypes.shape({
    completed: PropTypes.boolean,
    description: PropTypes.string,
    id: PropTypes.number
  }),
  pStyles: PropTypes.shape({
    todosListItem: PropTypes.object,
    completedTodosListItem: PropTypes.object
  })
};

export default Radium(TodosListItem);