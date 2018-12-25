import routes from '../lib/ApiRoutes';
import { checkResponse, get } from '../lib/FetchHelper';

export default {
  getRanking() {
    return get(routes.getRanking()).then(checkResponse);
  }
};
