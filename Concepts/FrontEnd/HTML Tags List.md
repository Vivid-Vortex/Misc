# HTML Tags Reference Guide

## Document Structure Tags

**`<html>`** - Root element that wraps all content on the page.

```html
<html lang="en">...</html>
```

**`<head>`** - Contains metadata about the document that isn't displayed.

```html
<head><title>Page Title</title></head>
```

**`<body>`** - Contains all visible content of the webpage.

```html
<body><h1>Welcome</h1></body>
```

**`<title>`** - Sets the document title shown in browser tab.

```html
<title>My Website</title>
```

**`<meta>`** - Provides metadata like charset, viewport, description.

```html
<meta charset="UTF-8">
```

**`<link>`** - Links external resources like CSS files or favicons.

```html
<link rel="stylesheet" href="style.css">
```

**`<script>`** - Embeds or references JavaScript code.

```html
<script src="app.js"></script>
```

**`<style>`** - Contains CSS styles for the document.

```html
<style>body { margin: 0; }</style>
```

**`<base>`** - Sets base URL for relative URLs in the document.

```html
<base href="https://example.com/">
```

## Heading Tags

**`<h1>`** - Largest heading, typically used for main page title.

```html
<h1>Main Title</h1>
```

**`<h2>`** - Second level heading for major sections.

```html
<h2>Section Title</h2>
```

**`<h3>`** - Third level heading for subsections.

```html
<h3>Subsection</h3>
```

**`<h4>`** - Fourth level heading.

```html
<h4>Minor Heading</h4>
```

**`<h5>`** - Fifth level heading.

```html
<h5>Small Heading</h5>
```

**`<h6>`** - Smallest heading level.

```html
<h6>Tiny Heading</h6>
```

## Text Content Tags

**`<p>`** - Paragraph of text content.

```html
<p>This is a paragraph.</p>
```

**`<br>`** - Line break, forces text to next line.

```html
Line one<br>Line two
```

**`<hr>`** - Horizontal rule, creates a dividing line.

```html
<hr>
```

**`<pre>`** - Preformatted text that preserves spaces and line breaks.

```html
<pre>  Code    with spaces</pre>
```

**`<blockquote>`** - Block-level quotation from another source.

```html
<blockquote>Famous quote here</blockquote>
```

**`<address>`** - Contact information for the author or owner.

```html
<address>123 Main St, City</address>
```

## Inline Text Tags

**`<span>`** - Generic inline container for styling or scripting.

```html
<span class="highlight">Important text</span>
```

**`<a>`** - Anchor tag for creating hyperlinks.

```html
<a href="https://example.com">Link text</a>
```

**`<strong>`** - Important text, typically displayed as bold.

```html
<strong>Very important</strong>
```

**`<em>`** - Emphasized text, typically displayed as italic.

```html
<em>Emphasized text</em>
```

**`<b>`** - Bold text without semantic importance.

```html
<b>Bold text</b>
```

**`<i>`** - Italic text without semantic emphasis.

```html
<i>Italic text</i>
```

**`<u>`** - Underlined text.

```html
<u>Underlined text</u>
```

**`<s>`** - Strikethrough text, content no longer accurate.

```html
<s>Deleted text</s>
```

**`<small>`** - Smaller text, often for fine print.

```html
<small>Copyright notice</small>
```

**`<mark>`** - Highlighted text for reference purposes.

```html
<mark>Highlighted text</mark>
```

**`<del>`** - Deleted text in document revisions.

```html
<del>Removed content</del>
```

**`<ins>`** - Inserted text in document revisions.

```html
<ins>Added content</ins>
```

**`<sub>`** - Subscript text, appears below baseline.

```html
H<sub>2</sub>O
```

**`<sup>`** - Superscript text, appears above baseline.

```html
E=mc<sup>2</sup>
```

**`<code>`** - Inline code snippet.

```html
<code>console.log()</code>
```

**`<kbd>`** - Keyboard input or user input.

```html
Press <kbd>Ctrl+C</kbd>
```

**`<var>`** - Variable name in programming or math.

```html
<var>x</var> = 5
```

