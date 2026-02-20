# Loomix AI Server - 실행 스크립트
# 사용법: 우클릭 → PowerShell로 실행 / 또는 start.bat 더블클릭

$ErrorActionPreference = "Stop"
$Host.UI.RawUI.WindowTitle = "Loomix AI Server"
$serverDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Loomix AI Server" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location $serverDir

# ── Node.js 확인 ──
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[오류] Node.js가 설치되어 있지 않습니다." -ForegroundColor Red
    Write-Host "  https://nodejs.org 에서 설치해주세요."
    Read-Host "아무 키나 누르세요"
    exit 1
}

# ── 서버 의존성 확인 ──
if (-not (Test-Path "node_modules")) {
    Write-Host "[설치] 서버 의존성을 설치합니다..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

# ── 프론트 빌드 결과물 확인 ──
$frontOut = Join-Path $serverDir "..\front\out"
if (-not (Test-Path $frontOut)) {
    Write-Host "[빌드] 프론트 빌드 결과물이 없습니다. 빌드를 실행합니다..." -ForegroundColor Yellow
    Write-Host ""

    $frontDir = Join-Path $serverDir "..\front"
    Push-Location $frontDir

    if (-not (Test-Path "node_modules")) {
        Write-Host "[설치] 프론트 의존성을 설치합니다..." -ForegroundColor Yellow
        npm install
        Write-Host ""
    }

    npm run build
    Write-Host ""
    Pop-Location
}

# ── 서버 프로세스 관리 함수 ──
$script:serverProcess = $null

function Start-Server {
    $script:serverProcess = Start-Process node -ArgumentList "server.js" `
        -WorkingDirectory $serverDir -PassThru -WindowStyle Hidden

    Write-Host ""
    Write-Host "[시작] 서버를 실행합니다... (PID: $($script:serverProcess.Id))" -ForegroundColor Green
    Write-Host "  http://localhost:3000" -ForegroundColor White
    Write-Host ""
}

function Stop-Server {
    if ($script:serverProcess -and -not $script:serverProcess.HasExited) {
        Stop-Process -Id $script:serverProcess.Id -Force -ErrorAction SilentlyContinue
        Write-Host "[종료] 서버를 종료했습니다." -ForegroundColor Yellow
    }
}

function Restart-Server {
    Write-Host "[재시작] 서버를 재시작합니다..." -ForegroundColor Yellow
    Stop-Server
    Start-Sleep -Seconds 1
    Start-Server
}

# ── 서버 시작 ──
Start-Server

# ── 메뉴 루프 ──
while ($true) {
    Write-Host "==========================================" -ForegroundColor DarkGray
    Write-Host "  1. 서버 재시작" -ForegroundColor White
    Write-Host "  2. 서버 종료" -ForegroundColor White
    Write-Host "==========================================" -ForegroundColor DarkGray
    Write-Host ""

    $choice = Read-Host "선택"

    switch ($choice) {
        "1" { Restart-Server }
        "2" {
            Stop-Server
            Write-Host ""
            Write-Host "서버가 종료되었습니다." -ForegroundColor Green
            Read-Host "아무 키나 누르세요"
            exit 0
        }
        default {
            Write-Host "1 또는 2를 입력해주세요." -ForegroundColor Red
        }
    }
}
