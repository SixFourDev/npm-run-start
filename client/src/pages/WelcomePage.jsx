import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function WelcomePage() {
const [searchValue, setSearchValue] = useState('');
const [popularSneakers, setPopularSneakers] = useState([]);

const fetchPopularSneakers = async () => {
  try {
// Make an API POST request to fetch popular sneakers
const response = await axios.post('https://xw7sbct9v6-1.algolianet.com/1/indexes/products/query?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.32.1&x-algolia-application-id=XW7SBCT9V6&x-algolia-api-key=6b5e76b49705eb9f51a06d3c82f7acee', {
params: `query=${searchValue}&facets=*&filters=&hitsPerPage=6`,
});
console.log('Response Data:', response.data);
// Extract the popular sneakers data from the response
const popularSneakersData = response.data?.hits || [];

// Log the number of results received
console.log('Number of Results:', popularSneakersData.length);
// Filter the results to show only shoes
const filteredSneakers = popularSneakersData.filter((sneaker) => {
return sneaker.product_category === 'sneakers';
});
const mappedSneakers = filteredSneakers.map((sneaker, index) => {
console.log('Sneaker:', sneaker); // Log the entire sneaker object
return {
name: sneaker.name,
thumbnailURL: sneaker.thumbnail_url,
price: sneaker.price,
};
});
// Update the state with the mapped data
setPopularSneakers(mappedSneakers);
} catch (error) {
console.error('Error fetching popular sneakers:', error);
}
};

// Fetch popular sneakers when the component mounts
useEffect(() => {
fetchPopularSneakers();
}, []);

const handleSearch = () => {
// Handle search logic here
console.log('Searching for:', searchValue);
};

return (
<div className="welcome-page">
{/* Popular Sneakers Section */}
<section className="popular-sneakers">
<h2>Popular Sneakers</h2>

{/* Carousel to display sneakers */}
<Carousel>
{popularSneakers.map((sneaker, index) => (
<div key={index} className="sneaker-card">
<div className="sneaker-image">
<img src={sneaker.thumbnailURL} alt={sneaker.name} />
</div>
<h3>{sneaker.name}</h3>
<p>Price: {sneaker.price}</p>
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