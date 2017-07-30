// dependencies
import React from 'react';
import { action, storiesOf } from '@kadira/storybook';

// local dependencies
import TodosListItem from './TodosListItem';

const sampleTodo = {
  id: 1,
  completed: false,
  description: 'Sample Todo'
};

const sampleCompletedTodo = {
  id: 2,
  completed: true,
  description: 'Sample Completed Todo'
};

export default storiesOf('TodosListItem', module)
.addWithInfo('default view', () => (
  <TodosListItem />
))

.addWithInfo('accepts todo via props', () => (
  <TodosListItem todo={sampleTodo} />
))

.addWithInfo('accepts completed todo via props', () => (
  <TodosListItem todo={sampleCompletedTodo} />
))

.addWithInfo('accepts custom styles via props', () => {
  const customStyles = {
    todosListItem: {
      border: '20px dashed orange',
      color: 'orange',
      fontSize: 40,
      margin: '0 auto',
      padding: 10,
      width: 500
    }
  };
  return (
    <TodosListItem todo={sampleTodo}
                   pStyles={customStyles} />
  );
})

.addWithInfo('accepts custom completed styles via props', () => {
  const customStyles = {
    completed: {
      backgroundColor: 'black',
      color: 'orange'
    }
  };
  return (
    <TodosListItem todo={sampleCompletedTodo}
                   pStyles={customStyles} />
  );
})

.addWithInfo('accepts toggleTodo callback via props', () => (
  <TodosListItem todo={sampleTodo}
                 handleClick={(id) => (e) => action('toggle todo')(id)} />
));