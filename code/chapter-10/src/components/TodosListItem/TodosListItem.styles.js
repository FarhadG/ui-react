export default (theme, mixins) => ({
  todosListItem: {
    ...mixins.get('listItem'),
    border: `5px solid ${theme.$tertiaryColor}`,
  },

  completedTodosListItem: {
    ...mixins.get('listItem'),
    background: theme.$primaryColor,
    border: `5px solid ${theme.$secondaryColor}`,
    boxShadow: 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    color: '#AAAAAA',
    textDecoration: 'line-through',
    top: 3
  }
});