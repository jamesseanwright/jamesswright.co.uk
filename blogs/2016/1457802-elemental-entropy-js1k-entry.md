## Elemental Entropy - My JS1k 2016 Entry

<time datetime="2016-03-12">12th March 2016</time>

<img src="https://raw.githubusercontent.com/jamesseanwright/elemental-entropy/master/screenshot.jpeg" alt="Time Worm! Screenshot" class="blog-post__image--primary" />

If you've previously visited my blog, you might be aware that [I entered last year's js13kGames contest](/blog/1442177-time-worm-js13kgames-entry). Since then, I've been exploring games and application development with HTML5 canvas, so I entered this year's [JS1k contest](http://js1k.com/2016-elemental/). The aim is along the same lines as js13kGames, except that technical demons are also accepted, and that submissions can not exceed 1024 bytes. And I remember complaining that 13 KB was small!

Given the theme this year is "EleMental" (yep, with that casing too!), I wrote a 2D canvas game called [Elemental Entropy](http://js1k.com/2016-elemental/demo/2511), in which the player rotates a shield around an oxygen particle to protect it from heat and fuel particles (because science is that fundamental, right?!). I also managed to squeeze in some very basic audio thanks to the Web Audio API's [`OscillatorNode`](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode) interface.


### The Process

Here's the final code that I submitted. It's 950 bytes in size:

```
for(_=&#39;l[d]~~.`=-1*`_on^functi^Zc.YYarc(WrequeV5:-25U00N(4N-L&amp;&amp;KK(JstHe.G24EStyle=DD&quot;#fff&quot;;||-26&gt;,YshadowColor=atMh.PI/4`y`x),random());(E0-YHrokefill0,Y5,2*()YbeginPh()	(b.currentTime+.5|0GclientXan2(-E-4N)Blur=10	,W,e=b.creeOscillor(GfVncy.value=10&gt;sqrt(L)*L)+)*))KGc^nect(b.deHini^GHartGHop+b=new AudioC^text,f=g=k=l=[],m=n=[&quot;#f60&quot;,&quot;#088&quot;];a.^mousemove=Z(e){1N&lt;K7N&gt;Jk=(-8N)/8N**2+)};p=!0;Z q(e){N0&quot;;Rect(80480if(e-m&gt;=15N-1N*g){h=!(r=h?8N*:?82U,h=h??50U:?480-(80-80*):80-80*random(l.push({x:r,y:h,b:Lr)/4N*5,f:h)/E0*3,:n[*n.length|0]}m=e}pJNf&quot;&quot;#Nf&quot;40E4for(d in l)~JD``,,2,+=`b,+=`f,pK7(p=!152)pK!`gK10&gt;=k-K&lt;=k+J`g=!`b_b,`f_f,f+=10===f%1NKg++9.1)826&lt;||506&lt;)J~=void 0	;W40E75,k-,k+(Yf^t=&quot;26px Arial&quot;;Text(f,240VHAnimi^Frame(q)}q(&#39;;G=/[^ -CFIMO-TX[\]a-}]/.exec(_);)with(_.split(G))_=join(shift());eval(_)
```

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

I enjoyed writing this game, but reducing its size by 6 KB was insane and took a great deal of optimisation. Additionally, this project has made me realise that my maths is pretty poor; I had to spend an hour or two on BBC GCSE Bitesize to remind myself of how geometry works. To resolve this, I've bought [Mathematics and Physics for Programmers] by Danny Kodicek and John Flynt; the book starts with the very basics, before progressing into algebra, geometry, calcus, and then more advanced concepts. I'm therefore going to implement the provided pseudo-code in JavaScript and ultimately use it in my games. I'm also going to learn how to map world space to pixel space properly!


### Tips

* Use Closure Compiler before RegPacking your entry, but **use the advanced optimisations with caution**. For example, when running it against my original source code, I experienced errors with invocation context, as a function belonging to `shield` was subsequently disassociated with it, meaning that `this` referred to the global object. Personally, I'd favour UglifyJS for production-quality software

* When manually reducing code size, **Git is your friend**. Everytime a change results in a successful reduction, commit it! If you then attempt another change that increases the size, then you can easily use `git reset` to undo it. You should also commit when the code actually works, as I found that manual replacement is error prone

* There's always an optimisation you can make, **even if it's totally wacky and unfounded**. Don't get me wrong, I favour pragmatism and empiricism, but duplication of speed computation over calling a dedicated function, for example, could use fewer bytes

* As a last resort, you may have to **compromise on functionality**. The game originally had logic to slightly randomise particle sizes and speeds, but this wasn't a core gameplay requirement. Be willing to drop anything that adds little to no value to your demo's experience

I'm now going to take a couple of months off from extra-curricular development before my brain sets on fire. Then I'm going to start working on developing games properly.