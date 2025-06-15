import { redirect, useParams, useRouteLoaderData } from 'react-router';
import JobItem from '../components/JobItem';
import { getAuthToken } from '../util/auth';
import { API_URL } from '../util/constants';

export default function JobDetailPage(props) {
  const { id } = useParams();
  const data = useRouteLoaderData('event-detail');
  console.log('job=====', data);
  
  return (
    <JobItem job={data} id={id} />
  )
}

export async function jobDetailLoader({ request, params }) {
  console.log('jobDetailLoader request====', params);
  
  const id = params.id;
  const response = await fetch(`${API_URL}/jobs/${id}`);
  console.log('jobDetailLoader response====', response);
  
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch job details' }), {status: 500});
  } else {
    const resData = await response.json();
    console.log('jobDetailLoader response====', resData);
    return resData.event;
  }
}

export async function deleteEventAction({ params }) {
  const id = params.id;
  const token = getAuthToken();
  
  const response = await fetch(`${API_URL}/jobs/${id}`, {
    method: 'delete',
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  });
  console.log('response====4444=====', response);
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not delete job' }), {status: 500});
  } else {
    
    return redirect('/jobs');
  }
}
