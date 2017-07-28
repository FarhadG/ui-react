// dependencies
import _ from 'lodash';
import React, { PropTypes } from 'react';

// local dependencies
import TodosListItem from '../TodosListItem/TodosListItem';
import './TodosListInfo.scss';

const TodosListInfo = ({ todos }) => {
  const todosCount = _.size(todos);
  const completedTodosCount = _(todos).filter('completed').size();
  return (
    <li className="todos-list-info">
      {completedTodosCount}/{todosCount} completed
    </li>
  );
};

TodosListInfo.defaultProps = {
  todos: []
};

TodosListInfo.propTypes = {
  todos: PropTypes.objectOf(TodosListItem.propTypes.todo)
};

export default TodosListInfo;