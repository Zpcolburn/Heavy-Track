import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
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

  const buttonStyle = {
    backgroundColor: '#a2c4f5',
    color: '#333',
    borderColor: '#ccc',
  };

  return (
    <div className="text-center my-4" style={{ backgroundColor: '#F5F5DC', minHeight: '100vh' }}>
      <Link href="/jobsite/new" passHref>
        <Button style={buttonStyle}>Add Job site</Button>
      </Link>
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
