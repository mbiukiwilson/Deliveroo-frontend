import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserParcels } from '../features/parcelSlice';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const dispatch = useDispatch();

  // 1. Grab the parcels list, loading state, and error state from Redux store
  const { parcels, loading, error } = useSelector((state) => state.parcels);

  // 2. Fetch the orders as soon as this page loads
  useEffect(() => {
    dispatch(fetchUserParcels());
  }, [dispatch]);

  // 3. Helper function to give each status a different CSS class for color styling
  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'status-delivered'; // Green
      case 'in transit':
        return 'status-transit';   // Yellow/Orange
      case 'cancelled':
        return 'status-cancelled'; // Red
      default:
        return 'status-pending';   // Grey
    }
  };

  // 4. Show a loading message while waiting for data from the backend
  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading your orders...</div>;
  }

  // 5. Show an error message if something went wrong
  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>Error: {error}</div>;
  }

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>My Order History</h2>
      
      {/* 6. Check if the user has any orders. If not, show an empty state message */}
      {parcels.length === 0 ? (
        <p style={{ marginTop: '20px', color: '#666' }}>You haven't placed any parcel delivery orders yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Order ID</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Pickup Location</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Destination</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* 7. Loop through each parcel and display it in a table row */}
            {parcels.map((parcel) => (
              <tr key={parcel.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '12px' }}>#{parcel.id}</td>
                <td style={{ padding: '12px' }}>{parcel.pickup_location}</td>
                <td style={{ padding: '12px' }}>{parcel.destination}</td>
                <td style={{ padding: '12px' }}>
                  {/* Status UI Badge */}
                  <span className={`status-badge ${getStatusBadgeClass(parcel.status)}`}>
                    {parcel.status}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  {/* Link to view individual order details */}
                  <Link 
                    to={`/parcels/${parcel.id}`} 
                    style={{ 
                      backgroundColor: '#007bff', 
                      color: 'white', 
                      padding: '6px 12px', 
                      borderRadius: '4px', 
                      textDecoration: 'none',
                      fontSize: '0.85rem' 
                    }}
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;