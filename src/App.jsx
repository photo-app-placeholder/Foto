import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styles from './App.css';
import Layout from './components/Layout/Layout';
import { UserProvider } from './context/UserContext';
import LoginView from './views/Login/LoginView';
import Profile from './views/Profile/Profile';
import AlbumView from './views/Album/AlbumView';
import AddImage from './views/Album/AddImage';
import EditImage from './views/Album/EditImage';
import ImageView from './views/Album/ImageView';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const { appStyles } = styles;

export default function App() {
  return (
    <div className={appStyles}>
      <BrowserRouter>
        <UserProvider>
          <Layout>
            <Switch>
              <Route exact path="/"></Route>
              <Route exact path="/login">
                <LoginView />
              </Route>
              <Route exact path="/register">
                <LoginView isRegistering />
              </Route>
              <Route exact path="/addImage">
                <AddImage />
              </Route>
              <Route exact path="/:username">
                <Profile />
              </Route>
              <PrivateRoute exact path="/:username/:album">
                <AlbumView />
              </PrivateRoute>
              <Route exact path="/:username/:album/:photo">
                <ImageView />
              </Route>
              <Route exact path="/:username/:album/:photo/edit">
                <EditImage />
              </Route>
            </Switch>
          </Layout>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}
