/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewEquipmentDetails } from '../../api/mergedData';

export default function ViewEquipment() {
  const [equipDetails, setEquipDetails] = useState({});
  const router = useRouter();

  // grab firebaseKey from url
  const { firebaseKey } = router.query;

  // make call to API layer to get the data
  useEffect(() => {
    viewEquipmentDetails(firebaseKey).then(setEquipDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={equipDetails.image} alt={equipDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          Name: {equipDetails.name}
        </h5>
        <hr />
        <p>Size: {equipDetails.size}</p>
        <hr />
        <p>Location: {equipDetails.jobsiteObject?.name}</p>
        <hr />
        <p> {equipDetails.operable
          ? `Operable:  ${equipDetails.operable}`
          : `Operable:  ${equipDetails.operable}`}
        </p>
      </div>
    </div>
  );
}
