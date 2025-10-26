There are several technical reasons why flexbox properties on the `<body>` element can be unreliable:

## **1. Browser Default Styles**
```css
/* Most browsers have default styles like: */
body {
  margin: 8px;  /* Default margin */
  padding: 0;
  display: block; /* Default display */
}
```
These defaults can interfere with your flexbox layout.

## **2. HTML Structure Hierarchy**
```html
<html>      <!-- Root element -->
  <body>    <!-- Child of html -->
    <div>   <!-- Your content -->
```
The `<body>` is a child of `<html>`, so:
- If `<html>` doesn't have proper height, `<body>` can't center properly
- The `<html>` element might not take full viewport height by default

## **3. CSS Cascade and Specificity**
- Browser stylesheets load first
- Your CSS loads after
- Sometimes browser defaults have higher specificity
- User agent styles can override your flexbox properties

## **4. Environment-Specific Issues**
Different environments handle body differently:
- **Tailwind Playground**: Might inject additional CSS
- **CodePen**: Has its own CSS reset
- **Regular browsers**: Each has slightly different defaults
- **Mobile browsers**: Additional quirks with viewport handling

## **5. The "Wrapper Div" Solution Works Because:**
```html
<body>
  <div class="min-h-screen flex items-center justify-center">
    <!-- This div has no baggage! -->
  </div>
</body>
```

The wrapper div:
- ✅ Has **no browser defaults** interfering
- ✅ Is a **clean slate** for your CSS
- ✅ Works **consistently** across all environments
- ✅ Is **predictable** and reliable

## **Professional Best Practice**
Most professional developers use wrapper divs for layout specifically because of these issues. It's considered a **best practice** to avoid relying on the `<body>` element for complex positioning.

**Rule of thumb**: Use `<body>` for global styles (background, font), use wrapper divs for layout!

---

### Not working code - As layouts are in body. Not a good practice as in some env / browsers might not work.
```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Centered Card</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="min-h-screen items-center justify-center bg-gray-200">
    <div class="max-w-md rounded-xl border-4 border-black bg-yellow-50 p-10 text-center shadow-lg flex">
      <h1 class="text-2xl font-bold">This is the card</h1>
    </div>
  </body>
</html>
```

### Working - Layouts moved to outer div instead of body.

```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Centered Card</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-gray-200">
    <div class="min-h-screen flex items-center justify-center">
      <div class="max-w-md rounded-xl border-4 border-black bg-yellow-50 p-10 text-center shadow-lg">
        <h1 class="text-2xl font-bold">This is the card</h1>
      </div>
    </div>
  </body>
</html>
```