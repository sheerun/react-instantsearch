import PropTypes from 'prop-types';
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Snippet, Hits } from '../packages/react-instantsearch/dom';
import { withKnobs, text } from '@storybook/addon-knobs';
import { checkA11y } from 'storybook-addon-a11y';
import { WrapWithHits } from './util';

const stories = storiesOf('Snippet', module);

stories.addDecorator(withKnobs).addDecorator(checkA11y);

const Default = ({ hit }) => (
  <article>
    <p>
      <Snippet attributeName="name" hit={hit} />
    </p>
    <p>
      <Snippet attributeName="description" hit={hit} />
    </p>
  </article>
);

Default.propTypes = {
  hit: PropTypes.object.isRequired,
};

const StrongHits = ({ hit }) => (
  <article>
    <p>
      <Snippet
        attributeName="name"
        tagName={text('tag name (title)', 'strong')}
        hit={hit}
      />
    </p>
    <p>
      <Snippet
        attributeName="description"
        tagName={text('tag name (description)', 'strong')}
        hit={hit}
      />
    </p>
  </article>
);

StrongHits.propTypes = {
  hit: PropTypes.object.isRequired,
};

stories
  .add('default', () => (
    <WrapWithHits hasPlayground={true} linkedStoryGroup="Snippet">
      <Hits hitComponent={Default} />
    </WrapWithHits>
  ))
  .add('playground', () => (
    <WrapWithHits linkedStoryGroup="Snippet">
      <Hits hitComponent={StrongHits} />
    </WrapWithHits>
  ));
