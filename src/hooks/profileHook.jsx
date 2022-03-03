import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { getProfile, getProfileByUserId } from '../services/profiles';

export default function profileHook() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState([{}]);
  const { user } = useUser();

  useEffect(() => {
    getProfile(user.id)
      .then((data) => setProfile(data))
      .finally(() => setLoading(false));
  }, []);

  return { profile, setProfile, loading, setLoading };
}
