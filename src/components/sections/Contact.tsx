import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Linkedin, Github, Mail } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const FIELD_STYLE = {
  width: '100%',
  padding: '10px 14px',
  border: '1px solid #E8E4DC',
  borderRadius: 6,
  background: '#FAFAF7',
  fontFamily: "'Inter', sans-serif",
  fontSize: 14,
  color: '#2C2C2A',
  outline: 'none',
  transition: 'border-color 0.15s',
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

    if (!serviceId || !templateId || !publicKey) {
      console.error('Missing EmailJS environment variables.');
      setStatus('error');
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          title: `Portfolio Contact from ${form.name}`,
          name: form.name,
          email: form.email,
          from_name: form.name,
          from_email: form.email,
          reply_to: form.email,
          message: form.message,
        },
        { publicKey },
      );

      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS send failed:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" style={{ padding: '40px 40px 60px' }}>
      <AnimatedSection>
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#888780', marginBottom: 8 }}>
            // let's talk
          </div>
          <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontWeight: 500, color: '#2C2C2A' }}>
            contact
          </h2>
        </div>
      </AnimatedSection>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
        {/* Form — notepad style */}
        <AnimatedSection delay={0.1}>
          <form
            onSubmit={handleSubmit}
            style={{
              background: '#FFFDF4',
              border: '1px solid #E8E4DC',
              borderRadius: 8,
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <div style={{ marginBottom: 14 }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: '#888780',
                  marginBottom: 6,
                }}
              >
                name
              </label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="your name"
                style={FIELD_STYLE}
                onFocus={(e) => (e.target.style.borderColor = '#EF9F27')}
                onBlur={(e) => (e.target.style.borderColor = '#E8E4DC')}
              />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: '#888780',
                  marginBottom: 6,
                }}
              >
                email
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                style={FIELD_STYLE}
                onFocus={(e) => (e.target.style.borderColor = '#EF9F27')}
                onBlur={(e) => (e.target.style.borderColor = '#E8E4DC')}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: '#888780',
                  marginBottom: 6,
                }}
              >
                message
              </label>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="what's on your mind?"
                style={{
                  ...FIELD_STYLE,
                  resize: 'vertical',
                  backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #E8E4DC 27px, #E8E4DC 28px)',
                  lineHeight: '28px',
                  paddingTop: '4px',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#EF9F27')}
                onBlur={(e) => (e.target.style.borderColor = '#E8E4DC')}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                width: '100%',
                padding: '11px',
                background: '#2C2C2A',
                color: '#FAFAF7',
                border: '2px solid #2C2C2A',
                borderRadius: 4,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                letterSpacing: '0.08em',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                outline: '2px solid #2C2C2A',
                outlineOffset: 3,
              }}
              onMouseEnter={(e) => {
                if (status !== 'sending') {
                  e.currentTarget.style.background = '#EF9F27';
                  e.currentTarget.style.border = '2px solid #EF9F27';
                  e.currentTarget.style.outline = '2px solid #EF9F27';
                  e.currentTarget.style.color = '#2C2C2A';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2C2C2A';
                e.currentTarget.style.border = '2px solid #2C2C2A';
                e.currentTarget.style.outline = '2px solid #2C2C2A';
                e.currentTarget.style.color = '#FAFAF7';
              }}
            >
              {status === 'sending' ? '// sending...' : status === 'sent' ? '// sent!' : '// send message'}
            </button>

            {status === 'error' && (
              <p style={{ marginTop: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#e05252' }}>
                something went wrong. try emailing directly.
              </p>
            )}
          </form>
        </AnimatedSection>

        {/* Right side info */}
        <AnimatedSection delay={0.2}>
          <div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                lineHeight: 1.7,
                color: '#2C2C2A',
                marginBottom: 28,
              }}
            >
              Currently open to full-time roles, freelance projects, and interesting collaborations.
              Drop a message or reach out directly — I usually respond within a day.
            </p>

            {/* Postage stamp social links */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[
                { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/gauriborle' },
                { icon: Github, label: 'GitHub', href: 'https://github.com/gauriborle' },
                { icon: Mail, label: 'Email', href: 'mailto:gauriborle1002@gmail.com' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    padding: '14px 16px',
                    border: '2px solid #E8E4DC',
                    borderRadius: 6,
                    background: '#F3F0E8',
                    textDecoration: 'none',
                    color: '#2C2C2A',
                    transition: 'all 0.2s ease',
                    boxShadow: '2px 2px 0 #E8E4DC',
                    minWidth: 80,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#EF9F27';
                    e.currentTarget.style.boxShadow = '2px 2px 0 #EF9F27';
                    e.currentTarget.style.background = '#FEF9EF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E8E4DC';
                    e.currentTarget.style.boxShadow = '2px 2px 0 #E8E4DC';
                    e.currentTarget.style.background = '#F3F0E8';
                  }}
                >
                  <Icon size={18} strokeWidth={1.5} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>{label}</span>
                </a>
              ))}
            </div>

            {/* Contact details */}
            <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'email', value: 'gauriborle1002@gmail.com' },
                { label: 'phone', value: '+91 9370675595' },
                { label: 'location', value: 'Malkapur, Maharashtra, India' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: '#888780',
                      minWidth: 60,
                    }}
                  >
                    {label}
                  </span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#2C2C2A' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
