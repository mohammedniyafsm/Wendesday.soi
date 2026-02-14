@echo off
echo Starting Weather App...
start "Backend Server" cmd /k "cd backend && npm run dev"
timeout /t 5
start "Frontend Client" cmd /k "cd frontend && npm run dev"
echo Both servers started!
pause
