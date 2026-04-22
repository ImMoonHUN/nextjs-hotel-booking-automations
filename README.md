🌙 Lumina House - Premium Booking & Automation System
This is a professional, concept-stage automated booking system for a fictional luxury guesthouse, Lumina House. It features a modern, high-end "Dark Luxury" UI, fully integrated simulated background automations, and a seamless bilingual experience.

✨ Features
Premium UI/UX: Responsive, Next.js 'App Router' based user interface utilizing native CSS modules, glassmorphism, and smooth transitions.
Bilingual Interface: A built-in language toggle switch instantly translates the interface, form values, and backend email processing between English (ENG) and Hungarian (HUN).
Room Selection: Browse and select between three custom AI-generated luxury suites (Obsidian Suite, Lumina Penthouse, Forest Haven).
Automations Demo Dashboard: A live, integrated terminal UI centered at the bottom of the page that visually tracks the background automation steps as they happen.
Smart Validation: Client-side form validations ensuring dates are strictly logical (no past bookings) and phone numbers match international formatting strictly.
Real-Time Ethereal Email Integration: The backend dynamically generates a testing SMTP account and sends a beautifully formatted HTML confirmation email containing the user's details, the localized hotel signature, and the selected room.
Mock CRM & Calendar: Simulates saving lead data into an Airtable Base and blocking unvailable dates out in Google Calendar, providing an excellent demonstration of system architecture without needing API keys.
🚀 Getting Started
To run this demonstration locally on your machine, you don't need any complex .env files or API keys. Everything is fully self-contained!

1. Clone the repository
bash
git clone https://github.com/ImMoonHUN/nextjs-hotel-booking-automations.git
cd nextjs-hotel-booking-automations
2. Install dependencies
bash
npm install
3. Start the development server
bash
npm run dev
Open http://localhost:3000 with your browser to see the result.

🛠️ Technology Stack
Next.js (App Router) - React Framework
Vanilla CSS Modules - Styling & Design System
Nodemailer & Ethereal - Email Automations
🎨 Design Philosophy
The system was crafted avoiding heavy UI frameworks, using pure CSS to maintain absolute control over the dark luxury aesthetic, micro-animations, and overall performance.
