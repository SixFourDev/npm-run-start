import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useQuery } from '@apollo/client';
// import the shoe details
import { GET_SHOE_DETAILS } from './path/to/GET_SHOE_DETAILS';

function ShoeDetails() {
  // Use the useParams hook to get the shoe ID from the URL
  const { shoeId } = useParams();

  // Use the appropriate query (GET_SHOE_DETAILS) to fetch shoe details
  const { loading, error, data } = useQuery(GET_SHOE_DETAILS, {
    variables: { id: shoeId }, // Pass the shoe ID as a variable to your query
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const shoeDetails = data.shoeDetails;

  return (
    <div className="shoe-details-page">
      <Header />

      {/* Display shoe details */}
      <section className="shoe-details">
        <h2>Shoe Details</h2>

        {/* Display shoe image, description, price, etc. */}
        <div className="shoe-info">
          <img src={shoeDetails.image} alt={shoeDetails.name} />
          <h3>{shoeDetails.name}</h3>
          <p>{shoeDetails.description}</p>
          <p>Price: {shoeDetails.price}</p>

          {/* Add to cart button */}

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ShoeDetails;
