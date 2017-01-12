# Notes related to what I learned while completing Learn to Code HTML & CSS

## Lesson 1: Building Your First Web Page

HTML:

- Common HTML Terms
- Document Structure
- Referencing CSS

CSS:

- Common CSS Terms
- Working with Selectors
- Using CSS Resets

#### What Are HTML & CSS?

HTML: Hyper Text Markup Language - gives content structure and meaning.

CSS: Cascading Style Sheets - a presentation langauge. Styles the appearance of content.

Each langauge are separate and should be in separate documents.

#### Understanding Common HTML Terms

##### Elements

Designators that define the structure and content of objects within a page.

The most common are: headings, paragraphs, links, divs/spans, bold/italics.

Elements are identified by surrounding them using `<` `>`.

##### Tags

The use of `<` and `>` are _tags_.

An opening tag marks the beginning of an element and uses the `<`.

The closing tag sees the end of an element and begins with a `/` followed by the element name.

E.g.

```html

<a>...</a>

```

##### Attributes

Attributes are just properties used to provide more info about an element. The most common are `id`, `class`, `href` and `src`.

Attributes are defined in the opening tag, after an elements name. They generally include a name and value:

```html

<a href="http://shayhowe.com/">Shay Howe</a>

```

Element: `a`
Attibute: `href:"http://shayhowe.com/"`
Tag: `</a>`

#### Setting Up the HTML Document Structure

HTML documents are plain text documents with an `.html` file extension. All HTML documents have a required structure including the following declarations and elements: `<!DOCTYPE html>`, `<html>`, `<head>`, and `<body>`.

The document type declaration `<!DOCTYPE html>` informs the web browsers which version of HTML is being used. It's placed at the very beginning.

The `<html>` signify the start of the document.

Inside that, the `<head>` element identifies the top of the document, including any metadata. The content inside this element is not displayed on the web page itself.

All visible content is instead in the `<body>` element.

```html

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Hello World</title>
    </head>
    <body>
        <h1>Hello World</h1>
        <p>This is a web page.</p>
    </body>
</html>

```

Some elements are self-closing:

- `<br>`
- `<embed>`
- `<hr>`
- `<img>`
- `<input>`
- `<link>`
- `<meta>`
- `<param>`
- `<source>`
- `<wbr>`

No matter how careful we are, we may make mistakes. W3C have built in validators for [HTML](http://validator.w3.org/) and [CSS](http://jigsaw.w3.org/css-validator/) that will scan for mistakes.

#### Understanding Common CSS Terms

There are three terms we need to learn: selectors, properties, and values.

##### Selectors

A selector designates exactly which element(s) within our HTML to target and apply styles to.

Generally target an attribute value, such as an `id` or `class` value, or target the type of element such as `<h1>` or `<p>`.

This is the syntax:

```css

p { ... }

```

##### Properties

Once an element is selected, a property determins the style to be applied.

Common ones include: `background-color`, `font-size`, `height`, and `width`.

```css

p {
    color: ...;
    font-size: ...;
}

```

##### Values

Values set the property:

```css

p {
    color: orange;
    font-size: 16px;
}

```

#### Working with Selectors

There are many different selectors and here we focus on the most commong: _type_, _class_, and _ID_ selectors.

##### Type Selectors

These are the simplest and target elements by their element type:

```css

div { ... }

```

##### Class Selectors

For this, we must give our elements an attribute of `class`. We then style on the value of an elements `class` attribute.

They allow us to apply the same styles to different elements at once by using the same `class` attribute value across multiple elements.

###### CSS

```css

.awesome { ... }

```

###### HTML

```html

<div class="awesome">...</div>
<p class="awesome">...</p>

```

##### ID Selectors

These are even more precise and act like class sectors but use `id` attribute values instead.

You can only use one `id` per page.

###### CSS

```css

#leonmorris { ... }

```

###### HTML

```html

<div id="leonmorris">...</div>

```

##### Additional Selectors

Selectors are powerful and there are many more available [here](http://learn.shayhowe.com/advanced-html-css/complex-selectors/).

#### Referencing CSS

It is bets practice to have all of our CSS in a separate stylesheet. To actually use our CSS, we need to link the two files.

We link the two by using the following code in our html `head`.

```html

<head>
    <link rel="stylesheet" href="main.css">
</head>

```

NB: In order for the two files to correlate, the `href` needs to align with the file name of the stylesheet.

#### Using CSS Resets

Every web browser has its own defaut styles for different elements, and so it's important to 'reset' the styles for cross-browser compatibility.

The two most common are:

1. [Eric Meyer's reset](http://meyerweb.com/eric/tools/css/reset/)
2. [Normalize.css](http://necolas.github.io/normalize.css/)

#### Summary

To recap, so far we’ve covered the following:

- The difference between HTML and CSS
- Getting acquainted with HTML elements, tags, and attributes
- Setting up the structure of your first web page
- Getting acquainted with CSS selectors, properties, and values
- Working with CSS selectors
- Referencing CSS in your HTML
- The value of CSS resets