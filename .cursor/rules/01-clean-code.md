# Rule: Clean Code

## Áp dụng: MỌI LÚC

### Nguyên tắc cốt lõi
1. **Single Responsibility**: Mỗi function/component/module làm MỘT việc.
2. **DRY**: Không lặp logic. Nếu dùng 3 lần → extract thành function/component.
3. **KISS**: Giải pháp đơn giản nhất hoạt động đúng → chọn nó.
4. **YAGNI**: Không code cho tương lai. Code cho yêu cầu hiện tại.

### Function Rules
```typescript
// ✅ Function ngắn, rõ ràng, 1 mục đích
function calculateTotalPrice(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// ❌ Function quá dài, nhiều trách nhiệm
function processOrder(order: Order) {
  // validate → calculate → save → send email → update inventory
  // 100+ lines...
}

// ✅ Tách thành nhiều functions
async function processOrder(order: Order) {
  validateOrder(order);
  const total = calculateTotal(order.items);
  const savedOrder = await saveOrder({ ...order, total });
  await sendConfirmationEmail(savedOrder);
  await updateInventory(order.items);
}
```

### Rules cụ thể
- **Max function length**: 30 dòng (ngoại trừ switch/config)
- **Max parameters**: 3 params. Nhiều hơn → dùng object parameter
- **Max file length**: 300 dòng. Nhiều hơn → tách file
- **Nesting depth**: Tối đa 3 levels. Dùng early return để giảm nesting
- **No magic numbers**: Dùng constants có tên rõ nghĩa

```typescript
// ❌ Magic number
if (password.length < 8) { ... }

// ✅ Named constant
const MIN_PASSWORD_LENGTH = 8;
if (password.length < MIN_PASSWORD_LENGTH) { ... }
```

### Early Return Pattern
```typescript
// ❌ Nested conditions
function getDiscount(user: User) {
  if (user) {
    if (user.isPremium) {
      if (user.yearsActive > 2) {
        return 0.2;
      }
      return 0.1;
    }
    return 0.05;
  }
  return 0;
}

// ✅ Early returns – flat, dễ đọc
function getDiscount(user: User | null): number {
  if (!user) return 0;
  if (!user.isPremium) return 0.05;
  if (user.yearsActive > 2) return 0.2;
  return 0.1;
}
```
