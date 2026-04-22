'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

const TEXTS = {
  hu: {
    heroTitle: "Lumina House",
    heroDesc: "Prémium menedékotthon. Tapasztalja meg a luxust a természet szívében.",
    roomsTitle: "Válassza ki a lakosztályt",
    guestsMin: "fő",
    priceNight: " éj",
    btnSelected: "Kiválasztva",
    btnSelect: "Lefoglalom",
    formTitleSelect: "Foglalás véglegesítése: ",
    formTitleEmpty: "Válasszon szobát",
    labelName: "Teljes Név",
    placeholderName: "Kovács János",
    labelEmail: "Email Cím",
    placeholderEmail: "janos@pelda.com",
    labelPhone: "Telefonszám",
    placeholderPhone: "+36301234567",
    labelCheckin: "Érkezés",
    labelCheckout: "Távozás",
    labelGuests: "Vendégek száma",
    btnProcessing: "Feldolgozás...",
    btnSubmit: "Foglalás véglegesítése",
    alertNoRoomError: "Kérjük válasszon egy szobát a foglalás előtt!",
    alertNativeDialog: "Kérjük, először válasszon szobát a fenti listából!",
    alertDatePast: "Az érkezés dátuma nem lehet a múltban.",
    alertDateAfter: "A távozás dátumának későbbinek kell lennie, mint az érkezésnek.",
    alertPhoneInvalid: "Érvénytelen telefonszám. Kérjük, használjon számokat (opcionális '+' jellel), pl. +36301234567.",
    successTitle: "Foglalás Sikeres!",
    successSubtitle: "Köszönjük, {name}. Várjuk szeretettel!",
    successInfo: "Minden visszaigazolást elküldtünk a megadott e-mail címre.",
    contactTitle: "Szálloda Elérhetőségei",
    contactPhone: "+36 1 234 5678",
    btnTryAgain: "Új foglalás tesztelése",
    demoReady: "Készen áll az új foglalás fogadására...",
    demoReceiving: "▶ Foglalási kérelem vételre került...",
    demoView: "Megtekintés",
    demoSuccessAll: "✓ Minden automatizáció sikeresen lefutott.",
    roomsData: [
      {
        id: 'obsidian',
        name: 'Obsidian Suite',
        description: 'Ultra-prémium fekete lakosztály panorámás ablakkal a város fényei felé. Futurista üveg és selyem bársony elegancia.',
        guests: 2,
        price: '95,000 Ft / éj',
        image: '/room-obsidian.png'
      },
      {
        id: 'lumina',
        name: 'Lumina Penthouse',
        description: 'Fényes, de mély árnyalatú hegyi lakosztály óriási terasszal. A tökéletes elvonulás meleg borostyán fényekkel.',
        guests: 4,
        price: '140,000 Ft / éj',
        image: '/room-lumina.png'
      },
      {
        id: 'forest',
        name: 'Forest Haven',
        description: 'Modern luxus kabin az erdő szélén. Sötét tölgyfa burkolatok és kandalló a teljes nyugalomért.',
        guests: 3,
        price: '115,000 Ft / éj',
        image: '/room-forest.png'
      }
    ]
  },
  en: {
    heroTitle: "Lumina House",
    heroDesc: "Premium sanctuary. Experience true luxury deep in the heart of nature.",
    roomsTitle: "Select your suite",
    guestsMin: "guests",
    priceNight: " night",
    btnSelected: "Selected",
    btnSelect: "Book this",
    formTitleSelect: "Finalize booking: ",
    formTitleEmpty: "Select a room",
    labelName: "Full Name",
    placeholderName: "John Doe",
    labelEmail: "Email Address",
    placeholderEmail: "john.doe@example.com",
    labelPhone: "Phone Number",
    placeholderPhone: "+442071234567",
    labelCheckin: "Check-in",
    labelCheckout: "Check-out",
    labelGuests: "Number of Guests",
    btnProcessing: "Processing...",
    btnSubmit: "Confirm Booking",
    alertNoRoomError: "Please select a suite before finalizing your booking!",
    alertNativeDialog: "Please select a room from the list above first!",
    alertDatePast: "The check-in date cannot be in the past.",
    alertDateAfter: "The check-out date must be after the check-in date.",
    alertPhoneInvalid: "Invalid phone number format. Please use digits (optional leading '+'), e.g., +447911123456.",
    successTitle: "Booking Successful!",
    successSubtitle: "Thank you, {name}. We look forward to your stay!",
    successInfo: "All confirmations have been sent to your provided email address.",
    contactTitle: "Hotel Contact Info",
    contactPhone: "+44 20 7123 4567",
    btnTryAgain: "Start New Demo",
    demoReady: "Ready to receive new booking...",
    demoReceiving: "▶ Booking request received...",
    demoView: "View",
    demoSuccessAll: "✓ All automations successfully triggered.",
    roomsData: [
      {
        id: 'obsidian',
        name: 'Obsidian Suite',
        description: 'Ultra-premium black suite with panoramic windows overlooking the city lights. Futuristic glass and silk velvet elegance.',
        guests: 2,
        price: '95,000 HUF / night',
        image: '/room-obsidian.png'
      },
      {
        id: 'lumina',
        name: 'Lumina Penthouse',
        description: 'Bright yet moody mountain penthouse with a huge terrace. The perfect retreat with warm amber lighting.',
        guests: 4,
        price: '140,000 HUF / night',
        image: '/room-lumina.png'
      },
      {
        id: 'forest',
        name: 'Forest Haven',
        description: 'Modern luxury cabin at the edge of the forest. Dark oak paneling and a glowing fireplace for total tranquility.',
        guests: 3,
        price: '115,000 HUF / night',
        image: '/room-forest.png'
      }
    ]
  }
};

