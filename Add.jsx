import { useEffect, useState, useMemo, useCallback, memo } from "react";
import { motion } from "framer-motion";

// Simple icon components (SVG) so the file is self-contained
// ใช้ useCallback เพื่อป้องกันการ re-render ไอคอนที่ไม่จำเป็น
const IconChip = memo(() => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2"/>
    <rect x="6.75" y="6.75" width="10.5" height="10.5" rx="2"/>
  </svg>
));
const IconCloud = memo(() => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M7 18a5 5 0 1 1 .9-9.9A6 6 0 1 1 19 13.5h-1"/>
  </svg>
));
const IconShield = memo(() => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z"/>
  </svg>
));
const IconRobot = memo(() => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="5" y="7" width="14" height="10" rx="2"/>
    <circle cx="9" cy="12" r="1.5"/>
    <circle cx="15" cy="12" r="1.5"/>
    <path d="M12 3v3M8 19v2M16 19v2"/>
  </svg>
));
const IconARVR = memo(() => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="8" width="18" height="8" rx="2"/>
    <path d="M7 12h2l1 2 1-2h2l1 2 1-2h2"/>
  </svg>
));
const IconBlocks = memo(() => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="8" height="8" rx="1"/>
    <rect x="13" y="3" width="8" height="8" rx="1"/>
    <rect x="3" y="13" width="8" height="8" rx="1"/>
    <rect x="13" y="13" width="8" height="8" rx="1"/>
  </svg>
));
const IconWifi = memo(() => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2.5 8.5a15 15 0 0 1 19 0M5 11.5a11 11 0 0 1 14 0M7.5 14.5a7 7 0 0 1 9 0"/>
    <circle cx="12" cy="18" r="1.5"/>
  </svg>
));
const IconDatabase = memo(() => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="12" cy="5" rx="7" ry="3"/>
    <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>
  </svg>
));

// ใช้ React.memo on components that don't need to re-render
const NavLink = memo(({ to, label, onClick }) => (
  <a href={to} className="hover:text-white text-slate-300 transition" onClick={onClick}>{label}</a>
));

const MobileNavLink = memo(({ to, label, onClick }) => (
  <a href={to} className="py-2 text-slate-200" onClick={onClick}>{label}</a>
));

// Component ใหม่สำหรับ FAQ เพื่อให้โค้ดในส่วนหลักกระชับขึ้น
const FAQItem = memo(({ item }) => (
  <details className="group p-5">
    <summary className="cursor-pointer list-none flex items-center justify-between">
      <span className="font-medium">{item.q}</span>
      <span className="text-slate-400 group-open:rotate-180 transition">⌄</span>
    </summary>
    <p className="mt-2 text-sm text-slate-300">{item.a}</p>
  </details>
));

