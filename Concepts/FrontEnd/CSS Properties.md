# CSS Properties Reference Guide

## Layout Properties

**`display`** - Defines how an element is displayed (block, inline, flex, grid, etc.).

```css
display: block; /* block, inline, flex, grid, none */
```

**`position`** - Sets positioning method for an element.

```css
position: relative; /* static, relative, absolute, fixed, sticky */
```

**`top`** - Sets top edge position for positioned elements.

```css
top: 10px; /* length, percentage, auto */
```

**`right`** - Sets right edge position for positioned elements.

```css
right: 20px; /* length, percentage, auto */
```

**`bottom`** - Sets bottom edge position for positioned elements.

```css
bottom: 0; /* length, percentage, auto */
```

**`left`** - Sets left edge position for positioned elements.

```css
left: 50%; /* length, percentage, auto */
```

**`z-index`** - Sets stacking order of positioned elements.

```css
z-index: 10; /* integer, auto */
```

**`float`** - Makes element float to left or right.

```css
float: left; /* left, right, none */
```

**`clear`** - Prevents elements from floating beside specified sides.

```css
clear: both; /* left, right, both, none */
```

**`overflow`** - Controls what happens when content overflows element's box.

```css
overflow: hidden; /* visible, hidden, scroll, auto */
```

**`overflow-x`** - Controls horizontal overflow behavior.

```css
overflow-x: scroll; /* visible, hidden, scroll, auto */
```

**`overflow-y`** - Controls vertical overflow behavior.

```css
overflow-y: auto; /* visible, hidden, scroll, auto */
```

**`visibility`** - Controls element visibility without affecting layout.

```css
visibility: hidden; /* visible, hidden, collapse */
```

**`clip`** - Clips absolutely positioned elements.

```css
clip: rect(0, 100px, 100px, 0); /* shape, auto */
```

**`clip-path`** - Creates clipping region that defines visible parts.

```css
clip-path: circle(50%); /* shape functions, url() */
```

## Box Model Properties

**`width`** - Sets element's width.

```css
width: 300px; /* length, percentage, auto */
```

**`height`** - Sets element's height.

```css
height: 200px; /* length, percentage, auto */
```

**`min-width`** - Sets minimum width of element.

```css
min-width: 100px; /* length, percentage */
```

**`max-width`** - Sets maximum width of element.

```css
max-width: 500px; /* length, percentage, none */
```

**`min-height`** - Sets minimum height of element.

```css
min-height: 50px; /* length, percentage */
```

**`max-height`** - Sets maximum height of element.

```css
max-height: 300px; /* length, percentage, none */
```

**`margin`** - Sets outer spacing around element (shorthand).

```css
margin: 10px 20px; /* length, percentage, auto */
```

**`margin-top`** - Sets top margin.

```css
margin-top: 15px; /* length, percentage, auto */
```

**`margin-right`** - Sets right margin.

```css
margin-right: auto; /* length, percentage, auto */
```

**`margin-bottom`** - Sets bottom margin.

```css
margin-bottom: 20px; /* length, percentage, auto */
```

**`margin-left`** - Sets left margin.

```css
margin-left: 5px; /* length, percentage, auto */
```

**`padding`** - Sets inner spacing inside element (shorthand).

```css
padding: 10px 15px; /* length, percentage */
```

**`padding-top`** - Sets top padding.

```css
padding-top: 12px; /* length, percentage */
```

**`padding-right`** - Sets right padding.

```css
padding-right: 8px; /* length, percentage */
```

**`padding-bottom`** - Sets bottom padding.

```css
padding-bottom: 16px; /* length, percentage */
```

**`padding-left`** - Sets left padding.

```css
padding-left: 20px; /* length, percentage */
```

**`box-sizing`** - Defines how width/height calculations include padding/border.

```css
box-sizing: border-box; /* content-box, border-box */
```

## Border Properties

**`border`** - Sets all border properties (shorthand).

```css
border: 2px solid #333; /* width style color */
```

**`border-width`** - Sets border width on all sides.

```css
border-width: 3px; /* length, thin, medium, thick */
```

