// dependencies
import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

// local dependencies
import styles from './TodosList.styles';

const TodosList = ({ children, pStyles }) => (
  <ul style={[styles.todosList, pStyles.todosList]}>
    {children}
  </ul>
);

TodosList.defaultProps = {
  children: [],
  pStyles: {
    todosList: {}
  }
};

TodosList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element
  ]),
  pStyles: PropTypes.shape({
    todosList: PropTypes.object
  })
};

export default Radium(TodosList);