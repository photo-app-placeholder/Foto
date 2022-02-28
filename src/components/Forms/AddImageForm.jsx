import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { client } from '../../services/client'
import { useUser } from '../../context/UserContext'
import { fetchAlbumsByUser } from '../../services/albums';

export default function AddImageForm() {
  
  const [albums, setAlbums] = useState([])
  const [photo, setPhoto] = useState('')
  const [caption, setCaption] = useState('')
  const history = useHistory();

  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAlbumsByUser(user.id)
      setAlbums(data);
    }
    fetchData();
  }, [])

  return (
  <form>
    <label></label>
  </form>);
}
