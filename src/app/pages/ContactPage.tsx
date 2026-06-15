import { motion } from 'motion/react';
import { Mail, Phone, MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useState, FormEvent } from 'react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Build mailto link with form data
    const mailtoLink = `mailto:info@kotulapay.com?subject=${encodeURIComponent(formData.subject || 'Contact Form Submission')}&body=${encodeURIComponent(
      `Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\nCompany: ${formData.company || 'Not provided'}\n\nMessage:\n${formData.message}`
    )}`;
    
    // Open user's email client
    window.location.href = mailtoLink;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#001c26]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
              Contact Us
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-300">
              Have questions or need assistance? We'd love to hear from you. Get in touch with our team and we'll respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
            >
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-[#c5e063] focus:outline-none focus:ring-2 focus:ring-[#c5e063]/20"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-[#c5e063] focus:outline-none focus:ring-2 focus:ring-[#c5e063]/20"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-[#c5e063] focus:outline-none focus:ring-2 focus:ring-[#c5e063]/20"
                    placeholder="+1 234 567 8900"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="company" className="mb-2 block text-sm font-medium text-gray-300">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-[#c5e063] focus:outline-none focus:ring-2 focus:ring-[#c5e063]/20"
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-[#c5e063] focus:outline-none focus:ring-2 focus:ring-[#c5e063]/20"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-[#c5e063] focus:outline-none focus:ring-2 focus:ring-[#c5e063]/20"
                    placeholder="Tell us more about your inquiry..."
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#c5e063] px-6 py-4 font-semibold text-[#0a3d3d] shadow-lg shadow-[#c5e063]/20 transition-all hover:shadow-xl hover:shadow-[#c5e063]/30"
                >
                  <Send className="size-5" />
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              {/* Email Card */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-[#c5e063]/10">
                  <Mail className="size-7 text-[#c5e063]" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">Email</h3>
                <a 
                  href="mailto:bizdev@kotulapay.com"
                  className="mb-3 block text-lg text-[#c5e063] hover:underline"
                >
                  bizdev@kotulapay.com
                </a>
                <p className="text-sm text-gray-400">
                  We'll respond within 24 hours
                </p>
              </div>

              {/* Phone Card */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-[#c5e063]/10">
                  <Phone className="size-7 text-[#c5e063]" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">Phone</h3>
                <a 
                  href="tel:+971567088169"
                  className="mb-3 block text-lg text-[#c5e063] hover:underline"
                >
                  +971 56 708 8169
                </a>
                <p className="text-sm text-gray-400">Mon-Fri, 9AM-6PM GMT+3</p>
              </div>

              {/* Live Chat Card */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-[#c5e063]/10">
                  <MessageCircle className="size-7 text-[#c5e063]" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">Live Chat</h3>
                <p className="mb-3 text-lg text-[#c5e063]">
                  Available on our website
                </p>
                <p className="text-sm text-gray-400">
                  24/7 support for urgent issues
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}