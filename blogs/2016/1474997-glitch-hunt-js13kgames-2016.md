## Glitch Hunt - My js13kGames 2016 Entry

<time datetime="2016-09-27">27th September 2016</time>

![Screenshot of Glitch Hunt](https://raw.githubusercontent.com/jamesseanwright/jamesswright.co.uk/master/blogs/images/glitch-hunt.jpg)

If you've read my blog previously, you might recall that [last year, I entered](/blog/1442177-time-worm-js13kgames-entry) [js13kGames](http://js13kgames.com/). Since 2015's competition, I've been itching to make more games, learning new techniques with each release; naturally, I entered again this year.

If you have no idea what I'm talking about, js13kGames is a contest in which participants create games using JavaScript and other web technologies, with the main caveat being that submissions can't surpass 13 KB in size once compressed. That makes using existing engines such as Phaser practically improbable, adding to the typical challenges one faces during games development. Additionally, there's a theme that one is expected to follow.

This year's theme was _glitch_, which admittedly threw me aback; while my immediate idea was to create a game with visual glitches, I decided that I should make it central to the gameplay. After some planning, I came up with [Glitch Hunt](http://js13kgames.com/entries/glitch-hunt). The idea is that the player must hit the keys on their keyboard at the right time, which is my attempt of emulating the live patching of a system; it's heavily inspired by those old dance mat games. Since I thought this alone would be too boring, I also threw in a boss battle that plays like a platformer.

I was able to take what I learned from last year's entry, as well as some of the incredible games against which mine paled, and make something that I deem to be substantially superior.

You can [play the game](http://js13kgames.com/entries/glitch-hunt) on the js13kGames site, and the [source code](https://github.com/jamesseanwright/glitch-hunt) is available on GitHub.


### Separating Concerns

After failing to use an architectural pattern last year out of concern that it wouldn't fit within the 13 KB limit (read: laziness), I vowed to separate the code of my subsequent games properly. A brief Google search pointed me to Entity Component System (ECS), a pattern that favours composition over inheritance. After using the pattern to develop a Breakout clone, only to be informed that I had misunderstood the responsibilities of components and systems, I was pointed to the work of [Richard Lord](http://www.richardlord.net/), a veteran game developer who wrote [Ash](https://github.com/richardlord/Ash), an ActionScript implemtation of ECS. Richard [breaks down ECS](http://www.richardlord.net/blog/what-is-an-entity-framework) as so:

* Component - wrap properties into objects so that they can be shared between entities and systems
* Entity - a collection of components
* System - updates entities that contain a certain component during each iteration of the game loop

Of course, I only had 13 KB with which to work, so I had to make it more lightweight. Here's the init method for my `Player` entity:

```
Player.prototype.init = function init() {
	G.spriteAnimatable.deregister(this);
	G.positionable(this, X, Y, WIDTH, HEIGHT);
	G.imageRenderable(this, this.getSprite);
	G.keyboardMoveable(this, SPEED);
	G.jumping(this, Y, JUMP_SPEED);
	G.shooting(this, 'bullet', SHOOT_Y_OFFSET);
	G.hurtable(this, HEALTH);
	G.collidable(this);
};
```

You can infer from the name of the components (`spriteAnimatable`, `positionable` etc.) that the `Player` entity is a collection of behaviours which can be reused elsewhere. So how does this work? Let's take a look at the `imageRenderable` component:

```
G.imageRenderable = function imageRenderable(entity, image) {
	entity.image = image;

	G.imageRenderSystem.register(entity);
};
```

To save space and to assist with performance, I'm directly mutating each entity that calls this function before registering it with a system. To summarise, my implementation of components ensure that the required properties are defined and initialised with the correct value, or an appropriate default. I then register this with `imageRenderSystem`:

```
function ImageRenderSystem(context) {
	this.context = context;
}

ImageRenderSystem.prototype = G.system.create(function next(entity) {
	var image;

	if (!entity.isHidden) {
		image = entity.image instanceof Function ? entity.image() : entity.image;

		this.context.drawImage(
			image,
			G.getScreenXPos(entity.x),
			G.getScreenYPos(entity.y),
			G.getScreenXPos(entity.width),
			G.getScreenYPos(entity.height)
		);
	}
});
```

`G.system.create` is a method that abstracts `Object.create`, as well as attaching common methods to each system. The `next` callback is invoked during each interation of the game loop, and for each entity that is currently registered with the system. Here's how the game loop looks:

```
function gameLoop(timestamp) {
	G.renderingContext.clearRect(0, 0, G.renderingCanvas.width, G.renderingCanvas.height);

	G.imageRenderSystem.update(timestamp);
	G.spriteAnimationSystem.update(timestamp);
	[...]
	G.collisionSystem.update(timestamp);
	G.flashSystem.update(timestamp);

	requestAnimationFrame(gameLoop);
}
```

`requestAnimationFrame`'s timestamp is passed to each system in case it is required for computation e.g. frame rates for sprite animations, calculating the player's rate of fire etc. This code definitely needs work, but it's my best attempt thus far. My next goal is to take these concepts to ES6-land.


### Pixel Art

One key take-away from the 2015 contest was to use small, pixel-intensive art and scale it up. [Greg Pabian](http://pixelchinchilla.com/) used this in his entry, [_Captain Reverso_](http://js13kgames.com/entries/captain-reverso), and I thought it looked excellent. I took the same approach this year and achieved great results.