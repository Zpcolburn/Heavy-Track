import React, { useEffect, useState } from 'react';
import { getAllJobSites } from '../api/jobsiteData';
import { useAuth } from '../utils/context/authContext';
import JobSiteCard from '../components/JobSiteCard';

function Home() {
  // TODO: Set a state for jobsite
  const [jobsites, setJobSites] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the memeber
  const getAllTheJobSites = () => {
    getAllJobSites(user.uid).then(setJobSites);
  };

  // TODO: make the call to the API to get all the jobsites on component render
  useEffect(() => {
    getAllTheJobSites();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {/*  map over jobsites here using jobsiteCard component */}
        {jobsites.map((jobsite) => (
          <JobSiteCard key={jobsite.firebaseKey} jobsiteObj={jobsite} onUpdate={getAllTheJobSites} />
        ))}
      </div>

    </div>
  );
}

export default Home;
