# GET /posts/lists

**Description:**
Retrieve a paginated list of posts with powerful filtering, search, and cursor-based pagination.
Added price field in database for price range (Int) and using bigInt for avoid floating number

---

## Endpoint

```
GET /posts/lists
```

---

## Query Parameters

| Name           | Type   | Required | Description                                                                              |
| -------------- | ------ | -------- | ---------------------------------------------------------------------------------------- |
| `cursor`       | string | No       | Cursor for pagination (post id of the last item from previous page)                      |
| `take`         | number | No       | Number of posts to return per page (default: 10, max: 100)                               |
| `region`       | string | No       | Filter by property region (case-insensitive, partial match)                              |
| `township`     | string | No       | Filter by property township (case-insensitive, partial match)                            |
| `street`       | string | No       | Filter by property street (case-insensitive, partial match)                              |
| `propertyType` | string | No       | Filter by property type (exact match)                                                    |
| `postType`     | string | No       | Filter by post type (exact match)                                                        |
| `minPrice`     | number | No       | Minimum price (MMK)                                                                      |
| `maxPrice`     | number | No       | Maximum price (MMK)                                                                      |
| `search`       | string | No       | Search across region, township, street, buildingNumber (case-insensitive, partial match) |

---

## Example Request

```
GET /posts/lists?region=Yangon&search=Pyin%20Oo%20Lwin&minPrice=1000000&maxPrice=5000000&take=5
```

---

## Example Response

```json
{
  "currentTotalPage": 5,
  "total": 109,
  "hasNextPage": true,
  "nextCursor": 123,
  "posts": [
    {
      "id": 123,
      "type": "Sale",
      "status": "Active",
      "phone": "0912345678",
      "property": {
        "id": 456,
        "region": "Yangon",
        "township": "Kamayut",
        "street": "Pyin Oo Lwin Road",
        "price": 2500000,
        "priceDisplay": "2500000 MMK"
        // ...other property fields
      },
      "user": {
        "id": 789,
        "name": "John Doe"
        // ...other user fields
      }
      // ...other post fields
    }
    // ...more posts
  ]
}
```

---

## Notes

- All filters are optional and can be combined.
- `search` performs a partial, case-insensitive match across region, township, street, and buildingNumber.
- Pagination uses a cursor-based approach. Use `nextCursor` from the response for the next page.
- Prices are returned as numbers (MMK) and as a display string.

---

# GET /posts/:id

**Description:**
Retrieve the full details of a single post by its ID.

---

## Endpoint

```
GET /posts/:id
```

---

## Path Parameters

| Name | Type   | Required | Description        |
| ---- | ------ | -------- | ------------------ |
| id   | number | Yes      | The ID of the post |

---

## Example Request

```
GET /posts/123
```

---

## Example Response

```json
{
  "id": 123,
  "type": "Sale",
  "status": "Active",
  "phone": "0912345678",
  "property": {
    "id": 456,
    "region": "Yangon",
    "township": "Kamayut",
    "street": "Pyin Oo Lwin Road",
    "price": 2500000,
    "priceDisplay": "2500000 MMK"
    // ...other property fields
  },
  "user": {
    "id": 789,
    "name": "John Doe"
    // ...other user fields
  }
  // ...other post fields
}
```

---

## Error Responses

- `404 Not Found`: Returned if the post with the given ID does not exist.

---

## Notes

- The detail endpoint returns all available information for the post, including related property and user data.
- If you need more related data (e.g., images), contact the backend team to extend the response.
