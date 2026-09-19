Here is a ready-made, reusable prompt template designed to generate this exact style of minimal, concept-isolated, boilerplate-free learning code for any technology.

---

### 📋 The Master Prompt Template (Copy & Paste)

```text
Act as a senior software instructor. I want to learn the concept of "[INSERT CONCEPT NAME]" in [INSERT TECHNOLOGY/FRAMEWORK].

Please provide a minimal, standalone, concept-isolated code example following these strict guidelines:

1. Zero Project Bloat:
   - Do NOT build a full project, domain logic, mock APIs, or complex forms.
   - Keep only the absolute minimum files and lines of code needed to demonstrate this single concept.

2. Component/File Separation:
   - Break it down into the smallest logical parts (e.g., 1 parent and 1–2 children/modules) to show how they connect.
   - Give each file a clear, descriptive responsibility.

3. Clear, Targeted Comments:
   - Add concise, beginner-friendly comments explaining WHAT the piece does and WHY it exists.
   - Use visual pointer comments (e.g., `// 👈 This is where X happens`) on the most critical lines.

4. Self-Contained & Runnable:
   - Show how to wire everything together in the main entry/configuration file.
   - If styling is needed, use minimal CSS (or inline styles) that visually highlights how the concept works.

Topic: [INSERT CONCEPT NAME]
Tech: [INSERT TECH, e.g., React / CSS / React Native / HTML / Node.js]
```

---

### 💡 Example Usages

#### Example 1: React `useContext`
> **Prompt:**  
> *"Act as a senior software instructor. I want to learn the concept of `useContext` in React. Please provide a minimal, standalone, concept-isolated code example following the guidelines above."*

#### Example 2: CSS Grid Area Layout
> **Prompt:**  
> *"Act as a senior software instructor. I want to learn the concept of `grid-template-areas` in CSS. Please provide a minimal, standalone, concept-isolated code example following the guidelines above."*

#### Example 3: React Native `FlatList`
> **Prompt:**  
> *"Act as a senior software instructor. I want to learn the concept of `FlatList` (with `data`, `renderItem`, and `keyExtractor`) in React Native. Please provide a minimal, standalone, concept-isolated code example following the guidelines above."*

---

### 🌟 Pro-Tip for Git-Based Learning
If you want the AI to organize it into git branches just like we did here, simply add this line to the bottom of the prompt:

> *"Please provide the exact git branch name (e.g., `git checkout -b concept-name`) and file structure so I can save this concept on its own isolated branch."*
