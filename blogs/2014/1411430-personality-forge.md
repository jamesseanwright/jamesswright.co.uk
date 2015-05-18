### [Personality Forge.NET 1.0.1 released!](/blog/1411430-personality-forge)

<time datetime="2014-09-23">23rd September 2014</time>

For those of you who are aware of my [Personality Forge.NET](https://github.com/jamesseanwright/personality-forge-.net) library, I released version 1.0.1 yesterday. You can get it by either following the previous link or installing it from [NuGet](https://www.nuget.org/packages/JamesWright.PersonalityForge/).

So what’s changed?

Apart from refactoring and the addition of unit tests, not much. The only major client-facing change concerns error handling. Previously, the `PersonalityForge` class exposed an `ErrorService` property, which in turn had a `CustomHandler` property:

```
IPersonalityForge forge = new PersonalityForge();
forge.ErrorService.CustomHandler += (ex, message, fatal) =>
        {
            //do stuff
        };
        
Response response = forge.Send(username, message);
```

Not only was this approach verbose, but just unnecessary. The only place a user would typically handle any exceptions raised by the library is upon calling the `PersonalityForge.Send` method. Also, determining if the exception was fatal made no sense, as this could differ with regard to the developer’s context. Therefore, I have replaced this by throwing a custom `PersonalityForgeException`, which can be handled like this:

```
try
{
    Response response = forge.Send(username, message);
}
catch (PersonalityForgeException e)
{
    Console.WriteLine(e.Message);
}
```

Personally, I feel that this is a much cleaner, familiar approach to error handling.