# Rule: API Conventions

## Áp dụng: Khi viết API endpoints

### URL Structure
```
Base: /api/v1

# Collection CRUD
GET    /api/v1/services              # List (with pagination)
GET    /api/v1/services/:id          # Get by ID
GET    /api/v1/services/slug/:slug   # Get by slug
POST   /api/v1/services              # Create
PUT    /api/v1/services/:id          # Full update
PATCH  /api/v1/services/:id          # Partial update
DELETE /api/v1/services/:id          # Delete

# Nested resources
GET    /api/v1/projects/:id/images   # Project images

# Actions (non-CRUD)
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh
POST   /api/v1/contact/send
```

### Response Format

**Success Response**:
```typescript
interface SuccessResponse<T> {
  success: true;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Ví dụ
{
  "success": true,
  "data": { "id": 1, "title": "Service A" },
}

// List với pagination
{
  "success": true,
  "data": [{ "id": 1 }, { "id": 2 }],
  "meta": { "page": 1, "limit": 25, "total": 50, "totalPages": 2 }
}
```

**Error Response**:
```typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;       // Machine-readable: "NOT_FOUND", "VALIDATION_ERROR"
    message: string;    // Human-readable message
    details?: unknown;  // Validation errors, etc.
  };
}

// Ví dụ
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu không hợp lệ",
    "details": [
      { "field": "email", "message": "Email không đúng định dạng" }
    ]
  }
}
```

### HTTP Status Codes
| Code | Usage |
|------|-------|
| 200 | Success (GET, PUT, PATCH, DELETE) |
| 201 | Created (POST) |
| 204 | No Content (DELETE khi không trả body) |
| 400 | Bad Request / Validation Error |
| 401 | Unauthorized (chưa login) |
| 403 | Forbidden (không có quyền) |
| 404 | Not Found |
| 409 | Conflict (duplicate) |
| 422 | Unprocessable Entity |
| 429 | Too Many Requests (rate limit) |
| 500 | Internal Server Error |

### Query Parameters
```
# Pagination
?page=1&limit=25

# Sorting
?sort=createdAt&order=desc

# Filtering
?category=design&isActive=true

# Search
?search=keyword

# Field selection
?fields=id,title,slug

# Relations
?include=category,tags
```

### Versioning
- URL-based: `/api/v1/`, `/api/v2/`
- Khi breaking change → tăng version
- Maintain v(n-1) tối thiểu 6 tháng
