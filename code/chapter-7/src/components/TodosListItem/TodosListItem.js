// dependencies
import _ from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// local dependencies
import styles from './TodosListItem.scss';

const TodosListItem = ({ pStyles, todo, handleClick }) => (
  <li
    className={classNames(
      styles.todosListItem,
      pStyles.todosListItem,
      {
        [styles.completedTodosListItem]: todo.completed,
        [pStyles.completedTodosListItem]: todo.completed
      }
    )}
    onClick={handleClick(todo.id)}>
    {todo.description}
  </li>
);

TodosListItem.defaultProps = {
  todo: {},
  toggleTodo: _.noop,
  pStyles: {
    todosListItem: '',
    completedTodosListItem: ''
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
    todosListItem: PropTypes.string,
    completedTodosListItem: PropTypes.string
  })
};

export default TodosListItem;