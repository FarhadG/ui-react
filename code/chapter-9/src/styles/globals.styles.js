import theme from './theme';

export default {
  '*, *:before, *:after': {
    boxSizing: 'inherit'
  },
  html: {
    boxSizing: 'border-box'
  },
  body: {
    background: theme.$mainBackgroundColor,
    fontSize: 10,
    fontFamily: theme.$mainFontFamily,
    margin: 0,
    padding: 0
  }
}