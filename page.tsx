'use client'

import { useMemo, useState } from 'react'
import {
  Activity,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  HeartPulse,
  Hospital,
  LayoutDashboard,
  MapPin,
  Menu,
  Search,
  Settings2,
  ShieldCheck,
  Stethoscope,
  Users,
  X,
} from 'lucide-react'

const doctors = [
  { name: 'Dr. Sarah Mitchell', specialty: 'Cardiology', hospital: 'Northstar Medical Center', city: 'San Francisco', next: 'Today, 2:30 PM', fee: '$120', initials: 'SM', tone: 'bg-sky-100 text-sky-700' },
  { name: 'Dr. James Wilson', specialty: 'Orthopedics', hospital: 'Summit Health Hospital', city: 'San Francisco', next: 'Today, 4:00 PM', fee: '$95', initials: 'JW', tone: 'bg-indigo-100 text-indigo-700' },
  { name: 'Dr. Elena Rodriguez', specialty: 'Dermatology', hospital: 'Northstar Medical Center', city: 'Oakland', next: 'Tomorrow, 9:00 AM', fee: '$80', initials: 'ER', tone: 'bg-rose-100 text-rose-700' },
]

const appointments = [
  { patient: 'Michael Chen', doctor: 'Dr. Sarah Mitchell', time: '09:30 AM', type: 'Follow-up', status: 'Confirmed', initials: 'MC', tone: 'bg-amber-100 text-amber-700' },
  { patient: 'Ava Thompson', doctor: 'Dr. James Wilson', time: '10:15 AM', type: 'Consultation', status: 'Pending', initials: 'AT', tone: 'bg-violet-100 text-violet-700' },
  { patient: 'Robert Davis', doctor: 'Dr. Elena Rodriguez', time: '11:00 AM', type: 'New patient', status: 'Confirmed', initials: 'RD', tone: 'bg-emerald-100 text-emerald-700' },
  { patient: 'Sophia Patel', doctor: 'Dr. Sarah Mitchell', time: '01:30 PM', type: 'Annual checkup', status: 'Confirmed', initials: 'SP', tone: 'bg-pink-100 text-pink-700' },
]

function StatCard({ icon: Icon, label, value, detail, color }: { icon: typeof Users; label: string; value: string; detail: string; color: string }) {
  return <div className="stat-card">
    <div className={`stat-icon ${color}`}><Icon size={20} /></div>
    <div><p className="stat-label">{label}</p><p className="stat-value">{value}</p><p className="stat-detail">{detail}</p></div>
  </div>
}

