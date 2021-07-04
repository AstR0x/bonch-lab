import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import { config } from '@common/config';

import { authReducer } from '@features/auth';
import { groupsReducer } from '@features/groups';
import { tasksReducer } from '@features/tasks';
import { labsReducer } from '@features/labs';
import { dictionariesReducer } from '@features/dictionaries';
import { notificationReducer } from '@features/notification';
import { loadingReducer } from '@features/loading';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  [config.modules.auth]: authReducer,
  [config.modules.groups]: groupsReducer,
  [config.modules.tasks]: tasksReducer,
  [config.modules.labs]: labsReducer,
  [config.modules.dictionaries]: dictionariesReducer,
  [config.modules.notification]: notificationReducer,
  [config.modules.loading]: loadingReducer,
  [config.modules.router]: connectRouter(history),
});

export default rootReducer;
