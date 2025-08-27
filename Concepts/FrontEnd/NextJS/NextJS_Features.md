# These are the features provided by NextJS app missing from React itself.

### 1. SSG - Static Site Generation

Static site generation for static content such as blogs, documentation,
etc.

### 2. SSR - Server Side Rendering

Similar to React communicating with Spring Boot for fresh content. It
binds that content to its page and renders it on the screen.

### 3. Built-in API Routes

You can create APIs with CRUD functionality inside NextJS itself.
There's no need to use a separate Spring Boot application for this.\
However, with Spring Boot, you get more granular-level control. For
simpler tasks, NextJS is sufficient.

### 4. Automatic Routing

NextJS provides automatic routing based on the folder structure,
reducing the need for complex configuration.

#### 5. **Built-in CSS & Styling Support**

- Supports **CSS Modules, Sass, Tailwind, Styled JSX** out of the box.
    
- React requires additional setup (Webpack configs, etc.).

6.**Authentication Integration**

- Easy integration with NextAuth.js or custom JWT logic for secure user sessions **server-side**. That mesn you can take out the public key of the token from JWT and compare it with private key from key vault.
    
- React apps typically handle auth entirely on the client, increasing risk.
