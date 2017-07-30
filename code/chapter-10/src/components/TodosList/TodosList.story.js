// dependencies
import _ from 'lodash';
import React from 'react';
import { storiesOf } from '@kadira/storybook';

// local dependencies
import TodosList from './TodosList';

// helper function that generates a set of children
const generateChildren = (num = 5) => _(num)
.range()
.map((i) => <li key={i}>Item #{i}</li>)
.value();

export default storiesOf('TodosList', module)
.addWithInfo('default view', () => (
  <TodosList>
    <li>Default</li>
  </TodosList>
))

.addWithInfo('renders children', () => (
  <TodosList>
    {generateChildren(5)}
  </TodosList>
))

.addWithInfo('accepts custom styles', () => {
  const customStyles = {
    todosList: {
      background: 'orange',
      border: '10px solid purple',
      color: 'purple',
      fontSize: 40
    }
  };
  return (
    <TodosList pStyles={customStyles}>
      {generateChildren(10)}
    </TodosList>
  );
});