**`border-style`** - Sets border style on all sides.

```css
border-style: dashed; /* none, solid, dashed, dotted, double */
```

**`border-color`** - Sets border color on all sides.

```css
border-color: red; /* color values */
```

**`border-top`** - Sets top border (shorthand).

```css
border-top: 1px solid black; /* width style color */
```

**`border-right`** - Sets right border (shorthand).

```css
border-right: 2px dotted blue; /* width style color */
```

**`border-bottom`** - Sets bottom border (shorthand).

```css
border-bottom: 3px double green; /* width style color */
```

**`border-left`** - Sets left border (shorthand).

```css
border-left: 1px dashed orange; /* width style color */
```

**`border-radius`** - Creates rounded corners.

```css
border-radius: 10px; /* length, percentage */
```

**`border-top-left-radius`** - Sets top-left corner radius.

```css
border-top-left-radius: 5px; /* length, percentage */
```

**`border-top-right-radius`** - Sets top-right corner radius.

```css
border-top-right-radius: 8px; /* length, percentage */
```

**`border-bottom-left-radius`** - Sets bottom-left corner radius.

```css
border-bottom-left-radius: 12px; /* length, percentage */
```

**`border-bottom-right-radius`** - Sets bottom-right corner radius.

```css
border-bottom-right-radius: 6px; /* length, percentage */
```

**`border-image`** - Uses image as border (shorthand).

```css
border-image: url(border.png) 30 round; /* source slice repeat */
```

