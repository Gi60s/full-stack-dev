---
title: HTML and CSS
toc: 1
---

# HTML

## An HTML Template

The below template was taken from https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Sections_and_Outlines_of_an_HTML5_document and modified.

- CSS is generally included in the head of the file.
- JavaScript is generally included at the end of the body.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Title</title>
    <link type="text/css" rel="stylesheet" href="css/main.css">
</head>
<body>

<section>
    <h1>Forest elephants</h1>
    <section>
        <h1>Introduction</h1>
        <p>In this section, we discuss the lesser known forest elephants.</p>
    </section>
    <section>
        <h1>Habitat</h1>
        <p>Forest elephants do not live in trees but among them.</p>
    </section>
    <aside>
        <p>advertising block</p>
    </aside>
</section>

<footer>
    <p>(c) 2010 The Example company</p>
</footer>

<script type="text/javascript" src="js/main.js"></script>

</body>
</html>
```

## Tags

- A tag is used to define an HTML element.
- A tag starts and ends with `<` and `>` respectively. For example, the paragraph tag: `<p>`.
- Many tags also expect a closing tag to match an opening tag, like the paragraph. Closing tags start with `<\` and end with `>`. For example: `<p>Content</p>`
- If a tag doesn't need a closing tag then you just put the opening tag. For example, the horizontal rule tag: `<hr>`.
- [HTML Element Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

## Attributes

- All tags have attributes that can be used to further define how the tag looks or what it should do.
- Attributes exist within the opening tag, for example the image tag takes a source to define what image to display: `<img src='image.png'>`
- Two attributes that all elements can have are `class` and `id`.

## ID Attribute

- The `id` attribute defines a unique ID for an element. This id should be unique for the entire page. Example usage: `<p id='Main'></p>`.
- This attribute is often used to find the element using JavaScript. It is also commonly used to link form inputs to form labels.
- CSS also uses the ID attribute to define styles.

## The DOM

- The DOM is the document object model.
- A web browser produces the DOM after reading your HTML.
- The DOM is a tree structure made up of nodes. The tree structure mimics your HTML.
- There are [12 node types](http://www.w3schools.com/jsref/prop_node_nodetype.asp).
- An element is one type of node (represented in text by an HTML tag).

<--

What is the relationship between HTML tags and the DOM?

--

HTML tags are text directions (essentially code) that gets interpreted by the browser and converted into DOM elements. Those DOM elements are what we see on the page, not the HTML.

-->

<--

What is the relationship between the attributes on an HTML tag and properties in a DOM object?

--

Once again, HTML tag attributes are text directions. The browser interprets the instructions and creates DOM objects (JavaScript objects) that have those attributes as properties.

-->

## Element Nodes

- Each element has it's own attributes and display properties.
- The following code shows the difference between two very similar elements, the `div` and `span`.

**Code**

```html
<div>A</div>
<div>B</div>
<div>C</div>

<span>A</span>
<span>B</span>
<span>C</span>
```

**Output**

<div>A</div>
<div>B</div>
<div>C</div>

<span>A</span>
<span>B</span>
<span>C</span>

<--

What difference can you see between the `div` and `span`?

--

- The `div` takes up the entire line while the `span` takes up just enough space for its content.
- The `div` is known as a [block-level](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements) element where the `span` is an [inline](https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements) element.

-->

Take a moment to look at:
- [block-level elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements)
- [inline elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements)
- Also look at the list of inline and block elements on those pages.

<--

If a span only take up as much width as needed, then why is there space between each letter?

--

The spaces are actually between the span tags. With HTML only the first space is recognized while the rest are ignored until the next non-space.

-->

# HTML Forms

- A form is a common way to provide a user input interface.
- There are many elements that are used together to make up forms.
- Any form elements with a `name` attribute are distinguished by that name.
- [Forms Reference](http://www.w3schools.com/html/html_forms.asp)

**Code**

```html
<form>
    <p>
        <label for='color'>Favorite Color:</label>
        <input id='color'>
    </p>

    <p>
        <label for='food'>Favorite Food:</label>
        <select id="food" name="food">
          <option value="fruit">Fruit</option>
          <option value="ice cream">Ice Cream</option>
          <option value="pizza">Pizza</option>
          <option value="vegetables">Vegetables</option>
        </select>
    </p>

    <p>
        <label>Gender</label>
        <label><input type="radio" name="gender" value="male"> Male</label>
        <label><input type="radio" name="gender" value="female"> Female</label>
    </p>

    <p>
        <button type="button" onclick="alert('Hello')">Hello Button</button>
    </p>
