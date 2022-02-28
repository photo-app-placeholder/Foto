import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { getProfileByUserId } from '../services/profiles';

export default function profileHook() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const { user } = useUser();

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfileByUserId(user.id);
        setProfile(data);
      } catch (error) {
        history.replace('/profile/edit');
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return { loading, setLoading, profile, setProfile };
}
