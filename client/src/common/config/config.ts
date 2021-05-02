const createConfig = () => ({
  maxFileSize: 11000,
  modules: {
    errors: 'errors' as const,
    loading: 'loading' as const,
    notification: 'notification' as const,
    router: 'router' as const,
    auth: 'auth' as const,
    groups: 'groups' as const,
  },
  environment: process.env.NODE_ENV,
  defaultDelay: 2000,
});

/**
 * Конфигурация приложения
 */
export const config: Readonly<ReturnType<typeof createConfig>> = createConfig();
