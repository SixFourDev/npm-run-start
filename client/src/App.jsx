import React from 'react';
import { Header } from '../src/components/Header';
import { Footer } from '../src/components/Footer';
import { Outlet } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { setContext } from '@apollo/client/link/context';


const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-center align-center min-100-vh bg-primary">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
