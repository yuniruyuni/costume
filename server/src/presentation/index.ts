import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { compress } from "hono/compress";
import { secureHeaders } from "hono/secure-headers";

const STATIC_DIR = process.env.STATIC_DIR ?? "./static";

export function createApp() {
  const app = new Hono();

  app.use(compress());

  app.use(
    secureHeaders({
      xFrameOptions: "SAMEORIGIN",
      xContentTypeOptions: "nosniff",
      referrerPolicy: "strict-origin-when-cross-origin",
      contentSecurityPolicy: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        frameAncestors: ["'none'"],
      },
    }),
  );

  app.post("/api/usage/visit", async (c) => {
    c.header("Cache-Control", "no-store");
    const id = c.req.header("X-Yuniview-Visit") ?? "";
    if (!/^[a-f0-9-]{36}$/.test(id)) return c.body(null, 400);
    try {
      const response = await fetch("http://localhost/visit", {
        unix: "/run/yuniview-otlp/usage.sock",
        method: "POST",
        body: id,
        signal: AbortSignal.timeout(1500),
      });
      return c.body(null, response.status === 204 ? 204 : 503);
    } catch {
      return c.body(null, 503);
    }
  });

  app.get("/health", (c) => c.json({ status: "ok" }));

  app.use("/*", async (c, next) => {
    await next();
    if (c.res.status < 400) {
      c.res.headers.set(
        "Cache-Control",
        "public, max-age=0, stale-while-revalidate=86400",
      );
    }
  });

  // 静的ファイル (SSG 生成された /:id/index.html も含む)
  app.use("/*", serveStatic({ root: STATIC_DIR }));
  // SPA fallback (静的ファイルが無かったときのみ root の index.html を返す)
  app.get("*", serveStatic({ root: STATIC_DIR, path: "index.html" }));

  return app;
}
