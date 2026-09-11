@echo off
title JalRakshak AI — Development Server
echo ===================================================
echo   Starting JalRakshak AI Disaster Management Platform
echo ===================================================
echo.
cd /d "%~dp0"
echo Running on http://localhost:5173 ...
echo.
npm run dev
pause