</form>
```

**Output**

<form>
    <p>
        <label for='color'>Favorite Color:</label>
        <input id='color'>
    </p>
    <p>
        <label for='food'>Favorite Food:</label>
        <select id="food" name="food">
          <option value="fruit">Fruit</option>
          <option value="ice cream">Ice Cream</option>
          <option value="pizza">Pizza</option>
          <option value="vegetables">Vegetables</option>
        </select>
    </p>
    <p>
        <label>Gender</label>
        <label><input type="radio" name="gender" value="male"> Male</label>
        <label><input type="radio" name="gender" value="female"> Female</label>
    </p>
    <p>
        <button type="button" onclick="alert('Hello')">Hello Button</button>
    </p>
</form>

# Developer Tools

- The latest browsers (IE, Edge, Firefox, Chrome, Safari) all have developer tools.
- You can look at how a webpage works using these tools.
- The tools are usually accessed through the browser menu.

## Try it Out

1. Open a browser to http://www.byu.edu
2. Open the developer tools.
3. Click on the Elements tab (or equivalent).
4. Click on elements in the developer console.
5. Use the element selector to select an element on the page.
6. Explore the properties of the element.

# DOM Navigation and Manipulation

The content of a DOM can be modified via the browser DOM API.

## Selectors

- Used to select the elements of interest.
- Can use `document.querySelector` or `document.querySelectorAll` to get an array-like object.
- Select by tag, class, id, pseudo, etc.

## Navigation

Each DOM Node has properties that can be used to navigate the DOM. Here are some element properties:

- *children* - Get child elements.
- *nextElementSibling* - Get next sibling element.
- *previousElementSibling* - Get previous sibling element.
- *parent* - Get the element that is parent of this element.

Here are some Node properties:

- *childNodes* - Get all child nodes.
- *nextSibling* - Get next sibling node.
- *previousSibling* - Get previous sibling node.

## Manipulation

- *createElement*
- *getAttribute*, *setAttribute*, *removeAttribute*
- *appendChild*, *insertBefore*

## API Documentation

- [Node API](https://developer.mozilla.org/en-US/docs/Web/API/Node)
- [Element API](https://developer.mozilla.org/en-US/docs/Web/API/Element)

## DOM Manipulation Exercises

1. Create a `div` on a page and set the attribute `id="time"`.

2. Load the page in a browser, open the developer tools, and through the element explorer update the content of the div to look like the current time.

3. Use the JavaScript console to auto update that div with the current time every second.

    ```js
    const timeEl = document.getElementById('time')
    setInterval(() => {
      timeEl.innerHTML = new Date().toTimeString().substr(0,8)
    }, 100)
    ```

4. Within the JavaScript console, add an `h1` element to the body.

# CSS

<--

What is CSS used for?

--

It is the style portion of your web application. It controls the look.

-->

**Regular Button vs Styled Button**

<button>My Button</button>
<button style="border: 1px solid #09D; background-color: #0BF; border-radius: 4px; padding: 5px 10px; color: #FFF; font-weight: bold">My Button</button>

These styles were applied to second button:

```css
border: 1px solid #09D;
background-color: #0BF;
border-radius: 4px;
padding: 5px 10px;
color: #FFF;
font-weight: bold;
```

<--

What does CSS stand for?

--

Cascading Style Sheets

-->

## Style Rules

There are a lot of CSS style rules to know, but you'll generally only use a small set of them.

[W3Schools CSS Tutorial](http://www.w3schools.com/css/)

## CSS Selectors

A selector tells the CSS *where* styles should be applied. There are three main types of selectors:

- **Tag** - A tag selector will match a given tag.
- **Class** - A class selector will match elements that have the same class name.
- **ID** - An ID selector will apply to the element with the specified ID.

## Tag Selector

All tags that match the selector will have the defined style applied. The following rule will make all `<p>` tags have bold red content.

**CSS**

```css
p {
    font-weight: bold;
    color: red;
}
```

**HTML**

```html
<p>Hello, World!</p>
```

## Class Selector

Class selectors start with a `.` (dot). For example:

**CSS**

```css
.my-class {
    border: 1px solid black;
}
```

**HTML**

```html
<p class="my-class">Hello, World!</p>
```

## ID Selector

ID selectors start with a `#`. For example:

