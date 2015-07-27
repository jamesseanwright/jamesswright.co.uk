## C# - Deserialising JSON to objects using generics

<time datetime="2013-04-15">15th April 2013</time>

I have a soft spot for command line programs. I’m not sure if it’s because I find CLIs easier to manipulate or if they’re just nostalgic for me. I decided that I wanted to look into serialisation and deserialisation in C# because it’s a concept with which I’m not too familiar.

My command line program calls the main endpoint of an API I’m working on and deserialises the returned JSON to a C# object, the type being determined by the use of generics.

Here’s my main program class:

```
using System;
namespace StealthfeedCLI
{
    class MainClass
    {
        public static void Main (string[] args)
        {
            Console.Write(“Stealthfeed CLI\n————-\n”);
            Console.WriteLine(“Service status: {0}”, StealthfeedDataService.GetStatus());
        }
    }
}
```

It invokes a class method of `StealthfeedDataService`:

```
using System;
using System.Net;

namespace StealthfeedCLI
{
    public static class StealthfeedDataService
    {
        private static WebClient _client;
        private const string _apiRoot = “http://stealthfeed.eu01.aws.af.cm/”;

        static StealthfeedDataService()
        {
            _client = new WebClient();
        }

        public static string GetStatus()
        {
            StatusModel status = Serializer.GetObject<StatusModel>(_apiRoot);
            return status.Status;
        }
    }
}
```

Now you may be wondering why I wrote a static class with a method to deserialise my object. “Why couldn’t you have used `DataContractJsonSerializer` directly within the `GetStatus` method?”. I could have done, but I wanted to make a reusable class that could call an endpoint and return the data as any plain old CLR object. I suppose the disadvantage of this approach gives the method two responsibilities: calling the remote server and converting the data. I really should have written a separate method to get the data.

Here’s the `Serialiser` class:

```
using System;
using System.Text;
using System.IO;
using System.Runtime.Serialization.Json;
using System.Net;

namespace StealthfeedCLI
{
    public static class Serializer
    {
        private static WebClient _client;

        static Serializer()
        {
            _client = new WebClient();
        }

        public static T GetObject(string url)
        {
            byte[] data =_client.DownloadData(new Uri(url));
            MemoryStream stream = new MemoryStream(data);
            DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(T));
            T obj = (T)serializer.ReadObject(stream);
            stream.Close();

            return obj;
        }
    }
}
```

Using generics allowed me to specify the return type when invoking the method and cast to said type within the implementation. The type that I’m casting to is `StatusModel`, a class that I wrote using the `DataContract` and `DataMember` attributes from the `System.Runtime.Serialization` namespace. Here’s the class:

```
using System.Runtime.Serialization;

namespace StealthfeedCLI
{
    [DataContract]
    public class StatusModel
    {
        [DataMember(Name=“status”)]
        public string Status { get; set; }
    }
}
```

DataContract specifies that the DataContractJsonSerializer can map a JSON object to this class to create instances of it. DataMember is used to map a JSON key to an automatic property, populating it with the key’s value.

So what happens when I run the program? The endpoint that’s called returns the following JSON:

```
{
    "status": “Online”
}
```

Here's a screenshot of the running program:

![.NET CLI showing deserialised JSON](http://imagizer.imageshack.us/a/img913/3703/f9KRZk.png)