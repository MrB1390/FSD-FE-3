import React, { useEffect, useState } from 'react';
import Statistics from './Components/Statistics';
import { fetchCategory, fetchCustomer, fetchOrder, fetchProduct } from '../utils/Api';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector(state => state.val.data);
  const orders = useSelector(state => state.val.data);
  const customers = useSelector(state => state.val.data);

  useEffect(() => {
    // Fetch data for products, orders, customers, and categories
    const fetchData = async () => {
      try {
        await dispatch(fetchProduct());
        await dispatch(fetchOrder());
        await dispatch(fetchCustomer());

        // Aggregate data and prepare for chart
        const data = {
          labels: ['Products', 'Orders', 'Customers'],
          datasets: [{
            label: 'Count',
            backgroundColor: ['red', 'blue', 'green'],
            data: [
              products.length,
              orders.length,
              customers.length,
            ]
          }]
        };

        setChartData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch, products.length, orders.length, customers.length]);

   console.log(chartData);
  return (
    <div className='text-center'>
      <h1>Dashboard</h1>
      {chartData && <Statistics data={chartData} />}
    </div>
  );
};

export default Dashboard;
