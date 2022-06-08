# Instagram CRC Cards

## Media Table

| Column     | Type      |
|------------|-----------|
| media_id   | varchar   |
| user_id    | int       |
| date       | timestamp |
| caption    | string    |
| likes      | int       |
| comments   | int       |

- media_id is a primary key for the Media table
- user_id is a foreign key from the Users table

## Comments Table

| Column     | Type      |
|------------|-----------|
| comment_id | varchar   |
| media_id   | int       |
| date       | timestamp |
| username   | string    |
| message    | string    |
| likes      | int       |

- comment_id is a primary key for the Comments table
- media_id is a foreign key from the Media table

## Tags Table

| Column     | Type      |
|------------|-----------|
| tag_id     | varchar   |
| user_id    | int       |
| date       | timestamp |
| username   | string    |
| caption    | string    |
| likes      | int       |
| comments   | int       |

- tag_id is a primary key for the Tags table
- user_id is a foreign key from the Users table

## API Table

| Column                      | Type     |
|-----------------------------|----------|
| api_id                      | int      |
| user_id                     | int      |
| facebook_api_id             | int      |
| connected_instagram_account | varchar  |

- api_id is a primary key for the API table
- user_id is a foreign key from the Users table
- facebook_api_id is a foreign key from Facebook’s API table
