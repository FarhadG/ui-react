// dependencies
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Radium from 'radium';
import { applyThemeWrap } from 'theme-wrap';

// local dependencies
import { TodosListItem } from '../TodosListItem/TodosListItem';
import styles from './TodosListInfo.styles';

export const TodosListInfo = ({ todos, twStyles }) => {
  const todosCount = _.size(todos);
  const completedTodosCount = _(todos).filter('completed').size();
  return (
    <li style={twStyles.todosListInfo}>
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

export default _.flow(
  Radium,
  applyThemeWrap(styles)
)(TodosListInfo);