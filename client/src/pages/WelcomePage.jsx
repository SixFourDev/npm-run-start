import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function WelcomePage() {
  const [searchValue, setSearchValue] = useState('');
  const [popularSneakers, setPopularSneakers] = useState([]);
  const navigate = useNavigate();

  const fetchPopularSneakers = async () => {
    try {
      const response = await axios.post('https://xw7sbct9v6-1.algolianet.com/1/indexes/products/query?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.32.1&x-algolia-application-id=XW7SBCT9V6&x-algolia-api-key=6b5e76b49705eb9f51a06d3c82f7acee', {
        params: `query=popular&facets=*&filters=&hitsPerPage=6`,
      });

      const popularSneakersData = response.data?.hits || [];

      const filteredSneakers = popularSneakersData.filter((sneaker) => {
        return sneaker.product_category === 'sneakers';
      });

      const mappedSneakers = filteredSneakers.map((sneaker) => ({
        name: sneaker.name,
        thumbnailURL: sneaker.thumbnail_url,
        price: sneaker.price,
      }));

      setPopularSneakers(mappedSneakers);
    } catch (error) {
      console.error('Error fetching popular sneakers:', error);
    }
  };

  useEffect(() => {
    fetchPopularSneakers();
  }, []);

  const handleSearch = () => {
    console.log('Searching for:', searchValue);
    navigate(`/search?query=${encodeURIComponent(searchValue)}`);
  };

  return (
    <div className="welcome-page">
      {/* Popular Sneakers Section */}
      <section className="popular-sneakers">
        <h2>Popular Sneakers</h2>
        <Carousel>
          {popularSneakers.map((sneaker, index) => (
            <div key={index} className="sneaker-card">
              <div className="sneaker-image">
                <img src={sneaker.thumbnailURL} alt={sneaker.name} />
              </div>
              <h3>{sneaker.name}</h3>
              <p>Price: ${sneaker.price}</p>
              <div className="button-container">
                <button className="view-button">View Shoe</button>
                <button className="add-to-cart-button">Add to Cart</button>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Search Bar Section */}
      <section className="search-bar">
        <div className="search-input">
          <input
            type="text"
            placeholder="Search for shoe..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </section>
    </div>
  );
}

export default WelcomePage;
