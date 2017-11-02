import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import { HitsPerPage, Panel } from '../packages/react-instantsearch/dom';
import { withKnobs, number } from '@storybook/addon-knobs';
import { displayName, filterProps, WrapWithHits } from './util';
import { checkA11y } from 'storybook-addon-a11y';
import JSXAddon from 'storybook-addon-jsx';

setAddon(JSXAddon);

const stories = storiesOf('HitsPerPage', module);

stories
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
  .addWithJSX(
    'default',
    () => (
      <WrapWithHits hasPlayground={true} linkedStoryGroup="HitsPerPage">
        <HitsPerPage
          defaultRefinement={4}
          items={[
            { value: 2, label: '2 hits per page' },
            { value: 4, label: '4 hits per page' },
            { value: 6, label: '6 hits per page' },
            { value: 8, label: '8 hits per page' },
          ]}
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
      <WrapWithHits hasPlayground={true} linkedStoryGroup="HitsPerPage">
        <HitsPerPage
          defaultRefinement={4}
          items={[{ value: 2 }, { value: 4 }, { value: 6 }, { value: 8 }]}
        />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'inside a panel',
    () => (
      <WrapWithHits hasPlayground={true} linkedStoryGroup="HitsPerPage">
        <Panel title="Hits to display">
          <HitsPerPage
            defaultRefinement={number('default hits per page', 4)}
            items={[
              { value: 2, label: '2 hits per page' },
              { value: 4, label: '4 hits per page' },
              { value: 6, label: '6 hits per page' },
              { value: 8, label: '8 hits per page' },
            ]}
          />
        </Panel>
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  )
  .addWithJSX(
    'playground',
    () => (
      <WrapWithHits linkedStoryGroup="HitsPerPage">
        <HitsPerPage
          defaultRefinement={number('default hits per page', 4)}
          items={[
            { value: 2, label: '2 hits per page' },
            { value: 4, label: '4 hits per page' },
            { value: 6, label: '6 hits per page' },
            { value: 8, label: '8 hits per page' },
          ]}
        />
      </WrapWithHits>
    ),
    {
      displayName,
      filterProps,
    }
  );
