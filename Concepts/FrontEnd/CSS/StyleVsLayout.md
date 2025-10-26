Great question! Understanding the difference between **global styles** and **layout** is fundamental to writing clean, maintainable CSS.

## **Global Styles**
Global styles affect the **entire page** and set **defaults** for all elements:

### **What they control:**
- **Typography**: Font family, base font size, line height
- **Colors**: Background colors, default text colors
- **Resets**: Removing browser defaults
- **Page-wide settings**: Cursor, scrollbar, overall theme

### **Examples:**
```css
body {
  font-family: 'Inter', sans-serif;     /* All text uses this font */
  background-color: #f3f4f6;           /* Page background */
  color: #374151;                      /* Default text color */
  line-height: 1.6;                    /* Default line spacing */
  margin: 0;                           /* Remove browser defaults */
}

* {
  box-sizing: border-box;              /* Global box model */
}
```

**In Tailwind:**
```html
<body class="bg-gray-100 text-gray-800 font-sans">
```

---

## **Layout**
Layout controls **positioning** and **arrangement** of specific elements:

### **What they control:**
- **Positioning**: Where elements appear on screen
- **Spacing**: Margins, padding between elements  
- **Sizing**: Width, height of containers
- **Arrangement**: Flexbox, grid, alignment

### **Examples:**
```css
.container {
  display: flex;                       /* How children arrange */
  justify-content: center;             /* Horizontal positioning */
  align-items: center;                 /* Vertical positioning */
  min-height: 100vh;                   /* Container size */
  padding: 2rem;                       /* Internal spacing */
}
```

**In Tailwind:**
```html
<div class="min-h-screen flex items-center justify-center p-8">
```

---

## **Visual Comparison**

### **Global Styles (Body):**
```html
<body class="bg-blue-50 font-serif text-lg">
  <!-- Sets background, font, text size for EVERYTHING -->
</body>
```

### **Layout (Wrapper Div):**
```html
<body class="bg-blue-50">              <!-- Global: page background -->
  <div class="min-h-screen flex items-center justify-center">  <!-- Layout: positioning -->
    <div class="max-w-md p-6">         <!-- Layout: content container -->
      <h1>Content</h1>                 <!-- Uses global font settings -->
    </div>
  </div>
</body>
```

---

## **Why Separate Them?**

| **Global Styles** | **Layout** |
|-------------------|------------|
| ✅ Apply to everything | ✅ Apply to specific components |
| ✅ Set once, affect all | ✅ Control positioning |
| ✅ Typography, colors, defaults | ✅ Flexbox, grid, spacing |
| ❌ Not good for positioning | ❌ Not good for site-wide settings |

---

## **Best Practice Pattern:**

```html
<body class="bg-gray-100 font-sans text-gray-900">  <!-- GLOBAL -->
  <div class="min-h-screen flex items-center justify-center p-4">  <!-- LAYOUT -->
    <main class="max-w-2xl w-full">  <!-- LAYOUT -->
      <h1 class="text-3xl font-bold mb-4">Title</h1>  <!-- COMPONENT -->
      <p class="text-lg leading-relaxed">Content inherits global font/color</p>
    </main>
  </div>
</body>
```

**Think of it like:**
- **Global styles** = The "theme" of your house (paint color, flooring)
- **Layout** = The "furniture arrangement" (where the couch goes, room layout)

This separation makes your code more maintainable, predictable, and easier to debug!