Bun.serve({
  port: 3000,
  fetch: async (req) => {
    let path = new URL(req.url).pathname;
    if (path === "/") path = "index.html";
    path = decodeURI(path);
    const file = Bun.file(`static/${path}`);
    if (await file.exists()) return new Response(file);
    return new Response(Bun.file("static/index.html"));
  },
});
