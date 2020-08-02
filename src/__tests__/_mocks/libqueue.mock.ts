jest.mock('@lib/Queue', () => {
  return {
    add: jest.fn(),
  };
});
