# Rule: Security 🔒

## Áp dụng: MỌI LÚC (CRITICAL)

### Authentication
```typescript
// JWT Configuration
const JWT_CONFIG = {
  accessToken: {
    secret: process.env.JWT_ACCESS_SECRET,  // Min 256-bit
    expiresIn: "15m",                        // Ngắn
  },
  refreshToken: {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: "7d",
    // Lưu trong httpOnly cookie, KHÔNG localStorage
  },
};

// ✅ Password hashing
import bcrypt from "bcrypt";
const SALT_ROUNDS = 12;
const hash = await bcrypt.hash(password, SALT_ROUNDS);
const isValid = await bcrypt.compare(password, hash);

// ❌ TUYỆT ĐỐI KHÔNG
// Lưu password plain text
// Dùng MD5/SHA1 cho password
// Lưu JWT trong localStorage
```

### Input Validation & Sanitization
```typescript
// ✅ Validate MỌI input tại API boundary
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email().max(200),
  password: z.string().min(8).max(100),
});

// ✅ Parameterized queries (Prisma tự động)
const user = await prisma.user.findUnique({
  where: { email: input.email }, // Prisma escape tự động
});

// ❌ TUYỆT ĐỐI KHÔNG – SQL injection
const user = await prisma.$queryRawUnsafe(
  `SELECT * FROM users WHERE email = '${input.email}'`
);
```

### CORS & Headers
```typescript
// ✅ CORS restrictive
app.use(cors({
  origin: [process.env.FRONTEND_URL],  // Chỉ domain cụ thể
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));

// ✅ Security headers
app.use(helmet());
// Tự động set: X-Content-Type-Options, X-Frame-Options,
// X-XSS-Protection, Strict-Transport-Security, etc.
```

### Rate Limiting
```typescript
import rateLimit from "express-rate-limit";

// General API
app.use("/api/", rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 phút
  max: 100,                    // 100 requests per window
}));

// Auth endpoints – strict hơn
app.use("/api/v1/auth/", rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,                     // 10 attempts per window
}));
```

### Environment Variables
```bash
# ❌ KHÔNG BAO GIỜ commit vào git
.env
.env.local
.env.production

# ✅ Chỉ commit template
.env.example
```

### Checklist Bắt buộc
- [ ] Không hardcode secrets trong code
- [ ] HTTPS only trong production
- [ ] Input validation tại mọi API endpoint
- [ ] SQL injection prevention (dùng ORM, không raw queries)
- [ ] XSS prevention (React auto-escapes, nhưng check `dangerouslySetInnerHTML`)
- [ ] CSRF protection (SameSite cookies)
- [ ] Rate limiting trên auth endpoints
- [ ] Sensitive data không xuất hiện trong logs
- [ ] Dependencies audit định kỳ (`npm audit`)
- [ ] File upload: validate type, size, scan malware
