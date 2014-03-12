---
title: The Kittn API
layout: page
---

## The Kittn API

Welcome to the Kittn API! You can use our API to access Kittn API endpoints, which can get information on various cats, kittens, and breeds in our database.

_The Kittn API was well-meaningly copied from [Slate's wonderful API example](http://tripit.github.io/slate)_


## Authentication

> To authorize, use this code:

```sh
# With shell, you can just pass the correct header with each request
curl "api_endpoint_here"
  -H "Authorization: meowmeowmeow"
```

> Make sure to replace meowmeowmeow with your API key.

Kittn uses API keys to allow access to the API. You can register a new Kittn API key at our [developer portal](#).

Kittn expects for the API key to be included in all API requests to the server in a header that looks like the following:

`Authorization: meowmeowmeow`


## Errors

The Kitten API uses the following error codes:

Error Code  | Meaning
---         | ---
`400`       | Bad Request – Your request sucks
`401`       | Unauthorized – Your API key is wrong
`403`       | Forbidden – The kitten requested is hidden for administrators only
`404`       | Not Found – The specified kitten could not be found
`405`       | Method Not Allowed – You tried to access a kitten with an invalid method
`406`       | Not Acceptable – You requested a format that isn’t json
`410`       | Gone – The kitten requested has been removed from our servers
`418`       | I’m a teapot
`429`       | Too Many Requests – You’re requesting too many kittens! Slown down!
`500`       | Internal Server Error – We had a problem with our server. Try again later.
`503`       | Service Unavailable – We’re temporarially offline for maintanance. Please try again later.
