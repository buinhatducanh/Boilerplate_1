# Rule: Error Handling

## Áp dụng: MỌI LÚC

### Nguyên tắc
1. **Không bao giờ swallow errors** – Luôn log hoặc re-throw
2. **Fail fast** – Validate input sớm nhất có thể
3. **Typed errors** – Dùng custom Error classes, không throw string
4. **User-friendly messages** – Hiển thị message dễ hiểu cho user, log chi tiết cho dev

### Frontend Error Handling
```typescript
// ✅ Component Error Boundary
"use client";
import { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
    // Gửi lên monitoring service
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="p-8 text-center">
          <h2>Đã xảy ra lỗi</h2>
          <p>Vui lòng tải lại trang hoặc liên hệ hỗ trợ.</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Thử lại
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

### Hook Error Pattern
```typescript
// ✅ Hook trả về error state rõ ràng
export function useServices() {
  const { data, error, isLoading } = useSWR("/services", fetcher);

  return {
    services: data ?? [],
    isLoading,
    error: error ? "Không thể tải dịch vụ. Vui lòng thử lại." : null,
  };
}
```

### API Error Pattern
```typescript
// ✅ Centralized error handler
export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  // Log chi tiết cho dev
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: req.body,
  });

  // Response cho client – KHÔNG expose internal details
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      error: { code: err.code, message: err.message },
    });
  }

  // Unknown errors → 500, generic message
  return res.status(500).json({
    success: false,
    error: { code: "INTERNAL_ERROR", message: "Đã xảy ra lỗi, vui lòng thử lại sau." },
  });
}
```

### Forbidden Patterns
```typescript
// ❌ Empty catch – TUYỆT ĐỐI KHÔNG
try { await doSomething(); } catch (e) {}

// ❌ Catch all without logging
try { await doSomething(); } catch (e) { return null; }

// ❌ Throw string
throw "Something went wrong";

// ❌ console.log for errors in production
catch (e) { console.log(e); }
```
