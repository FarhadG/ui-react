// dependencies
import _ from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// local dependencies
import './TodosListItem.css';

const TodosListItem = ({ todo, handleClick }) => (
  <li className={classNames('todos-list-item', { completed: todo.completed })}
      onClick={handleClick(todo.id)}>
    {todo.description}
  </li>
);

TodosListItem.defaultProps = {
  todo: {},
  toggleTodo: _.noop
};

TodosListItem.propTypes = {
  todo: PropTypes.shape({
    completed: PropTypes.boolean,
    description: PropTypes.string,
    id: PropTypes.number
  }),
  handleClick: PropTypes.func
};

export default TodosListItem;