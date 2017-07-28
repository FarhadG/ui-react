# Chapter 7: Exploring CSS Modules {#Chapter-7}

In the previous chapter, we introduced Sass, a powerful CSS preprocessor, into our development pipeline. We leveraged a few useful Sass features to help maintain some of our core U&I requirements. Even though we've improved the quality of our U&I components, CSS styles can still clash in more complex applications. 

If this is your concern, you're in luck! In this chapter, we will explore [CSS modules](https://github.com/css-modules/css-modules), a new and interesting technology, that offers a better way to mitigate CSS clashing.



## What are CSS Modules?

According to the [CSS Modules repository](https://github.com/css-modules/css-modules):

A> CSS files in which all class names and animation names are scoped locally by default. CSS Modules is a step in the build process that changes class names and selectors to be locally scoped.

For example:

{line-numbers=off}
```jsx
import styles from "./styles.css";

const element = () => (
  <h1 className={styles.title}>
    Hello, world!
  </h1>
);
```

During our build process, the CSS modules loader searches through `styles.css` and makes the `.title` class accessible via `styles.title`. Behind the scenes, however, our template and styles are generated with new characters replacing both the HTML class and the CSS selector class.

An example of what that may look like:

{line-numbers=off}
```html
<h1 class="_styles__title_3095">
  Hello, world!
</h1>
```

{line-numbers=off}
```css
._styles__title_3095 {
  background-color: red;
}
```

The class attribute and selector `.title` are replaced by this entirely new **unique** string. In short, classes are dynamically generated, unique and mapped to the correct styles.

It may be easier to think of this functionality as a dictionary lookup where the original CSS selectors are mapped to unique hashed values:

{line-numbers=off}
```js
{
  'todos-list': 'ux761xab',
  'todos-list-item': 'ax961xci'
  ...
}
```



## Why use CSS Modules?

It’s a guarantee that all the styles for a single component live in one place and are locally scoped. **This approach is designed to fix the problem of the global scope in CSS.** CSS modules allow for you to name your CSS selectors in any shape or form without needing to worry about name clashes. With CSS Modules, and the concept of **local scope by default**, this problem is avoided.



## CSS Modules in Action

Fortunately, with our current Webpack configuration we can enable CSS modules with ease. Go ahead and update the webpack config file to enable CSS modules:

{title=config/webpack.config.dev.js, line-numbers=off}
```javascript
...

# leanpub-start-delete
      {
        test: /\.(css|scss)$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
# leanpub-start-insert
              modules: true,
              localIdentName: '[name]_[local]_[hash:base64:5]'
# leanpub-end-insert
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          require.resolve('sass-loader')
        ],
      },

...
```

Our `css-loader` already has CSS modules functionality — we just had to enable it. You may be wondering what the `localIdentName`, `[name]`, `[local]` and `[hash:base64:5]` represent. We're simply defining the name of the CSS selector. There are other options that can be found in the `css-loader` documentation. This combination is intuitive for `development` mode as it's easy to reason about and debug. We're generating our css selectors as a combination of their path, component name and a unique 5 digit base64 encoded string tied together with `_`.  In `production`, however, you can omit many of these variables to derive the shortest CSS selector.

After updating the Webpack config, none of the styles will work. That's because `css-loader` is expecting for us to be working with CSS modules.



### Refactoring `styles/*.scss`

Since all of our general styles are global by nature, i.e. there is nothing specific to app as a CSS class, we don't need to do anything.



### Refactoring <App />

Lets start with our `import` statement:

{title=src/components/App/App.js}
```jsx
// dependencies
...

// local dependencies
...
import styles from './App.scss';

class App extends Component {

  constructor(...args) {
    ...
  }

  componentDidMount() {
    ...
  }

  toggleTodo = (id) => (e) => {
    ...
  };

  generateTodosListItem = (todo, id) => (
    <TodosListItem key={id}
                   todo={todo}
                   pStyles={styles}
                   handleClick={this.toggleTodo} />
  );

  render() {
    const { todos } = this.state;
    return (
      <div className="app">
        <TodosList pStyles={styles}>
          {_.map(todos, this.generateTodosListItem)}
          <TodosListInfo todos={todos} />
        </TodosList>
      </div>
    );
  }
}

export default App;
```

We introduce a new prop, `pStyles` short for propStyles, to be able to pass our styles down.

{title=src/components/App/App.scss}
```scss
@import '../../styles/theme';

.todosList {
  margin: 50px auto;
  max-width: 800px;
}

.todosListItem {
  margin: 10px 0;
}
```

Since all of our styles are locally scoped, we can no longer have our `TodosList` cascade its style downwards to its children. We bubbled those styles one level higher to `App`, so that we can pass them down as needed. This is not the most elegant solution, since:

- We can `import` the styles associated with `todosListItem` within our `TodosListItem.scss` and have CSS modules create the local scope for them.
- We can use the `composes` keyword and retrieve those styles.

We won't pursue these options, as they create a deep dependency between components. **This may be perfectly appropriate in your applications**, however, we'll opt in for the `prop` interface for passing the styles down, since we'll be using this as a foundation for future chapters.

The app ID has been removed and css classes have been updated to be in camelCase format, so that we can reference them appropriately within our templates. We could continue to keep our class names in `kebab-case` format and reference them via `styles['todos-list']`, but I prefer the Javascript `camelCase` convention, given that we're writing most of our application in JS.



### Refactoring <TodosList />

Lets first start by updating how we import and apply our styles:

{title=src/components/TodosList/TodosList.js}
```jsx
// dependencies
import classNames from 'classnames';
import React, { PropTypes } from 'react';

// local dependencies
import styles from './TodosList.scss';

const TodosList = ({ children, pStyles }) => (
  <ul className={classNames(styles.todosList, pStyles.todosList)}>
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
```

We import our styles with a name, `styles`, so that we can reference its keys. We use `classNames` to add base and prop styles to our element.  Lastly, we updated our prop definitions to reflect these changes.

Now our updated styles:

{title=src/components/TodosList/TodosList.scss}
```scss
@import '../../styles/theme';

.todosList {
  list-style: none;
  padding: 10px 15px;
}
```



### Refactoring <TodosListInfo />

Rinse and repeat! Lets update our template:

{title=src/components/TodosListInfo/TodosListInfo.js}
```jsx
// dependencies
...

// local dependencies
...
import styles from './TodosListInfo.scss';

const TodosListInfo = ({ todos }) => {
  const todosCount = _.size(todos);
  const completedTodosCount = _(todos).filter('completed').size();
  return (
    <li className={styles.todosListInfo}>
      {completedTodosCount}/{todosCount} completed
    </li>
  );
};

...
```

We reference our styles and apply the `todosListInfo` class to our component.

{title=src/components/TodosListInfo/TodosListInfo.scss}
```scss
@import '../../styles/theme';

.todosListInfo {
  color: $dark-gray;
  font-size: 14px;
  text-align: right;
}
```

We could provide an `pStyles` interface, but we'll keep this component locked in its current format. Why? Because with CSS Modules, we can…



### Refactoring <TodosListItem />

Rinse and repeat! Lets update our template:

{title=src/components/TodosListItem/TodosListItem.js}
```jsx
// dependencies
import _ from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// local dependencies
import styles from './TodosListItem.scss';

const TodosListItem = ({ pStyles, todo, handleClick }) => (
  <li
    className={classNames(styles.todosListItem, pStyles.todosListItem, {
      [styles.completedTodosListItem]: todo.completed,
      [pStyles.completedTodosListItem]: todo.completed
    })}
    onClick={handleClick(todo.id)}>
    {todo.description}
  </li>
);

TodosListItem.defaultProps = {
  todo: {},
  toggleTodo: _.noop,
  pStyles: {
    todosListItem: '',
    completedTodosListItem: ''
  }
};

TodosListItem.propTypes = {
  handleClick: PropTypes.func,
  todo: PropTypes.shape({
    completed: PropTypes.boolean,
    description: PropTypes.string,
    id: PropTypes.number
  }),
  pStyles: {
    todosListItem: PropTypes.string,
    completedTodosListItem: PropTypes.string
  }
};

export default TodosListItem;
```

We name our `styles` and we reference our `todosListItem` as a base style. If the item is `completed`, we apply the `completedTodosListItem` styles. We update our prop type definitions for the various style definitions this component supports.

T> The ES6 `{ [variable]: value }` syntax allows to interpolate variables in an object's key.

{title=src/components/TodosListItem/TodosListItem.scss}
```scss
@import '../../styles/theme';

.todosListItem {
  background: $light-gray;
  border-radius: 5px;
  border: 1px solid #E1E1E1;
  box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.2);
  color: $dark-gray;
  cursor: pointer;
  font-size: 2rem;
  padding: 15px 20px;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
}

.completedTodosListItem {
  background: darken($light-gray, 10);
  box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  color: #AAAAAA;
  text-decoration: line-through;
  top: 3px;
}
```

We ensure our classnames match and we're good to go.

If you visit the browser, everything should work as expected. All of the necessary styles have been applied and our app works flawlessly, thanks to CSS modules. This may look trivial, but it's quite amazing! We no longer have global selectors.



![](images/tasks-4.png)



#### Suggested Exercise

CSS modules are extremely powerful and I encourage you to explore before moving on:

- Inspect the `DOM` and look at the applied CSS selectors. Experiment with the Webpack configuration and explore the results.
- Throw a `debugger` or `console` state within your component and observe the `styles` file. This will assist  you in understanding how CSS classes are generated.
- Try the different strategies for passing styles around.
- Experiment with different ways of applying these styles to our components: flat structure versus the nested structure, functional specific versus component specific names (e.g. `todosListItem` versus `todo`).




## Summary

In this chapter, we converted our entire app to use CSS Modules. Lets see how this strategy fares against the others we've already explored:



|                                 | CSS | SCSS | CSS Modules
|---------------------------------|:---:|:----:|:-----------:|
| **No global namespace**         |  -  |  -   |     ✔       |
|---------------------------------|-----|------|-------------|
| **Unidirectional styles**       |  ✔  |  ✔  |     ✔       |
|---------------------------------|-----|------|-------------|
| **Dead code elimination**       |     |      |     ✔       |
|---------------------------------|-----|------|-------------|
| **Minification**                |     |      |     ✔       |
|---------------------------------|-----|------|-------------|
| **Shareable constants**         |     |      |             |
|---------------------------------|-----|------|-------------|
| **Deterministic resolution**    |  -  |  -   |     ✔       |
|---------------------------------|-----|------|-------------|
| **Isolation**                   |  -  |  -   |     ✔       |
|---------------------------------|-----|------|-------------|
| **Extendable**                  |  -  |  -   |     ✔       |
|---------------------------------|-----|------|-------------|
| **Documentable**                | NA  |  NA  |    NA       |
|---------------------------------|-----|------|-------------|
| **Presentable**                 | NA  |  NA  |    NA       |
|---------------------------------|-----|------|-------------|

{line-numbers=off}
```
✔ Fulfilled
- Pseudo-fulfilled
```



That is a major improvement! We not only were able to refactor our entire application with minimal amount of changes, but we were also able to fulfill many of our U&I criteria. We are now able to build predicable components, minify our CSS classes and remove any styles that are not referenced in our application. Amazing!

In the next chapter, we're going to turn everything we've learned on its head by exploring inline styles.