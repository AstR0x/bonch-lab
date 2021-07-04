const createConfig = () => ({
  maxFileSize: 11000,
  modules: {
    auth: 'auth' as const,
    users: 'users' as const,
    groups: 'groups' as const,
    tasks: 'tasks' as const,
    labs: 'labs' as const,
    dictionaries: 'dictionaries' as const,
    notification: 'notification' as const,
    loading: 'loading' as const,
    router: 'router' as const,
  },
  environment: process.env.NODE_ENV,
  defaultDelay: 2000,
});

/**
 * Конфигурация приложения
 */
export const config: Readonly<ReturnType<typeof createConfig>> = createConfig();
