import Twitter from 'twitter';

import twitterConfig from '@config/twitter';

class TwitterApi {
  public client: Twitter;

  constructor() {
    this.client = new Twitter({
      ...twitterConfig,
    });
  }
}

export default new TwitterApi();
