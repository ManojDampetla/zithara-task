import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortBy(event.target.value);
  };

  let filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortBy === 'date') {
    filteredCustomers = filteredCustomers.sort((a, b) => {
      return new Date(a.created_at) - new Date(b.created_at);
    });
  } else if (sortBy === 'time') {
    filteredCustomers = filteredCustomers.sort((a, b) => {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });
  }

  return (
    <div className="App">
      <input type="text" placeholder="Search by name or location" onChange={handleSearch} />
      <select onChange={handleSort}>
        <option value="">Sort By</option>
        <option value="date">Date</option>
        <option value="time">Time</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Sno</th>
            <th>Customer Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.sno}>
              <td>{customer.sno}</td>
              <td>{customer.name}</td>
              <td>{customer.age}</td>
              <td>{customer.phone}</td>
              <td>{customer.location}</td>
              <td>{new Date(customer.created_at).toLocaleDateString()}</td>
              <td>{new Date(customer.created_at).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;