**CSS**

```css
#my-id {
    text-align: center;
}
```

**HTML**

```html
<p id="my-id">Hello, World!</p>
```

## Compound Selectors

It is possible to join multiple selectors together to create more specific selectors.

This example shows how you can make all `<p>` tags with the `important` class have a specific style. In your html you'd write `<p class='important'> ... </p>` to have this style apply to it.

```css
p.important {
    font-weight: bold;
    color: red;
}
```

## Nested Selectors

You can also specify how something should look when it is a child or descendant of another selector.

- `div p { ... }` - This style rule would apply to all paragraph tags that are somewhere within a div tag.
- `div > p` { ... }` - This style would apply to all paragraph tags that are immediate children of a div tag.
- `#my-id > p > em { ... }` - This style applies to `em` tags that are immediate children of `p` tags that are immediate children of the element with attribute ID of `my-id`.

## Pseudo Selectors

Pseudo selectors are applied for certain states, such as checked, hover, focus, first-child, etc. [See a full list of pseudo selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes). A common use for this is to modify the way links work in different states.

```html
<style>
    a#styled {
        display: inline-block;
        color: #666;
        border: 1px solid #CCC;
        padding: 5px 10px;
        text-decoration: none;

        transition: background-color 500ms;
    }
    a#styled:hover {
        background-color: #e7a61a
    }

    a#styled:active {
        background-color: #e7d816;
    }
</style>

<a href="javascript: void 0">Example Link</a>
<a id="styled" href="javascript: void 0">Example Link</a>
```

<style>
    a#styled {
        display: inline-block;
        color: #666;
        border: 1px solid #CCC;
        padding: 5px 10px;
        text-decoration: none;

        transition: background-color 500ms;
    }
    a#styled:hover {
        background-color: #e7a61a
    }

    a#styled:active {
        background-color: #e7d816;
    }
</style>

<a href="javascript: void 0">Example Link</a>
<a id="styled" href="javascript: void 0">Example Link</a>

## Multiple Selectors

You can combine selectors so that more than one selector uses a specific style by separating selectors by commas.

```css
div > p,
ul > li {
    font-weight: bold;
}
```

## Additional Selectors

