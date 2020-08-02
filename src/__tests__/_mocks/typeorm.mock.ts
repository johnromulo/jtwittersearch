jest.mock('typeorm', () => {
  return {
    PrimaryGeneratedColumn: () => jest.fn(),
    CreateDateColumn: () => jest.fn(),
    UpdateDateColumn: () => jest.fn(),
    VersionColumn: () => jest.fn(),
    Entity: () => jest.fn(),
    Column: () => jest.fn(),
    ManyToMany: () => jest.fn(),
    JoinTable: () => jest.fn(),
    OneToOne: () => jest.fn(),
    JoinColumn: () => jest.fn(),
    Generated: () => jest.fn(),
    ManyToOne: () => jest.fn(),
    OneToMany: () => jest.fn(),
    createConnection: jest.fn().mockResolvedValue(Promise.resolve()),
    getConnectionManager: jest
      .fn()
      .mockResolvedValue({ connections: { length: 0 } }),
    getRepository: jest.fn(),
  };
});
