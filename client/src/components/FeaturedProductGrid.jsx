import React from 'react';

function FeaturedProductGrid({ featuredProducts }) {
  return (
    <div className="featured-product-grid">
      {featuredProducts.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default FeaturedProductGrid;
