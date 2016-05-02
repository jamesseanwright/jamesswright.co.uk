## Developing UWP Apps for Xbox One

<time datetime="2016-05-02">2nd May 2016</time>

Since moving from full-time C# development to JavaScript about 2 years ago, I've since designated C# my go-to language for backend programming, not only due to its strong multi-threading capabilities but additionally because of Microsoft's amazing commitment to native cross-platform support and the open source community; on that note, there are instances in which I'd consider C# for native frontend experiences, but I digress. My last XAML project had been an [MVVM/Rx Store app for the Kinect v2](https://github.com/jamesseanwright/kinect-mvvm).

When I was actively developing said app - around a year ago -, I'd heard rumours that Microsoft had plans not only to bring Universal Windows Platform (UWP) apps to Xbox One, but to permit developers to run any retail Xbox One as a dev kit. Given that: a) I have commercial experience with C# and XAML; b) I own an Xbox One, this news left me frothing at the mouth. Metaphorically speaking, of course. It was a long wait, but last month, Microsoft finally launched a preview of UWP for the console.

This resulted in a weekend project, called [_WorldView_](https://github.com/jamesseanwright/worldview). It's an app that displays random images from the [Unsplash](https://unsplash.com/) API, backed by random Kevin MacLeod music. MSDN's [setup documentation](https://msdn.microsoft.com/windows/uwp/xbox-apps/getting-started) is sufficient, so I won't be regurgitating that information here; instead, I impart some useful nuggets and gotchas:


### The Community Edition of Visual Studio Is Supported

One criticism of the MSDN docs is that they only mention compatibility with Visual Studio 2015 Update 2, potentially in a bid to increase license sales **cough**. Given that I don't have one, and I rarely use the IDE these days, I succeeded in targetting the Xbox One with the [free Community Edition](https://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx). Debugging and performance profiling are fully supported.


### Most Versions of Windows 10 Are Supported

I was admittedly lazy and didn't update to the latest Windows 10 Insider Preview, but installed the compulsary preview SDK; this sufficed, but Visual Studio's XAML editor will not work unless one also updates Windows. Personally, I'm comfortable enough with the language so this didn't bother me.


### One Can Deploy Apps via Wi-Fi

Microsoft recommends using a wired connection with both one's PC and the Xbox, due to the increased reliability and bandwidth. Given that my router is on another floor to me, I was stuck with Wi-Fi; it worked about 90% of the time, but I'd sometimes be greeted with this error:

<img class="blog-post__image--primary" src="http://i.imgur.com/1r8n7QA.png" alt="The network connection has been lost. Debugging will be abored." />

Redeployment didn't work in this case, so I usually resorted to restarting the console and Visual Studio.


### The IP Address in the Developer Home App Is Sometimes Wrong

This really caught me out initially. If the IP doesn't work, and both the PC and the Xbox are on the same network, one can try the address in the console's network settings.


### UWP Core API Support Is Good

To get running, I borrowed some of the boilerplate code from the aforementioned Kinect v2 project. At the heart of this is a [`DependencyInjector`](https://github.com/jamesseanwright/worldview/blob/master/WorldView/Framework/DependencyInjector.cs) singleton that I wrote that uses the `System.Reflection` namespace; this worked on the Xbox One without modification, although I could probably reduce the app's startup time by replacing this with some sort of factory. Other classes, such as `Windows.UI.Xaml.Controls.MediaElement` and `Windows.Web.Http.HttpClient`, are also supported out of the box.


### The Platform Is Identifiable at Runtime

Using the [`Windows.System.Profile.AnalyticsInfo`](https://msdn.microsoft.com/en-us/library/windows/apps/windows.system.profile.analyticsinfo) class, it's trivial to determine the platform on which your app is currently running:

```
bool isXbox = AnalyticsInfo.VersionInfo.DeviceFamily == "Windows.Xbox";
```

### There's a Title-Safe Area

This is a [common concept](https://en.wikipedia.org/wiki/Safe_area_(television)#Title-safe_area) when developing visual experiences for televsion sets. At the time of writing, the area is not offset; this crops the edges of your UI. To mitigate this, one can use the [`Windows.UI.ViewManagement.ApplicationView`](https://msdn.microsoft.com/library/windows/apps/hh701658) class; I placed this logic in my app's code-behind (`App.xaml.cs`):

```
EnforceSafeArea();

[...]

private void EnforceSafeArea()
{
	ApplicationView view = ApplicationView.GetForCurrentView();
	view.SetDesiredBoundsMode(ApplicationViewBoundsMode.UseCoreWindow);
}
```

Despite the SDK being in preview, it's robust and relatively straightforward to set up. I'm looking forward to writing and publishing more UWP apps, and I even plan to port some of my JavaScript games to the platform. Happy coding!