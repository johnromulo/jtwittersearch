import mongoose, { Document, Schema } from 'mongoose';

type Tweet = Document & {
  token: string;
  userNickName: string;
  userName: string;
  userImgUrl: string;
  times: number;
  viewed: boolean;
  approved: boolean;
  hashtag: string;
};

const TweetSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    userNickName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userImgUrl: {
      type: String,
    },
    times: {
      type: Number,
      required: true,
    },
    viewed: {
      type: Boolean,
      default: false,
    },
    approved: {
      type: Boolean,
      default: null,
    },
    hashtag: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Tweet>('Tweet', TweetSchema);
