## Year in Review

<time datetime="2017-12-31">31st December 2017</time>

It may have been 15 months since I last touched this blog, but that's the result of hard work as opposed to extreme laziness. Here's a brief overview of everything I've done in 2017.

### Web Audio API Mini-Course

Last year, I published [a blog entry](/blog/1474804-web-audio-screencast-series) about [a 5-episode series on the Web Audio API](https://www.sitepoint.com/premium/courses/sound-synthesis-with-the-web-audio-api-2937) that I was authoring for SitePoint. After gradually producing new episodes and ultimately reworking it into a short course with the editing team, it was released a few months ago to a handful of positive reviews. It's only available to Premium customers, but there are some [deals](https://www.sitepoint.com/premium/deals) that one may find enticing.

### Articles

I've continued to write various tutorials and ramblings this year.

#### Learning JavaScript Test-Driven Development by Example

I wrote [a tutorial covering Test-Driven Development in JavaScript](https://www.sitepoint.com/learning-javascript-test-driven-development-by-example/) that was published by SitePoint. It demonstrates how to use TDD in the context of implementing and refactoring a HTML form validator.

#### What I’ve Learned Over 5 Years as a Software Developer

July of this year marked the 5-year anniversary of the beginning of my commercial software engineering career, so [I summarised my key takeaways thus far](https://read.acloud.guru/what-ive-learned-over-5-years-as-a-software-developer-a5a8bf456b11).


#### Getting Into Software Development

I received a LinkedIn message asking how one can pursue software development as a career, and decided to pen [an open response](https://codeburst.io/getting-into-software-development-ca6b8d4ce49e). It went somewhat viral.

### Talks

At the beginning of this year, I set myself the goal of giving a talk at a meetup; I ended up giving two.

#### ECMAScript Proxies in Node.js

[<img src="https://i.ytimg.com/vi/z9oZ7gIL1us/maxresdefault.jpg" alt="Capture of ECMAScript Proxies video" class="blog-post__image--primary" />](https://www.youtube.com/watch?v=z9oZ7gIL1us)

I first encountered the [Proxy API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) when developing [a visualisation tool for the Web Audio API](https://github.com/jamesseanwright/audionode-visualiser); it's currently residing in the projects graveyard, but I do want to ressurect it at some point. I thought it was a powerful capability that could be applied to a variety of scenarios and [discussed some that were specific to Node.js](https://www.youtube.com/watch?v=z9oZ7gIL1us). The talk took place at [The JS Roundabout](https://www.meetup.com/The-JS-Roundabout/).

#### Implementing a Worker Queue using Child Processes

[<img src="https://i.ytimg.com/vi/E-01bE2LjxM/maxresdefault.jpg" alt="Capture of ECMAScript Proxies video" class="blog-post__image--primary" />](https://www.youtube.com/watch?v=E-01bE2LjxM)

The concept of offloading work to additional Node.js processes (read: clustering) is nothing new, and yet it isn't commonly employed (due to either pragmatic reasoning or lack of prioritisation.) This was initially brought to my attention at NET-A-PORTER, but it unfortunately didn't progress past an initial investigation by a colleague. I nonetheless applied these learnings to a new library and captured some benchmarks, [discussing my findings](https://www.youtube.com/watch?v=E-01bE2LjxM) and demonstrating substantial performance improvements. I was hosted by the [London Node.js Meetup](https://www.meetup.com/LNM-London-Node-JS-Meetup) that's run by [YLD](https://www.yld.io/), the consultancy through which I developed for Trainline. They're a smart bunch working on some interesting projects; check them out!

### Volunteering

I spent most of this year volunteering at [CodeYourFuture](https://codeyourfuture.io/), an initiative that teaches refugees how to code in preparation for securing employment in a software engineering role. It was an absolute pleasure to give back after having focused on myself and my own development; I primarily concentrated on leading [the database module](https://github.com/CodeYourFuture/db-module-ii).

### Open-Source Projects

Between all of this, I somehow found the time to contribute to and author some open-source projects.

#### Request

At the time of writing, [Request](https://github.com/request/request) is arguably still the most popular HTTP client abstraction for Node.js. I contributed a small change that provided a shorthand method for making `OPTIONS` requests.

#### React Animation Frame

[React Animation Frame](https://github.com/jamesseanwright/react-animation-frame) is a React higher-order component that invokes a callback in a wrapped component via `requestAnimationFrame`. I created this as a proof-of-concept, but its moderate popularity resulted in further development and contributions from other GitHub users.

#### Maze Generator

In a bid to improve my algorithmic capability, I programmed [a real-time maze generator](https://github.com/jamesseanwright/maze-generator) using the depth-first search algorithim. I highly enjoyed this project and have an itch to create similar tidbits.

#### GitHub Autoresponder

[GitHub Autoresponder](https://github.com/jamesseanwright/github-autoresponder) is an ASP.NET Core webhook that automatically responds to issues and pull requests opened against any configured GitHub repositories. The rationale for this was to handle potential interactions with my projects while I am travelling.

#### Reason VM

I spent the beginning of December writing [a virtual machine and accompanying assembly language](https://github.com/jamesseanwright/reason-vm) with [Reason](https://reasonml.github.io/), a new language from Facebook based upon JavaScript and OCaml. It's still a work in progress using a young language, but I've wanted to tackle this for a long time and I'm covering a lot of low-level areas of interest.

A final key highlight of 2017 is that I left London. I adore the city but detest its crowded, expensive, and busy nature. I plan to spend the beginning of 2018 travelling around Asia before relocating to Manchester to be closer to my origins.

I wish you all a happy and healthy 2018!