# HTTP Library
Building an http library allows us to place a layer of abstraction when creating HTTP requests on the frontend. It serves as an interface for the underlying library to give us the flexibility of changing the implementation if needed.

## Axios
Axios is the underlying library that our HTTP module is built on. We have chosen to go for it compared to other ways such as the `fetch()` method for the following reasons:
- No need to stringify body
- Backwards compatible with browsers
- Support for simultaneous requests
- Easier way to do progress indication and timeouts

### References
- https://blog.logrocket.com/axios-vs-fetch-best-http-requests/