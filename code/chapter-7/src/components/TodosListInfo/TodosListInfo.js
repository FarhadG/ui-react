// dependencies
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

// local dependencies
import TodosListItem from '../TodosListItem/TodosListItem';
import styles from './TodosListInfo.scss';

const TodosListInfo = ({ todos }) => {
  const todosCount = _.size(todos);
  const completedTodosCount = _(todos).filter('completed').size();
  return (
    <li className={styles.todosListInfo}>
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