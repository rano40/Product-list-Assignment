import React, { useEffect, useState } from 'react';
import { Table, Form, Container, Row, Col } from 'react-bootstrap';


function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('https://fakestoreapi.com/products');
      const data = await result.json();
      setProducts(data);
      setFilteredProducts(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, sortOption, searchTerm]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption === 'priceLowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceHighToLow') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="App">
      <Container>
        <h1 className="text-center mb-4">Product List</h1>
        <Row className="mb-3">
          <Col md={6}>
            <Form className="custom-form">
              <Form.Group controlId="sortSelect">
                <Form.Label className="form-label">Sort By:</Form.Label>
                <Form.Control
                  className="form-input"
                  as="select"
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value="">-- Select --</option>
                  <option value="priceLowToHigh">Price: Low to High</option>
                  <option value="priceHighToLow">Price: High to Low</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
          <Col md={6}>
            <Form className="custom-form">
              <Form.Group controlId="searchInput">
                <Form.Label className="form-label">Search:</Form.Label>
                <Form.Control
                  className="form-input"
                  type="text"
                  placeholder="Enter search term"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Category</th>
              <th>Price</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default App;
