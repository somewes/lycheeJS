
# lycheeJS (v0.5)

lycheeJS is a JavaScript Game library that offers a
complete environment for prototyping and deployment
of HTML5 Canvas or WebGL based games inside the Web Browser.

Its architecture is **independent of the environment** which
means it will run on any JavaScript environment, such as
V8, Node, Spidermonkey etc. The only requirement for such a
platform is a lychee.Preloader. Take a look at the
[platform/v8gl folder](https://github.com/martensms/lycheeJS/tree/master/lychee/platform/v8gl)
to see how the resulting API looks like.


# lycheeJS-ADK (App Development Kit)

The [lycheeJS ADK](http://github.com/martensms/lycheeJS-adk)
is the underlying framework to deliver platforms natively.

The ADK allows you to cross-compile to different platforms
natively using a custom V8 based JIT runtime with OpenGL
bindings as the target environment. The equivalent environment
integration is the platform/v8gl inside the lycheeJS Game library.


# Limitations

At the time this was written (August 2012), iOS based platforms
are only deliverable natively using a WebView (WebKit) implementation,
because custom JIT runtimes are not allowed. Blame Apple for not
offering a high-performance alternative, not me.

Sound issues on iOS 5 and earlier versions are known due to Apple's
crappy implementation using iTunes in the background. These issues
are gone with iOS6+ due to the WebKitAudioContext (WebAudio API)
availability.


# Roadmap

**v0.6 (September 2012) lycheeJS-ADK**

- Completion of OpenGLSL bindings, Shader and Buffer data types
- OpenAL/OpenSL bindings
- cutting-edge freeglut integration
- Android NDK integration for V8GL and ADK shell script, using simple Java wrapper for V8GL process.


**v0.6 (September 2012) lycheeJS-ADK**

- Packaging: Debian/Ubuntu (DEB)
- Packaging: Windows Metro (via VisualStudio project)
- Packaging: Android (APK)
- Packaging: Mac OSX (APP)
- window Polyfill: orientationchange, resize, pageshow and pagehide

**v0.6 (October 2012) lycheeJS**

- v8gl: lychee.Track and lychee.Jukebox
- v8gl: Multi-Touch integration (lychee.Input)

**v0.7 (November 2012) lycheeJS-adk**

- Multi-Thread API, synchronized with freeglut's glut.timerFunc callstack.
- Nothing else planned (yet).

**v0.7 (November 2012) lycheeJS**

- Nothing planned (yet).


# License

The lycheeJS framework is licensed under MIT License.


# Features

I'm not a marketing guy, so I don't give a shit on
selling you stuff. it's open source, grab the demos
and grab the code, dude!


# Examples and Game Boilerplate

There is the [Game Boilerplate](http://martens.ms/lycheeJS/game/boilerplate)
and the [Jewelz Clone](http://martens.ms/lycheeJS/game/jewelz) that show you
how to develop a real cross-platform game and best practices in high-performance
JavaScript code.


Also, the [demo folder](http://martens.ms/lycheeJS/demo) shows most low-level API usages.


The mentioned example source codes are all available at the github repository:

[Link to game folder on github](https://github.com/martensms/lycheeJS/tree/master/game)


# Documentation

As this is not released officially yet, documentation is still to do.

