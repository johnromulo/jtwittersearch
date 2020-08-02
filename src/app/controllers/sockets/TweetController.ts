import {
  ConnectedSocket,
  SocketController,
  MessageBody,
  OnMessage,
} from 'socket-controllers';

import TwitterApi from '@lib/TwitterApi';

import Tweet from '@schemas/Tweet';

@SocketController('/twitter')
export class SocketTestController {
  @OnMessage('search')
  async search(
    @ConnectedSocket() socket: any,
    @MessageBody() message: any
  ): Promise<void> {
    const { hashtag } = message;

    // socket.emit(`search_response_${hashtag}`, {
    //   viewed: false,
    //   approved: null,
    //   _id: '5f26b582022f846e31c4f337',
    //   text: 'gg  #GOpaiN',
    //   userNickName: 'rjohn1086',
    //   userName: 'John Romulo',
    //   userImgUrl:
    //     'http://pbs.twimg.com/profile_images/909888520461983745/ZjGwnxyH_normal.jpg',
    //   times: 1596372349463,
    //   hashtag: 'GOpaiN',
    //   createdAt: '2020-08-02T12:45:54.613Z',
    //   updatedAt: '2020-08-02T12:45:54.613Z',
    //   __v: 0,
    // });

    // TwitterApi.client.stream(
    //   'statuses/filter',
    //   { track: hashtag, lang: 'pt' },
    //   stream => {
    //     stream.on('data', async tw => {
    //       console.log('data', tw.text);

    //       const tweet = await Tweet.create({
    //         text: tw.text,
    //         userNickName: tw.user.screen_name,
    //         userName: tw.user.name,
    //         userImgUrl: tw.user.profile_image_url,
    //         times: tw.timestamp_ms,
    //         hashtag,
    //       });

    //       console.log(`search_response_${hashtag}`, tweet);

    //       socket.emit(`search_response_${hashtag}`, tweet);
    //     });

    //     stream.on('error', error => {
    //       console.log(error);
    //       // socket.emit('message_saved', error);
    //     });
    //   }
    // );
  }

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
