// dependencies
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { applyThemeWrap } from 'theme-wrap';

// local dependencies
import styles from './TodosList.styles';

export const TodosList = ({ children, pStyles, twStyles }) => (
  <ul style={[twStyles.todosList, pStyles.todosList]}>
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

export default _.flow(
  Radium,
  applyThemeWrap(styles)
)(TodosList);