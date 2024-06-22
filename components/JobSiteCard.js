import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteJobSite } from '../api/jobsiteData';

function JobSiteCard({ jobsiteObj, onUpdate }) {
  const deleteThisJobSite = () => {
    if (window.confirm(`Delete ${jobsiteObj.name}?`)) {
      deleteJobSite(jobsiteObj.firebaseKey).then(() => onUpdate());
    }
  };

  const buttonStyle = {
    backgroundColor: '#a2c4f5',
    color: '#333',
    borderColor: '#ccc',
  };

  return (
    <Card style={{ width: '16rem', margin: '10px' }}>
      <Card.Img variant="top" src={jobsiteObj.image} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{jobsiteObj.name}</Card.Title>
        <Card.Text>Foreman: {jobsiteObj.foreman}</Card.Text>
        {/* DYNAMIC LINK TO VIEW THE EQUIPMENT DETAILS  */}
        <Link href={`/jobsite/${jobsiteObj.firebaseKey}`} passHref>
          <Button variant="primary" style={buttonStyle} className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE EQUIPMENT DETAILS  */}
        <Link href={`/jobsite/edit/${jobsiteObj.firebaseKey}`} passHref>
          <Button variant="info" style={buttonStyle}>EDIT</Button>
        </Link>
        <Button variant="danger" style={buttonStyle} onClick={deleteThisJobSite} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

JobSiteCard.propTypes = {
  jobsiteObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    foreman: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default JobSiteCard;