export default function Page() {
  const [activeNav, setActiveNav] = useState('Overview')
  const [query, setQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [booked, setBooked] = useState<string | null>(null)
  const [actionMessage, setActionMessage] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  const notify = (message: string) => {
    setActionMessage(message)
    window.setTimeout(() => setActionMessage(null), 2600)
  }

  const filteredDoctors = useMemo(() => doctors.filter((doctor) => `${doctor.name} ${doctor.specialty} ${doctor.hospital}`.toLowerCase().includes(query.toLowerCase())), [query])

  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><HeartPulse size={20} /></div><div><strong>CareFlow</strong><span>Health systems</span></div><button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={20} /></button></div>
      <div className="workspace"><div className="workspace-avatar">NS</div><div><p>Northstar Medical</p><span>Admin workspace</span></div><ChevronRight size={15} /></div>
      <nav className="side-nav" aria-label="Main navigation">
        <p className="nav-label">Workspace</p>
        {[[LayoutDashboard, 'Overview'], [CalendarDays, 'Appointments'], [Users, 'Patients'], [Stethoscope, 'Doctors'], [Hospital, 'Hospitals']].map(([Icon, label]) => <button key={label as string} className={`nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => { setActiveNav(label as string); setMobileOpen(false) }}><Icon size={18} />{label as string}{label === 'Appointments' && <span className="nav-count">12</span>}</button>)}
        <p className="nav-label nav-label-spaced">Management</p>
        {[[Activity, 'Analytics'], [ShieldCheck, 'Audit logs'], [Settings2, 'Settings']].map(([Icon, label]) => <button key={label as string} className={`nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => { setActiveNav(label as string); setMobileOpen(false) }}><Icon size={18} />{label as string}</button>)}
      </nav>
      <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><ShieldCheck size={17} /></div><p>Need help?</p><span>Visit our support center</span><button onClick={() => notify('Support center opened')}>Get support <ChevronRight size={13} /></button></div><button className="profile-row" onClick={() => notify('Profile settings opened')}><div className="profile-avatar">AK</div><div><p>Alex Kim</p><span>System admin</span></div><Settings2 size={16} /></button></div>
    </aside>

    <main className="main-content">
      <header className="topbar"><button className="mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={22} /></button><div className="breadcrumb"><span>Workspace</span><ChevronRight size={14} /><strong>{activeNav}</strong></div><div className="top-actions"><button className="icon-button" aria-label="Notifications" onClick={() => notify('You have 3 new notifications')}><Bell size={19} /><span className="notification-dot" /></button><div className="top-avatar">AK</div></div></header>
      <div className="content-wrap">
        <section className="page-heading"><div><p className="eyebrow">Thursday, October 9, 2026</p><h1>Good morning, Alex <span>✦</span></h1><p className="subheading">Here&apos;s what&apos;s happening across your care network today.</p></div><button className="primary-button" onClick={() => setActiveNav('Appointments')}><CalendarDays size={17} />Schedule appointment</button></section>
        <section className="stats-grid"><StatCard icon={Hospital} label="Active hospitals" value="24" detail="+2 this month" color="blue" /><StatCard icon={Stethoscope} label="Total doctors" value="1,284" detail="+8.4% vs last month" color="purple" /><StatCard icon={Users} label="Registered patients" value="48,392" detail="+12.7% vs last month" color="green" /><StatCard icon={CalendarDays} label="Appointments today" value="186" detail="32 pending confirmation" color="orange" /></section>

        <section className="section-header"><div><h2>Find a doctor</h2><p>Search across your care network</p></div><button className="text-button" onClick={() => setActiveNav('Doctors')}>View directory <ChevronRight size={15} /></button></section>
        <div className="search-box"><Search size={19} /><input aria-label="Search doctors" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by doctor, specialty, or hospital..." /><span className="search-shortcut">⌘ K</span></div>
        <div className="doctor-grid">{filteredDoctors.map((doctor) => <article className="doctor-card" key={doctor.name}><div className="doctor-card-top"><div className={`doctor-avatar ${doctor.tone}`}>{doctor.initials}</div><button className="more-button" aria-label={`More options for ${doctor.name}`} onClick={() => notify(`More options for ${doctor.name}`)}>•••</button></div><h3>{doctor.name}</h3><p className="specialty">{doctor.specialty}</p><div className="doctor-meta"><span><Hospital size={14} />{doctor.hospital}</span><span><MapPin size={14} />{doctor.city}</span></div><div className="doctor-footer"><div><p>Next available</p><strong><Clock3 size={14} />{doctor.next}</strong></div><button className="outline-button" onClick={() => setBooked(doctor.name)}>Book now</button></div></article>)}</div>
        {filteredDoctors.length === 0 && <div className="empty-search">No doctors found. Try a different search.</div>}

        <section className="lower-grid"><div className="panel appointments-panel"><div className="panel-heading"><div><h2>Today&apos;s appointments</h2><p>Thursday, October 9 · 186 total</p></div><button className="icon-button small" aria-label="Appointment options" onClick={() => notify('Appointment options opened')}>•••</button></div><div className="appointment-list">{appointments.slice(0, showAll ? 4 : 3).map((appointment) => <div className="appointment-row" key={appointment.patient}><div className={`patient-avatar ${appointment.tone}`}>{appointment.initials}</div><div className="appointment-person"><strong>{appointment.patient}</strong><span>{appointment.doctor} · {appointment.type}</span></div><div className="appointment-time"><Clock3 size={14} />{appointment.time}</div><span className={`status ${appointment.status.toLowerCase()}`}>{appointment.status}</span></div>)}</div><button className="panel-link" onClick={() => setShowAll(!showAll)}>{showAll ? 'Show less' : 'View all appointments'} <ChevronRight size={15} /></button></div><div className="panel activity-panel"><div className="panel-heading"><div><h2>Network activity</h2><p>Recent updates across your system</p></div><Activity size={19} className="heading-icon" /></div><div className="activity-list"><div className="activity-item"><div className="activity-dot blue-dot" /><div><p><strong>Summit Health Hospital</strong> added 4 new doctors</p><span>12 minutes ago</span></div></div><div className="activity-item"><div className="activity-dot green-dot" /><div><p><strong>142 appointments</strong> confirmed today</p><span>1 hour ago</span></div></div><div className="activity-item"><div className="activity-dot purple-dot" /><div><p><strong>Dr. James Wilson</strong> updated availability</p><span>2 hours ago</span></div></div></div><button className="panel-link" onClick={() => { setActiveNav('Audit logs'); notify('Activity log opened') }}>Open activity log <ChevronRight size={15} /></button></div></section>
        <footer className="page-footer"><span>CareFlow Health Systems · All systems operational</span><button onClick={() => notify('Documentation opened')}><FileText size={14} /> Documentation</button></footer>
      </div>
    </main>
    {booked && <div className="toast"><CheckCircle2 size={18} /><div><strong>Appointment request started</strong><span>Select a slot with {booked}</span></div><button onClick={() => setBooked(null)} aria-label="Dismiss"><X size={16} /></button></div>}
    {actionMessage && <div className="toast action-toast" role="status"><CheckCircle2 size={18} /><div><strong>{actionMessage}</strong><span>Your selection is ready to continue.</span></div><button onClick={() => setActionMessage(null)} aria-label="Dismiss"><X size={16} /></button></div>}
  </div>
}
