# Running ASP.NET vNext on Ubuntu

<time datetime="2015-01-06">6th January 2015</time>

<img src="https://pbs.twimg.com/media/B6hJzO2IQAEiZ7D.png:large" alt="ASP.NET vNext on Ubuntu" class="blog-post__image--primary" />

I love C# and .NET; they both make the perfect combination of a fantastic language with a well-structured, fully-featured framework. I also love Ubuntu; it’s a great operating system that is very usable and provides the flexibility and openness of a typical Linux distribution.

If you’ve been following Microsoft’s recent transformation into a cross-platform, open source powerhouse, you may have heard that .NET has a multi-platform compiler and has a [new home on GitHub](https://github.com/Microsoft/dotnet). The upcoming version of ASP.NET, [vNext](https://github.com/aspnet/Home), follows suite, and it’s awesome; it combines the best bits of MVC and Web API, and utilises the new [Roslyn](https://roslyn.codeplex.com/) compiler. Not running your site on Windows? Microsoft has written an open source server based upon [libuv](https://github.com/libuv/libuv) (which is pretty much the foundation of Node.js) called [Kestrel](https://github.com/aspnet/KestrelHttpServer).

Being a new technology, it wasn’t completely straightforward to set up, but with some help from the open source community I got it running on Ubuntu 14.04 LTS.

I followed the Linux installation steps found in the [README](https://github.com/aspnet/Home/blob/master/README.md), cloned the Home repository, and attempted to run the [HelloMvc](https://github.com/aspnet/Home/tree/master/samples/HelloMvc) sample from the command line. Unfortunately, I was greeted with a NullReferenceException.

As it turns out, I hadn’t installed the aforementioned libuv dependency. I tried the libuv-dev package available through the Advanced Packaging Tool to no avail, so I built it myself using [Automake](https://www.gnu.org/software/automake/):

```
sudo apt-get install libtool
sudo apt-get install automake
git clone git@github.com:libuv/libuv.git
cd libuv
git clone https://chromium.googlesource.com/external/gyp.git build/gyp
sh autogen.sh
./configure
make
make check
make install
```

I tried running the sample project for the exception to be thrown once again. Turns out I had to clear Ubuntu’s shared library cache:

```
ldconfig
```

Success! The sample project can now run!

```
james@james-ubuntu:~/dev/dotnet/vNext/samples/HelloMvc$ k kestrel
Started
```

OK, so that’s not the most informative output I’ve seen, but it’s brilliant to see a great framework reach the next level through the open source community. Many suggestions have been made and issues have been raised via the various GitHub repositories, and the team at Microsoft has responded promptly and receptively. Realistically, most open source developers may stick to frameworks such as Spring and Node.js, but this gives this demographic an alternative that uses one of my favourite programming languages. It also provides .NET and C# developers with the opportunity to add another cross-platform technology to their respective rosters.