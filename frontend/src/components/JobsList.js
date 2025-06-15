import { Link } from 'react-router';
import classes from './JobsList.module.css';
import { getAuthToken } from '../util/auth';

function JobsList({ jobs }) {

  const truncateWords = (text, wordLimit = 20) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };


  return (
    <div className={classes.events}>
      <h1>All Jobs</h1>
      <ul className={classes.list}>
        {jobs && jobs.map((job) => (
            <li key={job.id} className={classes.item}>
              <div className={classes.jobRow}>
                <div className={classes.imageContainer}>
                  {/* <img src={job.image} alt={job.title} /> */}
                  <h6>Location: {job.location}</h6>
                  <h6>Type: {job.employment_type}</h6>
                  <h6>Exp: {job.required_experience}</h6>
                  <h6>Ed: {job.required_education}</h6>
                </div>

                <div className={classes.details}>
                  <Link to={`/jobs/${job.job_id}`} className={classes.link}>
                    <h2>{job.title}</h2>
                    <time>{job.date}</time>
                  </Link>
                  <p>{truncateWords(job.description)}</p>
                  <div className={classes.btn_container}>
                    <button
                      className={classes.custom_btn}
                      onClick={() => predictJobFraud(job)}>
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </li>
        ))}
      </ul>
    </div>
  );
}

 const token = getAuthToken();

export async function predictJobFraud(job) {
    let isFraud;

    // The URL of your Node.js backend API
    const NODE_API_URL = 'http://localhost:8080/jobs/predict-job-fraud';

    try {
        const response = await fetch(NODE_API_URL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json', // Request JSON response
              'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify(job) // Convert the JS object to a JSON string
      });

        const result = await response.json(); // Parse the JSON response from Node.js

        if (response.ok) { // Check if the HTTP status is 2xx (successful)
            console.log('Prediction successfull:', result);
            // alert(`Prediction Result:\nIs Fraudulent: ${result.is_fraudulent}\nProbability: ${result.fraud_probability.toFixed(4)}\nConfidence: ${result.prediction_confidence}`);
            isFraud = result.is_fraudulent
            if (isFraud) {
              alert('Job is fraud')
            } else {
              alert('Job is genuine, you can go ahead in applying the job')
            }
            // You would typically update your UI here with the result
        } else {
            // Handle HTTP errors (e.g., 400 Bad Request, 500 Internal Server Error)
            console.error('API Error:', result.error || 'Unknown error', result.details);
            alert(`Error: ${result.error || 'Unknown error'}\nDetails: ${JSON.stringify(result.details)}`);
        }
    } catch (error) {
        // Handle network errors (e.g., Node.js API is not reachable)
        console.error('Network Error:', error);
        alert(`Network Error: Node.js API might be down or unreachable.\nDetails: ${error.message}`);
    }
    return isFraud
};

export default JobsList;
