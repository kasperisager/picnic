---
title: Endpoints
layout: page
categories: ["Kittn API"]
---

## Get All Kittens

```sh
curl "http://example.com/api/kittens"
  -H "Authorization: meowmeowmeow"
```

> The above command returns JSON structured like this:

```json
[
  {
    "id": 1,
    "name": "Fluffums",
    "breed": "calico",
    "fluffiness": 6,
    "cuteness": 7
  },
  {
    "id": 2,
    "name": "Isis",
    "breed": "unknown",
    "fluffiness": 5,
    "cuteness": 10
  }
]
```

This endpoint retrieves all kittens

### HTTP Request

`GET http://example.com/kittens`

### Parameters

Parameter       | Default | Description
---             | ---     | ---
`include_cats`  | `false` | If set to `true`, the result will also include cats.
`available`     | `true`  | If set to `false`, the result will include kittens that have already been adopted.


## Get a Specific Kitten

```sh
curl "http://example.com/api/kittens/3"
  -H "Authorization: meowmeowmeow"
```

> The above command returns JSON structured like this:

```json
{
  "id": 2,
  "name": "Isis",
  "breed": "unknown",
  "fluffiness": 5,
  "cuteness": 10
}
```

This endpoint retrieves a specific kitten.

### HTTP Request

`GET http://example.com/kittens/<ID>`

### Parameters

Parameter | Description
---       | ---
`ID`      | The ID of the cat to retrieve.
