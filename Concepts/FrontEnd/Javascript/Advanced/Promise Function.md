In JavaScript, the word Promise represents both a function and an object, depending on how you look at it: 

* It is technically a function when you reference the global Promise constructor itself.

* It yields an object (specifically, an instance of a promise) when you instantiate it using the new keyword. 

Below resolve and reject function is prewritten just like java prewritten function inside a constructor.

```
const jsPromise = new Promise((resolve, reject) => {
  resolve("Done!"); 
});
```

Explanation:
Promise constructor itself does not accept two arguments; it accepts exactly one argument, which must be a function known as the executor function

However, confusion usually arises because the executor function itself accepts two arguments: 

1. resolve: A function to call when the asynchronous operation succeeds.

2. reject: A function to call when the operation fails.

We are calling Executor service just like Java's lambda function.

Here resolve and reject is a callback function which are prewritten fuction made to accept only a value so can't pass another function.
