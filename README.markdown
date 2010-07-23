# css3 lightbox

## About
Why does the world need another lightbox?

* It doesn't take 100k of JS to show a div
* You shouldn't need 18 different images and 8 css files placed in a hardcoded 
directory just to get a rounded corner
* I know how to use click handlers. I don't need crazy tricks overriding href attributes

Here's my small-as-possible completely image-less solution. Complete with CSS 
based spinner. It only needs a single script tag. Compressed version weighs in 
at a mighty 2.8k. Don't have a browser that can support rounded corners? 
TOUGH. SUCK IT UP.

## Requirements
jQuery 1.4+ - I'm using the new jquery object creation syntax, so you have to 
upgrade from 1.3

## Demo
For usage examples, 
[check out a demo page here](http://zaius.github.com/css3-lightbox)

## Fallback
The lightbox uses css 3 declarations for the rounded corners and box shadows. 
This means you get a nice fallback on browsers that don't support it. In that
case, you will see:

* the spinner is made up of squares instead of circles
* the close box is a square instead of a circle
* there is no glow effect on the modal window
* the modal window isn't rounded

It surprisingly still looks acceptable

## Changes
I didn't implement too much more than the basics, because I have no idea if 
people actually want this. If you want specific changes add a bug or email me,
and I'll see what I can do.

Even better, patch the code and send me a pull request!

## Issues
* Haven't event tried to see if it works in IE6. It won't.
* Doesn't handle browser resizing.

## License
This code is licensed under the ISC license which lets you do pretty much
whatever you want with it. Please see LICENSE for the full text.

Copyright (c) 2010 David Kelso - david at kelso dot id dot au
