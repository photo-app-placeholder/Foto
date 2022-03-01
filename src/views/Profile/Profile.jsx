import React from 'react';
import profileHook from '../../hooks/profileHook';

export default function Profile() {
  const { profile } = profileHook();

  console.log(profile[0].username);
  return <div>Profile</div>;
}
