import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styles from './App.css';
import Layout from './components/Layout/Layout';
import LoginView from './views/Login/LoginView';
import Profile from './views/Profile/Profile';
import AlbumView from './views/Album/AlbumView/AlbumView';
import AddImage from './views/Album/AddImage/AddImage';
import ImageView from './views/Album/ImageView/ImageView';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import CreateAlbum from './views/Album/CreateAlbum/CreateAlbum';
import Home from './views/Home/Home';
import PrivateAlbum from './views/Album/PrivateAlbum/PrivateAlbum';
import About from './components/About/About';

const { appStyles } = styles;

export default function App() {
  return (
    <div className={appStyles}>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <LoginView />
          </Route>
          <Route exact path="/register">
            <LoginView isRegistering />
          </Route>
          <PrivateRoute exact path="/addImage">
            <AddImage />
          </PrivateRoute>
          <PrivateRoute exact path="/newAlbum">
            <CreateAlbum />
          </PrivateRoute>
          <Route exact path="/about">
            <About />
          </Route>
          <PrivateRoute exact path="/:username">
            <Profile />
          </PrivateRoute>
          <PrivateRoute exact path="/:username/:album">
            <AlbumView />
          </PrivateRoute>
          <PrivateRoute exact path="/:username/:album/unlock">
            <PrivateAlbum />
          </PrivateRoute>
          <Route exact path="/:username/:album/:photo">
            <ImageView />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}
