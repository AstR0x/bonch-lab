import { RootState } from '@store';

/**
 * Заглушка состояния приложения, используется в unit тестах
 */
export const mockState: RootState = {
  auth: {
    token: null,
    userData: null,
  },
  dictionaries: {
    groups: null,
    topics: null,
    structure: null,
  },
  groups: {
    groupList: [],
    group: null,
  },
  labs: {
    labList: [],
    lab: null,
  },
  loading: {
    isLoading: false,
  },
  notification: {
    message: null,
    severity: null,
  },
  tasks: {
    taskList: [],
    task: null,
    taskParams: null,
  },
  router: null,
};

export const createMockState = (state: Partial<RootState>): RootState => ({
  ...mockState,
  ...state,
});
