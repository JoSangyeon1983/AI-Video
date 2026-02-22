const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Next.js 정적 빌드 결과물 경로
const staticDir = path.join(__dirname, "..", "front", "out");

// trailingSlash 일관성: /path → /path/ 리다이렉트 (정적 디렉토리가 존재하는 경우)
app.use((req, res, next) => {
  // _next, 파일 확장자가 있는 경로, 이미 trailing slash가 있는 경로는 제외
  if (req.path === "/" || req.path.startsWith("/_next") || req.path.includes(".") || req.path.endsWith("/")) {
    return next();
  }
  const dirPath = path.join(staticDir, req.path);
  if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
    return res.redirect(301, req.path + "/");
  }
  next();
});

// HTML 캐시 방지 (항상 최신 콘텐츠 제공)
app.use((req, res, next) => {
  if (req.path.endsWith(".html") || req.path.endsWith("/") || !req.path.includes(".")) {
    res.set("Cache-Control", "no-cache, no-store, must-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
  }
  next();
});

// 정적 파일 서빙 (.html 확장자 자동 매칭)
app.use(express.static(staticDir, { extensions: ["html"] }));

// SPA 라우팅: 각 경로의 index.html 또는 slug.html, 루트 index.html로 폴백
app.get("*", (req, res) => {
  // 경로 정규화: trailing slash 제거 (루트 제외)
  const cleanPath = req.path.endsWith("/") && req.path !== "/"
    ? req.path.slice(0, -1)
    : req.path;

  // 1) /path/index.html (trailingSlash 빌드)
  const indexPath = path.join(staticDir, cleanPath, "index.html");
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }

  // 2) /path.html (non-trailingSlash 빌드)
  const htmlPath = path.join(staticDir, cleanPath + ".html");
  if (fs.existsSync(htmlPath)) {
    return res.sendFile(htmlPath);
  }

  // 3) /path → 디렉토리 확인 후 index.html
  const dirIndex = path.join(staticDir, req.path, "index.html");
  if (dirIndex !== indexPath && fs.existsSync(dirIndex)) {
    return res.sendFile(dirIndex);
  }

  // 4) 루트 폴백
  res.sendFile(path.join(staticDir, "index.html"));
});

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`\n  Server running at ${url}\n`);

  // 브라우저 자동 열기
  const { exec } = require("child_process");
  const command =
    process.platform === "win32" ? `start ${url}` :
    process.platform === "darwin" ? `open ${url}` :
    `xdg-open ${url}`;
  exec(command);
});
