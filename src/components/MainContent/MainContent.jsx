import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faShoppingCart, faBoxOpen, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Chart from 'chart.js/auto';
import './MainContent.css';

const MainContent = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [productsSold, setProductsSold] = useState(0);
  const [newCustomers, setNewCustomers] = useState(0);
  const [topProducts, setTopProducts] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [requestCount, setRequestCount] = useState(0);
  const salesChartRef = useRef(null);
  const productsChartRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/orders/total-sales')
      .then(response => setTotalSales(response.data.totalSales))
      .catch(error => console.error('Error fetching total sales:', error));

    axios.get('http://localhost:3000/api/orders/total-orders')
      .then(response => setTotalOrders(response.data.totalOrders))
      .catch(error => console.error('Error fetching total orders:', error));

    axios.get('http://localhost:3000/api/products/products-sold')
      .then(response => setProductsSold(response.data.productsSold))
      .catch(error => console.error('Error fetching products sold:', error));

    axios.get('http://localhost:3000/api/users/new-customers')
      .then(response => setNewCustomers(response.data.newCustomers))
      .catch(error => console.error('Error fetching new customers:', error));

    axios.get('http://localhost:3000/api/products/top-products')
      .then(response => setTopProducts(response.data.topProducts))
      .catch(error => console.error('Error fetching top products:', error));

    axios.get('http://localhost:3000/api/orders/sales-data')
      .then(response => setSalesData(response.data.salesData))
      .catch(error => console.error('Error fetching sales data:', error));
    axios.get('http://localhost:3000/api/request-count')
      .then(response => setRequestCount(response.data.requestCount))
      .catch(error => console.error('Error fetching request count:', error));

    return () => {
      if (salesChartRef.current) {
        salesChartRef.current.destroy();
      }
      if (productsChartRef.current) {
        productsChartRef.current.destroy();
      }
    };
  }, []);

  const salesChartData = {
    labels: salesData.map(item => item.month),
    datasets: [
      {
        label: 'Total Sales',
        data: salesData.map(item => item.totalSales),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const topProductsData = {
    labels: topProducts.map(product => product.name),
    datasets: [
      {
        label: 'Popularity',
        data: topProducts.map(product => product.popularity),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    if (salesChartRef.current) {
      salesChartRef.current.destroy();
    }
    salesChartRef.current = new Chart(document.getElementById('salesChart'), {
      type: 'line',
      data: salesChartData,
    });

    if (productsChartRef.current) {
      productsChartRef.current.destroy();
    }
    productsChartRef.current = new Chart(document.getElementById('productsChart'), {
      type: 'bar',
      data: topProductsData,
    });
  }, [salesChartData, topProductsData]);

  return (
    <div className="main-content">
      <div className="top-section">
        <div className="card">
          <div className="card-icon dollar"><FontAwesomeIcon icon={faDollarSign} /></div>
          <div className="card-info">
            <h3>Total Sales</h3>
            <p>${totalSales}</p>
            <small className='card-info-text1'>+10% from yesterday</small>
          </div>
        </div>
        <div className="card">
          <div className="card-icon shopping-cart"><FontAwesomeIcon icon={faShoppingCart} /></div>
          <div className="card-info">
            <h3>Total Orders</h3>
            <p>{totalOrders}</p>
            <small className='card-info-text2'>+8% from yesterday</small>
          </div>
        </div>
        <div className="card">
          <div className="card-icon box-open"><FontAwesomeIcon icon={faBoxOpen} /></div>
          <div className="card-info">
            <h3>Products Sold</h3>
            <p>{productsSold}</p>
            <small className='card-info-text3'>+2% from yesterday</small>
          </div>
        </div>
        <div className="card">
          <div className="card-icon user-plus"><FontAwesomeIcon icon={faUserPlus} /></div>
          <div className="card-info">
            <h3>New Customers</h3>
            <p>{newCustomers}</p>
            <small className='card-info-text4'>+3% from yesterday</small>
          </div>
        </div>
        <div className="card">
            <div className="request-count">
            <h3>Number of Requests</h3>
            <p>{requestCount}</p>
            </div>
        </div>
      </div>
      <div className="charts-section">
        <div className="chart">
          <h3>Top Products</h3>
          <table className="top-products-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Popularity</th>
                <th>Sales</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={product.name}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.popularity}%</td>
                  <td>{product.sales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="chart">
          <h3>Customer Fulfillment</h3>
          <canvas id="salesChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
