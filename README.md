# Min Creative — Production House Website

Website Quản trị & giới thiệu **Min Creative** — xây bằng **React + Vite**, quản lý nội dung qua trang admin (`/admin`), deploy bằng **Docker + Traefik** (HTTPS tự động Let's Encrypt).

## Chạy local (dev)

```bash
npm install
npm run dev
```

Mở `http://localhost:5173`. Trang admin: `http://localhost:5173/admin` — đăng nhập mặc định `admin` / `admin123`.

## Cấu trúc Docker

SQL logic:

| File | Vai trò |
|------|---------|
| `Dockerfile` | Build SPA (multi-stage: Node build → nginx serve) |
| `nginx.conf` | Phục vụ static + SPA fallback + gzip + cache |
| `Caddyfile` | Reverse proxy + tự động HTTPS (Let's Encrypt) bằng biến `DOMAIN` |
| `docker-compose.yml` | 2 container: `web` (nginx) + `caddy` (HTTPS) |

## Deploy lên VPS (có Docker)

> Chưa có container file trên VPS. Làm theo cách dưới.

### Bước 1 — Chuyển mã nguồn lên VPS

Cách A — qua git (khuyến nghị): push repo lên GitHub rồi trên VPS:

```bash
git clone <URL-repo-của-bạn> mincreative
cd mincreative
```

Cách B — qua scp từ máy local (bỏ node_modules/dist):

```bash
# trên máy local
scp -r Dockerfile docker-compose.yml Caddyfile nginx.conf index.html package.json package-lock.json .oxlintrc.json src public README.md tamdev@187.127.113.240:~/mincreative/
```

### Bước 2 — Đặt domain và khởi chạy

Trên VPS, trong thư mục dự án:

```bash
# Đổi thành domain thật của bạn (DNS A đã trỏ 187.127.113.240)
export DOMAIN=mincreative.example.com

docker compose up -d --build
```

- Caddy tự xin **HTTPS** cho domain.
- Kiểm tra log: `docker compose logs -f caddy`

### Bước 3 — Cập nhật sau này

```bash
git pull                 # hoặc scp lại mã nguồn mới
export DOMAIN=mincreative.example.com
docker compose up -d --build --no-deps web
```

## Ghi chú

- Dữ liệu admin (cấu hình, người dùng) lưu trong `localStorage` của **trình duyệt** — lưu ý: **thay đổi dữ liệu trên mỗi máy khác nhau sẽ không đồng bộ**. Dùng mục **Dữ liệu → Xuất JSON / Nhập JSON** trong admin để sao lưu/phục hồi (quan trọng khi đổi trình duyệt/máy).
- Port nếu muốn truy cập qua IP trực tiếp (không domain): mở cổng trên firewall VPS, ví dụ `ufw allow 80,443/tcp`.

## Cảnh báo bảo mật

- Mật khẩu admin dạng client-side đơn giản (phù hợp demo). Với production thật, hãy thay bằng xác thực backend.
- Đổi mật khẩu SSH VPS nếu đã từng chia sẻ công khai.
