## Elemental Entropy - My JS1k 2016 Entry

<time datetime="2016-03-12">12th March 2016</time>

<img src="https://raw.githubusercontent.com/jamesseanwright/elemental-entropy/master/screenshot.jpeg" alt="Time Worm! Screenshot" class="blog-post__image--primary" />

If you've previously visited my blog, you might be aware that [I entered last year's js13kGames contest](/blog/1442177-time-worm-js13kgames-entry). Since then, I've been exploring games and application development with HTML5 canvas, so I entered this year's [JS1k contest](http://js1k.com/2016-elemental/). The aim is along the same lines as js13kGames, except that technical demos are also accepted, and that submissions can not exceed 1024 bytes. And I remember complaining that 13 KB was small!

Given the theme this year is "EleMental" (yep, with that casing too!), I wrote a 2D canvas game called [Elemental Entropy](http://js1k.com/2016-elemental/demo/2511), in which the player rotates a shield around an oxygen particle to protect it from heat and fuel particles (because science is that fundamental, right?!). I also managed to squeeze in some very basic audio thanks to the Web Audio API's [`OscillatorNode`](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode) interface.


### The Process

Here's the final code that I submitted. It's 950 bytes in size:

<pre id="js1k-code" style="overflow-y: auto;"></pre>

Oh I see... so how does... what? Ridiculous right? This is the output of an amazing tool called [RegPack](https://github.com/Siorki/RegPack), which removes duplicate tokens and ultimately builds a regular expression against which one's crushed code can be recompiled to executable JavaScript. Doing this alone, however, didn't permit me to get the game down to 950 bytes; this was just the final step. So how did I achieve this?

Let's take a look at the code in project's [GitHub repository](https://github.com/jamesseanwright/elemental-entropy). In total there are four scripts:


#### [`index.original.js`](https://github.com/jamesseanwright/elemental-entropy/blob/master/index.original.js)

This is the initial source code that I wrote to represent the game. Given the small target size, I'm not doing anything vectorial or converting pixel space to world space, but I have written small, manageable methods for handling particle generation, collision, and sound. Ironically, this code ended up being cleaner, in my opinion, than my js1kGames entry; look at that `Particle` constructor function!

So how big is this script? 6.98 KB. Oh dear. What next?


#### [`index.pre-min.js`](https://github.com/jamesseanwright/elemental-entropy/blob/master/index.pre-min.js)

Turns out that by throwing software engineering best practices out the window, I was able to half the game's size. All of the functions have been replaced with a giant game loop function, the `Particle` prototype was ruled out in favour of object literals, and constants have been ditched for magic values. This, for the most part, entailed my finding and replacing functions and constants in my text editor manually.


#### [`index.pre-crush.js`](https://github.com/jamesseanwright/elemental-entropy/blob/master/index.pre-crush.js)

This is the `pre-min` script passed to Google's [Closure Compiler](https://developers.google.com/closure/compiler/). I was originally using [UglifyJS](https://github.com/mishoo/UglifyJS2), but the mangling options were not flexible enough for my needs. I'm using Closure's advanced optimisations and referencing an externs script to mark the JS1k shim globals as reserved tokens. I then manually remove all instances of the `var` keyword, effectively placing everything on the global object since the script doesn't run in strict mode. 

Now we're down to 1.54 KB. Just another 553 bytes to go...


#### [`index.crushed.js`](https://github.com/jamesseanwright/elemental-entropy/blob/master/index.crushed.js)

This is the `pre-crushed` script processed with RegPack, using the [online UI](http://siorki.github.io/regPack.html) with these options:

* Attempt method hashing and renaming for **2D canvas context**
* Assume global variable **c** is a **2D canvas context**
* Reassign variable names to produce consecutive character blocks, except for variables **a c**
* Score = **1**
* Gain = **0**
* Length = **0**

This results in the 950-byte script that I shared above.


### Observations

I enjoyed writing this game, but reducing its size by 6 KB was insane and took a great deal of optimisation. Additionally, this project has made me realise that my maths is pretty poor; I had to spend an hour or two on BBC GCSE Bitesize to remind myself of how geometry works. To resolve this, I've bought [_Mathematics and Physics for Programmers_](http://www.amazon.co.uk/dp/1435457331/ref=pd_lpo_sbs_dp_ss_1/276-7648159-2263306?pf_rd_m=A3P5ROKL5A1OLE&pf_rd_s=lpo-top-stripe&pf_rd_r=034RWHHR2HSATR1BB4SS&pf_rd_t=201&pf_rd_p=569136327&pf_rd_i=1584503300) by Danny Kodicek and John Flynt; the book starts with the very basics, before progressing into algebra, geometry, calculus, and then more advanced concepts. I'm therefore going to implement the provided pseudo-code in JavaScript and ultimately use it in my games. I'm also going to learn how to map world space to pixel space properly!


### Tips

* Use Closure Compiler before RegPacking your entry, but **use the advanced optimisations with caution**. For example, when running it against my original source code, I experienced errors with invocation context, as a function belonging to `shield` was subsequently disassociated with it, meaning that `this` referred to the global object. Personally, I'd favour UglifyJS for production-quality software

* When manually reducing code size, **Git is your friend**. Everytime a change results in a successful reduction, commit it! If you then attempt another change that increases the size, then you can easily use `git reset` to undo it. You should also commit when the code actually works, as I found that manual replacement is error prone

* There's always an optimisation you can make, **even if it's totally wacky and unfounded**. Don't get me wrong, I favour pragmatism and empiricism, but duplication of speed computation over calling a dedicated function, for example, could use fewer bytes

* As a last resort, you may have to **compromise on functionality**. The game originally had logic to slightly randomise particle sizes and speeds, but this wasn't a core gameplay requirement. Be willing to drop anything that adds little to no value to your demo's experience

I'm now going to take a couple of months off from extra-curricular development before my brain sets on fire. Then I'm going to start working on developing games properly.

<script>
(function () {
	'use strict';
	
	/* awesome hax to retroactively add UTF-8-encoded code to
	 * container to avoid HTML validity issues */
	
	var code = document.body.querySelector('#js1k-code');
	
	code.innerHTML = '\x66\x6F\x72\x28\x5F\x3D\x27\x6C\x5B\x64\x5D\x7E\x7E\x2E\x60\x3D\x2D\x31\x2A\x60\x5F\x6F\x6E\x5E\x66\x75\x6E\x63\x74\x69\x5E\x5A\x63\x2E\x59\x59\x61\x72\x63\x28\x57\x72\x65\x71\x75\x65\x56\x35\x3A\x2D\x32\x35\x55\x30\x30\x4E\x28\x34\x4E\x2D\x4C\x26\x26\x4B\x4B\x28\x4A\x73\x74\x48\x65\x2E\x47\x32\x34\x45\x53\x74\x79\x6C\x65\x3D\x44\x44\x22\x23\x1F\x1F\x66\x66\x66\x22\x3B\x1E\x7C\x7C\x2D\x32\x36\x3E\x1D\x2C\x59\x73\x68\x61\x64\x6F\x77\x1C\x1C\x43\x6F\x6C\x6F\x72\x3D\x1B\x61\x74\x1A\x4D\x1A\x68\x2E\x19\x19\x50\x49\x18\x18\x2F\x34\x17\x60\x79\x16\x60\x78\x15\x29\x2C\x14\x19\x72\x61\x6E\x64\x6F\x6D\x28\x29\x13\x29\x3B\x12\x28\x45\x30\x2D\x11\x12\x59\x48\x72\x6F\x6B\x65\x10\x66\x69\x6C\x6C\x0F\x30\x2C\x0E\x59\x0F\x0C\x35\x2C\x0E\x32\x2A\x18\x14\x0C\x28\x29\x0B\x59\x62\x65\x67\x69\x6E\x50\x1A\x68\x28\x29\x09\x28\x62\x2E\x63\x75\x72\x72\x65\x6E\x74\x54\x69\x6D\x65\x08\x13\x2B\x2E\x35\x7C\x30\x07\x47\x63\x6C\x69\x65\x6E\x74\x58\x06\x19\x1A\x61\x6E\x32\x28\x16\x2D\x45\x0E\x15\x2D\x34\x4E\x29\x05\x1C\x42\x6C\x75\x72\x3D\x31\x30\x0E\x09\x2C\x57\x04\x2C\x65\x3D\x62\x2E\x63\x72\x65\x1A\x65\x4F\x73\x63\x69\x6C\x6C\x1A\x6F\x72\x28\x14\x47\x66\x56\x6E\x63\x79\x2E\x76\x61\x6C\x75\x65\x3D\x31\x03\x30\x3E\x19\x73\x71\x72\x74\x28\x4C\x15\x29\x2A\x4C\x15\x29\x2B\x11\x16\x29\x2A\x11\x16\x29\x29\x4B\x02\x0E\x47\x63\x5E\x6E\x65\x63\x74\x28\x62\x2E\x64\x65\x48\x69\x6E\x1A\x69\x5E\x14\x47\x48\x61\x72\x74\x08\x14\x47\x48\x6F\x70\x08\x2B\x01\x62\x3D\x6E\x65\x77\x20\x41\x75\x64\x69\x6F\x43\x5E\x74\x65\x78\x74\x2C\x66\x3D\x0E\x67\x3D\x0E\x6B\x3D\x0E\x6C\x3D\x5B\x5D\x2C\x6D\x3D\x0E\x6E\x3D\x5B\x22\x23\x66\x36\x30\x22\x2C\x22\x23\x30\x38\x38\x22\x5D\x3B\x61\x2E\x5E\x6D\x6F\x75\x73\x65\x6D\x6F\x76\x65\x3D\x5A\x28\x65\x29\x7B\x31\x4E\x3C\x06\x4B\x37\x4E\x3E\x06\x4A\x6B\x3D\x28\x06\x2D\x38\x4E\x29\x2F\x38\x4E\x2A\x18\x2A\x32\x2B\x18\x29\x7D\x3B\x70\x3D\x21\x30\x3B\x5A\x20\x71\x28\x65\x29\x7B\x0C\x1F\x4E\x30\x22\x3B\x0C\x52\x65\x63\x74\x28\x0E\x0E\x38\x30\x0E\x34\x38\x30\x12\x69\x66\x28\x65\x2D\x6D\x3E\x3D\x31\x35\x4E\x2D\x31\x4E\x2A\x67\x29\x7B\x68\x3D\x21\x28\x07\x14\x72\x3D\x68\x3F\x38\x4E\x2A\x13\x3A\x07\x3F\x38\x32\x55\x2C\x68\x3D\x68\x3F\x07\x3F\x35\x30\x55\x3A\x07\x3F\x34\x38\x30\x2D\x28\x38\x30\x2D\x38\x30\x2A\x13\x29\x3A\x38\x30\x2D\x38\x30\x2A\x19\x72\x61\x6E\x64\x6F\x6D\x28\x12\x6C\x2E\x70\x75\x73\x68\x28\x7B\x78\x3A\x72\x2C\x79\x3A\x68\x2C\x62\x3A\x4C\x72\x29\x2F\x34\x4E\x2A\x35\x2C\x66\x3A\x11\x68\x29\x2F\x45\x30\x2A\x33\x2C\x0F\x3A\x6E\x5B\x13\x2A\x6E\x2E\x6C\x65\x6E\x67\x74\x68\x7C\x30\x5D\x7D\x12\x6D\x3D\x65\x7D\x70\x4A\x0C\x1F\x4E\x66\x22\x1B\x22\x23\x4E\x66\x22\x04\x34\x30\x0E\x45\x0E\x34\x0B\x12\x66\x6F\x72\x28\x64\x20\x69\x6E\x20\x6C\x29\x7E\x4A\x0C\x44\x60\x0F\x1B\x60\x0F\x04\x15\x2C\x16\x2C\x32\x0B\x2C\x15\x2B\x3D\x60\x62\x2C\x16\x2B\x3D\x60\x66\x2C\x70\x4B\x37\x02\x28\x70\x3D\x21\x31\x03\x35\x01\x32\x29\x14\x70\x4B\x21\x60\x67\x4B\x31\x30\x02\x05\x3E\x3D\x6B\x2D\x17\x4B\x05\x3C\x3D\x6B\x2B\x17\x4A\x60\x67\x3D\x21\x0E\x60\x62\x5F\x62\x2C\x60\x66\x5F\x66\x2C\x66\x2B\x3D\x31\x0E\x30\x3D\x3D\x3D\x66\x25\x31\x4E\x4B\x67\x2B\x2B\x03\x39\x01\x2E\x31\x29\x14\x38\x32\x36\x3C\x15\x1D\x15\x7C\x7C\x35\x30\x36\x3C\x16\x1D\x16\x29\x4A\x7E\x3D\x76\x6F\x69\x64\x20\x30\x10\x1E\x09\x3B\x57\x34\x30\x0E\x45\x0E\x37\x35\x2C\x6B\x2D\x17\x2C\x6B\x2B\x17\x10\x28\x12\x0C\x1E\x59\x66\x5E\x74\x3D\x22\x32\x36\x70\x78\x20\x41\x72\x69\x61\x6C\x22\x3B\x0C\x54\x65\x78\x74\x28\x66\x2C\x32\x0E\x34\x30\x12\x56\x48\x41\x6E\x69\x6D\x1A\x69\x5E\x46\x72\x61\x6D\x65\x28\x71\x29\x7D\x71\x28\x12\x27\x3B\x47\x3D\x2F\x5B\x5E\x20\x2D\x43\x46\x49\x4D\x4F\x2D\x54\x58\x5B\x5C\x5D\x61\x2D\x7D\x5D\x2F\x2E\x65\x78\x65\x63\x28\x5F\x29\x3B\x29\x77\x69\x74\x68\x28\x5F\x2E\x73\x70\x6C\x69\x74\x28\x47\x29\x29\x5F\x3D\x6A\x6F\x69\x6E\x28\x73\x68\x69\x66\x74\x28\x29\x29\x3B\x65\x76\x61\x6C\x28\x5F\x29';
}());
</script>