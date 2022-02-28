import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styles from './App.css';
import Layout from './components/Layout/Layout';

const { appStyles } = styles;

export default function App() {
  return (
    <div className={appStyles}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/"></Route>
            <Route exact path="/login"></Route>
            <Route exact path="/register"></Route>
            <Route exact path="/:username"></Route>
            <Route exact path="/:username/:album"></Route>
            <Route exact path="/addImage"></Route>
            <Route exact path="/:username/:album/:photo"></Route>
            <Route exact path="/:username/:album/:photo/edit"></Route>
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
}
