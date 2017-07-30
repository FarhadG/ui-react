// dependencies
import React, { PropTypes } from 'react';

// local dependencies
import './TodosList.scss';

const TodosList = ({ children }) => (
  <ul className="todos-list">
    {children}
  </ul>
);

TodosList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element
  ])
};

export default TodosList;