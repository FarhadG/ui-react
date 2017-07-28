// dependencies
import React from 'react';
import normalize from 'radium-normalize';
import { Style, StyleRoot } from 'radium';
import infoAddon from '@storybook/addon-info';
import { ThemeWrapProvider } from 'theme-wrap';
import { addDecorator, configure, setAddon } from '@kadira/storybook';

// local dependencies
import mixins from '../src/styles/mixins';
import theme from '../src/styles/theme';
import globalStyles from '../src/styles/globals.styles';

const Root = story => (
  <StyleRoot>
    <Style rules={normalize} />
    <Style rules={globalStyles} />
    <ThemeWrapProvider theme={theme}
                       mixins={mixins}>
      {story()}
    </ThemeWrapProvider>
  </StyleRoot>
);

// attach our decorator
addDecorator(Root);

// enable component info
setAddon(infoAddon);

configure(() => {
  require('../src/components/TodosList/TodosList.story');
  require('../src/components/TodosListInfo/TodosListInfo.story');
  require('../src/components/TodosListItem/TodosListItem.story');
}, module);