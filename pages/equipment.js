import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import EquipmentCard from '../components/EquipmentCard';
import { getEquipment } from '../api/equipData';

export default function ShowEquipment() {
  const [equipment, setEquipment] = useState([]);
  const { user } = useAuth();
  const getAllTheEquipment = () => {
    getEquipment(user.uid).then(setEquipment);
  };

  // API to get all the equipemnt on component render
  useEffect(() => {
    getAllTheEquipment();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/author/new" passHref>
        <Button>Add Equipemnt</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {equipment.map((equip) => (
          <EquipmentCard key={equip.firebaseKey} equipmentObj={equip} onUpdate={getAllTheEquipment} />
        ))}
      </div>

    </div>
  );
}
