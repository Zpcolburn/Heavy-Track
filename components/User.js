import React from 'react';
import Card from 'react-bootstrap/Card';
import { useAuth } from '../utils/context/authContext';

export default function UserCard() {
  const { user } = useAuth();
  return (
    <Card style={{
      width: '18rem', margin: '10px', background: '#D4D4D4',
    }}
    >
      <Card.Img variant="top" src={user.photoURL} style={{ height: '100%' }} />
      <Card.Body>
        <Card.Title>{user.displayName}</Card.Title>
        <p className="card-text bold">Email: {user.email}</p>
        <p className="card-text bold">Last Sign In: {user.metadata.lastSignInTime}</p>
      </Card.Body>
    </Card>
  );
}
