import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import {
  Configure,
  InstantSearch,
  Index,
  Highlight,
  SearchBox,
} from '../packages/react-instantsearch/dom';
import {
  connectHits,
  connectAutoComplete,
  connectStateResults,
} from '../packages/react-instantsearch/connectors';
import Autosuggest from 'react-autosuggest';
import { checkA11y } from 'storybook-addon-a11y';

const stories = storiesOf('<Index>', module);

stories
  .addDecorator(checkA11y)
  .add('MultiHits', () => (
    <InstantSearch
      appId="latency"
      apiKey="6be0576ff61c053d5f9a3225e2a90f76"
      indexName="categories"
    >
      <SearchBox />
      <div className="multi-index_content">
        <div className="multi-index_categories-or-brands">
          <Index indexName="categories">
            <div>Categories: </div>
            <Configure hitsPerPage={3} />
            <CustomCategoriesOrBrands />
          </Index>
          <Index indexName="brands">
            <div>Brand: </div>
            <Configure hitsPerPage={3} />
            <CustomCategoriesOrBrands />
          </Index>
        </div>
        <div className="multi-index_products">
          <Index indexName="products">
            <div>Products: </div>
            <Configure hitsPerPage={5} />
            <CustomProducts />
          </Index>
        </div>
      </div>
    </InstantSearch>
  ))
  .add('AutoComplete', () => (
    <InstantSearch
      appId="latency"
      apiKey="6be0576ff61c053d5f9a3225e2a90f76"
      indexName="categories"
    >
      <Configure hitsPerPage={3} />
      <Index indexName="brands" />
      <Index indexName="products">
        <Configure hitsPerPage={5} />
      </Index>
      <AutoComplete />
    </InstantSearch>
  ))
  .add('with conditional rendering', () => (
    <InstantSearch
      appId="latency"
      apiKey="6be0576ff61c053d5f9a3225e2a90f76"
      indexName="categories"
    >
      <SearchBox />
      <Results>
        <div className="multi-index_content">
          <div className="multi-index_categories-or-brands">
            <Index indexName="categories">
              <Content>
                <div>
                  <div>Categories: </div>
                  <Configure hitsPerPage={3} />
                  <CustomCategoriesOrBrands />
                </div>
              </Content>
            </Index>
            <Index indexName="brands">
              <Content>
                <div>
                  <div>Brand: </div>
                  <Configure hitsPerPage={3} />
                  <CustomCategoriesOrBrands />
                </div>
              </Content>
            </Index>
          </div>
          <div className="multi-index_products">
            <Index indexName="products">
              <Content>
                <div>
                  <div>Products: </div>
                  <Configure hitsPerPage={5} />
                  <CustomProducts />
                </div>
              </Content>
            </Index>
          </div>
        </div>
      </Results>
    </InstantSearch>
  ));

const AutoComplete = connectAutoComplete(
  ({ hits, currentRefinement, refine }) => (
    <Autosuggest
      suggestions={hits}
      multiSection={true}
      onSuggestionsFetchRequested={({ value }) => refine(value)}
      onSuggestionsClearRequested={() => refine('')}
      getSuggestionValue={hit => hit.name}
      renderSuggestion={hit =>
        hit.brand ? <Product hit={hit} /> : <CategoryOrBrand hit={hit} />}
      inputProps={{
        placeholder: 'Search for a category, brand or product',
        value: currentRefinement,
        onChange: () => {},
      }}
      renderSectionTitle={section => section.index}
      getSectionSuggestions={section => section.hits}
    />
  )
);

const CustomCategoriesOrBrands = connectHits(({ hits }) => {
  const categoryOrBrand = hits.map(hit => (
    <CategoryOrBrand hit={hit} key={hit.objectID} />
  ));
  return <div className="multi-index_hits">{categoryOrBrand}</div>;
});

const CategoryOrBrand = ({ hit }) => (
  <div className="multi-index_hit">
    <Highlight attributeName="name" hit={hit} />
  </div>
);

CategoryOrBrand.propTypes = {
  hit: PropTypes.object.isRequired,
};

const CustomProducts = connectHits(({ hits }) => {
  const products = hits.map(hit => <Product hit={hit} key={hit.objectID} />);
  return <div className="multi-index_hits">{products}</div>;
});

const Product = ({ hit }) => {
  const image = `https://ecommerce-images.algolia.com/img/produit/nano/${hit.objectID}-1.jpg%3Falgolia`;
  return (
    <div className="multi-index_hit">
      <div>
        <div className="multi-index_hit-picture">
          <img src={`${image}`} />
        </div>
      </div>
      <div className="multi-index_hit-content">
        <div>
          <Highlight attributeName="name" hit={hit} />
          <span> - ${hit.price}</span>
        </div>
        <div className="multi-index_hit-description">
          <Highlight attributeName="brand" hit={hit} />
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  hit: PropTypes.object.isRequired,
};

const Content = connectStateResults(
  ({ searchState, searchResults, children }) =>
    searchResults && searchResults.nbHits !== 0 ? (
      children
    ) : (
      <div>
        No results has been found for {searchState.query} and index{' '}
        {searchResults ? searchResults.index : ''}
      </div>
    )
);

const Results = connectStateResults(({ allSearchResults, children }) => {
  const noResults =
    allSearchResults &&
    Object.values(allSearchResults).reduce(
      (acc, results) => results.nbHits === 0,
      false
    );
  return noResults ? (
    <div>
      <div>No results in category, products or brand</div>
      <Index indexName="categories" />
      <Index indexName="brands" />
      <Index indexName="products" />
    </div>
  ) : (
    children
  );
});