export default function Home() {
  const [lang, setLang] = useState('hu');
  const t = TEXTS[lang];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '1',
    room: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const formRef = useRef(null);

  const toggleLang = () => {
    setLang(prev => prev === 'hu' ? 'en' : 'hu');
  };

  const handleRoomSelect = (roomId) => {
    setFormData({ ...formData, room: roomId });
    // Scroll to the booking form
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleChange = (e) => {
    setErrorMsg(''); // Clear error when user types
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.room) {
      setErrorMsg(t.alertNativeDialog);
      return;
    }

    // Phone validation (optional leading +, then 10-15 digits, no spaces)
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      setErrorMsg(t.alertPhoneInvalid);
      return;
    }

    // Date validation
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to midnight
    const checkInDate = new Date(formData.checkIn);
    if (checkInDate < today) {
      setErrorMsg(t.alertDatePast);
      return;
    }

    const checkOutDate = new Date(formData.checkOut);
    if (checkOutDate <= checkInDate) {
      setErrorMsg(t.alertDateAfter);
      return;
    }

    setIsSubmitting(true);
    setResult(null);

    // Provide the original names / unlocalized logic or just standard data to API
    // The API handles email logic in HU currently. (To make email completely multilingual we'd need to pass req lang. For now, doing it is a bonus but let's just pass `lang`)
    const payload = { ...formData, lang };

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({ success: false, message: lang === 'hu' ? "Hiba történt a kommunikáció során." : "Network error occurred." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.mainWrapper}>

      {/* LANGUAGE TOGGLE */}
      <button className={styles.langToggle} onClick={toggleLang} aria-label="Toggle language">
        {lang === 'hu' ? 'ENG' : 'HUN'}
      </button>

      <div className={styles.contentArea}>

        {/* HERO SECTION */}
        <section className={styles.heroSection}>
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h1>{t.heroTitle}</h1>
            <p>{t.heroDesc}</p>
          </div>
        </section>

        {/* ROOMS SELECTION */}
        <section className={styles.roomsSection}>
          <h2 className={styles.sectionTitle}>{t.roomsTitle}</h2>
          <div className={styles.roomsGrid}>
            {t.roomsData.map((room) => (
              <div
                key={room.id}
                className={`${styles.roomCard} ${formData.room === room.id ? styles.selectedRoom : ''}`}
                onClick={() => handleRoomSelect(room.id)}
              >
                <div className={styles.roomImageContainer}>
                  <Image src={room.image} alt={room.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.roomDetails}>
                  <h3>{room.name}</h3>
                  <p className={styles.roomDesc}>{room.description}</p>
                  <div className={styles.roomMeta}>
                    <span>Max {room.guests} {t.guestsMin}</span>
                    <span className={styles.roomPrice}>{room.price}</span>
                  </div>
                  <button
                    className={formData.room === room.id ? "btn-primary" : styles.btnOutline}
                    style={{ marginTop: '1rem', width: '100%' }}
                  >
                    {formData.room === room.id ? t.btnSelected : t.btnSelect}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BOOKING FORM */}
        <section className={styles.bookingSection} ref={formRef}>
          <div className={`glass-panel animate-fade-in ${styles.bookingPanel}`}>
            {result?.success ? (
              <div className={styles.successState}>
                <div className={styles.successIcon}>✓</div>
                <h2>{t.successTitle}</h2>
                <p>{t.successSubtitle.replace('{name}', formData.name)}</p>

                <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>{t.successInfo}</p>

                <div className={styles.contactBlock}>
                  <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>{t.contactTitle}</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>📞 {t.contactPhone}</p>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>✉️ recepcio@luminahouse.demo</p>
                </div>

                <button onClick={() => { setResult(null); setFormData(p => ({ ...p, room: '' })); }} className="btn-primary" style={{ marginTop: '2rem' }}>
                  {t.btnTryAgain}
                </button>
              </div>
            ) : (
              <div>
                <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>
                  {formData.room ? `${t.formTitleSelect}${t.roomsData.find(r => r.id === formData.room)?.name}` : t.formTitleEmpty}
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">{t.labelName}</label>
                    <input type="text" id="name" name="name" className="form-input" placeholder={t.placeholderName} value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className={styles.row}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">{t.labelEmail}</label>
                      <input type="email" id="email" name="email" className="form-input" placeholder={t.placeholderEmail} value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">{t.labelPhone}</label>
                      <input type="tel" id="phone" name="phone" className="form-input" placeholder={t.placeholderPhone} value={formData.phone} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="checkIn">{t.labelCheckin}</label>
                      <input type="date" id="checkIn" name="checkIn" className="form-input" value={formData.checkIn} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="checkOut">{t.labelCheckout}</label>
                      <input type="date" id="checkOut" name="checkOut" className="form-input" value={formData.checkOut} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="guests">{t.labelGuests}</label>
                    <select id="guests" name="guests" className="form-input" value={formData.guests} onChange={handleChange} required>
                      <option value="1">1 {t.guestsMin}</option>
                      <option value="2">2 {t.guestsMin}</option>
                      <option value="3">3 {t.guestsMin}</option>
                      <option value="4">4 {t.guestsMin}</option>
                    </select>
                  </div>

                  {errorMsg && (
                    <div style={{ background: 'rgba(207, 102, 121, 0.1)', border: '1px solid var(--danger)', color: 'var(--danger)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                      ⚠️ {errorMsg}
                    </div>
                  )}

                  <button type="submit" className="btn-primary" disabled={isSubmitting || !formData.room}>
                    {isSubmitting ? t.btnProcessing : t.btnSubmit}
                  </button>
                  {!formData.room && (
                    <p style={{ color: 'var(--danger)', fontSize: '0.85rem', marginTop: '0.5rem', textAlign: 'center' }}>
                      {t.alertNoRoomError}
                    </p>
                  )}
                </form>
              </div>
            )}
          </div>
        </section>

      </div>

      {/* Demo Dashboard Overlay / Terminal */}
      <div className={`${styles.demoDashboard} ${result ? styles.dashboardActive : ''}`}>
        <div className={styles.dashboardHeader}>
          <h3>⚙️ Automations Demo</h3>
          <span className="status-badge status-success">Live</span>
        </div>

        <div className={styles.logContainer}>
          {!result && !isSubmitting && (
            <div className={styles.logItem}>
              <span className={styles.logTime}>{new Date().toLocaleTimeString()}</span>
              <span>{t.demoReady}</span>
            </div>
          )}

          {isSubmitting && (
            <div className={styles.logItem}>
              <span className={styles.logTime}>{new Date().toLocaleTimeString()}</span>
              <span style={{ color: 'var(--accent)' }}>{t.demoReceiving}</span>
            </div>
          )}

          {result && result.logs && result.logs.map((log, idx) => (
            <div key={idx} className={styles.logItem}>
              <span className={styles.logTime}>{new Date().toLocaleTimeString()}</span>
              <span className={log.type === 'success' ? styles.logSuccess : styles.logInfo}>
                {log.message}
              </span>
              {log.link && (
                <a href={log.link} target="_blank" rel="noreferrer" className={styles.demoLink}>
                  {t.demoView}
                </a>
              )}
            </div>
          ))}

          {result && result.success && (
            <div className={styles.logItem}>
              <span className={styles.logTime}>{new Date().toLocaleTimeString()}</span>
              <span className={styles.logSuccess}>{t.demoSuccessAll}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
