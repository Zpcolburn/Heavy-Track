import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteEquipment } from '../api/equipData';
import { getSingleJobSite } from '../api/jobsiteData';

function EquipmentCard({ equipmentObj, onUpdate }) {
  const [jobSiteName, setJobSiteName] = useState('');

  useEffect(() => {
    if (equipmentObj.jobsite_id) {
      getSingleJobSite(equipmentObj.jobsite_id).then((jobSite) => {
        setJobSiteName(jobSite.name);
      });
    }
  }, [equipmentObj.jobsite_id]);

  const deleteThisEquipment = () => {
    if (window.confirm(`Delete ${equipmentObj.name}?`)) {
      deleteEquipment(equipmentObj.firebaseKey).then(() => onUpdate());
    }
  };

  const buttonStyle = {
    backgroundColor: '#a2c4f5', // Very light blue/gray background
    color: '#333', // Dark gray text color
    borderColor: '#ccc',
  };

  return (
    <Card style={{ width: '16rem', margin: '10px' }}>
      <Card.Img variant="top" src={equipmentObj.image} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{equipmentObj.name}</Card.Title>
        <Card.Text>{equipmentObj.size}</Card.Text>
        <Card.Text>{jobSiteName}</Card.Text> {/* Display job site name */}
        <Link href={`/equipment/${equipmentObj.firebaseKey}`} passHref>
          <Button variant="primary" style={buttonStyle} className="m-2">VIEW</Button>
        </Link>
        <Link href={`/equipment/edit/${equipmentObj.firebaseKey}`} passHref>
          <Button variant="info" style={buttonStyle}>EDIT</Button>
        </Link>
        <Button variant="danger" style={buttonStyle} onClick={deleteThisEquipment} className="m-2">
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
    jobsite_id: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EquipmentCard;
