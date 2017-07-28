export default (theme, mixins) => ({
  todosList: {
    ...mixins.get('list'),
    border: `10px solid ${theme.$secondaryColor}`,
    background: theme.$primaryColor,
    transition: 'all 0.5s ease',
  }
});
