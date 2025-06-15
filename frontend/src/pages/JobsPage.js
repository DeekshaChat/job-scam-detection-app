import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import JobsList from '../components/JobsList';
import classes from './../components/JobsList.module.css';
import { API_URL } from '../util/constants';

// Number of items to show per "Load More" click
const ITEMS_PER_PAGE = 10;

function JobsPage() {
  // Load all data at once (from your CSV)
  const allJobs = useLoaderData();
  
  // State to track visible items
  const [visibleJobs, setVisibleJobs] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(false);

  // Initialize with first chunk of data
  useEffect(() => {
    setVisibleJobs(allJobs.slice(0, itemsToShow));
  }, [allJobs, itemsToShow]);

  const loadMore = () => {
    setLoading(true);
    
    // Simulate network delay (remove in production)
    setTimeout(() => {
      setItemsToShow(prev => prev + ITEMS_PER_PAGE);
      setLoading(false);
    }, 300);
  };

  const hasMore = itemsToShow < allJobs.length;

  return (
    <>
      <div id="dataContainer">
        <JobsList jobs={visibleJobs} />
      </div>
      
      {hasMore && (
        <div style={{
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          alignItems:'center',
          alignContent: 'center',
           display: 'flex',       
          }}>

        <button
          id="loadMore"
          onClick={loadMore}
          disabled={loading}
          style={{
            // padding: '10px 20px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            width: '20%',
            height: 45,
            fontSize: '18px',
           fontWeight: 'bold'

          }}
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
        </div>
      )}
      
      {!hasMore && allJobs.length > ITEMS_PER_PAGE && (
        <p style={{ color: '#666', marginTop: '20px' }}>
          All jobs loaded ({allJobs.length} total)
        </p>
      )}
      
      <div style={{ marginTop: '10px', 
        color: '#666' , width: '100%', textAlign: 'center'}}>
        Showing {visibleJobs.length} of {allJobs.length} jobs
      </div>
    </>
  );
}

// Loader function - loads ALL data from CSV
export async function jobsLoader() {
  // Replace this with your actual CSV loading logic
  const response = await fetch(`${API_URL}/jobs`);
  
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch jobs.' }), {
      status: 500
    });
  }
  
  const resData = await response.json();
  return resData.jobs || [];
}

export default JobsPage;