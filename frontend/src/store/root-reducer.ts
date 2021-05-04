import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import { config } from '@common/config';

import { authReducer } from '@features/auth';
import { errorsReducer } from '@features/errors';
import { loadingReducer } from '@features/loading';
import { notificationReducer } from '@features/notification';
import { groupsReducer } from '@features/groups';
import { tasksReducer } from '@features/tasks';
import { dictionariesReducer } from '@features/dictionaries';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  [config.modules.auth]: authReducer,
  [config.modules.errors]: errorsReducer,
  [config.modules.loading]: loadingReducer,
  [config.modules.notification]: notificationReducer,
  [config.modules.groups]: groupsReducer,
  [config.modules.tasks]: tasksReducer,
  [config.modules.dictionaries]: dictionariesReducer,
  [config.modules.router]: connectRouter(history),
});

export default rootReducer;
