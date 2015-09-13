## Time Worm! - My js13kGames 2015 Entry

<time datetime="2015-09-13">13th September 2015</time>
<img src="https://github.com/jamesseanwright/time-worm/raw/master/screenshots/full.jpeg" alt="Time Worm! Screenshot" class="blog-post__image--primary" />

Like any other developer, I'm always on the lookout for ways in which I can push my programming abilities to the next level. Since my main focus has been JavaScript as of late, I decided to enter the [js13kGames](http://js13kgames.com/) contest. The challenge: write a game using JavaScript, HTML5, and CSS that, when minified and zipped, is no larger than 13 kilobytes; that limit is inclusive of assets. 

My main reason for entering was that I had always tried to develop Java AWT games during my studies at university, but my skills were not up to the required standard and thus I'd give up out of frustration. Since I've been developing commercially for the last few years now, I felt that I had to give it another shot. I also really wanted to undertake further investigations into the HTML5 canvas API.

My game is called Time Worm! It's a simple space shooter in which the player controls the titular character, shooting lasers from his sunglasses and whose health is represented by the number of segments comprising his body, including his head. The theme of the contest this year was "reversed", thus I allowed the player to reverse time in order to regain health and undo mistakes.

You can play the game on Time Worm!'s js13kGames [entry page](http://js13kgames.com/entries/time-worm), and the [source code](https://github.com/jamesseanwright/time-worm) is on GitHub.

### What went well
#### Finishing the game*
*Rendering bugs not included ;)

Given that I'm currently facing tight deadlines at work, and that my life in general has been super busy (in the good sense), I'm glad that I forced myself to dedicate time to completing my entry. I knew that having a fixed deadline would force me to get everything done. Unfortunately, there is the odd rendering gaff, but I worked to make their occurence as rare as possible.

#### Fluid gameplay
The gameplay ended up working really well, especially with the time reversal element. The game pretty much runs at 60FPS, as long as the user has enabled hardware acceleration and/or is not using a terrible machine. The keyboard interaction is responsive and generally is fun to play.

#### A chance to explore HTML5 canvas
I have experimented with the canvas API, but I have never written a full app or game with it until now. It makes a lovely change from standard UI development and definitely permits a flexible context for advanced rendering.

### What didn't go well
#### Poor separation of concerns
Given that I wanted to fit as much into 13KB as possible, I didn't follow any design pattern, such as the popular [Entity Component System](https://en.wikipedia.org/wiki/Entity_component_system). Instead, I had one script for each larger concern, such as `player.js` and `enemy.js`. Although duplicated logic was fairly minimal, these scripts combine rendering, movement, and some other game logic (plus the odd magic number here and there!) Ideally, a common `GameObject`, a `Renderer` and other similar objects should have been implemented; some of the other entries (which are brilliant by the way, you should check them out) do succesfully implement ECS and fit within the limit, which has made me realise that I really should have done the same. I will definitely take this on board going forward.

#### Lazily using `requestAnimationFrame`
[`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) is a great API; it permits developers to execute code between repaints. For relatively small transformations of data, this is far more performant than `setInterval` or `setTimeout`, especially due to the optimisations that the browser can make e.g. hardware acceleration. Typically, calling it at the end of your repaint function with said function as the callback will create a loop that matches your monitor's refresh rate. In most cases, this is 60FPS.

In my case, I was lazy and <del>used</del> abused it as a game loop. While this is fine on most systems, the game would consequently struggle on lower-end machines. In the future, I'll make it my aim to take as much game logic away from `requestAnimationFrame` as possible. This ties in nicely with the first point.

#### Rendering issues
Trying to be a smartarse, I only repainted the areas of each rendering context as required at a given time, as opposed to simply calling `CanvasRenderingContext2D.clearRect(0, 0, width, height)`. Due to the nature of Time Worm's wiggling animation, clearing the segments of his body predictably proved fiddly, and as a result there are some weird calculations in the code.

#### Lack of testing
In this domain, I simply ensured that it worked in Chrome and Firefox. More testing would have revealed some of the bugs that I was unable to catch in time plus I would have realised that I should have made it perform better on weaker systems.

Overall, I found this to be a fun project and I'm definitely itching to make more games. I have a few ideas, but for now I want to spend more time writing high-quality code!