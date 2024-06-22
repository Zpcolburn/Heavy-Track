/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewJobSiteDetails } from '../../api/mergedData';
import EquipmentCard from '../../components/EquipmentCard';

export default function ViewJobSite() {
  const [jobSiteDetails, setJobSiteDetails] = useState({});
  const [notesInput, setNotesInput] = useState('');
  const router = useRouter();

  // grab firebaseKey from url
  const { firebaseKey } = router.query;

  // const getJobSiteDetails = () => {
  //   viewJobSiteDetails(firebaseKey).then(setJobSiteDetails);
  // };

  const getJobSiteDetails = () => {
    viewJobSiteDetails(firebaseKey).then((details) => {
      setJobSiteDetails(details);
      setNotesInput(details.notes ?? '');
    });
  };

  const handleNotesChange = (e) => {
    setNotesInput(e.target.value);
    setJobSiteDetails((prevDetails) => ({
      ...prevDetails,
      notes: e.target.value,
    }));
  };

  // make call to API layer to get the data
  useEffect(() => {
    getJobSiteDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseKey]);
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
        <p>Foreman Notes: {jobSiteDetails.notes}</p>
        <textarea
          value={notesInput}
          onChange={handleNotesChange}
          placeholder="Type your notes here"
          style={{ width: '100%', height: '100px' }}
        />
        <hr />
        <div style={{ color: 'white' }} className="d-flex flex-wrap">
          {jobSiteDetails.equipment?.map((equipment) => (
            <EquipmentCard key={equipment.firebaseKey} equipmentObj={equipment} onUpdate={getJobSiteDetails} />
          ))}
        </div>
      </div>
    </div>
  );
}