export default function DigitalTechSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ใช้ useMemo เพื่อสร้างข้อมูลเพียงครั้งเดียวและป้องกันการ re-create ในทุกๆ render
  const sections = useMemo(() => [
    { id: "what", label: "เทคโนโลยีดิจิทัลคืออะไร" },
    { id: "why", label: "สำคัญต่อชีวิตประจำวันอย่างไร" },
    { id: "types", label: "มีอะไรบ้าง" },
    { id: "learn", label: "จะเริ่มศึกษาอย่างไร" },
    { id: "gallery", label: "แกลเลอรีภาพ" },
    { id: "faq", label: "คำถามที่พบบ่อย" },
  ], []);

  const fadeUp = {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.5 }
  };
  
  const handleToggleMenu = useCallback(() => {
    setMenuOpen(v => !v);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100 selection:bg-sky-600/40">
      {/* GLOW BACKDROP */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-sky-600/20 blur-3xl"/>
        <div className="absolute top-40 right-0 h-[28rem] w-[28rem] rounded-full bg-indigo-600/20 blur-3xl"/>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-cyan-500/10 blur-2xl"/>
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur bg-slate-900/60 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-semibold text-white">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-sky-600 to-indigo-600 text-white shadow-lg shadow-sky-900/40 ring-1 ring-white/10">DT</span>
            <span>Digital Tech 101</span>
          </a>
          <nav className="hidden md:flex gap-6 text-sm">
            {sections.map(s => (
              <NavLink key={s.id} to={`#${s.id}`} label={s.label} />
            ))}
          </nav>
          <button
            className="md:hidden p-2 rounded-xl border border-slate-700 text-slate-200"
            aria-label="Toggle menu"
            onClick={handleToggleMenu}
          >
            ☰
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-slate-800 px-4 pb-3 bg-slate-900/80">
            <div className="flex flex-col gap-2 pt-2">
              {sections.map(s => (
                <MobileNavLink key={s.id} to={`#${s.id}`} label={s.label} onClick={handleCloseMenu} />
              ))}
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <motion.div {...fadeUp} className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              ปูพื้นฐาน <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_1px_6px_rgba(14,165,233,0.5)]">เทคโนโลยีดิจิทัล</span> สำหรับทุกคน
            </h1>
            <p className="mt-4 text-slate-300 text-lg">
              โทน <span className="text-sky-300">ดำ‑น้ำเงิน</span> ล้ำสมัย เน้นความคมชัด และเอฟเฟกต์แสงแบบนีออน
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#learn" className="px-5 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-medium shadow-lg shadow-sky-900/30 ring-1 ring-white/10">
                เริ่มต้นเรียนรู้
              </a>
              <a href="#types" className="px-5 py-3 rounded-2xl border border-slate-700 font-medium text-slate-100 hover:bg-slate-800/60">
                สำรวจสาขายอดนิยม
              </a>
            </div>
          </motion.div>
          <motion.div {...fadeUp} className="mt-10 grid md:grid-cols-2 gap-6">
            <img className="rounded-2xl ring-1 ring-white/10 shadow-xl object-cover h-64 w-full" src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1600&q=80" alt="วงจรรวมและชิป" loading="lazy"/>
            <img className="rounded-2xl ring-1 ring-white/10 shadow-xl object-cover h-64 w-full" src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80" alt="ทีมงานกับจอภาพข้อมูลอนาคต" loading="lazy"/>
          </motion.div>
        </div>
      </section>

      {/* WHAT */}
      <section id="what" className="max-w-6xl mx-auto px-4 py-16">
        <motion.div {...fadeUp}>
          <h2 className="text-2xl md:text-3xl font-bold">เทคโนโลยีดิจิทัลคืออะไร</h2>
          <p className="mt-4 text-slate-300 leading-relaxed">
            <strong className="text-sky-300">เทคโนโลยีดิจิทัล</strong> คือการใช้ข้อมูลดิจิทัลร่วมกับฮาร์ดแวร์ ซอฟต์แวร์ และเครือข่าย เพื่อสร้าง ประมวลผล จัดเก็บ และแลกเปลี่ยนข้อมูลอย่างมีประสิทธิภาพ ตัวอย่างเช่น สมาร์ตโฟน แอปพลิเคชัน คลาวด์คอมพิวติง ปัญญาประดิษฐ์ และอินเทอร์เน็ตของสรรพสิ่ง (IoT)
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { icon: <IconChip/>, title: "ดิจิไทซ์ (Digitize)", desc: "แปลงสิ่งอนาล็อกเป็นดิจิทัล เช่น เอกสาร เสียง รูปภาพ" },
              { icon: <IconCloud/>, title: "ดิจิทัลไลเซชัน (Digitalization)", desc: "ใช้เทคโนโลยีช่วยทำงานเดิมให้ดีขึ้น รวดเร็วขึ้น" },
              { icon: <IconBlocks/>, title: "ทรานส์ฟอร์เมชัน (Digital Transformation)", desc: "ปรับกระบวนการและรูปแบบธุรกิจใหม่ด้วยดิจิทัล" },
            ].map((c, i) => (
              <motion.div key={i} {...fadeUp} className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-sm ring-1 ring-white/5 hover:ring-sky-500/30">
                <div className="flex items-center gap-3">
                  <span className="text-sky-300">{c.icon}</span>
                  <h3 className="font-semibold">{c.title}</h3>
                </div>
                <p className="mt-2 text-sm text-slate-300">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* WHY */}
      <section id="why" className="bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <motion.div {...fadeUp}>
            <h2 className="text-2xl md:text-3xl font-bold">ทำไมจึงสำคัญต่อชีวิตประจำวัน</h2>
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              {[
                { icon: <IconWifi/>, title: "การสื่อสารและการทำงาน", desc: "วิดีโอคอล อีเมล แชต เครื่องมือทำงานร่วมกัน ทำให้ทำงานได้จากทุกที่" },
                { icon: <IconDatabase/>, title: "ข้อมูลและการตัดสินใจ", desc: "ค้นหา วิเคราะห์ และใช้ข้อมูลช่วยตัดสินใจส่วนตัวและธุรกิจ" },
                { icon: <IconShield/>, title: "ความปลอดภัยและความเป็นส่วนตัว", desc: "รู้เท่าทันภัยไซเบอร์ ตั้งค่าความเป็นส่วนตัว ป้องกันข้อมูลส่วนบุคคล" },
              ].map((c, i) => (
                <motion.div key={i} {...fadeUp} className="p-5 rounded-2xl border border-slate-800 bg-slate-950/60 shadow-sm ring-1 ring-white/5 hover:ring-indigo-500/30">
                  <div className="flex items-center gap-3">
                    <span className="text-indigo-300">{c.icon}</span>
                    <h3 className="font-semibold">{c.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TYPES */}
      <section id="types" className="max-w-6xl mx-auto px-4 py-16">
        <motion.div {...fadeUp}>
          <h2 className="text-2xl md:text-3xl font-bold">สาขาหลักของเทคโนโลยีดิจิทัล (มีอะไรบ้าง)</h2>
          <p className="mt-3 text-slate-300">เลือกสำรวจแต่ละสาขาเพื่อดูทักษะ เครื่องมือ และตัวอย่างอาชีพ</p>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: <IconRobot/>, title: "ปัญญาประดิษฐ์ (AI)", skills: "พื้นฐาน Python, สถิติ, ML, LLM", jobs: "Data/ML Engineer, AI Engineer" },
              { icon: <IconCloud/>, title: "คลาวด์คอมพิวติง", skills: "บริการ IaaS/PaaS/SaaS, Docker, CI/CD", jobs: "Cloud/DevOps Engineer" },
              { icon: <IconShield/>, title: "ความมั่นคงไซเบอร์", skills: "เครือข่าย, การเข้ารหัส, Pentest", jobs: "Security Analyst, SOC" },
              { icon: <IconDatabase/>, title: "วิทยาการข้อมูล", skills: "SQL, Python, Visualization", jobs: "Data Analyst/Scientist" },
              { icon: <IconBlocks/>, title: "บล็อกเชนและเว็บ3", skills: "Smart Contract, Solidity, Token", jobs: "Blockchain Dev" },
              { icon: <IconARVR/>, title: "AR/VR และกราฟิก", skills: "Unity/Unreal, 3D, UX", jobs: "XR Developer, 3D Artist" },
              { icon: <IconChip/>, title: "ซอฟต์แวร์และเว็บ", skills: "HTML/CSS/JS, React, API", jobs: "Frontend/Backend/Full-stack" },
              { icon: <IconWifi/>, title: "เครือข่ายและ 5G", skills: "Routing, Wireless, Edge", jobs: "Network Engineer" },
              { icon: <IconRobot/>, title: "หุ่นยนต์และ IoT", skills: "ไมโครคอนโทรลเลอร์, Sensor, MQTT", jobs: "Embedded/Robotics" },
            ].map((c, i) => (
              <motion.div key={i} {...fadeUp} className="group p-5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-sm hover:shadow-xl hover:shadow-sky-900/20 hover:border-sky-700/40 transition">
                <div className="flex items-center gap-3">
                  <span className="text-cyan-300">{c.icon}</span>
                  <h3 className="font-semibold">{c.title}</h3>
                </div>
                <p className="mt-2 text-sm text-slate-300"><span className="font-medium text-sky-300">ทักษะ:</span> {c.skills}</p>
                <p className="text-sm text-slate-300"><span className="font-medium text-sky-300">อาชีพที่เกี่ยวข้อง:</span> {c.jobs}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* LEARN */}
      <section id="learn" className="bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <motion.div {...fadeUp}>
            <h2 className="text-2xl md:text-3xl font-bold">จะเริ่มศึกษาอย่างไร (Roadmap แนะนำ)</h2>
            <div className="mt-6 grid lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Beginner — พื้นฐานดิจิทัล",
                  points: [
                    "ความรู้ดิจิทัล (Digital Literacy): ระบบไฟล์ คลาวด์ อีเมล ความปลอดภัยพื้นฐาน",
                    "ทักษะโค้ดดิ้งเบื้องต้น: HTML/CSS/JS หรือ Python",
                    "การคิดเชิงตรรกะและอัลกอริทึม",
                  ],
                  action: "เริ่มจากคอร์สฟรีและโปรเจ็กต์เล็ก ๆ 1–2 สัปดาห์",
                },
                {
                  title: "Intermediate — ลงลึกสาขา",
                  points: [
                    "เลือกสาขาที่สนใจ (เช่น เว็บ, ข้อมูล, AI)",
                    "ทำโปรเจ็กต์ 2–3 ชิ้น สร้างพอร์ตโฟลิโอใน GitHub",
                    "เรียนรู้เครื่องมือมาตรฐาน: Git, Docker, API, Cloud เบื้องต้น",
                  ],
                  action: "เข้าร่วมชุมชน แก้โจทย์จากโลกจริง",
                },
                {
                  title: "Advanced — มืออาชีพ",
                  points: [
                    "ออกแบบสถาปัตยกรรม/ระบบ, ทดสอบอัตโนมัติ, สเกลและความปลอดภัย",
                    "เรียนรู้แนวปฏิบัติ DevOps/ML Ops",
                    "เตรียมตัวสัมภาษณ์และปรับเรซูเม่",
                  ],
                  action: "ทำงานร่วมทีม เปิดซอร์ส และรับ Feedback อย่างสม่ำเสมอ",
                },
              ].map((c, i) => (
                <motion.div key={i} {...fadeUp} className="p-5 rounded-2xl border border-slate-800 bg-slate-950/60 shadow-sm ring-1 ring-white/5">
                  <h3 className="font-semibold flex items-center justify-between">
                    {c.title}
                    <span className="text-xs px-2 py-1 rounded-full bg-slate-800 border border-slate-700">ขั้นที่ {i+1}</span>
                  </h3>
                  <ul className="mt-3 list-disc pl-5 text-sm text-slate-300 space-y-1">
                    {c.points.map((p, j) => <li key={j}>{p}</li>)}
                  </ul>
                  <p className="mt-3 text-sm text-slate-300"><span className="font-medium text-sky-300">แนะนำ:</span> {c.action}</p>
                </motion.div>
              ))}
            </div>

            {/* Resources */}
            <div className="mt-8 p-5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-sm ring-1 ring-white/5">
              <h3 className="font-semibold text-sky-300">แหล่งเรียนรู้ที่แนะนำ</h3>
              <div className="mt-3 grid md:grid-cols-2 gap-3 text-sm text-slate-300">
                <ul className="list-disc pl-5 space-y-1">
                  <li>คอร์สออนไลน์: MOOC (Coursera, edX, Udemy, Kaggle Learn)</li>
                  <li>เว็บทางการ/เอกสาร: MDN Web Docs, Python Docs, Cloud Docs</li>
                  <li>ชุมชน: Stack Overflow, GitHub, Reddit, Facebook Groups</li>
                </ul>
                <ul className="list-disc pl-5 space-y-1">
                  <li>เครื่องมือ: VS Code, Git & GitHub, Colab/Notebook, Figma</li>
                  <li>แนะแนวอาชีพ: LinkedIn Learning, Roadmap.sh, Awesome Lists</li>
                  <li>ภาษาไทย: คอร์ส/เพจชุมชนในไทย, YouTube ช่องสอนเขียนโค้ด</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="max-w-6xl mx-auto px-4 py-16">
        <motion.div {...fadeUp}>
          <h2 className="text-2xl md:text-3xl font-bold">แกลเลอรีภาพประกอบ</h2>
          <p className="mt-3 text-slate-300">ภาพบรรยากาศแนวอนาคต โทนดำ‑น้ำเงิน ใช้ประกอบการสอน/นำเสนอ</p>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
                alt: "วงจรอิเล็กทรอนิกส์สีน้ำเงิน"
              },
              {
                src: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&w=1600&q=80",
                alt: "เมืองล้ำสมัยและเส้นแสง"
              },
              {
                src: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80",
                alt: "ข้อมูลแบบกราฟและเส้นใยแสง"
              },
              {
                src: "https://images.unsplash.com/photo-1542834369-f10ebf06d3cb?auto=format&fit=crop&w=1600&q=80",
                alt: "จอภาพโค้ดและระบบคลาวด์"
              },
              {
                src: "https://images.unsplash.com/photo-1551281044-8e8b71f70cc2?auto=format&fit=crop&w=1600&q=80",
                alt: "หุ่นยนต์และแขนกล"
              },
              {
                src: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1600&q=80",
                alt: "เครือข่ายและไซเบอร์ซีเคียวริตี้"
              }
            ].map((img, i) => (
              <figure key={i} className="relative group overflow-hidden rounded-2xl ring-1 ring-white/10">
                {/* เพิ่ม lazy loading เพื่อปรับปรุงประสิทธิภาพ */}
                <img src={img.src} alt={img.alt} className="h-56 w-full object-cover transition group-hover:scale-105" loading="lazy"/>
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-3 text-xs text-slate-200">
                  {img.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-6xl mx-auto px-4 py-16">
        <motion.div {...fadeUp}>
          <h2 className="text-2xl md:text-3xl font-bold">คำถามที่พบบ่อย</h2>
          <div className="mt-6 divide-y divide-slate-800 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-sm ring-1 ring-white/5">
            {[
              {
                q: "ต้องมีพื้นฐานคณิตศาสตร์เยอะไหม?",
                a: "ไม่จำเป็นสำหรับทุกสาขา เว็บและซอฟต์แวร์ทั่วไปใช้ตรรกะมากกว่าคณิตศาสตร์ขั้นสูง ส่วน AI/ข้อมูลจะใช้สถิติบ้าง เริ่มแบบค่อยเป็นค่อยไปได้",
              },
              {
                q: "ควรเริ่มภาษาอะไรดี?",
                a: "ถ้าสนใจพัฒนาเว็บ เริ่มที่ HTML/CSS/JavaScript; ถ้าสนใจข้อมูล/AI เริ่มที่ Python; ถ้าสนใจระบบ/เกม อาจดู C/C++/C#",
              },
              {
                q: "ต้องมีคอมสเปกแรงไหม?",
                a: "งานส่วนใหญ่ใช้คอมทั่วไปได้ และใช้คลาวด์ช่วยประมวลผล/ฝึกโมเดลได้",
              },
            ].map((item, i) => (
              // ใช้ Component ใหม่ที่สร้างขึ้น
              <FAQItem key={i} item={item} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Footer */}
      <footer className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold">พร้อมเริ่มเรียนรู้แล้วหรือยัง?</p>
            <p className="text-sm text-slate-300">ตั้งเป้าหมาย 30 วัน ทำโปรเจ็กต์เล็ก ๆ ทุกสัปดาห์ แล้วแชร์ผลงาน</p>
          </div>
          <div className="flex gap-3">
            <a href="#learn" className="px-5 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-medium shadow-lg shadow-sky-900/30 ring-1 ring-white/10">เปิดแผนการเรียน</a>
            <a href="#types" className="px-5 py-3 rounded-2xl border border-slate-700 font-medium text-slate-100 hover:bg-slate-800/60">เลือกสาขาที่ใช่</a>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-2xl border border-slate-700 bg-slate-900/80 backdrop-blur shadow-lg text-slate-200 ring-1 ring-white/10"
          aria-label="Back to top"
        >↑</button>
      )}
    </div>
  );
}
เพิ่มโค้ดเว็บไซต์ดิจิทัล
