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

## Fake Data

- **Note:** The fake data call will delete all the current data in the database

- Instructions:

1. Add the call `addFakeData();` at the end of the `app.ts`
2. After saving, the `app.ts` should restart
3. Log in with username `data` and password `data`

## Error messages

All error messages from the backend should take the format:

```
{
    "message": "this is an error message"
}
```

## Filter Table Middleware

The filter table middleware extracts request parameters and provides simplistic ways to manipulate filters as well as create model conditions out of it.

### Instructions
1. Place the middleware `filterTable` in the route definition as in:
    ```javascript
    commentRouter.get('/', tableFilter, getComments);
    ```
2. Add the filter condition in the model retrieval
    ```
    where: {
        ...res.locals.getFilterCondition(),
    }
    ```

There are additional exported functions that can be used to rename fields, recreate filter conditions, remove fields, and more. Refer to the `/middlewares/tableFilter.ts` for exported functions and corresponding documentation.
