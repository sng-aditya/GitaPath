Here is the README documentation for the Bhagavad Gita API, formatted to clearly show JSON request/response examples and endpoint details.[1]

***

# Bhagavad Gita API

A lightweight, open-source Node.js REST API providing access to the Shreemad Bhagavad Gita with translations and commentaries.

## Base URL

```
https://vedicscriptures.github.io/
```

***

## Endpoints

### Get a Specific Slok (Verse)

Retrieve a specific verse and its details from any chapter.

**Endpoint:**  
`GET /slok/:ch/:sl`

**Parameters:**
- `:ch` — Integer (1–18), chapter number
- `:sl` — Integer, verse number within the chapter

**Request Example:**  
```http
GET https://vedicscriptures.github.io/slok/1/1
```

**Sample Response:**
```json
{
  "_id": "BG1.1",
  "chapter": 1,
  "verse": 1,
  "slok": "धृतराष्ट्र उवाच | ...",
  "transliteration": "dhṛtarāṣṭra uvāca ...",
  "tej": {
    "author": "Swami Tejomayananda",
    "ht": "... Hindi translation ..."
  },
  "siva": {
    "author": "Swami Sivananda",
    "et": "... English translation ..."
  },
  "purohit": {
    "author": "Shri Purohit Swami",
    "et": "... English translation ..."
  },
  // ...other commentaries...
}
```

***

### Get All Chapters Info

Retrieve details of all 18 chapters.

**Endpoint:**  
`GET /chapters`

**Request Example:**  
```http
GET https://vedicscriptures.github.io/chapters
```

**Sample Response:**
```json
[
  {
    "chapter_number": 1,
    "verses_count": 47,
    "name": "अर्जुनविषादयोग"
  },
  {
    "chapter_number": 18,
    "verses_count": 78,
    "name": "मोक्षसंन्यासयोग",
    "translation": "Moksha Sanyaas Yoga",
    "transliteration": "Mokṣha Sanyās Yog",
    "meaning": {
      "en": "Yoga through the Perfection of Renunciation and Surrender",
      "hi": "उपसंहार-संन्यास की सिद्धि"
    },
    "summary": {
      "en": "... English summary ...",
      "hi": "... Hindi summary ..."
    }
  }
  // ...other chapters...
]
```

***

### Get Single Chapter Info

Retrieve metadata of a specific chapter.

**Endpoint:**  
`GET /chapter/:ch`

**Parameters:**
- `:ch` — Integer (1–18), chapter number

**Request Example:**  
```http
GET https://vedicscriptures.github.io/chapter/1
```

**Sample Response:**
```json
{
  "chapter_number": 1,
  "verses_count": 47,
  "name": "अर्जुनविषादयोग"
}
```

***

## Usage Example (JavaScript)

```js
fetch('https://vedicscriptures.github.io/slok/1/1')
  .then(response => response.json())
  .then(data => console.log(data));
```

***

## Additional Notes

- All endpoints are GET and require no authentication.
- Slok responses contain multiple translations and commentaries by renowned authors.
- Suitable for educational, research, or devotional projects.

***

## Credits

Developed with ❤️ in India 🇮🇳  
Open-source project.

***

See the [API Reference](https://vedicscriptures.github.io/#get-slokchsl) for more details and full response fields.[1]

[1](https://vedicscriptures.github.io)