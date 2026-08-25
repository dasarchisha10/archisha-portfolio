import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FiGithub, FiMail, FiMapPin, FiExternalLink,
  FiCopy, FiCheck, FiSend,
} from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export default function Contact() {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState('');
  const [emailCopied, setEmailCopied] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const copyEmail = () => {
    navigator.clipboard.writeText('dasarchisha19@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  const inputClass = (name) => `
    w-full px-5 py-4 rounded-xl text-sm font-medium outline-none transition-all duration-300
    ${isDark
      ? 'bg-white/5 border text-white placeholder-gray-500 ' +
        (focused === name
          ? 'border-purple-500 shadow-[0_0_20px_rgba(124,92,252,0.2)]'
          : 'border-white/10')
      : 'bg-white border text-gray-800 placeholder-gray-400 ' +
        (focused === name
          ? 'border-purple-400 shadow-[0_0_15px_rgba(124,92,252,0.1)]'
          : 'border-gray-200')
    }
  `;

  const contactItems = [
    {
      Icon: FiMail,
      label: 'Email',
      value: 'dasarchisha19@gmail.com',
      color: '#EA4335',
      isButton: true,
      buttonIcon: emailCopied ? FiCheck : FiCopy,
      buttonLabel: emailCopied ? 'Copied!' : 'Copy',
      onButtonClick: copyEmail,
      copied: emailCopied,
    },
    {
      Icon: FiGithub,
      label: 'GitHub',
      value: 'github.com/dasarchisha10',
      color: '#7C5CFC',
      isLink: true,
      href: 'https://github.com/dasarchisha10',
      linkIcon: FiExternalLink,
      linkLabel: 'Visit',
    },
    {
      Icon: FiMapPin,
      label: 'Location',
      value: 'Sodepur, Kolkata, India',
      color: '#10B981',
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className={`relative py-28 overflow-hidden ${isDark ? 'bg-[#070B18]' : 'bg-white'}`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full filter blur-3xl" />
        <div className="blob blob-delay-4 absolute bottom-0 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full filter blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className={`text-sm font-semibold tracking-widest uppercase mb-3 ${
            isDark ? 'text-purple-400' : 'text-purple-600'
          }`}>
            Get In Touch
          </p>
          <h2 className={`text-4xl md:text-5xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Contact <span className="text-gradient">Me</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 flex flex-col justify-center"
          >
            <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Let's Connect! 🚀
            </h3>
            <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              I'm currently open to internships, part-time opportunities, and project collaborations.
              Whether you have a project idea or just want to say hi, feel free to reach out!
            </p>

            <div className="space-y-4">
              {contactItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-xl ${
                    isDark ? 'glass' : 'bg-gray-50 border border-gray-100'
                  }`}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${item.color}22` }}
                  >
                    <item.Icon size={20} color={item.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium mb-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      {item.label}
                    </p>
                    <p className={`text-sm font-semibold truncate ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      {item.value}
                    </p>
                  </div>

                  {item.isButton && (
                    <motion.button
                      onClick={item.onButtonClick}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        item.copied
                          ? 'bg-green-500/20 text-green-400'
                          : isDark
                          ? 'bg-white/10 text-gray-300 hover:bg-purple-500/20 hover:text-purple-300'
                          : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600 border border-gray-200'
                      }`}
                    >
                      <item.buttonIcon size={12} />
                      {item.buttonLabel}
                    </motion.button>
                  )}

                  {item.isLink && (
                    <motion.a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        isDark
                          ? 'bg-white/10 text-gray-300 hover:bg-purple-500/20 hover:text-purple-300'
                          : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600 border border-gray-200'
                      }`}
                    >
                      <item.linkIcon size={12} />
                      {item.linkLabel}
                    </motion.a>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex-1"
          >
            <div className={`p-8 rounded-2xl ${isDark ? 'glass' : 'bg-gray-50 border border-gray-100'}`}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused('')}
                    placeholder="Your name"
                    required
                    className={inputClass('name')}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('')}
                    placeholder="hello@example.com"
                    required
                    className={inputClass('email')}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused('')}
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    required
                    className={`${inputClass('message')} resize-none`}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={sending || sent}
                  whileHover={!sending && !sent ? { scale: 1.02 } : {}}
                  whileTap={!sending && !sent ? { scale: 0.98 } : {}}
                  className={`w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-3 transition-all duration-300 ${
                    sent
                      ? 'bg-green-500'
                      : 'bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-500 hover:to-purple-300'
                  }`}
                  style={!sent ? { boxShadow: '0 0 30px rgba(124,92,252,0.3)' } : {}}
                >
                  {sending ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending...
                    </>
                  ) : sent ? (
                    <><FiCheck size={18} /> Message Sent! 🎉</>
                  ) : (
                    <><FiSend size={18} /> Send Message</>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}