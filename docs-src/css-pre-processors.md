---
title: CSS Pre-Processors
toc: 1
---

# What is a CSS Pre-Processor

## The Browser and CSS

- Browsers use CSS to define styles.

- Browsers understand how to interpret CSS.

- CSS can be difficult to manage:

    - Nested selector mappings.
    
    - Repeated values.
    
    - Computed values.
    

## CSS Pre-Processors
    
A CSS preprocessor is a more complex language that can be converted into CSS using build tools.

It includes features like the following:

- Reusable variables.

- Built in functions.

- A better way to to nest selector mappings.

- Write and use custom functions.

- Import style data from other files.

## Common Pre-Processors

There are currently three very popular CSS preprocessors. They are all similar but slightly different.

- [LESS](http://lesscss.org/)
- [SASS](https://sass-lang.com/)
- [Stylus](http://stylus-lang.com)

# Vue CSS Pre-Processor Build Tools

For these exercises we'll be using Stylus within the Vue build tools. It is possible to user other CSS Pre-Processors.

- You can define a language and a scope.

- The language selected will need to have a transpiler configured for it.

- Creating a Vue application and selecting to use a specific pre-processor will automatically configure and install that pre-processor for your project.

**Example**

In your style section of your `*.vue` file you should use the `scoped` attribute to scope the CSS to this component.

You can optionally specify a `lang` attribute to specify a CSS preprocessor language.

```html
<style scoped lang="stylus">
  // import other stylus classes, variables, etc. into this file
  @require '../style/vars.styl'

  // set a variable
  alpha-20 = .2;

  // .my-component
  .my-component {
    color: color-dark;  // use a defined variable

    // .my-component a
    a: {
      text-decoration: none;
      color: color-accent;  // use a defined variable

      // .my-component a:hover
      &:hover {
        background-color: alpha(color-accent, alpha-20);   // use defined variables and a built in function
      } 
    }
  }
</style>
```

# Stylus Resources

[Stylus Homepage](https://stylus-lang.com/)

[Stylus Try-it Page](https://stylus-lang.com/try.html)



