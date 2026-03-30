import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'next-themes'
// import './index.css'
import App from './App.tsx'
import "@repo/ui/globals.css";
import { Toaster } from "@repo/ui";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <App />
      <Toaster richColors />
    </ThemeProvider>
  </StrictMode>,
)
