## Leap Motion - Why is Leap.LeapPINVOKE throwing an exception when the DLLs are present?

<time datetime="2014-09-25">25th September 2014</time>

I was contacted the other week by a reader who had followed my Leap Motion tutorial, only to find that their code threw an exception when the SDK called Leap.LeapPINVOKE. Normally, this would suggest that the Leap.dll and LeapCSharp.dll files are not present within the project's bin folder.

To my surprise, after following the steps I’d provided, I was faced with the same error. I loaded up my original project with an older version of the SDK, and this worked perfectly. Then it hit me; was my Leap Motion’s software out of date?

There was an update available (Leap Motion Control Panel -> General -> Install Update). I installed it, and naturally, everything started working!

EDIT: I’ve just followed my tutorial to double-check my findings, and there seems to be one additional step as of SDK version 1.2; I had to manually target my processor’s architecture. To do this for x64, once I’d included the correct Leap.dll and LeapCSharp.dll libraries in my project, I:

1. Right-clicked my solution in Solution Explorer and clicked Properties
2. Selected Configuration Properties on the left
3. Clicked Configuration Manager
4. In the resultant dialogue, under the Platform header for the project context, I clicked &ltNew…&gt
5. Chose x64 from the first dropdown, and copied the settings from Any CPU
6.Clicked OK, Close, and OK
7. Rebuilt and ran my project

Consequently, the program ran with no issues. Hope this helps!