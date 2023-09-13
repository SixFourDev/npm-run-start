import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel styles

// Sample data for popular sneakers (replace with your actual data)
const popularSneakers = [
{ id: 1, name: 'Sneaker 1', imageUrl: 'image-url-1' },
{ id: 2, name: 'Sneaker 2', imageUrl: 'image-url-2' },
{ id: 3, name: 'Sneaker 3', imageUrl: 'image-url-3' },
{ id: 4, name: 'Sneaker 4', imageUrl: 'image-url-4' },
{ id: 5, name: 'Sneaker 5', imageUrl: 'image-url-5' },
{ id: 6, name: 'Sneaker 6', imageUrl: 'image-url-6' },
];

function WelcomePage() {
  return (
    <div className="welcome-page">
      {/* Popular Sneakers Section */}
      <section className="popular-sneakers">
        <h2>Popular Sneakers</h2>

        {/* Carousel to display sneakers */}
        <Carousel>
          {popularSneakers.map((sneaker) => (
        <div key={sneaker.id} className="sneaker-card">
          <div className="sneaker-image">
            <img src={sneaker.imageUrl} alt={sneaker.name} />
          </div>
          <h3>{sneaker.name}</h3>
          <div className="button-container">
            <button className="view-button">View Shoe</button>
            <button className="add-to-cart-button">Add to Cart</button>
          </div>
      </div>
    ))}
    </Carousel>
  </section>
</div>
);
}

export default WelcomePage;