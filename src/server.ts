import app from './app';

const port = process.env.PORT || 3333;

const startServer = async (): Promise<void> => {
  const server = await app();

  server.listen(port, () => {
    console.log(`Server started on port ${port}!`);
  });
};

startServer();
