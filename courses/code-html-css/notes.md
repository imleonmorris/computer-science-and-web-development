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

## Lesson 2: Building Your First Web Page

#### Semantics Overview

The practice of giving content on the page meaning and structure by using the proper element. Semantic code describes the _value_ of content on a page (regardless of style or appearance).

Benefits include enabling computers, screen reader, search engines, etc to adequately read and understandt the content on a web page.

It's also easier to work with and manage.

#### Identifying divisions & Spans

`<div>`s and `<span>`s act as containers solely for styling purposes. As generic containers, they do not come with any overarching meaning or semantic value.

They are both extremely valuable when building a website as they allow us to apply targeted styles to a contained set of content.

A `<div>` is block-level (begin on a new line) and is commonly used to identifty large groupings of content.

A `<span>` is inline-level (does not begin on a new line) and is used to identify smaller groupings of text within a block-level element.

Both elements often make use of `id` and `class` attributes for styling purposes. However, the choice of value requires a bit of care. We need a value which adequately refers to the content of an element, not to the element itself.

#### Using Text-Based Elements

The most comomon elements for displaying text include headings, paragraphs, bold text and italics.

##### Headings

These are block-level and come in six different rankings: `<h1>` to `<h6>`. They break up content and establish hierarchy, also helping search engines to index and determine the content on a page.

```html

<h1>Heading Level 1</h1>
<h2>Heading Level 2</h2>
<h3>Heading Level 3</h3>
<h4>Heading Level 4</h4>
<h5>Heading Level 5</h5>
<h6>Heading Level 6</h6>

```

##### Paragraphs

Often suppoting headings. They are block-level defined by the following:

```html

<p>Steve Jobs was a co-founder and longtime chief executive officer at Apple. On June 12, 2005, Steve gave the commencement address at Stanford University.</p>

<p>In his address Steve urged graduates to follow their dreams and, despite any setbacks, to never give up&ndash;advice which he sincerely took to heart.</p>

```

##### Bold Text with Strong

To make text bold and place strong importance on it, use the `<strong>` inline-level element.

Actually, we could also use `<b>` but this is more to _stylistically offset text_. Not always the best choice.


```html

<!-- Strong importance -->
<p><strong>Caution:</strong> Falling rocks.</p>

<!-- Stylistically offset -->
<p>This recipe calls for <b>bacon</b> and <b>baconnaise</b>.</p>

```

##### Italicise Text with Emphasis

To italicise text we use the `<em>` inline-level element. As with bold elements, there is also `<i>`. The former semantically places _stressed emphasis_ on text (more popular), while the latter semantically conveys text in an _alternative voice or tone_.

```html

<!-- Stressed emphasis -->
<p>I <em>love</em> Chicago!</p>

<!-- Alternative voice or tone -->
<p>The name <i>Shay</i> means a gift.</p>

```

#### Building Structure

For a long time, the structure of a page was built using divisions. However, they provide no semantic value. HTML5 now provide structurally based elements: `<header>`, `<nav>`, `<article>`, `<section>`, `<aside>`, and `<footer>` elements. They are all block-level.

