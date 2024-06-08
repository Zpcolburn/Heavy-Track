/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewJobSiteDetails } from '../../api/mergedData';

export default function ViewJobSite() {
  const [jobSiteDetails, setJobSiteDetails] = useState({});
  const router = useRouter();

  // grab firebaseKey from url
  const { firebaseKey } = router.query;

  const getJobSiteDetails = () => {
    viewJobSiteDetails(firebaseKey).then(setJobSiteDetails);
  };

  // make call to API layer to get the data
  useEffect(() => {
    getJobSiteDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseKey]);
  console.warn(jobSiteDetails.equipment);
  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={jobSiteDetails.image} alt={jobSiteDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          Name: {jobSiteDetails.name}
        </h5>
        <hr />
        <p>Foreman: {jobSiteDetails.foreman}</p>
        <hr />
        <p>Location: {jobSiteDetails.location}</p>
        <hr />
        <p> {jobSiteDetails.operable
          ? `Operable:  ${jobSiteDetails.operable}`
          : `Operable:  ${jobSiteDetails.operable}`}
        </p>
      </div>
    </div>
  );
}
