# ZoZO-shop

Webbshop med integration mot stripe
Inlämningsuppgift i kursen "Systemstöd och intergration med 3:e parts system".
Backend: Node.js/Express
Frontend:React/Typescript

## Installation

- Börja med att forka ner repot

### Installera och starta Backend

- Navigera till <där du har lagt projektet>/ZoZo/server med hjälp av valfri terminal
- Kör kommandot `npm install` för att installera alla dependencies för backend (lista över dependencies finns nedan)
- Kör kommandot `npm run dev`för att starta webservern

### Installera front end

- Starta ytterligare en terminal
- Navigera till <där du har lagt projektet>/ZoZo/client med den nya terminalen
- Kör kommandot `npm install` för att installera alla dependencies för front end (lista över dependencies finns nedan)
- Kör kommandot `npm run dev` för att starta utvecklarläget för front end
- Klicka på länken som kommer fram i din terminal.

Länk till GitHubRepot:

### Backend dependencies

    "bcrypt": "^5.1.1",
    "cookie-session": "^2.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "stripe": "^13.4.0"

### Front end dependencies

    "bootstrap": "^5.1.3",
    "react": "^18.2.0",
    "react-bootstrap": "^2.8.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.15.0"

### Front end dev dependencies

    "@types/bootstrap": "^5.2.6",
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.3",
    "eslint": "^8.45.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
