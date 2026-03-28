# Rule: Database

## Áp dụng: Khi viết schema, migration, query

### Schema Design Principles
1. **Normalize đến 3NF** – Trừ khi có lý do performance để denormalize
2. **Mọi table đều có** `id`, `created_at`, `updated_at`
3. **Soft delete** khi cần: thêm `deleted_at` (nullable DateTime)
4. **Foreign keys luôn có index**
5. **VARCHAR có max length** – Không dùng unlimited text cho fields ngắn

### Prisma Model Checklist
```prisma
model Example {
  // ✅ Luôn có
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  // ✅ Map snake_case cho DB
  isActive  Boolean  @default(true) @map("is_active")

  // ✅ Table name snake_case plural
  @@map("examples")

  // ✅ Index cho query patterns phổ biến
  @@index([isActive, createdAt(sort: Desc)])
}
```

### Query Rules
```typescript
// ✅ Select chỉ fields cần thiết
const services = await prisma.service.findMany({
  select: { id: true, title: true, slug: true },
});

// ✅ Batch parallel queries
const [items, total] = await Promise.all([
  prisma.service.findMany({ take: limit, skip: offset }),
  prisma.service.count(),
]);

// ✅ Transaction cho multi-table writes
await prisma.$transaction([
  prisma.order.create({ data: orderData }),
  prisma.inventory.update({ where: { id: itemId }, data: { stock: { decrement: 1 } } }),
]);

// ❌ N+1 queries
const projects = await prisma.project.findMany();
for (const p of projects) {
  p.category = await prisma.category.findUnique({ where: { id: p.categoryId } });
}

// ✅ Include/Join thay N+1
const projects = await prisma.project.findMany({
  include: { category: true },
});
```

### Migration Safety
- **Additive changes** (add column, add table): An toàn, deploy thẳng
- **Destructive changes** (drop column, rename): 3-step migration
  1. Add new column, deploy code that writes to both
  2. Migrate data from old → new
  3. Drop old column after verification
- **KHÔNG BAO GIỜ** chạy `prisma migrate reset` trên production
