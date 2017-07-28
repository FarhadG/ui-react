import { ThemeWrapMixin } from 'theme-wrap';

export default new ThemeWrapMixin()
.set('list', (theme) => ({
  listStyle: 'none',
  padding: '10px 15px',
  transition: 'all 0.5s ease',
  borderRadius: 5
}))

.set('listItem', (theme) => ({
  background: theme.$lightGray,
  borderRadius: 5,
  boxShadow: '0 2px 1px 0 rgba(0, 0, 0, 0.2)',
  color: theme.$darkGray,
  cursor: 'pointer',
  fontSize: '2rem',
  padding: '15px 20px',
  position: 'relative',
  transition: 'all 0.2s ease',
  ':hover': {
    opacity: 0.8
  }
}))