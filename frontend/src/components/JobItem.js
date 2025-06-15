import { Link, useRouteLoaderData, useSubmit } from 'react-router';
import classes from './JobItem.module.css';

function JobItem({ job }) {  
  const submit = useSubmit();
  const token = useRouteLoaderData('root');

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');
    
    if (proceed) {
      submit(null, {method: 'delete'});
    }
  }

  return (
    <div className={classes.event}>
      
      <h1 className={classes.event}>{job.title}</h1>
      <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        {job.location && <h5>Location: {job.location}</h5>}
        {job.employment_type && <h5>Employment Type: {job.employment_type}</h5>}

      </div>
      <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        {job.required_experience && <h5>Experience: {job.required_experience}</h5>}
        {job.required_education && <h5>Education: {job.required_education}</h5>}
      </div>
      <time>{job.date}</time>
      <p>{job.description}</p>
      {token && (
        <menu className={classes.actions}>
          {/* <Link to={'edit'}>Edit</Link> */}
          <button onClick={startDeleteHandler}>Delete</button>
        </menu>
      )}
    </div>
  );
}

export default JobItem;
