import { useState, useEffect } from 'react';
import { TbHeartbeat } from 'react-icons/tb';

const NAV = [
  { label: '배경', id: 'background' },
  { label: '데이터', id: 'data' },
  { label: '기법', id: 'method' },
  { label: '성능 지표', id: 'final-result' },
  { label: '임상 해석', id: 'clinical' },
  { label: '활용', id: 'application' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300"
      style={scrolled ? { background: 'rgba(10,10,15,0.88)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' } : {}}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2">
          <TbHeartbeat size={22} style={{ color: '#f472b6' }} />
          <span className="font-bold text-white">MADE <span style={{ color: '#f472b6' }}>AF Predict</span></span>
        </button>

        {/* desktop nav */}
        <div className="hidden md:flex items-center gap-5">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => scrollTo(n.id)}
              className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
              {n.label}
            </button>
          ))}
        </div>

        {/* mobile menu btn */}
        <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setMenuOpen(o => !o)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-3 glass rounded-2xl p-4 mx-0">
          <div className="flex flex-col gap-1">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)}
                className="text-left px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all text-sm">
                {n.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
