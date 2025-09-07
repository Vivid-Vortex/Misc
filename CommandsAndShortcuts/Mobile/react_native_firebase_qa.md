# React Native, Expo, Firebase & Native Android - Q/A

## Q1: Can we develop mobile app using React Native and Express for connecting to say DB or authentication?
**A1:**
Yes, you can. React Native handles the frontend (mobile UI), and Express acts as the backend server for authentication, database operations, and APIs. They communicate over HTTP or WebSocket. You deploy Express separately on a server.

---

## Q2: So you mean that both React Native and Express part are going to get deployed separately and not part of the same APK?
**A2:**
Yes, exactly. React Native app is installed on the device as APK (Android) or IPA (iOS), while Express runs on a remote server. The mobile app communicates with the backend via network calls.

---

## Q3: What if I want to connect to DB or use React Native but I want to connect to the DB and do auth? These things can't be done on web app without using backend side such as ExpressJS or NextJS. How can React Native do this without any backend, say to connect to DB or auth using Firebase or Supabase?
**A3:**
React Native can connect directly to Firebase or Supabase. These services provide SDKs for mobile apps, allowing authentication and database operations without a traditional backend server. Security rules in Firebase/Supabase handle access control, replacing the need for a custom backend for many use cases.

---

## Q4: Using ExpressJS with React Native would be in a client-server architecture where Express will be deployed on a remote server and not sit on your mobile like it happens in case of web app or Next.js, isn't it?
**A4:**
Yes. In React Native + Express setup, Express is a remote backend. The mobile app does not embed Express. Next.js differs because it can render pages server-side but in React Native, the mobile app only contains the frontend.

---

## Q5: What if React Native + Next.js. In this case also React Native will only be part of APK and mobile installations, and Next.js has to be deployed on remote server?
**A5:**
Correct. React Native is the mobile app installed on devices. Next.js is deployed remotely, serving backend APIs or server-side rendering if needed. They communicate via network requests.

---

## Q6: Why not go with some mature language and framework like Java or Spring Boot?
**A6:**
Using Spring Boot as the backend for React Native is a solid choice for enterprise-grade apps. Express/Next.js are lightweight, fast to prototype, and use JavaScript end-to-end, but Spring Boot offers robust enterprise features, better scalability for CPU-heavy workloads, and full backend control. Choice depends on project scale, team expertise, and desired control.

---

## Q7: Do we need API key to connect to Firebase from mobile app? Can we use it for web app?
**A7:**
Yes, you need a Firebase API key, which is part of the Firebase config object. The key is public and safe to expose. You can use the same config in web apps. Sensitive operations require Admin SDK on backend servers.

---

## Q8: How to get the Firebase API key? What else do we need for web app?
**A8:**
1. Go to Firebase Console → Project Settings → Register Web App.
2. Firebase provides a config object containing `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`.
3. Use the entire config object to initialize Firebase in your web app.
4. Example initialization in React:
```js
import { initializeApp } from "firebase/app";
const app = initializeApp(firebaseConfig);
```
---

## Q9: Can we use emulator in Android Studio if we develop the app using React Native? How can I do so?
**A9:**
Yes, React Native apps can run on Android Studio emulator.
Steps:
1. Install Android Studio with SDK and AVD.
2. Create an emulator via Device Manager.
3. Start emulator.
4. Run app:
   - React Native CLI: `npx react-native run-android`
   - Expo: `npx expo start` and press `a` for emulator.
---

## Q10: Difference `npm install -g react-native-cli` vs `npm install -g expo-cli`. What are Expo projects?
**A10:**
- `react-native-cli`: creates bare React Native projects, full native control, manual setup.
- `expo-cli`: framework on top of React Native, provides built-in APIs (Camera, Location, Notifications), minimal setup, quick prototyping. Expo projects use React Native but abstract native setup, like Next.js abstracts React for web.
---

## Q11: Expo provides built-in support for Camera, Notifications, Location, Image Picker. Does that mean with react-native-cli we need to install separately? Are these plugins/libraries?
**A11:**
Yes, with React Native CLI, you must install libraries/plugins separately and configure them in native code. Expo bundles these libraries for you. Libraries are NPM packages; in Expo, they are pre-integrated. React Native CLI offers more power and flexibility; Expo is faster for development but less customizable.
---

## Q12: Full native control in React Native CLI?
**A12:**
Full native control means:
- Access and modify Android (Java/Kotlin) and iOS (Swift/Obj-C) code.
- Integrate any native SDKs.
- Modify build process via Gradle (Android) or Xcode (iOS).
- Expo hides native code unless you eject.
Your Spring Boot + Gradle experience translates well to understanding Gradle-based Android builds.
---

## Q13: If we use react-native-cli, are we still working with Java?
**A13:**
Mostly you write JS/TS for UI and logic, but native Java/Kotlin is used when integrating SDKs or modifying platform features (camera, Firebase, notifications). Your Java + Gradle skills help in this context, making adoption faster.
---

## Q14: React Native is frontend only, similar to Spring Boot + JSP/Thymeleaf?
**A14:**
Yes. JS layer is UI and client logic, native Android/iOS layer is runtime and SDKs. Backend server (Spring Boot) handles DB/auth/business logic. Similar to Spring Boot apps where JSP/Thymeleaf is frontend and Java handles backend.
---

## Q15: React Native bridge
**A15:**
- Bridge connects JS thread → native thread.
- JS code is constant across platforms; native implementation differs (Java/Kotlin for Android, Swift/Obj-C for iOS).
- JS calls native modules asynchronously; results returned via bridge.
- Flow: `React Native JS frontend → Native Android/iOS core → Backend Server (Spring Boot or Firebase)`.

**Diagram:**
```
+-------------------------+
|  React Native JS Layer  |
+-------------------------+
           |
           v
+-------------------------+
| Native Android/iOS Core |
| Camera, Storage, GPS,   |
| Firebase SDK, Push      |
+-------------------------+
           |
           v
+-------------------------+
|      Backend Server     |
| DB, Auth, Business Logic|
+-------------------------+
```
---

## Q16: React Native bridge similar to JVM?
**A16:**
Yes, conceptually:
- JS code = constant (like Java bytecode)
- Native modules = platform-specific implementations (like JVM per OS)
- Bridge adapts JS → native, enabling cross-platform behavior. Some overhead due to async messaging, but UI performance is sufficient.
- Difference: JVM interprets bytecode; bridge passes messages asynchronously between threads.
---

