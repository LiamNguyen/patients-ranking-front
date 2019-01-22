import React from 'react'; // eslint-disable-line
import { Route, IndexRoute } from 'react-router';

import PatientsRanking from './components/screens/PatientsRanking';

export default (
  <Route path="/">
    <IndexRoute components={PatientsRanking} />
  </Route>
);
