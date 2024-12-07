import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Container, Row, Col } from 'react-bootstrap';
import './Home.css';

function Home() {
  const [artworks, setArtworks] = useState([]);
  
  useEffect(() => {
    api.get('/artworks/featured')
      .then(response => {
        const artwork_data = response.data;
        if (typeof artwork_data.image_data === 'string' && !artwork_data.image_data.startsWith('data:image')) {
          // Convert binary data to base64 and prepend the data URI
          artwork_data.image_data = `data:image/png;base64,${artwork_data.image_data}`;
        }
        setArtworks(artwork_data)
      })
      .catch(error => {
        console.error('Error fetching artworks:', error);
      });
  }, []);

  return (
    <Container fluid className="home-container">
      <div className="body">
        <p>This week's fan favorites</p>
        <Row className="home-favorites">
          {artworks.map((artwork, index) => (
            <Col key={index} md={4}>
              <figure>
                <img
                  src={artwork.image_data}
                  alt={`Artwork by ${artwork.User.name}`}
                  style={{ width: '100%', height: 'auto' }}
                />
                <figcaption>Artist: {artwork.User.name}</figcaption>
              </figure>
            </Col>
          ))}
        </Row>
      </div>
      <footer>Sign up to find friends and discover more art.</footer>
    </Container>
  );
}

export default Home;