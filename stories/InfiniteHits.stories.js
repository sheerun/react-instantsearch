import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import { InfiniteHits } from '../packages/react-instantsearch/dom';
import { withKnobs } from '@storybook/addon-knobs';
import { displayName, filterProps, WrapWithHits } from './util';
import JSXAddon from 'storybook-addon-jsx';

setAddon(JSXAddon);

const stories = storiesOf('InfiniteHits', module);

stories.addDecorator(withKnobs).addWithJSX('default',
() => (
  <WrapWithHits linkedStoryGroup="Hits" pagination={false}>
    <InfiniteHits />
  </WrapWithHits>
),
{
  displayName,
  filterProps,
});