[Awesome Selectors Tutorial](https://code.tutsplus.com/tutorials/the-30-css-selectors-you-must-memorize--net-16048)

## Selector Conflicts

Sometimes two selectors will try to apply competing styles to an element.

Rule of thumb: **The more specific selector has precedence or, all things being equal the last selector has precedence.**

<--

What is more specific, an ID or a tag? Why?

--

An ID. Each ID should be unique, but the same tag can be used many times. For example, the `<p>` tag is used to generate many paragraphs.

-->

<--

What is more specific, a tag or a class?

--

According to CSS rules, a class is slightly more specific than a tag.

-->

<--

Looking at the following code example, what will the `<p>` look like?

CSS

```css
#main {
    border-color: blue;
}
p {
    border: 1px solid red;
}
p {
    border-bottom-width: 2px;
}
```

HTML

```html
<p id='main'>Hello, World!</p>
```

--

<p style='border: 1px solid blue; border-bottom-width: 2px;'>Hello, World!</p>

-->

# Adding CSS to your HTML

There are three ways to add CSS to your HTML:

## Including an External Style Sheet

- Generally preferred.
- Can improve performance for subsequent loads.
- Better code reuse.
- Non-blocking, the page continues to load while the CSS is being fetched.
- Use the `<link>` element, generally in the `<head>` of your document.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="my-styles.css">
</head>
<body>
    <p>Hello, World!</p>
</body>
</html>
```

## Inline Styles

- Loads with the page; no style flicker.
- Can cause the page to load slower.
- Poor code reuse.
- Use the `<style>` element, generally in the `<head>` of your document.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Title</title>
    <style type="text/css">
        body {
              font-family: Arial, Helvetica, sans-serif;
        }
    </style>
</head>
<body>
    <p>Hello, World!</p>
</body>
</html>
```

## Styles on Element

- High priority, overwrites other rules (except with `!important`).
- Loads with the page; no style flicker.
- Can cause the page to load slower.
- Poor code reuse.
- Hard to update code.
- Should be avoided in most cases.
- Use the `style` attribute on an element. Separate style rules using the semi-colon.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Title</title>
</head>
<body style="font-family: Arial, Helvetica, sans-serif;">
    <p>Hello, World!</p>
</body>
</html>
```

# CSS Media Queries

Media queries allow you to specify what styles are defined under different conditions:

- *Width* - Useful for responsive design.
- *Screen* and *Print* - Simplify for print.

[Media Queries Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)

## Responsive Design

The layout of the page changes to fit the device width. Great for large screens and small screens.

Common breakpoints:

```css
/* Smartphones */
@media screen and (max-width : 767px) {

}

/* Tablets */
@media screen and (min-width : 768px) and (max-width : 991px) {

}

/* Desktop */
@media screen and (min-width : 991px) and (max-width : 1199px) {

}

/* Wide Screen Desktop */
@media screen and (min-width : 1200px) {

}
```

## Developer Tools

You can use the browser's developer tools to interact with elements, explore their styles, and even manipulate their styles while looking at the web page.

1. Open your browser's developer tools.

2. In the developer tools, select the element you'd like to look at or manipulate.

3. Under the elements tab you'll see styles. This allows you to see an modify current styles.

4. You will also see a computed tab that allows you to see the computed styles. This is the final set of styles after all style rules have been applied. 

# CSS Layouts

## Flexbox

- Advanced CSS layouts
- No need for tables to do layout

**Resources:**

- [Using Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)
- [Quick Reference](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Holy Grail Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes#Holy_Grail_Layout_example)
- [Flexbox Froggy](http://flexboxfroggy.com/)

## CSS Grid

- Really Advanced CSS layouts
- More control than Flexbox even

**Resources**

- [Using CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [CSS Grid Garden](http://cssgridgarden.com/)

# CSS Transitions and Animations

Perform transition between styles:

- Opacity
- Size
- Color

Animations perform multiple transitions with specialized timing:

**Demos:**

- [Gooey Menu](http://codepen.io/lbebber/pen/LELBEo)
- [3D Boxes](http://codepen.io/joshnh/full/paxbE)
- [Animated Buttons](https://tympanus.net/Tutorials/AnimatedButtons/index6.html)

**Resources:**

- [Transitions Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions)
- [Animations Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [CSS Animation Library](https://daneden.github.io/animate.css/)

## Exercise

Create a simple `div` that changes it's transitions background color as its CSS class name changes. Use JavaScript to change the class name.

# CSS Tricks and Techniques

## Center a DIV Horizontally

Example URL: http://home.byu.edu/home/

- Set the width to a specific value
- Set the left and right margin's to `auto`.

**CSS**

```CSS
.container {
    width: 1024px;
    max-width: 100%;
    margin: 0 auto;
}
```

**HTML**

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="my-style.css">
</head>
<body>
    <div class='container'>
        <!-- put content here -->
    </div>
</body>
</html>
```

## Absolute Relative Position

You have an element on your page and you want to position another element into an exact location that is relative to the parent element.

- The parent element should be positioned as `relative`, `absolute`, `fixed`, or `sticky`.
- A descendant element should be positioned as `absolute` with one or more of `top`, `bottom`, `left`, `right`

**CSS**

```CSS
.container {
    width: 1024px;
    max-width: 100%;
    margin: 0 auto;
    position: relative;
}
#back-to-top {
    position: absolute;
    right: 0;
    bottom: 0;
}
```

**HTML**

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="my-style.css">
</head>
<body>
    <div class='container'>
        <a href='#top' id='back-to-top'>Back to Top</a>
        <!-- put content here -->
    </div>
</body>
</html>
```

