# AI Coach

An AI-powered interview coaching web app. Practice technical, behavioral, DSA, and mixed interviews, get AI feedback after every session, and let the app adapt your next interview to your weak spots.

## Stack

- React 19 + Vite
- React Router 7
- Tailwind CSS 4
- Recharts (progress charts)
- lucide-react (icons)

## Pages

Landing · Login · Sign Up · Dashboard Overview · Start Interview (setup) · Live Interview · Interview Results · Progress · Skills & Weaknesses · Interview History (+ detail view) · Resume · Settings

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

To build for production:

```bash
npm run build
npm run preview
```

## Notes

- This is currently a **frontend-only** build. Authentication, interview data, scores, and resume analysis are all mock data in `src/data/mockData.js` and `src/context/AuthContext.jsx`, so you can click through the entire product end-to-end without a server.
- Login/Sign Up accept any input right now — they just set a mock logged-in user so you can reach the dashboard.
- Dark mode is fully wired up (`src/context/ThemeContext.jsx`) — toggle it from Settings.
- When the backend is ready, the natural place to wire in real requests is `AuthContext` (auth), `mockData.js` call sites (interviews/results/progress/resume), and `LiveInterview.jsx` (recording → real audio/video capture and submission).
