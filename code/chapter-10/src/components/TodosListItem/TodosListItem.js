// dependencies
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Radium from 'radium';
import { applyThemeWrap } from 'theme-wrap';

// local dependencies
import styles from './TodosListItem.styles';

export const TodosListItem = ({ pStyles, todo, twStyles, handleClick }) => (
  <li
    style={[
      twStyles.todosListItem,
      pStyles.todosListItem,
      todo.completed && twStyles.completedTodosListItem,
      todo.completed && pStyles.completedTodosListItem
    ]}
    onClick={handleClick(todo.id)}>
    {todo.description}
  </li>
);

TodosListItem.defaultProps = {
  todo: {},
  handleClick: _.noop,
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

export default _.flow(
  Radium,
  applyThemeWrap(styles)
)(TodosListItem);