**`outline`** - Sets outline around element (doesn't affect layout).

```css
outline: 2px solid red; /* width style color */
```

**`outline-offset`** - Sets space between outline and border.

```css
outline-offset: 4px; /* length */
```

## Background Properties

**`background`** - Sets all background properties (shorthand).

```css
background: url(bg.jpg) center/cover no-repeat; /* shorthand */
```

**`background-color`** - Sets background color.

```css
background-color: #f0f0f0; /* color values, transparent */
```

**`background-image`** - Sets background image.

```css
background-image: url(image.jpg); /* url(), gradient, none */
```

**`background-repeat`** - Controls how background image repeats.

```css
background-repeat: no-repeat; /* repeat, no-repeat, repeat-x, repeat-y */
```

**`background-position`** - Sets position of background image.

```css
background-position: center top; /* keywords, length, percentage */
```

**`background-size`** - Sets size of background image.

```css
background-size: cover; /* length, percentage, cover, contain, auto */
```

**`background-attachment`** - Sets whether background scrolls with content.

```css
background-attachment: fixed; /* scroll, fixed, local */
```

**`background-origin`** - Specifies background positioning area.

```css
background-origin: content-box; /* border-box, padding-box, content-box */
```

**`background-clip`** - Defines background painting area.

```css
background-clip: padding-box; /* border-box, padding-box, content-box */
```

## Typography Properties

**`color`** - Sets text color.

```css
color: #333; /* color values */
```

**`font`** - Sets all font properties (shorthand).

```css
font: bold 16px/1.5 Arial, sans-serif; /* shorthand */
```

**`font-family`** - Sets font family for text.

```css
font-family: Arial, Helvetica, sans-serif; /* font names, generic */
```

**`font-size`** - Sets size of font.

```css
font-size: 18px; /* length, percentage, keywords */
```

**`font-weight`** - Sets thickness of font.

```css
font-weight: bold; /* normal, bold, bolder, lighter, 100-900 */
```

**`font-style`** - Sets font style.

```css
font-style: italic; /* normal, italic, oblique */
```

**`font-variant`** - Sets font variant.

```css
font-variant: small-caps; /* normal, small-caps */
```

**`line-height`** - Sets height of line boxes.

```css
line-height: 1.5; /* number, length, percentage, normal */
```

**`text-align`** - Sets horizontal alignment of text.

```css
text-align: center; /* left, right, center, justify */
```

**`text-decoration`** - Sets text decoration lines.

```css
text-decoration: underline; /* none, underline, overline, line-through */
```

**`text-transform`** - Controls capitalization of text.

```css
text-transform: uppercase; /* none, capitalize, uppercase, lowercase */
```

**`text-indent`** - Sets indentation of first line.

```css
text-indent: 2em; /* length, percentage */
```

**`text-shadow`** - Adds shadow to text.

```css
text-shadow: 2px 2px 4px rgba(0,0,0,0.5); /* h-offset v-offset blur color */
```

**`letter-spacing`** - Sets spacing between characters.

```css
letter-spacing: 2px; /* length, normal */
```

**`word-spacing`** - Sets spacing between words.

```css
word-spacing: 4px; /* length, normal */
```

**`white-space`** - Controls how whitespace is handled.

```css
white-space: nowrap; /* normal, nowrap, pre, pre-line, pre-wrap */
```

**`text-overflow`** - Specifies how overflowed text is displayed.

```css
text-overflow: ellipsis; /* clip, ellipsis */
```

**`vertical-align`** - Sets vertical alignment of inline elements.

```css
vertical-align: middle; /* baseline, top, middle, bottom, length */
```

## Flexbox Properties

**`flex`** - Sets flex grow, shrink, and basis (shorthand).

```css
flex: 1 1 auto; /* grow shrink basis */
```

**`flex-direction`** - Sets direction of flex items.

```css
flex-direction: row; /* row, row-reverse, column, column-reverse */
```

**`flex-wrap`** - Controls whether flex items wrap.

```css
flex-wrap: wrap; /* nowrap, wrap, wrap-reverse */
```

**`flex-flow`** - Sets flex-direction and flex-wrap (shorthand).

```css
flex-flow: row wrap; /* direction wrap */
```

**`justify-content`** - Aligns flex items along main axis.

```css
justify-content: space-between; /* flex-start, center, space-between, space-around */
```

**`align-items`** - Aligns flex items along cross axis.

```css
align-items: center; /* stretch, flex-start, center, flex-end, baseline */
```

**`align-content`** - Aligns flex lines.

```css
align-content: space-around; /* stretch, flex-start, center, space-between */
```

**`align-self`** - Overrides align-items for individual flex item.

```css
align-self: flex-end; /* auto, stretch, flex-start, center, flex-end */
```

**`flex-grow`** - Sets how much flex item should grow.

```css
flex-grow: 2; /* number */
```

**`flex-shrink`** - Sets how much flex item should shrink.

```css
flex-shrink: 0; /* number */
```

**`flex-basis`** - Sets initial size of flex item.

```css
flex-basis: 200px; /* length, percentage, auto */
```

**`order`** - Sets order of flex item.

```css
order: -1; /* integer */
```

## Grid Properties

**`grid`** - Sets all grid properties (shorthand).

```css
grid: 1fr 1fr / auto auto; /* rows / columns */
```

**`grid-template`** - Sets grid template areas, rows, and columns.

```css
grid-template: "header header" "nav main" / 1fr 3fr; /* areas / columns */
```

**`grid-template-rows`** - Defines rows of grid.

```css
grid-template-rows: 100px 1fr 50px; /* track sizes */
```

**`grid-template-columns`** - Defines columns of grid.

```css
grid-template-columns: repeat(3, 1fr); /* track sizes */
```

**`grid-template-areas`** - Defines named grid areas.

```css
grid-template-areas: "header header" "nav main"; /* area names */
```

**`grid-gap`** - Sets gaps between grid items (shorthand).

```css
grid-gap: 20px 10px; /* row-gap column-gap */
```

**`grid-row-gap`** - Sets gap between grid rows.

```css
grid-row-gap: 15px; /* length, percentage */
```

**`grid-column-gap`** - Sets gap between grid columns.

```css
grid-column-gap: 20px; /* length, percentage */
```

**`grid-area`** - Sets grid item's area (shorthand).

```css
grid-area: header; /* area name or row/column lines */
```

**`grid-row`** - Sets grid item's row position (shorthand).

```css
grid-row: 1 / 3; /* start / end */
```

**`grid-column`** - Sets grid item's column position (shorthand).

```css
grid-column: 2 / span 2; /* start / end */
```

**`grid-auto-rows`** - Sets size of auto-generated rows.

```css
grid-auto-rows: minmax(100px, auto); /* track size */
```

**`grid-auto-columns`** - Sets size of auto-generated columns.

```css
grid-auto-columns: 1fr; /* track size */
```

**`grid-auto-flow`** - Controls auto-placement of grid items.

```css
grid-auto-flow: column; /* row, column, dense */
```

## Animation Properties

**`animation`** - Sets all animation properties (shorthand).

```css
animation: slideIn 2s ease-in-out infinite; /* shorthand */
```

**`animation-name`** - Specifies name of keyframe animation.

```css
animation-name: fadeIn; /* keyframe name, none */
```

**`animation-duration`** - Sets duration of animation.

```css
animation-duration: 3s; /* time */
```

**`animation-timing-function`** - Sets timing function for animation.

```css
animation-timing-function: ease-in-out; /* timing functions */
```

**`animation-delay`** - Sets delay before animation starts.

```css
animation-delay: 1s; /* time */
```

**`animation-iteration-count`** - Sets number of animation cycles.

```css
animation-iteration-count: infinite; /* number, infinite */
```

**`animation-direction`** - Sets direction of animation cycles.

```css
animation-direction: alternate; /* normal, reverse, alternate, alternate-reverse */
```

**`animation-fill-mode`** - Sets styles before/after animation.

```css
animation-fill-mode: forwards; /* none, forwards, backwards, both */
```

**`animation-play-state`** - Controls whether animation is running or paused.

```css
animation-play-state: paused; /* running, paused */
```

## Transition Properties

**`transition`** - Sets all transition properties (shorthand).

```css
transition: all 0.3s ease; /* property duration timing-function delay */
```

**`transition-property`** - Specifies properties to transition.

```css
transition-property: opacity, transform; /* property names, all, none */
```

**`transition-duration`** - Sets duration of transition.

```css
transition-duration: 0.5s; /* time */
```

**`transition-timing-function`** - Sets timing function for transition.

```css
transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1); /* timing functions */
```

**`transition-delay`** - Sets delay before transition starts.

```css
transition-delay: 0.2s; /* time */
```

## Transform Properties

**`transform`** - Applies 2D or 3D transformation.

```css
transform: rotate(45deg) scale(1.2); /* transform functions */
```

**`transform-origin`** - Sets origin point for transformations.

```css
transform-origin: center bottom; /* position values */
```

**`transform-style`** - Sets how nested elements are rendered in 3D space.

```css
transform-style: preserve-3d; /* flat, preserve-3d */
```

**`perspective`** - Sets perspective for 3D transformations.

```css
perspective: 1000px; /* length, none */
```

**`perspective-origin`** - Sets origin point for perspective.

```css
perspective-origin: 50% 50%; /* position values */
```

**`backface-visibility`** - Sets whether back face is visible.

```css
backface-visibility: hidden; /* visible, hidden */
```

## Filter Properties

**`filter`** - Applies visual effects like blur, brightness.

```css
filter: blur(5px) brightness(0.8); /* filter functions, none */
```

**`backdrop-filter`** - Applies effects to area behind element.

```css
backdrop-filter: blur(10px); /* filter functions, none */
```

**`opacity`** - Sets transparency level of element.

```css
opacity: 0.7; /* number 0-1 */
```

## Table Properties

**`table-layout`** - Sets algorithm for table layout.

```css
table-layout: fixed; /* auto, fixed */
```

**`border-collapse`** - Sets whether table borders collapse.

```css
border-collapse: collapse; /* separate, collapse */
```

**`border-spacing`** - Sets spacing between table borders.

```css
border-spacing: 10px 5px; /* length values */
```

**`caption-side`** - Sets position of table caption.

```css
caption-side: bottom; /* top, bottom */
```

**`empty-cells`** - Sets whether to show borders on empty cells.

```css
empty-cells: hide; /* show, hide */
```

## List Properties

**`list-style`** - Sets all list properties (shorthand).

```css
list-style: square inside url(bullet.png); /* type position image */
```

**`list-style-type`** - Sets marker type for list items.

```css
list-style-type: disc; /* disc, circle, square, decimal, none */
```

**`list-style-position`** - Sets position of list markers.

```css
list-style-position: inside; /* inside, outside */
```

**`list-style-image`** - Sets image as list marker.

```css
list-style-image: url(marker.png); /* url(), none */
```

## Cursor Properties

**`cursor`** - Sets cursor type when hovering over element.

```css
cursor: pointer; /* auto, pointer, crosshair, text, wait, help */
```

**`user-select`** - Controls whether user can select text.

```css
user-select: none; /* auto, none, text, all */
```

**`pointer-events`** - Controls whether element responds to pointer events.

```css
pointer-events: none; /* auto, none */
```

## Content Properties

**`content`** - Inserts content before/after element (used with ::before/::after).

```css
content: "★"; /* string, counter, attr(), url() */
```

**`quotes`** - Sets quotation marks for q element.

```css
quotes: "«" "»" "‹" "›"; /* string pairs */
```

**`counter-reset`** - Resets CSS counter.

```css
counter-reset: section; /* counter name, none */
```

**`counter-increment`** - Increments CSS counter.

```css
counter-increment: section 2; /* counter name number */
```

## Sizing Properties

**`resize`** - Controls whether element is resizable by user.

```css
resize: both; /* none, both, horizontal, vertical */
```

**`object-fit`** - Sets how replaced content should fit its container.

```css
object-fit: cover; /* fill, contain, cover, scale-down, none */
```

**`object-position`** - Sets position of replaced content.

```css
object-position: center top; /* position values */
```

## Writing Mode Properties

**`writing-mode`** - Sets text layout direction.

```css
writing-mode: vertical-rl; /* horizontal-tb, vertical-rl, vertical-lr */
```

**`direction`** - Sets text direction.

```css
direction: rtl; /* ltr, rtl */
```

**`unicode-bidi`** - Controls bidirectional text.

```css
unicode-bidi: embed; /* normal, embed, bidi-override */
```

## Miscellaneous Properties

**`box-shadow`** - Adds shadow effects to element box.

```css
box-shadow: 0 4px 8px rgba(0,0,0,0.3); /* h v blur spread color */
```

**`text-decoration-color`** - Sets color of text decoration lines.

```css
text-decoration-color: red; /* color values */
```

**`text-decoration-style`** - Sets style of text decoration lines.

```css
text-decoration-style: wavy; /* solid, double, dotted, dashed, wavy */
```

**`text-decoration-line`** - Sets which text decoration lines to use.

```css
text-decoration-line: underline overline; /* none, underline, overline, line-through */
```

**`word-wrap`** - Controls line breaking within words.

```css
word-wrap: break-word; /* normal, break-word */
```

**`word-break`** - Sets line breaking rules.

```css
word-break: break-all; /* normal, break-all, keep-all */
```

**`hyphens`** - Controls hyphenation of text.

```css
hyphens: auto; /* none, manual, auto */
```

**`tab-size`** - Sets size of tab character.

```css
tab-size: 4; /* number, length */
```

**`column-count`** - Sets number of columns for text.

```css
column-count: 3; /* number, auto */
```

**`column-gap`** - Sets gap between columns.

```css
column-gap: 20px; /* length, normal */
```

**`column-rule`** - Sets rule between columns (shorthand).

```css
column-rule: 2px solid #ccc; /* width style color */
```

**`break-inside`** - Controls page/column breaks inside element.

```css
break-inside: avoid; /* auto, avoid, avoid-page, avoid-column */
```

**`isolation`** - Creates new stacking context.

```css
isolation: isolate; /* auto, isolate */
```

**`mix-blend-mode`** - Sets how element blends with background.

```css
mix-blend-mode: multiply; /* blend mode values */
```

**`will-change`** - Hints browser about upcoming changes for optimization.

```css
will-change: transform, opacity; /* property names, auto */
```

**`scroll-behavior`** - Sets scrolling behavior for element.

```css
scroll-behavior: smooth; /* auto, smooth */
```

**`overscroll-behavior`** - Controls overscroll behavior.

```css
overscroll-behavior: contain; /* auto, contain, none */
```