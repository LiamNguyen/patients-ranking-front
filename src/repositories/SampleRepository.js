import routes from '../lib/ApiRoutes';
import {
  checkResponse,
  get
} from '../lib/FetchHelper';

export default {
  getSampleJson() {
    return get(routes.sampleRoute()).then(checkResponse);
  }
}