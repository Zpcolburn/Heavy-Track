import React from 'react';
import { Image } from 'next/image';
import { useAuth } from '../utils/context/authContext';

export default function UserCard() {
  const { user } = useAuth();
  return (
    <div>
      <h1>{user.displayName}</h1>
      <Image src={user.photoURL} alt="userURl" width="100px" height="100px" />
      <h3>{user.email}</h3>
      <h4>Last Sign In: {user.metadata.lastSignInTime}</h4>
    </div>
  );
}
