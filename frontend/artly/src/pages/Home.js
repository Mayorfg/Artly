import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Container, Row, Col } from 'react-bootstrap';

function Home() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    api.get('/artworks/featured')
      .then(response => {
        setArtworks(response.data);
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
                  src={artwork.image_url}
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