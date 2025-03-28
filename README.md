# API Guide

The API follows RESTful principles and provides a consistent interface for all resources. All endpoints return data in a standardized format:

```typescript
{
  data: T | null,
  error: string | null
}
```

## Response Status Codes

- `200 OK`: Request succeeded
- `201 Created`: Resource was successfully created
- `204 No Content`: Resource was successfully deleted
- `404 Not Found`: The requested resource was not found
- `500 Internal Server Error`: Server-side error occurred

## Available Endpoints

### Users

- `GET /api/users`: Get all users
- `POST /api/users`: Create a new user
- `GET /api/users/[id]`: Get a specific user by ID
- `PUT /api/users/[id]`: Update a user (full update)
- `PATCH /api/users/[id]`: Update a user (partial update)
- `DELETE /api/users/[id]`: Delete a user

### Courses

- `GET /api/courses`: Get all courses
- `POST /api/courses`: Create a new course
- `GET /api/courses/[id]`: Get a specific course by ID
- `PUT /api/courses/[id]`: Update a course (full update)
- `PATCH /api/courses/[id]`: Update a course (partial update)
- `DELETE /api/courses/[id]`: Delete a course

### Units

- `GET /api/units`: Get all units
- `POST /api/units`: Create a new unit
- `GET /api/units/[id]`: Get a specific unit by ID
- `PUT /api/units/[id]`: Update a unit (full update)
- `PATCH /api/units/[id]`: Update a unit (partial update)
- `DELETE /api/units/[id]`: Delete a unit

### Events

- `GET /api/events`: Get all events
- `POST /api/events`: Create a new event
- `GET /api/events/[id]`: Get a specific event by ID
- `PUT /api/events/[id]`: Update an event (full update)
- `PATCH /api/events/[id]`: Update an event (partial update)
- `DELETE /api/events/[id]`: Delete an event

### Event Types

- `GET /api/event-types`: Get all event types
- `POST /api/event-types`: Create a new event type
- `GET /api/event-types/[id]`: Get a specific event type by ID
- `PUT /api/event-types/[id]`: Update an event type (full update)
- `PATCH /api/event-types/[id]`: Update an event type (partial update)
- `DELETE /api/event-types/[id]`: Delete an event type

### Free Slots

- `GET /api/free-slots`: Get all free slots
- `POST /api/free-slots`: Create a new free slot
- `GET /api/free-slots/[id]`: Get a specific free slot by ID
- `PUT /api/free-slots/[id]`: Update a free slot (full update)
- `PATCH /api/free-slots/[id]`: Update a free slot (partial update)
- `DELETE /api/free-slots/[id]`: Delete a free slot

### Interests

- `GET /api/interests`: Get all interests
- `POST /api/interests`: Create a new interest
- `GET /api/interests/[id]`: Get a specific interest by ID
- `PUT /api/interests/[id]`: Update an interest (full update)
- `PATCH /api/interests/[id]`: Update an interest (partial update)
- `DELETE /api/interests/[id]`: Delete an interest

### Tags

- `GET /api/tags`: Get all tags
- `POST /api/tags`: Create a new tag
- `GET /api/tags/[id]`: Get a specific tag by ID
- `PUT /api/tags/[id]`: Update a tag (full update)
- `PATCH /api/tags/[id]`: Update a tag (partial update)
- `DELETE /api/tags/[id]`: Delete a tag
