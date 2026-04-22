import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Helper for fake delay to simulate API calls
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ROOM_NAMES = {
  'obsidian': 'Obsidian Suite',
  'lumina': 'Lumina Penthouse',
  'forest': 'Forest Haven'
};

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, phone, checkIn, checkOut, guests, room, lang } = data;

    // Basic validation
    if (!name || !email || !phone || !checkIn || !checkOut || !room) {
      return NextResponse.json({ success: false, message: lang === 'en' ? 'All fields and room selection are required.' : 'Minden mező és a szoba kiválasztása kötelező.' }, { status: 400 });
    }

    const roomName = ROOM_NAMES[room] || (lang === 'en' ? 'Unknown room' : 'Ismeretlen szoba');
    const logs = [];

    const isEn = lang === 'en';

    // --- 1. Ethereal Email (Sikeres automatizáció szimuláció, valós teszt linkkel) ---
    let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const emailSubject = isEn ? `Confirmation: Booking for ${roomName}` : `Visszaigazolás: Foglalás a ${roomName} lakosztályba`;
    const emailHtml = isEn ? `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #D4AF37;">Dear ${name}!</h2>
          <p>Thank you for choosing Lumina House. Your booking for the <strong>${roomName}</strong> suite has been successfully recorded in our system.</p>
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #D4AF37; margin: 20px 0;">
            <p><strong>Suite:</strong> ${roomName}</p>
            <p><strong>Check-in:</strong> ${checkIn}</p>
            <p><strong>Check-out:</strong> ${checkOut}</p>
            <p><strong>Guests:</strong> ${guests}</p>
            <p><strong>Phone number:</strong> ${phone}</p>
          </div>
          <p>We will contact you shortly with further details.</p>
          <div style="margin-top: 30px; font-size: 0.9em; color: #666; border-top: 1px solid #ccc; padding-top: 15px;">
            <strong>Lumina House Reception</strong><br>
            Phone: +44 20 7123 4567<br>
            Email: recepcio@luminahouse.demo
          </div>
        </div>
      ` : `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #D4AF37;">Kedves ${name}!</h2>
          <p>Köszönjük, hogy a Lumina Haus-t választotta. A foglalását a <strong>${roomName}</strong> lakosztályra rögzítettük rendszerünkben.</p>
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #D4AF37; margin: 20px 0;">
            <p><strong>Lakosztály:</strong> ${roomName}</p>
            <p><strong>Érkezés:</strong> ${checkIn}</p>
            <p><strong>Távozás:</strong> ${checkOut}</p>
            <p><strong>Vendégek száma:</strong> ${guests} fő</p>
            <p><strong>Megadott telefonszám:</strong> ${phone}</p>
          </div>
          <p>Hamarosan felvesszük Önnel a kapcsolatot a további részletekkel.</p>
          <div style="margin-top: 30px; font-size: 0.9em; color: #666; border-top: 1px solid #ccc; padding-top: 15px;">
            <strong>Lumina Haus Recepció</strong><br>
            Telefon: +36 1 234 5678<br>
            Email: recepcio@luminahaus.demo
          </div>
        </div>
      `;

    const info = await transporter.sendMail({
      from: '"Lumina Haus Automations" <no-reply@luminahaus.demo>',
      to: email,
      subject: emailSubject,
      html: emailHtml,
    });

    const emailUrl = nodemailer.getTestMessageUrl(info);
    logs.push({
      type: 'success',
      message: isEn ? `Email sent to ${email} (${roomName}).` : `Email elküldve a(z) ${email} címre (${roomName}).`,
      link: emailUrl
    });

    // --- 2. Airtable Szimuláció ---
    await delay(800); // Faking network request
    logs.push({
      type: 'success',
      message: isEn ? `Guest data (Name, Email, Phone: ${phone}) and suite (${roomName}) saved to Airtable 'Bookings' base.` : `Vendég adatai (Név, Email, Telefon: ${phone}) és szoba (${roomName}) mentve az Airtable 'Bookings' táblázatba.`
    });

    // --- 3. Google Calendar Szimuláció ---
    await delay(600); // Faking network request
    logs.push({
      type: 'success',
      message: isEn ? `Google Calendar event created: '${name} - ${roomName}' (${checkIn} - ${checkOut}).` : `Google Naptár esemény: '${name} - ${roomName}' (${checkIn} - ${checkOut}).`
    });

    return NextResponse.json({ success: true, logs });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, message: 'Hiba a feldolgozás során.' }, { status: 500 });
  }
}
