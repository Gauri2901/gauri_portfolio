import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
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
  padding: '12px 14px',
  border: '1px solid #E8E4DC',
  borderRadius: 7,
  background: '#FAFAF7',
  fontFamily: "'Inter', sans-serif",
  fontSize: 14,
  color: '#2C2C2A',
  outline: 'none',
  transition: 'border-color 0.15s, box-shadow 0.15s, background 0.15s',
};

const LABEL_STYLE = {
  display: 'block',
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 11,
  color: '#888780',
  marginBottom: 6,
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
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
          title: form.subject,
          subject: form.subject,
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
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS send failed:', error);
      setStatus('error');
    }
  };

  const focusField = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = '#EF9F27';
    e.target.style.boxShadow = '0 0 0 3px rgba(239,159,39,0.12)';
    e.target.style.background = '#FAFAF7';
  };

  const blurField = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = '#E8E4DC';
    e.target.style.boxShadow = 'none';
    e.target.style.background = '#FAFAF7';
  };

  return (
    <section id="contact" style={{ padding: '48px 40px 70px' }}>
      <AnimatedSection>
        <div style={{ marginBottom: 34 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#888780', marginBottom: 8 }}>
            // let's talk
          </div>
          <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 28, fontWeight: 500, color: '#2C2C2A', marginBottom: 10 }}>
            contact
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.7, color: '#5C574F', maxWidth: 620 }}>
            Send a note about a role, freelance project, or collaboration. I usually reply within a day.
          </p>
        </div>
      </AnimatedSection>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 0.88fr) minmax(420px, 1.12fr)',
          gap: 24,
          alignItems: 'start',
        }}
      >
        <AnimatedSection delay={0.1}>
          <aside
            style={{
              background: '#FAFAF7',
              border: '1px solid #E8E4DC',
              borderRadius: 12,
              padding: 24,
              boxShadow: '2px 2px 0 #E8E4DC',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 5,
                background: 'repeating-linear-gradient(90deg, #EF9F27 0 14px, transparent 14px 26px)',
                opacity: 0.38,
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: 18,
                top: 18,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 48,
                color: '#E8E4DC',
                lineHeight: 1,
              }}
            >
              @
            </div>

            <div style={{ position: 'relative' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: '#1D9E75',
                  marginBottom: 20,
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1D9E75' }} />
                available for opportunities
              </div>

              <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 500, color: '#2C2C2A', lineHeight: 1.35, marginBottom: 12 }}>
                Open inbox, clear replies.
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.7, color: '#5C574F', marginBottom: 22, maxWidth: 440 }}>
                Share the context, timeline, links, or expectations. The form sends directly to my email and I can reply to you from there.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
                {[
                  { icon: Mail, label: 'email', value: 'gauriborle1002@gmail.com', href: 'mailto:gauriborle1002@gmail.com' },
                  { icon: Phone, label: 'phone', value: '+91 9370675595', href: 'tel:+919370675595' },
                  { icon: MapPin, label: 'location', value: 'Malkapur, Maharashtra, India' },
                ].map(({ icon: Icon, label, value, href }) => {
                  const row = (
                    <>
                      <span
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 8,
                          background: '#F3F0E8',
                          border: '1px solid #E8E4DC',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#888780',
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={16} strokeWidth={1.7} />
                      </span>
                      <span>
                        <span style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#888780', marginBottom: 2 }}>
                          {label}
                        </span>
                        <span style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#2C2C2A' }}>{value}</span>
                      </span>
                    </>
                  );

                  return href ? (
                    <a
                      key={label}
                      href={href}
                      style={{
                        display: 'flex',
                        gap: 11,
                        alignItems: 'center',
                        padding: '10px',
                        borderRadius: 10,
                        background: '#FAFAF7',
                        border: '1px solid #E8E4DC',
                        textDecoration: 'none',
                      }}
                    >
                      {row}
                    </a>
                  ) : (
                    <div
                      key={label}
                      style={{
                        display: 'flex',
                        gap: 11,
                        alignItems: 'center',
                        padding: '10px',
                        borderRadius: 10,
                        background: '#FAFAF7',
                        border: '1px solid #E8E4DC',
                      }}
                    >
                      {row}
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
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
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 7,
                      padding: '9px 11px',
                      borderRadius: 8,
                      background: '#FAFAF7',
                      border: '1px solid #E8E4DC',
                      color: '#2C2C2A',
                      textDecoration: 'none',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      boxShadow: '1px 1px 0 #E8E4DC',
                    }}
                  >
                    <Icon size={15} strokeWidth={1.6} />
                    {label}
                    <ArrowUpRight size={12} strokeWidth={1.7} />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </AnimatedSection>

        <AnimatedSection delay={0.18}>
          <form
            onSubmit={handleSubmit}
            style={{
              background: '#FAFAF7',
              border: '1px solid #E8E4DC',
              borderRadius: 12,
              padding: 24,
              boxShadow: '2px 2px 0 #E8E4DC',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 17,
                right: 22,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: '#888780',
              }}
            >
              message.txt
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 14, marginTop: 12 }}>
              <div>
                <label style={LABEL_STYLE}>name</label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="your name"
                  style={FIELD_STYLE}
                  onFocus={focusField}
                  onBlur={blurField}
                />
              </div>

              <div>
                <label style={LABEL_STYLE}>email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  style={FIELD_STYLE}
                  onFocus={focusField}
                  onBlur={blurField}
                />
              </div>
            </div>

            <div style={{ marginTop: 14 }}>
              <label style={LABEL_STYLE}>subject</label>
              <input
                required
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="what should we call this?"
                style={FIELD_STYLE}
                onFocus={focusField}
                onBlur={blurField}
              />
            </div>

            <div style={{ marginTop: 14 }}>
              <label style={LABEL_STYLE}>message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="tell me what you are building, hiring for, or curious about..."
                style={{
                  ...FIELD_STYLE,
                  resize: 'vertical',
                  minHeight: 118,
                  maxHeight: 150,
                  lineHeight: '28px',
                  backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #E8E4DC 27px, #E8E4DC 28px)',
                  paddingTop: 6,
                }}
                onFocus={focusField}
                onBlur={blurField}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                width: '100%',
                marginTop: 18,
                padding: '12px 16px',
                background: status === 'sent' ? '#1D9E75' : '#2C2C2A',
                color: '#FAFAF7',
                border: '2px solid #2C2C2A',
                borderRadius: 6,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                letterSpacing: '0.08em',
                cursor: status === 'sending' ? 'wait' : 'pointer',
                transition: 'all 0.2s ease',
                outline: '2px solid #2C2C2A',
                outlineOffset: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 9,
                opacity: status === 'sending' ? 0.75 : 1,
              }}
              onMouseEnter={(e) => {
                if (status === 'idle' || status === 'error') {
                    e.currentTarget.style.background = '#F3F0E8';
                    e.currentTarget.style.borderColor = '#2C2C2A';
                    e.currentTarget.style.outlineColor = '#2C2C2A';
                    e.currentTarget.style.color = '#2C2C2A';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = status === 'sent' ? '#1D9E75' : '#2C2C2A';
                e.currentTarget.style.borderColor = '#2C2C2A';
                e.currentTarget.style.outlineColor = '#2C2C2A';
                e.currentTarget.style.color = '#FAFAF7';
              }}
            >
              <Send size={15} strokeWidth={1.8} />
              {status === 'sending' ? '// sending...' : status === 'sent' ? '// sent!' : '// send message'}
            </button>

            {status === 'error' && (
              <p style={{ marginTop: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#D34A35' }}>
                email could not be sent. please try again or use the direct email link.
              </p>
            )}
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
}
