import mongoose, { Mongoose } from 'mongoose';

class Database {
  private mongoConnection: Promise<Mongoose>;

  async run(): Promise<void> {
    this.mongo();
  }

  mongo(): void {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL || '', {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export const initDataBase = async (): Promise<void> => {
  await new Database().run();
};
