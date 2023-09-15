import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function SearchResults() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  const fetchSearchResults = async (newQuery) => {
    console.log('Fetching search results for query:', newQuery);
    try {
      const response = await axios.post(
        'https://xw7sbct9v6-1.algolianet.com/1/indexes/products/query?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.32.1&x-algolia-application-id=XW7SBCT9V6&x-algolia-api-key=6b5e76b49705eb9f51a06d3c82f7acee',
        {
          params: `query=${newQuery}&facets=*&filters=&hitsPerPage=50`,
        }
      );

      if (response.status === 200) {
        const results = response.data.hits || [];
        console.log('Search results:', results);
        setSearchResults(results);
      } else {
        console.error('Error: Unexpected status code', response.status);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    setSearchInput(query || '');

    if (query) {
      fetchSearchResults(query);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  const handleSearch = () => {
    // Trigger a new search with the updated query
    fetchSearchResults(searchInput);
  };

  return (
    <div className="search-results-page">
      <section className="search-input">
        <h2>Search Results</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for shoes"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </section>

      <section className="shoe-grid">
        {searchResults.map((shoe) => (
          <div className="shoe-container" key={shoe.id}>
            <img src={shoe.thumbnail_url} alt={shoe.name} />
            <h3>{shoe.name}</h3>
            <p>{shoe.model}</p>
            <p>{shoe.brand}</p>
            <p>Price: ${shoe.price}</p>
            <button className="add-to-cart-button">Add to Cart</button>
            <button className="view-shoe-button">View Shoe</button>
          </div>
        ))}
      </section>

      {searchResults.length === 0 && query && (
        <p>No results found for "{query}"</p>
      )}
    </div>
  );
}

export default SearchResults;
