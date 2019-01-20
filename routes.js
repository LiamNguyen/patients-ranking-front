import React from 'react';
import { Route, IndexRoute } from 'react-router';

import PatientsRanking from './src/components/screens/PatientsRanking';

export default (
  <Route path="/">
    <IndexRoute components={PatientsRanking} />
  </Route>
);
