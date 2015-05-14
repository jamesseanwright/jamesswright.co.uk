### [Tweeting Travis CI build notifications via webhooks](/blog/1421020-travis-twitter-webhook)

<time datetime="2015-01-12">12th January 2015</time>

If you aren’t familiar with [Travis CI](https://travis-ci.org/), you really ought to check it out. It’s a hosted continuous integration service that’s ridiculously easy to configure, can connect to your GitHub repositories with a single click, and supports a plethora of languages.

As I was developing my [new responsive site](https://github.com/jamesseanwright/jamesswright.co.uk), I thought it would be cool to tweet build notifications from my techie Twitter account, [@jamesswrightweb](https://twitter.com/jamesswrightweb). After familiarising myself with Travis [webhooks](http://docs.travis-ci.com/user/notifications/#Webhook-notification), I wrote a Node.js server that will receive said notifications and post build results to Twitter; the imaginatively named [Twitter Webhook for Travis CI](https://github.com/jamesseanwright/travis-twitter-webhook).

Setting it up is fairly straightforward using the provided README: create a Twitter app, authorise it against your Twitter account, host the server, configure the API keys, and make Travis aware of the webhook.

In the case of my new site, it will tweet upon a successful or failed build:

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Build 26 of <a href="https://twitter.com/hashtag/jamesswright?src=hash">#jamesswright</a>.co.uk has passed: <a href="https://t.co/mmrgXlVCIh">https://t.co/mmrgXlVCIh</a></p>&mdash; James Wright (@JamesSWrightWeb) <a href="https://twitter.com/JamesSWrightWeb/status/554710617412866049">January 12, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Hopefully someone will find this webhook useful. I’m open to pull requests and suggestions if it increases its ease of use!