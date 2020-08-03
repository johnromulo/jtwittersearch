import {
  ConnectedSocket,
  SocketController,
  MessageBody,
  OnMessage,
  OnConnect,
  OnDisconnect,
} from 'socket-controllers';

import TwitterApi from '@lib/TwitterApi';

import Tweet from '@schemas/Tweet';
import { EventEmitter } from 'events';

interface TweetInterface {
  text: string;
  user: {
    name: string;
    profile_image_url: string;
    screen_name: string;
  };
  timestamp_ms: number;
}

@SocketController('/twitter')
export class SocketTestController {
  private clientsConnnection = 0;

  private twitterApi: TwitterApi | null = null;

  private twitterApiStream: EventEmitter | null = null;

  private hashtagsList: string[] = [];

  @OnConnect()
  connect(): void {
    this.clientsConnnection += 1;
    if (this.clientsConnnection > 0 && !this.twitterApi) {
      this.twitterApi = new TwitterApi();
    }
  }

  @OnDisconnect()
  disconnect(): void {
    this.clientsConnnection =
      this.clientsConnnection <= 0 ? 0 : this.clientsConnnection - 1;

    if (this.clientsConnnection <= 0) {
      if (this.twitterApiStream) {
        this.twitterApiStream.removeAllListeners();

        this.twitterApiStream = null;
        this.hashtagsList = [];
      }

      this.twitterApi = null;
    }
  }

  @OnMessage('search')
  async search(
    @ConnectedSocket() socket: any,
    @MessageBody() message: any
  ): Promise<void> {
    const { hashtag }: { hashtag: string } = message;

    if (this.twitterApi) {
      if (
        !this.twitterApiStream ||
        !this.hashtagsList.find(htg => htg === hashtag)
      ) {
        this.hashtagsList.push(hashtag);

        this.twitterApiStream = this.twitterApi.client.stream(
          'statuses/filter',
          { track: hashtag, lang: 'pt' }
        );

        this.twitterApiStream.on('data', async (tw: TweetInterface) => {
          const tweet = await Tweet.create({
            text: tw.text,
            userNickName: tw.user.screen_name,
            userName: tw.user.name,
            userImgUrl: tw.user.profile_image_url,
            times: tw.timestamp_ms,
            hashtag,
          });

          socket.emit(`search_response_${hashtag}`, tweet);
        });

        this.twitterApiStream.on('error', error => {
          console.log('twitterApi error', error);
        });
      }
    }
  }

  // stream => {
  //   console.log('twitterApi stream', new Date());
  //   stream.on('data', async (tw: TweetInterface) => {
  //     console.log('twitterApi data', new Date());
  //     const tweet = await Tweet.create({
  //       text: tw.text,
  //       userNickName: tw.user.screen_name,
  //       userName: tw.user.name,
  //       userImgUrl: tw.user.profile_image_url,
  //       times: tw.timestamp_ms,
  //       hashtag,
  //     });

  //     socket.emit(`search_response_${hashtag}`, tweet);
  //   });

  //   stream.on('error', error => {
  //     console.log('twitterApi error', error);
  //     // socket.emit('message_saved', error);
  //   });
  // }

  @OnMessage('assessment')
  async assessment(
    @ConnectedSocket() socket: any,
    @MessageBody() message: any
  ): Promise<void> {
    const { tweetId, approved } = message;

    if (tweetId) {
      const tweet = await Tweet.findById(tweetId);

      if (tweet) {
        tweet.approved = approved;
        await tweet.save();
        if (approved) {
          socket.broadcast.emit(`show_tweet_${tweet.hashtag}`, tweet);
        }
      }
    }
  }

  @OnMessage('viewed')
  async viewed(
    @ConnectedSocket() socket: any,
    @MessageBody() message: any
  ): Promise<void> {
    const { tweetId } = message;

    if (tweetId) {
      const tweet = await Tweet.findById(tweetId);

      if (tweet) {
        tweet.viewed = true;
        await tweet.save();
      }
    }
  }
}
