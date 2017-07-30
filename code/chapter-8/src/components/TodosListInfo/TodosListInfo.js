// dependencies
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Radium from 'radium';

// local dependencies
import TodosListItem from '../TodosListItem/TodosListItem';
import styles from './TodosListInfo.styles';

const TodosListInfo = ({ todos }) => {
  const todosCount = _.size(todos);
  const completedTodosCount = _(todos).filter('completed').size();
  return (
    <li style={styles.todosListInfo}>
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

export default Radium(TodosListInfo);