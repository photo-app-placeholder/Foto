import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { getProfile } from '../services/profiles';

// hooks should generally start with use - so I would change this to useProfile
export default function useProfile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const { user } = useUser();

  useEffect(() => {
    // if you don't have this, you're getting an unnecessary call on the auth page that 500s
    if (user.id) {
      getProfile(user.id)
        .then((data) => setProfile(data))
        .finally(() => setLoading(false));
    }
  }, [user.id]);

  return { profile, setProfile, loading, setLoading };
}
