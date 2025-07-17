# Posts API Usage Guide

This document explains how to use the single and multiple post creation endpoints for the real estate backend, including example Postman setups and field requirements.

---

## 1. Single Post Creation

**Endpoint:**

```
POST /api/posts/register
```

**Content-Type:**

- `multipart/form-data`

**Fields:**
| Key | Type | Description |
|----------|--------|---------------------------------------------|
| post | Text | Stringified JSON for post info (see below) |
| property | Text | Stringified JSON for property info (see below) |
| images | File | Up to 10 image files (optional) |

**Example `post` value:**

```json
{ "phone": "0988802093", "type": "Rent", "userId": 5 }
```

**Example `property` value:**

```json
{
  "ownerId": 5,
  "propertyTypeId": 1,
  "bedRoom": 3,
  "bathRoom": 2,
  "latitude": "16.8661",
  "longitude": "96.1951",
  "buildingNumber": "123A",
  "street": "Main Road",
  "floor": 5,
  "township": "Bahan",
  "region": "Yangon",
  "length": 40,
  "width": 20,
  "currency": "25,000,000 MMK"
}
```

**Example Postman Setup:**

- Set Body to `form-data`.
- Add key `post` (type: Text), value: (see above).
- Add key `property` (type: Text), value: (see above).
- Add key `images` (type: File), select up to 10 images.

**Error Handling:**

- If you upload more than 10 images, you will get a 400 error: `Too many files`.
- If required fields are missing or invalid, you will get a 400 error with details.

---

## 2. Multiple Post Creation

**Endpoint:**

```
POST /api/posts/register-multiple
```

**Content-Type:**

- `multipart/form-data`

**Fields:**
| Key | Type | Description |
|-------------|--------|------------------------------------------------------------------|
| posts | Text | Stringified JSON array of post+property objects (see below) |
| images_0 | File | Up to 10 images for the first post (optional) |
| images_1 | File | Up to 10 images for the second post (optional) |
| images_2 | File | Up to 10 images for the third post (optional) |

**Example `posts` value:**

```json
[
  {
    "post": { "phone": "0988802093", "type": "Rent", "userId": 5 },
    "property": {
      "ownerId": 5,
      "propertyTypeId": 1,
      "bedRoom": 3,
      "bathRoom": 2,
      "latitude": "16.8661",
      "longitude": "96.1951",
      "buildingNumber": "123A",
      "street": "Main Road",
      "floor": 5,
      "township": "Bahan",
      "region": "Yangon",
      "length": 40,
      "width": 20,
      "currency": "25,000,000 MMK"
    }
  },
  {
    "post": { "phone": "0912345678", "type": "Sale", "userId": 6 },
    "property": {
      "ownerId": 6,
      "propertyTypeId": 2,
      "bedRoom": 4,
      "bathRoom": 3,
      "latitude": "16.8000",
      "longitude": "96.1500",
      "buildingNumber": "456B",
      "street": "Second Street",
      "floor": 2,
      "township": "Sanchaung",
      "region": "Yangon",
      "length": 50,
      "width": 25,
      "currency": "50,000,000 MMK"
    }
  }
]
```

**Example Postman Setup:**

- Set Body to `form-data`.
- Add key `posts` (type: Text), value: (see above, as a single line).
- Add key `images_0` (type: File), select up to 10 images for the first post.
- Add key `images_1` (type: File), select up to 10 images for the second post.
- (Repeat for `images_2` if you have a third post.)

**Notes:**

- You can upload up to 3 posts per request.
- Each post can have up to 10 images.
- If you upload more than 10 images for any post, you will get a 400 error.
- If you upload images for a non-existent post (e.g., `images_3` but only 2 posts), those images will be ignored.

**Error Handling:**

- Exceeding post or image limits returns a 400 error with a clear message.
- Invalid or missing fields return a 400 error with details.

---

## 3. General Tips

- Always use `form-data` for requests with images.
- Always stringify your JSON fields (e.g., `post`, `property`, `posts`).
- Check error messages for details if your request fails.

---

## 4. Example Error Responses

- Too many images:
  ```json
  { "message": "Maximum 10 images allowed per post (post index: 1)" }
  ```
- Too many posts:
  ```json
  { "message": "You can only upload up to 3 posts at a time." }
  ```
- Invalid JSON:

  ```json
  { "message": "Invalid JSON in post, property, or posts field" }
  ```

  const formData = new FormData();

// Add the posts array (without images) as a string
const postsWithoutImages = posts.map(({ post, property }) => ({ post, property }));
formData.append('posts', JSON.stringify(postsWithoutImages));

// Add images for each post
posts.forEach((item, idx) => {
if (item.images && item.images.length > 0) {
item.images.forEach(file => {
formData.append(`images_${idx}`, file);
});
}
});
