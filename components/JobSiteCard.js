import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

function JobSiteCard({ jobsiteObj }) {
  return (
    <Card style={{ width: '16rem', margin: '10px' }}>
      <Card.Img variant="top" src={jobsiteObj.image} alt={jobsiteObj.name} style={{ height: '250px' }} />
      <Card.Body>
        <Card.Title>{jobsiteObj.name} </Card.Title>
        <Card.Text>{jobsiteObj.foreman}</Card.Text>
        {/* DYNAMIC LINK TO VIEW THE JOBSITE DETAILS  */}
        <Link href={`/jobsite/view/${jobsiteObj.firebaseKey}`} passHref>
          <Button variant="info">View</Button>
        </Link>
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
};

export default JobSiteCard;
