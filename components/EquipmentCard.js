import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteEquipment } from '../api/equipData';

function EquipmentCard({ equipmentObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE EQUIPMENT AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE Equipment
  const deleteThisEquipment = () => {
    if (window.confirm(`Delete ${equipmentObj.name}?`)) {
      deleteEquipment(equipmentObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '16rem', margin: '10px' }}>
      <Card.Img variant="top" src={equipmentObj.image} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{equipmentObj.name}</Card.Title>
        <Card.Text>{equipmentObj.size}</Card.Text>
        <Card.Text>{equipmentObj.location}</Card.Text>
        {/* DYNAMIC LINK TO VIEW THE EQUIPMENT DETAILS  */}
        <Link href={`/equipment/${equipmentObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE EQUIPMENT DETAILS  */}
        <Link href={`/equipment/edit/${equipmentObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisEquipment} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

EquipmentCard.propTypes = {
  equipmentObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.string,
    image: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EquipmentCard;