**`<samp>`** - Sample output from a program.

```html
<samp>Hello World</samp>
```

**`<time>`** - Date/time with optional machine-readable format.

```html
<time datetime="2024-01-01">New Year</time>
```

**`<abbr>`** - Abbreviation with optional full form.

```html
<abbr title="HyperText Markup Language">HTML</abbr>
```

**`<dfn>`** - Definition term being defined.

```html
<dfn>HTML</dfn> is a markup language.
```

**`<q>`** - Short inline quotation.

```html
<q>To be or not to be</q>
```

**`<cite>`** - Citation of creative work title.

```html
<cite>The Great Gatsby</cite>
```

## List Tags

**`<ul>`** - Unordered list with bullet points.

```html
<ul><li>Item 1</li><li>Item 2</li></ul>
```

**`<ol>`** - Ordered list with numbers or letters.

```html
<ol><li>First</li><li>Second</li></ol>
```

**`<li>`** - List item within ul or ol.

```html
<li>List item content</li>
```

**`<dl>`** - Description list for term-definition pairs.

```html
<dl><dt>Term</dt><dd>Definition</dd></dl>
```

**`<dt>`** - Term in a description list.

```html
<dt>HTML</dt>
```

**`<dd>`** - Definition/description in a description list.

```html
<dd>Markup language</dd>
```

## Table Tags

**`<table>`** - Table container for tabular data.

```html
<table><tr><td>Cell</td></tr></table>
```

**`<tr>`** - Table row containing cells.

```html
<tr><td>Cell 1</td><td>Cell 2</td></tr>
```

**`<td>`** - Table data cell.

```html
<td>Cell content</td>
```

**`<th>`** - Table header cell.

```html
<th>Column Header</th>
```

**`<thead>`** - Groups header content in table.

```html
<thead><tr><th>Header</th></tr></thead>
```

**`<tbody>`** - Groups body content in table.

```html
<tbody><tr><td>Data</td></tr></tbody>
```

**`<tfoot>`** - Groups footer content in table.

```html
<tfoot><tr><td>Footer</td></tr></tfoot>
```

**`<caption>`** - Table caption or title.

```html
<caption>Sales Data 2024</caption>
```

**`<colgroup>`** - Groups columns for styling.

```html
<colgroup><col span="2"></colgroup>
```

**`<col>`** - Column within colgroup.

```html
<col style="background-color: yellow">
```

## Form Tags

**`<form>`** - Container for interactive form elements.

```html
<form action="/submit" method="post">...</form>
```

**`<input>`** - Various input types (text, email, password, etc.).

```html
<input type="text" name="username">
```

**`<textarea>`** - Multi-line text input area.

```html
<textarea name="message" rows="4"></textarea>
```

**`<button>`** - Clickable button element.

```html
<button type="submit">Submit</button>
```

**`<select>`** - Dropdown selection list.

```html
<select><option>Choice 1</option></select>
```

**`<option>`** - Option within select dropdown.

```html
<option value="red">Red</option>
```

**`<optgroup>`** - Groups options within select.

```html
<optgroup label="Colors"><option>Red</option></optgroup>
```

**`<label>`** - Label for form control element.

```html
<label for="email">Email:</label>
```

**`<fieldset>`** - Groups related form elements.

```html
<fieldset><legend>Personal Info</legend></fieldset>
```

**`<legend>`** - Caption for fieldset group.

```html
<legend>Contact Details</legend>
```

**`<datalist>`** - Predefined options for input autocomplete.

```html
<datalist id="browsers"><option>Chrome</option></datalist>
```

**`<output>`** - Result of calculation or user action.

```html
<output name="result">42</output>
```

## Media Tags

**`<img>`** - Embeds image with src and alt attributes.

```html
<img src="photo.jpg" alt="Description">
```

**`<audio>`** - Embeds audio content.

```html
<audio controls><source src="song.mp3"></audio>
```

**`<video>`** - Embeds video content.

```html
<video controls><source src="movie.mp4"></video>
```

**`<source>`** - Media resource for audio/video elements.

```html
<source src="video.mp4" type="video/mp4">
```

