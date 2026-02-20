const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Next.js 정적 빌드 결과물 경로
const staticDir = path.join(__dirname, "..", "front", "out");

// 정적 파일 서빙
app.use(express.static(staticDir));

// SPA 라우팅: 각 경로의 index.html 또는 루트 index.html로 폴백
app.get("*", (req, res) => {
  const pagePath = path.join(staticDir, req.path, "index.html");

  if (fs.existsSync(pagePath)) {
    return res.sendFile(pagePath);
  }

  res.sendFile(path.join(staticDir, "index.html"));
});

app.listen(PORT, () => {
  console.log(`\n  Server running at http://localhost:${PORT}\n`);
});
