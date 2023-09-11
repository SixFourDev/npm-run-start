import React from 'react';
import { useQuery } from '@apollo/client';
import Header from './Header';
import Footer from './Footer';
import FeaturedProductGrid from './FeaturedProductGrid';
import { GET_FEATURED_PRODUCTS } from './path/to/GET_FEATURED_PRODUCTS';

function WelcomePage() {
  const { loading, error, data } = useQuery(GET_FEATURED_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const featuredProducts = data.featuredProducts;

  return (
    <div className="welcome-page">
      <Header />

      {/* Featured Shoe Products Section */}
      <section className="featured-products">
        <h2>Featured Shoe Products</h2>

        {/* Use the FeaturedProductGrid component */}
        <FeaturedProductGrid featuredProducts={featuredProducts} />
      </section>

      <Footer />
    </div>
  );
}

export default WelcomePage;