**`<track>`** - Text tracks for media elements (subtitles).

```html
<track kind="subtitles" src="subs.vtt">
```

**`<embed>`** - Embeds external content or plugins.

```html
<embed src="file.pdf" type="application/pdf">
```

**`<object>`** - Embeds external resource or media.

```html
<object data="file.pdf" type="application/pdf"></object>
```

**`<param>`** - Parameters for object element.

```html
<param name="quality" value="high">
```

**`<iframe>`** - Embeds another HTML document inline.

```html
<iframe src="https://example.com"></iframe>
```

## Sectioning Tags

**`<header>`** - Header section of page or article.

```html
<header><h1>Site Title</h1><nav>...</nav></header>
```

**`<nav>`** - Navigation links section.

```html
<nav><a href="/">Home</a><a href="/about">About</a></nav>
```

**`<main>`** - Main content area of document.

```html
<main><article>...</article></main>
```

**`<section>`** - Thematic section of content.

```html
<section><h2>About Us</h2><p>...</p></section>
```

**`<article>`** - Self-contained content that could stand alone.

```html
<article><h2>Blog Post Title</h2><p>...</p></article>
```

**`<aside>`** - Content aside from main content (sidebar).

```html
<aside><h3>Related Links</h3></aside>
```

**`<footer>`** - Footer section of page or article.

```html
<footer><p>&copy; 2024 Company Name</p></footer>
```

**`<div>`** - Generic container for styling and layout.

```html
<div class="container">Content here</div>
```

## Interactive Tags

**`<details>`** - Disclosure widget that can be toggled open/closed.

```html
<details><summary>Click to expand</summary>Hidden content</details>
```

**`<summary>`** - Summary or caption for details element.

```html
<summary>More Information</summary>
```

**`<dialog>`** - Modal dialog box or popup window.

```html
<dialog open>Dialog content</dialog>
```

## Deprecated/Obsolete Tags (avoid using)

**`<center>`** - Centers content (use CSS instead).

```html
<center>Centered text</center>
```

**`<font>`** - Sets font properties (use CSS instead).

```html
<font color="red">Red text</font>
```

**`<marquee>`** - Scrolling text (use CSS animations instead).

```html
<marquee>Scrolling text</marquee>
```

## Less Common Tags

**`<bdi>`** - Isolates text that might be formatted differently.

```html
<bdi>User input: مرحبا</bdi>
```

**`<bdo>`** - Overrides text directionality.

```html
<bdo dir="rtl">This text goes right-to-left</bdo>
```

**`<ruby>`** - Ruby annotations for East Asian typography.

```html
<ruby>漢<rt>kan</rt>字<rt>ji</rt></ruby>
```

**`<rt>`** - Ruby text component.

```html
<rt>pronunciation</rt>
```

**`<rp>`** - Fallback parentheses for ruby annotations.

```html
<rp>(</rp><rt>kan</rt><rp>)</rp>
```

**`<wbr>`** - Line break opportunity for long words.

```html
<wbr>
```

**`<noscript>`** - Content shown when JavaScript is disabled.

```html
<noscript>Please enable JavaScript</noscript>
```

**`<template>`** - HTML template that's not rendered initially.

```html
<template id="my-template"><p>Template content</p></template>
```

**`<slot>`** - Placeholder in web components.

```html
<slot name="header"></slot>
```

**`<picture>`** - Container for multiple image sources.

```html
<picture><source media="(min-width: 800px)" srcset="large.jpg"><img src="small.jpg"></picture>
```

**`<figure>`** - Self-contained content like images with captions.

```html
<figure><img src="chart.png"><figcaption>Sales Chart</figcaption></figure>
```

**`<figcaption>`** - Caption for figure element.

```html
<figcaption>Figure 1: Monthly Sales</figcaption>
```

**`<progress>`** - Progress bar showing completion status.

```html
<progress value="70" max="100">70%</progress>
```

**`<meter>`** - Scalar measurement or gauge.

```html
<meter value="0.6" min="0" max="1">60%</meter>
```

**`<data>`** - Links content with machine-readable value.

```html
<data value="398">Three hundred ninety-eight</data>
```