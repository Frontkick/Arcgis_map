import React, { useState,useEffect } from 'react';
import data from './data.js'; // Assuming your JSON data is in data.json

const ProductList = () => {
  const [filterType, setFilterType] = useState('company'); // Default filter by company
  const [filterValue, setFilterValue] = useState(''); // Value to filter by



  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
    setFilterValue(''); // Reset filter value when filter type changes
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const filteredProducts = data.filter(company => {
    switch (filterType) {
      case 'company':
        return company.company.toLowerCase().includes(filterValue.toLowerCase());
      case 'rating':
        return company.categories.some(category =>
          category.products.some(product =>
            product.rating >= parseFloat(filterValue)
          )
        );
      case 'category':
        return company.categories.some(category =>
          category.categoryName.toLowerCase().includes(filterValue.toLowerCase())
        );
      default:
        return true;
    }
  });

  return (
    <div>
      <h2>Product List</h2>
      <div>
        <label>Filter by:</label>
        <select value={filterType} onChange={handleFilterTypeChange}>
          <option value="company">Company</option>
          <option value="rating">Rating</option>
          <option value="category">Category</option>
        </select>
        <input
          type="text"
          placeholder={`Enter ${filterType}`}
          value={filterValue}
          onChange={handleFilterValueChange}
        />
      </div>
      <ul>
        {filteredProducts.map(company => (
          <div key={company.company}>
            <h3>{company.company}</h3>
            {company.categories.map(category => (
              <div key={category.categoryName}>
                <h4>{category.categoryName}</h4>
                <ul>
                  {category.products.map(product => (
                    <li key={product.productName}>
                      <strong>{product.productName}</strong>
                      <p>Price: {product.price}</p>
                      <p>Rating: {product.rating}</p>
                      <p>Discount: {product.discount}</p>
                      <p>Availability: {product.availability}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
