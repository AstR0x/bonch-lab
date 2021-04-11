import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createHashHistory } from 'history';

import { config } from '@common/config';

import { errorsReducer } from '@features/errors';
import { loadingReducer } from '@features/loading';

export const history = createHashHistory();

const rootReducer = combineReducers({
  [config.modules.errors]: errorsReducer,
  [config.modules.loading]: loadingReducer,
  [config.modules.router]: connectRouter(history),
});

export default rootReducer;
