import React from 'react';
import { useQuery } from '@apollo/client';
import FeaturedProductGrid from '../components/FeaturedProductGrid';
import { GET_SEARCH_RESULTS } from './path/to/GET_SEARCH_RESULTS';

function SearchResults() {
    // useQuery to get search results
  const { loading, error, data } = useQuery(GET_SEARCH_RESULTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const searchResults = data.searchResults;

  return (
    <div className="search-results-page">

      {/* Display search results using the Grid component */}
      <section className="search-results">
        <h2>Search Results</h2>
        <FeaturedProductGrid searchResults={searchResults} /> {/* Pass search results data */}
      </section>

    </div>
  );
}

export default SearchResults;