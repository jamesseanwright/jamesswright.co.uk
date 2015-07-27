## Getting started with Leap Motion in C#

<time datetime="2014-06-21">21st June 2014</time>

**Update**: You may need to resolve an exception thrown by [Leap.LeapPINVOKE](/blog/1411603-leap-motion-pinvoke).

One of my colleagues lent me his [Leap Motion](https://www.leapmotion.com/) this week, and I was pleased to learn that the sensor has a very good [SDK](https://developer.leapmotion.com/downloads), simplifying the tracking of a user’s hands, digits, and any objects that they are holding.

In this tutorial, I am going to show you how to develop a simple .NET command line program in C# that locates the nearest finger to your screen and outputs its vertical and horizontal position in both a decimal representation and pixels, as well as measuring the speed at which your fingertip is travelling. The code can be found over at [GitHub](https://github.com/jamesseanwright/leapmotion-console) (sans the Leap Motion libraries due to licensing).

Firstly, open Visual Studio and create a new project. From the installed Visual C# templates, choose *Console Application* and name the project *LeapMotionTest*.

Before exploring some of Leap Motion’s APIs, we’re going to create two classes - `Result` (a model object representing the data that we will output to the user) and `Reporter` (a class that prints the values stored in a Result instance). This is just to make our code better separated and ultimately maintainable.

Create the following `Result` class:

```
using System;

namespace LeapMotionTest
{
    public class Result
    {
        public int X { get; set; } // Fingertip X position in pixels
        public int Y { get; set; } // Fingertip Y position in pixels
        public float XIntersect { get; set; } // Decimal of the X position in relation to the screen (e.g. 0.7)
        public float YIntersect { get; set; } // Decimal of the Y position in relation to the screen
        public int ScreenWidth { get; set; } 
        public int ScreenHeight { get; set; }
        public float TipVelocity { get; set; } // Speed at which the fingertip is moving
    }
}
```

Next, create the `Reporter` class with a method to print results:

```
using System;

namespace LeapMotionTest
{
    public class Reporter
    {
        public void Print(Result result)
        {
            Console.WriteLine("Screen intersect x: {0}", result.XIntersect);
            Console.WriteLine("Screen intersect y: {0}", result.YIntersect);
            Console.WriteLine("\n");
            Console.WriteLine("X: {0}/{1}px", result.X, result.ScreenWidth);
            Console.WriteLine("Y: {0}/{1}px", result.Y, result.ScreenHeight);
            Console.WriteLine("\n");
            Console.WriteLine("Tip velocity: {0}", result.TipVelocity);
        }
    }
}
```

Now we will write the code for reading data from the Leap Motion. Head over to the [Leap Motion Developer](https://developer.leapmotion.com/) site and register, then download the Leap Motion [SDK](https://developer.leapmotion.com/downloads) for Windows. Once you have the files, you’ll need to add a reference to the correct .NET library (the project you created is most likely targeted at .NET 4/4.5/4.5.1 unless you’re using an older version of Windows):

![Adding a reference to the Leap Motion .NET library](http://imagizer.imageshack.us/a/img537/4570/nBeCRL.jpg)

![Visual Studio's reference manager](http://imageshack.com/a/img673/5930/zaudbC.jpg)

![Adding LeapCSharp.NET4.0.dll to the project](http://imagizer.imageshack.us/a/img661/4974/J31Com.jpg)

![Confirming the addition of the library](http://imageshack.com/a/img538/9726/mUVJvd.jpg)

The Leap Motion .NET bindings are dependent upon two other assemblies being present in the program’s build directory: *Leap.dll* and *LeapCSharp.dll*. These are not .NET binaries, so I had to import these files and update their build properties:

![Adding the SDK binaries as an existing item](https://imageshack.com/i/hlSNhVwNj)

![Confirming the selected items for addition to the project](http://imageshack.com/a/img538/8024/v5eeXu.jpg)

**Note**: you’ll most likely have spotted the x86 and x64 folders within the *lib* directory. If you are unsure of whether you are targeting a 32-bit or 64-bit machine, chose the DLL files from the x86 folder.

For each DLL file, update the properties so that its Build Action is *Content* and it is copied to the output directory if it has changed between builds:

![Updating the build action for the DLLs to "Content"](http://imageshack.com/a/img901/7812/VHqqez.jpg)

Now we are going to read some data from the device. Before we get stuck in, here are the SDK classes that we are going to use (found in the `Leap` namespace):

* `Controller` - represents the main interface to the device. Can be queried directly for data, or can pass data to associated `Listener` instances
* `Listener` - an inheritable class containing a set of `virtual` (overridable) methods, invoked when the device’s status changes
* `Frame` - a snapshot of data concerning the user’s interaction with the device at a given time
* `Finger` - represents a user’s finger
* `Vector` - details the position of a finger or object
* `Screen` - the screen through which the user is viewing the program

Create a new class called `ReportingListener`, inheriting from the `Listener` class:

```
using System;
using System.Linq;
using Leap;

namespace LeapMotionTest
{
    public class ReportingListener : Listener
    {
        private long currentTime,
                     previousTime,
                     timeChange;

        private Reporter reporter;

        public ReportingListener(Reporter reporter)
        {
            this.reporter = reporter;
        }

        public override void OnInit(Controller ctrl)
        {
            Console.WriteLine("Device initialised");
        }

        public override void OnConnect(Controller ctrl)
        {
            Console.WriteLine("Connected");
        }

        public override void OnDisconnect(Controller ctrl)
        {
            Console.WriteLine("Disconnected");
        }

        public override void OnExit(Controller ctrl)
        {
            Console.WriteLine("Exited");
        }

        public override void OnFrame(Controller ctrl)
        {
            
        }
    }
}
```

The `OnFrame` method is of most interest to us, as this will be invoked every time the device has received new tracking data. Add the following code to said method:

```
public override void OnFrame(Controller ctrl)
{
    //Get the current frame
    Frame currentFrame = ctrl.Frame();

    this.currentTime = currentFrame.Timestamp;
    this.timeChange = currentTime - previousTime;

    if (this.timeChange < 1000 || currentFrame.Hands.IsEmpty)
        return;
        
    //Get the first finger
    Finger finger = currentFrame.Fingers[0];

    //Get the closest screen that intercepts a ray projected from the finger
    Screen screen = ctrl.LocatedScreens.ClosestScreenHit(finger);

    //Get finger tip's velocity
    float tipVelocity = (int)finger.TipVelocity.Magnitude;

    /*only print info when velocity exceeds a certain threshold,
      so that the slightest movements won't continuously output
      data to the screen*/
    if (screen == null || !screen.IsValid || tipVelocity <= 25)
        return;

    Vector vector = screen.Intersect(finger, true);

    //x and y positions are sometimes returned as NaN (e.g. if hand is partly obscured by screen)
    if (float.IsNaN(vector.x) || float.IsNaN(vector.y))
        return;

    float xScreenIntersect = vector.x;
    float yScreenIntersect = vector.y;

    float x = xScreenIntersect * screen.WidthPixels;
    float y = screen.HeightPixels - (yScreenIntersect * screen.HeightPixels);

    Result result = new Result
    {
        X = (int)x,
        Y = (int)y,
        XIntersect = xScreenIntersect,
        YIntersect = yScreenIntersect,
        ScreenWidth = screen.WidthPixels,
        ScreenHeight = screen.HeightPixels,
        TipVelocity = tipVelocity
    };

    this.reporter.Print(result);
    previousTime = currentTime;
}
```

The comments and previous remarks should explain how the code and APIs are working, but here a few points of interest:

```
Frame currentFrame = ctrl.Frame();
```

This will get the frame associated with the controller at the time of invocation.

```
this.currentTime = currentFrame.Timestamp;
this.timeChange = currentTime - previousTime;

if (this.timeChange < 1000 || currentFrame.Hands.IsEmpty)
    return;
    
[...]
previousTime = currentTime;
```

By checking the time passed between receiving the previous frame and the next frame, we can control the frequency at which data is output to the console. In the case of our program, printing every frame of data is unnecessary.

```
if (screen == null || !screen.IsValid || tipVelocity <= 25)
    return;
```

Returning from `OnFrame` if the fingertip’s velocity falls below a certain threshold means that the slightest finger jitter won’t bombard the console with output. Try removing the check later and see what happens.

```
if (float.IsNaN(vector.x) || float.IsNaN(vector.y))
    return;
```

This condition is important as a `Vector`’s co-ordinates can sometimes return `NaN` (e.g. when one places one’s hand behind the screen).

Finally, modify your program’s `Main` method (usually located in Program.cs) to hook everything up!

```
using System;
using Leap;

namespace LeapMotionTest
{
    class Program
    {
        static void Main(string[] args)
        {
            ReportingListener listener = new ReportingListener(new Reporter());
            Controller controller = new Controller();
            controller.AddListener(listener);

            Console.WriteLine("Listening! Press any key when you're finished to exit.");
            Console.ReadKey();

            controller.RemoveListener(listener);
            controller.Dispose();
        }
    }
}
```

You should always remove any Listeners from the Controller and dispose of it when you no longer need it; this allows the garbage collector to free up memory for other objects to use. It is a very important step to take in more complex solutions (e.g. in WPF, where you may be navigating between instances of different pages) and is a best practice.

Hit Ctrl + F5 to run the program and wave one of your fingers in front of your monitor.

![The final program](http://imageshack.com/a/img540/374/RtiNmg.jpg)

I have also been exploring the LeapMotion SDK in WPF, drawing the position of each finger as an ellipse on screen. A tutorial on this will be coming soon.

Feel free to get in touch if you have any questions or issues :)