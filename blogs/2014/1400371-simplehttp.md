## SimpleHttp - a basic HTTP server framework written in C#

<time datetime="2014-05-18">18th May 2014</time>

I got bored last night so I started playing around with `HttpListener` and other relevant classes in the `System.Net` namespace, and I decided to write respective wrapper classes. The result: [SimpleHttp](https://github.com/jamesseanwright/simple-http).

For now I’ve included the [release binary](https://github.com/jamesseanwright/simple-http/tree/develop/JamesWright.SimpleHttp/bin/Release) in the GitHub repository, but as the framework matures and becomes more stable, I’ll release it as a NuGet package.

Here’s the most simple usage of the framework:

```
using JamesWright.SimpleHttp;

namespace JamesWright.SimpleHttp.Example
{
    class Program
    {
        static void Main(string[] args)
        {
            App app = new App();

            app.Get("/", (req, res) =>
            {
                res.Content = "{ \"message\": \"Hello\" }";
                res.ContentType = "application/json";
                res.Send();
            });

            app.Get("/version", (req, res) =>
            {
                res.Content = "{ \"version\": \"0.1\" }";
                res.ContentType = "application/json";
                res.Send();
            });

            app.Start();
        }
    }
}
```

The `App` class bootstraps an internal Server class:
```
class Server
{
    private Listener listener;
    //contains four Dictionaries for GET, POST, PUT, and DELETE
    public RouteRepository RouteRepository { get; private set; }

    public Server(Listener listener, RouteRepository routeRepository)
    {
        this.listener = listener;
        RouteRepository = routeRepository;
    }

    public void Start(string port)
    {
        Console.Write("SimpleHttp server 0.2\n\n");
        Console.WriteLine("Initialising server on port {0}...", port);
        this.listener.Start(port, RouteRepository);
    }
}
```

Here’s the `Listener` class, used internally by `Server` to handle incoming requests:
```
class Listener
{
    private HttpListener httpListener;
    private HttpListenerContext context;

    public Listener()
    {
        this.httpListener = new HttpListener();
    }

    public void Start(string port, RouteRepository routeRepository)
    {
        this.httpListener.Prefixes.Add(string.Format("http://localhost:{0}/", port));
        this.httpListener.Start();

        Console.WriteLine("Listening for requests on port {0}.", port);

        Request request;

        while (TryGetNextRequest(out request))
        {
            Console.WriteLine("{0}: {1}", DateTime.Now, request.Endpoint);

            if (!TryRespond(request, routeRepository))
                Console.WriteLine("No handler specified for endpoint {0}.", request.Endpoint);
        }
    }

    private bool TryRespond(Request request, RouteRepository routeRepository)
    {
        if (!routeRepository.Get.ContainsKey(request.Endpoint))
            return false;

        routeRepository.Get[request.Endpoint](request, new Response(context.Response));
        return true;
    }

    private bool TryGetNextRequest(out Request request)
    {
        try
        {
            this.context = this.httpListener.GetContext();
            HttpListenerRequest httpRequest = this.context.Request;
            request = new Request(httpRequest);
            return true;
        }
        catch (Exception)
        {
            //TODO: output/log exception
            request = null;
            return false;
        }
    }
}
```

The `Request` and `Response` classes are simple wrappers around `HttpListenerRequest` and `HttpListenerResponse`. `Listener` retrieves the next request from the `HttpListener`’s `GetContext()` method, using the `Routes` `Dictionary` to find the appropriate handler and pass the original request, and a new `Response` instance, to the developer.

I look forward to improving it and ultimately make it as scalable as possible. I’ll post an update soon!