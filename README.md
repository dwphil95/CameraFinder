# Camera Finder

Camera Finder is a web application that helps photographers and videographers discover cameras tailored to their needs.

Users complete a questionnaire covering budget, experience level, intended use, preferred content types, and feature priorities. The application then generates personalized camera recommendations using a weighted recommendation algorithm.

The project demonstrates modern web development practices using Next.js, TypeScript, React, and server-side API routes, with future AI-assisted recommendation refinement planned.

## Features

- Multi-step questionnaire
- Personalized camera recommendations
- Weighted recommendation algorithm
- Budget-aware filtering
- Feature importance scoring
- Responsive UI
- Server-side recommendation API
- Type-safe TypeScript models

## Tech Stack

Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

Backend

- Next.js API Routes

Developer Tools

- ESLint
- Prettier
- VS Code
- Cursor AI

## Recommendation Engine

Each camera is scored against the user's questionnaire responses.

Scoring considers:

- Budget range
- Photography or Videography preference
- Preferred content types
- Skill level
- Autofocus importance
- Low-light importance
- Battery life importance
- Video quality importance
- Photo quality importance
- Portability importance

Each criterion contributes a weighted score.

The highest scoring cameras are ranked before tie-breakers are applied.

## Tie Breaking

When multiple cameras receive identical scores, they are ordered using:

1. Content type score
2. Use case score
3. Importance score
4. Budget score
5. Skill level score

This ensures recommendations prioritize the user's most meaningful preferences.

## Installing and Running the Application

git clone https://github.com/dwphil95/CameraFinder.git

npm install

npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Future Improvements

- AI-assisted recommendation refinement
- Saved recommendations
- Live camera database integration
- Lens recommendations

## AI-Assisted Development

Cursor AI was used as an engineering assistant for:

- Code review
- Refactoring suggestions
- Architecture discussions
- Maintainability improvements

All architectural decisions, implementation, and validation were completed manually.
