# Chapter 11: Looking Ahead {#Chapter-11}

Throughout this book, we covered several powerful U&I strategies. Are there other strategies not covered in this book? What does the current landscape look like?

There are many, many more! 



## Explorations

We've covered many different strategies throughout this book, but the ecosystem for building scalable UI is new and continues to evolve quickly. Here are a few technologies to explore:



### CSS Next

[CSS Next](http://cssnext.io/) allows for you to write "tomorrow's CSS syntax, today." CSS Next offers many of the same features  of a traditional CSS preprocessors, along with a few additional powerful capabilities. For example, variables, in CSS Next, can be changed via JavaScript? ***WHAAaaaAATT?*** That's right! We can change our CSS variables in JavaScript. This [example](https://codepen.io/wesbos/pen/adQjoY), by [Wes Bos](https://twitter.com/wesbos), does a great job showcasing this feature.

This is an exciting feature, because we can share constants between JavaScript and CSS. I look forward to CSS Next becoming widely supported so that I can deprecate `theme-wrap` :)



### CSS in JS

Writing your CSS in JavaScript seems to be the most promising strategy and it continues to be one of the quickest evolving amongst styling strategies. Instead of outlining all the various CSS in JS implementations, I recommend investigating them in this informative [repo](https://github.com/MicheleBertoli/css-in-js).



### Hardware Accelerated UI

Lastly, we don't necessarily need to tie all of our components to DOM. We could leverage `canvas` and, better yet, leverage the GPU with WebGL. If you're looking to build a highly interactive and immersive interface, you may want to look at these libraries: [A-Frame](https://aframe.io/), [React Three Renderer](https://github.com/toxicFork/react-three-renderer), etc.




## Conclusion

Thank you for taking the time to go through this book. I hope that it has been both informative and useful for the next time that you decide to build an application. Lastly, we've covered many strategies in this book, but haven't had the chance to step back and determine their practical applications. As a rule of thumb, when I approach UI projects, I ask the following set of questions:

- Are the other front end developers on the team mostly comfortable with CSS or a CSS preprocessor?
- How large is the web application?
- Is SEO important? If so, does squeezing every bit of improvement necessary?
- Does the application need to be highly interactive and customizable?
- Do we serve up different applications for different interfaces or are we relying on a single responsive application?

Whatever strategy you decide to use, whether it's Sass, BEM, CSS Modules, Inline Styles, CSS in JS, etc.,  there is no substitute for a well defined architecture.

If you have any questions or feedback, please refer to the [repository](https://github.com/FarhadG/ui-react) or contact me [directly](#Profile).

Thank you!