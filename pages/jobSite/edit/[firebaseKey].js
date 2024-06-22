import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import JobSiteForm from '../../../components/Forms/JobSiteForm';
import { getSingleJobSite } from '../../../api/jobsiteData';

export default function EditJobSite() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // grab the firebasekey
  const { firebaseKey } = router.query;

  // make a call to the API to get the equipment data
  useEffect(() => {
    getSingleJobSite(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // pass object to form
  return (<JobSiteForm obj={editItem} />);
}
