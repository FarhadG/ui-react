# Chapter 1: Introduction {#Chapter-1}

Although we are about to embark on a new journey together, this journey extends many years back. Let's take a quick moment and go over some history covering the evolution of UI development.



## A Brief History of Web Development

I remember the days when I started UI development by first designing interfaces in Photoshop and then "sliced" them using HTML, CSS and minimal JavaScript. The process of building a website would entail using HTML for markup, JavaScript for some very simple behavior and CSS for presentation. Even though we continue using the same technologies for delivering similar functionality, the methodologies have changed over time. Let's take a simple view of the various methodologies that have come to fruition through the lens of CSS.




### Inline Styles

You can use the style attribute in the relevant tag. The style attribute can contain any CSS property.

{title=index.html, lang=text}
```
<!DOCTYPE html>
<html>
  <body>	
    <div style="background-color: black">
      <p style="color: red; font-size: 18px;">
        Hello, World!
      </p>
    </div>
  </body>
</html>
```



### Internal CSS

Since inline styles mix content with presentation, many styles would be duplicated across elements. This is where CSS style sheets come to the rescue.

{title=index.html, lang=text}
```
<!DOCTYPE html>
<html>
  <head>
  
    <!-- internal CSS stylesheet -->
    <style type="text/css">
      div {
        background-color: black;
      }

      p {
        color: red;
        font-size: 18px;
      }
    </style>
    
  </head>
  
  <body>
    <div>
      <p>Hello, World!</p>
    </div>
  </body>
</html>
```



### External CSS

As websites grow in complexity and start to contain multiple pages, we can extract CSS styleheets into separate files. A common convention is to separate base or global styles that span across pages into one stylesheet from the individual page style sheets. This has the advantage of being able to keep our code "DRY" so that we can leverage the same styles across multiple pages and easily change the styles of similar elements across our entire website.

{title=styles.css, lang=text}
```
div {
  background-color: black;
}

p {
  color: red;
  font-size: 18px;
}
```

{title=index.html, lang=text}
```
<!DOCTYPE html>
<html>
  <head>
    <!-- references our styles file -->
    <link rel="stylesheet" type="text/css" href="./style.css">   
  </head>
 
  <body>
    <div>
      <p>Hello, World!</p>
    </div>
  </body>
</html>
```

{title=about.html, lang=text}
```
<!DOCTYPE html>
<html>
  <head>
    <!-- references our styles file -->
    <link rel="stylesheet" type="text/css" href="./style.css">   
  </head>
 
  <body>
    <div>
      <p>About the world.</p>
      <p>Some useful information about our amazing website.</p>
    </div>
  </body>
</html>
```



### CSS Classifiers

Extracting these styles works well, but we can't scale our application since all applied styles are global to all matching HTML elements. So, we use CSS classes and IDs to be able to target elements as needed.

{title=styles.css, lang=text}
```
.container {
  background-color: black;
}

.message {
  color: red;
  font-size: 18px;
}

.info {
  color: yellow;
  font-size: 13px; 
}
```

{title=index.html, lang=text}
```
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="./style.css">   
  </head>
 
  <body>
    <div class="container">
      <p class="message">Hello, World!</p>
    </div>
  </body>
</html>
```

{title=about.html, lang=text}
```
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="./style.css">   
  </head>
 
  <body>
    <div class="container">
      <p class="message">About the world.</p>
      <p class="info">Some useful information about our amazing website.</p>
    </div>
  </body>
</html>
```

Surprisingly enough, applying and organizing our JavaScript went through a very similar history. As you may have guessed, we:

1. inlined them
2. extracted them to the top of our document using an internal `<script>` tag
3. organized them into their own separate `.js` files, and, ultimately
4. referenced individual elements by their classifiers.



### A Necessary Change

The evolution of coding practices has been great and the abstractions made sense for their time, however, the major adoption of single page applications has started to shake our foundational ideas of UI development. Some of the pitfalls with our previous ideas include:

- **Everything is global.** Selectors are matched against everything in the DOM, so we require clever naming strategies that are hard to enforce and easy to break, to combat collisions.
- **The growing complexity is frightening.** It’s not unusual for developers to acknowledge that they are afraid to modify their own CSS and JavaScript. Given the frightening complexity of their code, they would rather add to the codebase, than risk breaking functionality by refactoring or deleting code.
- **Managing state and user interactions across UI elements is a mess.** Although we have simple JS libraries to help us manage and connect different interface components, interactions between components often make for a messy codebase.

Single page applications have demanded our attention for rethinking new paradigms for writing encapsulated and modular components. That is, discrete, functional and encapsulated UI elements. Those of us who treated CSS and JavaScript as first class citizens are starting to realize the power of UI components as the building blocks of our applications. We now aim at modular components that can be shared across platforms and applications, given the right sorts of constraints and environments.



## The Rise of Components

React was one of the first UI libraries that got me thinking about component-based architecture. Component-based design is powerful for both designers and developers. It helps designers in building beautiful modular UI elements that can be designed, tested and reviewed in isolation and helps developers in thinking about the single most important function of each interface element.

React not only promotes many great patterns but it also pushes frontend developers to think about UI in a modular and scalable manner. As we'll come to see in later chapters, React lends itself well to modular components. That said, styling has been and continues to be a major issue when building these modular components. **We will cover many best practices for building components by covering various effective strategies.**

I> Many of the concepts in this book are covered through the lens of styles, but they are inherently tied to component-based architecture. That is, we plan, organize and build our markup, behavior and styles in alignment with the component spec.



## Summary

In this chapter, we covered a quick history of UI development and set the stage for what's to come with a brief introduction to the concepts of modular components.

Prepare yourself for an exciting journey! We're about to enter U&I components and the blueprints for building them in the following chapter.