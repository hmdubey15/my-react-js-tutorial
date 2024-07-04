import { useEffect, useState } from 'react';

import './jobBoard.css';
import { fetchJobIds, fetchJobMetaData } from './jobBoard.apiCalls';

interface JobPost {
  by: string;
  id: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

function JobBoard() {
  const [jobIds, setJobIds] = useState<number[]>([]);
  const [jobPostings, setJobPostings] = useState<JobPost[]>([]);
  const [loadingJobs, setLoadingJobs] = useState<number>(0);

  useEffect(() => {
    (async () => {
      setLoadingJobs(9);
      const jobIds: number[] = await fetchJobIds();
      setJobIds(jobIds);
      const firstNineJobsPromises = jobIds.slice(0, 9).map((jobId) => fetchJobMetaData(jobId));
      const firstNineJobs = await Promise.all(firstNineJobsPromises);
      setJobPostings(firstNineJobs);
      setLoadingJobs(0);
    })();
  }, []);

  const handleLoadMoreJobs = async () => {
    const curJobsSize = jobPostings.length;
    const nextJobsPromises = jobIds.slice(curJobsSize, curJobsSize + 6).map((jobId) => fetchJobMetaData(jobId));
    setLoadingJobs(nextJobsPromises.length);
    const nextJobs = await Promise.all(nextJobsPromises);
    setJobPostings([...jobPostings, ...nextJobs]);
    setLoadingJobs(0);
  };

  return (
    <div className="main-container">
      <h1>Hacker News Jobs</h1>

      <div className="job-grid">
        {jobPostings.length !== 0 &&
          jobPostings.map(({ id, by, time, title }) => (
            <div key={id} className="job-item">
              <h4>{by}</h4>
              <div>{title}</div>
              <div>{new Date(time).toString()}</div>
            </div>
          ))}
        {new Array(loadingJobs).fill(null).map((_, index) => (
          <div className="loader">
            <h3 key={index}>LOADING.....</h3>
          </div>
        ))}
      </div>

      {jobPostings.length !== jobIds.length && <button onClick={handleLoadMoreJobs}>Load more</button>}
    </div>
  );
}

export default JobBoard;
