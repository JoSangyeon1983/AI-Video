# Loomix AI Dev Server
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
chcp 65001 | Out-Null

$Host.UI.RawUI.WindowTitle = "Loomix AI Dev Server"
$serverDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$frontDir = Resolve-Path (Join-Path $serverDir "..\front")

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Loomix AI Dev Server" -ForegroundColor Cyan
Write-Host "  코드 수정 시 자동 반영 (HMR)" -ForegroundColor DarkCyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[오류] Node.js가 설치되어 있지 않습니다." -ForegroundColor Red
    Write-Host "  https://nodejs.org 에서 설치해주세요."
    Read-Host "아무 키나 누르세요"
    exit 1
}

if (-not (Test-Path (Join-Path $frontDir "node_modules"))) {
    Write-Host "[설치] 프론트 의존성을 설치합니다..." -ForegroundColor Yellow
    Push-Location $frontDir
    npm install
    Pop-Location
    Write-Host ""
}

Write-Host "[시작] Dev 서버를 실행합니다..." -ForegroundColor Green
Write-Host "  http://localhost:3000" -ForegroundColor White
Write-Host "  코드 저장 시 자동 반영됩니다." -ForegroundColor DarkGreen
Write-Host "  종료: Ctrl+C" -ForegroundColor Yellow
Write-Host ""

Set-Location $frontDir
npm run dev