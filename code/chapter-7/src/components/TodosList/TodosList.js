// dependencies
import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

// local dependencies
import styles from './TodosList.scss';

const TodosList = ({ children, pStyles }) => (
  <ul className={classNames(
    styles.todosList,
    pStyles.todosList
  )}>
    {children}
  </ul>
);

TodosList.defaultProps = {
  children: [],
  pStyles: {
    todosList: ''
  }
};

TodosList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element
  ]),
  pStyles: PropTypes.shape({
    todosList: PropTypes.string
  })
};

export default TodosList;