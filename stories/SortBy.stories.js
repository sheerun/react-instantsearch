import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import { SortBy } from '../packages/react-instantsearch/dom';
import { withKnobs } from '@storybook/addon-knobs';
import { displayName, filterProps, WrapWithHits } from './util';
import { checkA11y } from 'storybook-addon-a11y';
import JSXAddon from 'storybook-addon-jsx';

setAddon(JSXAddon);

const stories = storiesOf('SortBy', module);

stories
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
  .addWithJSX(
    'default',
    () => (
      <WrapWithHits linkedStoryGroup="SortBy">
        <SortBy
          items={[
            { value: 'ikea', label: 'Featured' },
            { value: 'ikea_price_asc', label: 'Price asc.' },
            { value: 'ikea_price_desc', label: 'Price desc.' },
          ]}
          defaultRefinement="ikea"
        />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'without label',
    () => (
      <WrapWithHits linkedStoryGroup="SortBy">
        <SortBy
          items={[
            { value: 'ikea' },
            { value: 'ikea_price_asc' },
            { value: 'ikea_price_desc' },
          ]}
          defaultRefinement="ikea"
        />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  );
