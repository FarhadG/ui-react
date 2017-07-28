// dependencies
import _ from 'lodash';
import React from 'react';
import { storiesOf } from '@kadira/storybook';

// local dependencies
import TodosListInfo from './TodosListInfo';

const generateTodos = (num = 5) => {
  const todos = {};
  _.times(num, id => {
    todos[id] = {
      id,
      completed: Math.random() > 0.5,
      description: `Task #${id}`
    };
  });
  return todos;
};

export default storiesOf('TodosListInfo', module)
.addWithInfo('default view', () => (
  <TodosListInfo todos={generateTodos()} />
));