## Error handler

- This error handler is for 500 status error codes
- Two methods to use:

1. try and catch statements:

```
try {
    // some code
} catch(err: Error) {
    next(err);
}
```

2. callback:

```
fnCall(function(err, ...) {
    if (err) next(err);
})
```

3. catch clause in promises:

```
promiseCall.then((result: resultType) => {
    // do something with result
}).catch((err: Error) => {
    if(err) next(err);
})
```
