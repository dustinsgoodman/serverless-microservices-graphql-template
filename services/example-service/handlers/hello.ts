export const handler = async (event: { body: string }): Promise<string> => {
  const { greeting } = JSON.parse(event.body);
  return `Hello, ${greeting}`;
};
