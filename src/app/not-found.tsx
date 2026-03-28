import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Không tìm thấy trang</h2>
        <p className="mt-2 text-muted-foreground">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-primary px-6 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
