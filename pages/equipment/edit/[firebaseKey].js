import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import EquipmentForm from '../../../components/Forms/EquipmentForm';
import { getSingleEquipment } from '../../../api/equipData';

export default function EditEquipment() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // grab the firebasekey
  const { firebaseKey } = router.query;

  // make a call to the API to get the equipment data
  useEffect(() => {
    getSingleEquipment(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // pass object to form
  return (<EquipmentForm obj={editItem} />);
}
