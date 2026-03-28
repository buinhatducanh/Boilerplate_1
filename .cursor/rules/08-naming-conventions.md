# Rule: Naming Conventions

## Áp dụng: MỌI LÚC

### Tổng quan

| Target | Convention | Example |
|--------|-----------|---------|
| **Variables** | camelCase | `userName`, `isActive`, `totalPrice` |
| **Functions** | camelCase + verb prefix | `getUser()`, `handleSubmit()`, `calculateTotal()` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT`, `API_BASE_URL` |
| **Types/Interfaces** | PascalCase | `UserProfile`, `ServiceCard` |
| **Enums** | PascalCase + PascalCase values | `enum UserRole { Admin, Editor }` |
| **Components** | PascalCase | `ServiceCard`, `BannerSlider` |
| **Hooks** | camelCase + `use` prefix | `useServices()`, `useAuth()` |
| **Files (component)** | PascalCase | `ServiceCard.tsx` |
| **Files (utility)** | kebab-case | `api-client.ts`, `use-services.ts` |
| **CSS classes** | kebab-case (Tailwind) | `service-card`, `btn-primary` |
| **DB tables** | snake_case, plural | `services`, `contact_messages` |
| **DB columns** | snake_case | `created_at`, `is_active` |
| **API endpoints** | kebab-case, plural | `/api/v1/contact-messages` |
| **Env vars** | UPPER_SNAKE_CASE | `DATABASE_URL`, `API_TOKEN` |
| **Git branches** | kebab-case + prefix | `feature/add-contact-form` |

### Function Naming Verbs

| Verb | Usage | Example |
|------|-------|---------|
| `get` | Lấy data (sync/async) | `getUser()`, `getServices()` |
| `set` | Gán giá trị | `setTheme()`, `setLocale()` |
| `fetch` | Gọi API external | `fetchServices()` |
| `create` | Tạo mới | `createProject()` |
| `update` | Cập nhật | `updateService()` |
| `delete` | Xóa | `deleteProject()` |
| `handle` | Event handler | `handleSubmit()`, `handleClick()` |
| `validate` | Kiểm tra hợp lệ | `validateEmail()` |
| `format` | Định dạng data | `formatDate()`, `formatCurrency()` |
| `parse` | Phân tích data | `parseApiResponse()` |
| `is/has/can` | Boolean check | `isActive()`, `hasPermission()`, `canEdit()` |
| `to` | Chuyển đổi | `toJSON()`, `toSlug()` |

### Boolean Naming
```typescript
// ✅ Prefix rõ ràng
const isActive = true;
const hasPermission = false;
const canEdit = true;
const shouldRefetch = false;

// ❌ Tên mơ hồ
const active = true;      // Không rõ boolean
const permission = false;  // Không rõ boolean
const edit = true;         // Verb hay boolean?
```

### Array/Collection Naming
```typescript
// ✅ Plural noun
const services: Service[] = [];
const selectedIds: number[] = [];
const userRoles: UserRole[] = [];

// ❌ Singular hoặc suffix unclear
const serviceList: Service[] = [];    // Redundant "List"
const service: Service[] = [];        // Singular cho array
const serviceArr: Service[] = [];     // Hungarian notation
```
