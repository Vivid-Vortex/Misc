Whenever you pass a function to be executed later, JavaScript developers call it a callback function, regardless of who wrote it:

so that mean either you write that internal function or it's prewritten just like java.

1. **Prewritten inbuilt Function"" - Either you pass a value or function to any prewritten function which are made as such to accept those. If the prewriten function only accepts value you cannn't pass function to it. In java we cann't pass function as an argument to another function. But in Javascript it just like python or golang we can do so so both are acceptable. But in case of prewritten function you cann't do anything on your own if the fucntion doesn't allows.7

2. **Custom Function** - You can do anything you want. Pass a value or fuction as an argument, if that custom function you or someone els has createt as such.

For example below resolve and reject function is prewritten just like java prewritten function inside a constructor.

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

Here resolve and reject is a callback function which are prewritten fuction made to accept only a value so can't pass another function.