![structure](http://learn.shayhowe.com/assets/images/courses/html-css/getting-to-know-html/building-structure.png)

##### Header

Used to identify the top of a page, article, section, or other segment of a page.

``` html

<header>...</header>

```

##### Navigation

The `<nav>` element identifies a section of major navigational links on a page. This should be reserved for primary navigation sections only, such as global navigation, a table of content, previous/next links, or other noteworthy groups of navigational links.

```html

<nav>...</nav>

```

##### Article

Used to identify a section of independent, self-container content that may be independently distributed or reused. Often used to mark up blog posts, newspaper articles, user-submitted content, etc.

When deciding to use `<article>`, must determine if the content within the element could be replicated elsewhere without any confusion.

```html

<article>...</article>

```

### Section

Used to identify a thematic group of content, which generally, but not always, includes a heading. The grouping of content within `<section>` may be generic, but it's useful to identify all of the content as related.

```html

<section>...</section>

```

But when do you decide between `<article>`, `<section>` or `<div>`?

`<article>` and `<section>` contribute to a document's structure and help to outline a document. If the content is being grouped solely for styling purposes and doesn't provide valye to the outline of a document, use the `<div>` element.

If the content adds to the document outline and it can be independently redistributed or syndicated, use `<article>`.

If the content adds to the document outline and represents a thematic group of content, use `<section>`.

##### Aside

This holds content, such as sidebars, inserts, or brief explanation that is tangentially related to the content surrounding it.

E.g. When used within an `<article>`, `<aside>` may identify content related to the author of an article.

```html

<aside>...</aside>


```

##### Footer

Identifies the closing or end of a page, article, section, or other segment of a page. Generally the `<footer>` element is found at the bottom of its parent.

Content within the `<footer>` element should be relative information and should not diverge from the document or section it is included within.

```html

<footer>...</footer>


```

###### A note about special characters

There are numerous special characters and they begin with `&` and end with `;`. The characters unique coding falls between the two.

A long list can be found [here](http://copypastecharacter.com/).

#### Creating Hyperlinks

One of the core components of the internet is the hyperlink. They are established by using the anchor inline-level element. The `href` attribute is required.

```html

<a href="http://shayhowe.com">Shay</a>

```

Historically, anchor elements would not be allowed to wrap block-level elements but HTML5 breaks from convention and allows this.

##### Relative & Absolute Paths

The two most common links are:

1. links to other pages on the _same website_,
2. links to _other websites_.

The former will use a _relative path_. This takes the form of a file location (including any directories).

The latter will use an _absolute path_. The `href` would take the value of the full domain.

```html

<!-- Relative Path -->
<a href="about.html">About</a>

<!-- Absolute Path -->
<a href="http://www.google.com/">Google</a>

```

##### Linking to an Email Address

This is very useful. To create an email link, the `href` attribute value needs to start with `mailto:` followed by the email address.

This can be customised and additional information such as a subject or body text can be populated.

Subject lines require the `subject=` parameter after the email address, and the first parameter after the email address must begin with `?`. Multiple words within a subject line require `%20`.

Body text works the same but using `body=`. Because we are binding two parameter, use `&` to separate the two. Line breaks require `%0A`.

``` html

<a href="mailto:shay@awesome.com?subject=Reaching%20Out&body=How%20are%20you">Email Me</a>

```

##### Opening Links in a New Window

We can determine where a link opens when clicked. Using `targert="_black"` will open a new window.

##### Linking to Parts of the Same Page

We can set an on page link by setting an `id` attribute on the element we wish to link to, then using that value within an anchor's `href` attribute.

e.g.

```html

<body id="top">
  ...
  <a href="#top">Back to top</a>
  ...
</body>

```

#### Summary

Semantics, as discussed within this lesson, are essential for providing our HTML with structure and meaning. Moving forward we’ll periodically introduce new elements, all of which will come with their own semantic meaning. It is the meaning of all of these elements that will provide our content with the most value.

Once again, in this lesson we covered the following:

- What semantics are and why they are important
- `<div>`s and `<spans>`s, and the difference between block- and inline-level elements
- Which text-based elements best represent the content of a page
- The HTML5 structural elements and how to define the structure and organization of our content and page
- How to use hyperlinks to navigate between web pages or websites

## Lesson 3: Getting to Know CSS

Complex but powerful. Adds layout and design to pages.

#### The Cascade

Our styles cascade, with those towards to bottom of our stylesheet overwriting those towards the top.

```css

p {
  background: orange;
  font-size: 24px;
}

p {
  background: green;
}

```

The above would cause _all_ paragraphs to be green.

This also applies with properties inside individual selectors. For example:

```css

p {
  background: orange;
  background: green;
}

```

## Calculating Specificity

Every selector in CSS has a specificty weight. These identify how its styles will be rendered.

Order:

1. ID: `1-0-0`
2. Class: `0-1-0`
3. Type: `0-0-1`

The three columns go like this: ID-Class-Type.

## Combining Selectors

We can combine selectors to be more specific. They read from right to left, and the selector farthest to the right is known as the _key selector_.

###### HTML

```html

<div class="hotdog">
  <p>...</p>
  <p>...</p>
  <p class="mustard">...</p>
</div>

```

###### CSS

```css
.hotdog p {
  background: brown;
}
.hotdog p.mustard {
  background: yellow;
}

```

The above code `.hotdog p` combines a class and a type selector. The key is a type selector targeting paragraph elements. Because it is prequalified with the class selector `hotdog`, the full combined selector will only target paragraphs in an element with a class attribute value of `hotdog`.

##### Specificity with Combined Selectors

When selectors are combined, so are the weights of the individual selectors.

From the above code, the first selector has weight `0-1-1` and the second has `0-2-1`. As such, the second will take greater precedence.

In general, it's best to keep an eye on these weights. The higher our specificties rise, the greater chance of cascade breaks.

#### Layering Styles with Multiple Classes

We can keep our weights down by being as modular as possible by sharing styles from element to element. We can do this by layering on different styles by using multiple classes.

Let's take buttons:

###### HTML

``` html

<a class="btn btn-danger">...</a>
<a class="btn btn-success">...</a>

```

###### CSS

```css

.btn {
  font-size: 16px;
}
.btn-danger {
  background: red;
}
.btn-success {
  background: green;
}

```

Here you can see two anchor elements, both with multiple class attribute values. The first class, `btn`, is used to apply a font size of `16` pixels to each of the elements. Then, the first anchor element uses an additional class of `btn-danger` to apply a `red` background color while the second anchor element uses an additional class of `btn-success` to apply a `green` background color. Our styles here are clean and modular.

#### Common CSS Property Values

We're going to look specifically at colors and lengths here

##### Colors

There are several ways to represent sRGB colors:

1. keywords
2. hexadecimal notation
3. RGB values
4. HSL values

Keywords are just the words that describe a color. A full list can be found [here](http://www.w3.org/TR/css3-color/). While they are simple in nature, they are limited and thus are not a popular choice.

Hexadecimal colors consist of a hash (`#`) followed by 6 (or 3) characters. These figures use the numbers `0` through `9` and letters `a` through `f`. The first two figures map the red channel, the second green and the third blue.

When the numbers are the same in each channel, the numbers can be condenser into a three digit value. For instance `#ff6600` will become `#f60`.

The character pairs are obtained by converting `0` through `255` into a base-16 format. It helps to know that `0` equals black and `f` equals white.

```css

.task {
  background: #800000;          // also #800
}
.count {
  background: #ff0;
}

```

RGB color values use the `rgb()` function and stands for red, green, and blue. The function accepts an integer from `0` to `255` separated by commas.

```css

.task {
  background: rgb(128, 0, 0);
}
.count {
  background: rgb(255, 255, 0);
}

```

RGB color values may also use an alpha (transparency) channel by using the `rgba()` function which adds an additional number from `0` through `1` to represent transparency. `0` creates full transparency.

HSL & HSLa Colors use the `hsl()` function which stands for hue, saturation, and lightness. It works much the same way as `rgb()`.

Hue is a unitless number from `0` to `360`. They represent the color wheen and the value identifies the degree of a color on the wheel.

The second and third values represent saturation and lightness and are percentage values. The saturation goes from `0` for grayscale to `100%` for full saturation. Lightness goes from `0` for completely black to `100%` for completely white.

HSL color values may also take an alpha value. in the `hsla()` function.

```css

.task {
  background: hsl(0, 100%, 25%);
}
.count {
  background: hsl(60, 100%, 50%);
}

```

Not all browsers may support HSL values as it is fairly new.

##### Lengths

There are a handful of ways to represent types of values for lengths. However they come in two distinct forms

1. absolute length (pixels)
2. relative (percentages, em, rem)

A pizel is equal to 1/96th of an inch. However, the exact measurement of a pixel depends on the viewing device as to whether it is high or low density.

Pixels have lost popularity due to the nature of changing viewing devices as they can be quite inflexible and non-responsive.

`%` values are very popular as a `width` of `50%` allows a child element to span `50%` of the width of its parent container.

```css

.col {
  width: 50%;
}

```

They are extremely helpful for setting the height and width of elements and building out the layout of a web page.

The `em` value is also very popular and useful for font sizes. A single em unit is equivalent to an element's font size. If an element has a font size of `14` pixels and a `width` set to `5em`, the width would equal `70` pixels (`14` pixels multiplied b `5`).

```css

.banner {
  font-size: 14px;
  width: 5em;
}

```

When a font size if not explicitly stated for an element, the em unit will be relative to the font size of the closest parent element with a stated font size.

#### Summary

We focused on the foundations of CSS, covering exactly how it works and some common values we’re sure to use.

To briefly recap, within this lesson we’ve discussed the following:

- How style sheets cascade from the top to the bottom of a file
- What specificity is and how we can calculate it
- How to combine selectors to target specific elements or groups of elements
- How to use multiple classes on a single element to layer on different styles for more modular code
- The different color values available to use within CSS, including keyword, hexadecimal, RGB, and HSL values
- The different length values available to use within CSS, including pixels, percentages, and em units

## Lesson 4: Opening the Box Model

In the process we’ll discuss what is known as the box model and how it works with HTML and CSS. We’re also going to look at a few new CSS properties and use some of the length values we covered in Lesson 3.

#### How Are Elements Displayed?

Recap:

- block-level all available width, regardless on content, on a new line
- inline-level occupy only the width their content requires and line up on the same line as another.

##### Display

Exactly how elements are displayed are determined by the `display` property. Values could be one of `block`, `inline`, `inline-block`, and `none`.

The first two have been discussed but `inline-block` will allow an element to behave like a block-level element but displayed inline with other elements (will not begin a new line).

NB: There is a little space between inline-level elements. They can be removed as they be annoying but will discuss it shortly.

Using the value of `none` will render the page as if that element doesn't exist.

#### What Is the Box Model?

The [box model](http://css-tricks.com/the-css-box-model/) sees every element on the page as a rectangular box and may have the following:

- width
- height
- padding
- borders
- margins

**Every element on a page is a rectangular box**

#### Working with the Box Model

The size of that box is determined by several manipulations.

The core is defined by the width and height of an element, naturally. This may be determined by the `display` property, by the contents of the element or by specified `width` and `height` properties.

`padding` and then `border` expand the dimensions of the box outward from the element's width and height (from the inside).

`margin` will follow the border outwards.

```css

div {
  border: 6px solid #949599;
  height: 100px;
  margin: 20px;
  padding: 20px;
  width: 400px;
}

```

##### Width & Height

The total _width_ of an elements can be calculated:

```

margin-right + border-right + padding-right + width + padding-left + border-left + margin-left

```

The total _height_ of an element can be calculated

```

margin-top + border-top + padding-top + height + padding-bottom + border-bottom + margin-bottom

```

Thus:

- **Width:** 492px = 20px + 6px + 20px + 400px + 20px + 6px + 20px
- **Height:** 192px = 20px + 6px + 20px + 100px + 20px + 6px + 20px

It's important to remember that the model is additive.

We have discussed width and height. The defaults are determined by the content but may be altered.

##### Margin & Padding

Margin and padding defaults depend on the browser depending on the element itself. This is generally the case with text-based elements.

Margins are completely transparent and allow us to position elements in a particular place on a page. An oddity means that vertical margins (`top` and `bottom`) are not accepted by inline-level elements.

Padding is very similar however it is inside the element's borders (if there is one). It is used to space directly within an element. It does however work on vertically inline-level elements. However, any `vertical` padding may bleed into the lines above and below an element.

There is more than one way to declare these two properties. They come in both longhand and shorthand form.

To set all four sides the same value:

```css

div {
    margin: 20px;
}

```

To set one value for the `top` and `bottom` first, and then for `left` and `right`:

```css

div {
    margin: 10px 20px;
}

```

To set unique values for all four sides (`top`, `right`, `bottom`, and `left`):

```css

div {
    margin: 10px 20px 0 15px;
}

```

We may also using `margin` or `padding` followed by a `-` and the direction. This is best when only specifying one value. Also, both do not accept colors.


##### Borders

These fall between padding and margin, providing an outline. A `border` requires three values: `width`, `style`, and `color`. Shorthand are stated in that order. Longhand, these can follow `border` and a `-`.

`width` and `color` have been explained but style can be one of: `solid`, `double`, `dashed`, `dotted`, and `none`.

Border can be placed on one side, much like padding and margin. Further, we can style _with_ direction, followed by `width`, `style`, or `color`.

```css

div {
    border-bottom-width: 12px;
}

```

A `border-radius` property enables us to round the corners. A single value will apply to all corners, whereas `top-left`/`bottom-right` and `top-right`/`bottom-left` will provide some specificity.

##### Box Sizing

Until now, the model has been additive but may also be changed to support different calculations. CSS3 introduced the `box-sizing` property which allows us to change how the box model works and how an element's size is calculated. The three primary values are:

1. `content-box`
2. `padding-box`
3. `border-box`

The first is the default additive calculation.

The second includes any padding values. Therefore if an element has a `width` of `400` pixels and `padding` of `20` pixels, the actual size remains `400` pixels. As `padding` increases, the content size within an element shrinks proportionally. Borders and margins will add to the height and width.

The third takes into account the border as well and only margin will affect the height and width.

```css

div {
  -webkit-box-sizing: content-box;
     -moz-box-sizing: content-box;
          box-sizing: content-box;
}

```

The above shows browser-specific properties. The first is Webkit (Chrome/Safari), the second is MOzilla Firefox and a third not here is IE (`-ms-`). They are used to provide support to older browsers but as CSS3 is more accepted, these vendor-prefixes are becoming more irrelevant.

When picking a box size, the best is `border-box` generally speaking as it makes the maths much simpler. The only drawback is that not every browser supports it.

#### Developer Tools

It's useful to use Chrome Dev Tools.

#### Summary

Learning all the different parts of the box model is no small feat. These concepts, although briefly introduced, take quite a bit of time to fully master, and we’re on the right path toward doing so.

In brief, within this lesson we talked about the following:

- How different elements are displayed
- What the box model is and why it’s important
- How to change the size, including the height and width, of elements
- How to add margin, padding, and borders to elements
- How to change the box sizing of elements and the effects this has on the box model
