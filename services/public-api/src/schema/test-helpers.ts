type ContextOverride = {
  event?: Record<string, string>;
  context?: Record<string, string>;
};

export const getContextConfig = (
  { event, context }: ContextOverride = { event: {}, context: {} }
) => {
  return {
    event: {
      headers: {},
      ...event,
    },
    context: {
      ...context,
    },
    express: {
      req: {},
      res: {},
    },
  };
};
