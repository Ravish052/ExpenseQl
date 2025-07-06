import { cache, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import GridBackground from './components/ui/GridBackground.jsx'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'


const client = new ApolloClient({
  // TODO update the URI to your GraphQL server
  // Make sure to use the correct protocol (http or https) and port
  // If you are running the server locally, use 'http://localhost:4000/graphql'
  // If you are using a different port, update it accordingly
  // If you are using a different protocol, update it accordingly
  uri : 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  credentials : 'include',
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GridBackground >
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </GridBackground>
    </BrowserRouter>

  </StrictMode>,
)
