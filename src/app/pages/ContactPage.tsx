import { useState, FormEvent } from 'react';
import { Mail, Phone, MessageCircle, Send } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:info@kotulapay.com?subject=${encodeURIComponent(formData.subject || 'Contact Form Submission')}&body=${encodeURIComponent(
      `Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\nCompany: ${formData.company || 'Not provided'}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const contactDetails = [
    {
      icon: Mail,
      title: 'Email',
      value: 'bizdev@kotulapay.com',
      href: 'mailto:bizdev@kotulapay.com',
      note: "We'll respond within 24 hours",
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+971 56 708 8169',
      href: 'tel:+971567088169',
      note: 'Mon–Fri, 9AM–6PM GMT+3',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      value: 'Available on our website',
      href: null,
      note: '24/7 support for urgent issues',
    },
  ];

  const inputClass =
    'w-full rounded-xl border-2 border-[#e6eced] bg-white px-4 py-3 text-[#1e1f24] placeholder-[#a0a0a8] transition-colors focus:border-[#289685] focus:outline-none text-base';
  const labelClass = 'mb-1.5 block text-sm font-semibold text-[#1d3b32]';

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#001c26] to-[#04403a] pt-32 pb-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(197,224,99,0.3) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative z-10 mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px] text-center">
          <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">Contact Us</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300 leading-relaxed">
            Have questions or need assistance? Get in touch with our team and we'll respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Form + Contact Info */}
      <section className="bg-[#f6faee] py-14 lg:py-20">
        <div className="mx-auto max-w-[1920px] px-6 md:px-12 lg:px-[192px]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">

            {/* Form */}
            <div className="rounded-2xl bg-white p-8 border-2 border-[#e6eced]">
              <h2 className="mb-6 text-2xl font-bold text-[#001c26]">Send us a message</h2>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="fullName" className={labelClass}>Full Name</label>
                    <input type="text" id="fullName" className={inputClass} placeholder="John Doe" value={formData.fullName} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>Email Address</label>
                    <input type="email" id="email" className={inputClass} placeholder="john@example.com" value={formData.email} onChange={handleInputChange} required />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className={labelClass}>Phone Number</label>
                    <input type="tel" id="phone" className={inputClass} placeholder="+1 234 567 8900" value={formData.phone} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label htmlFor="company" className={labelClass}>Company Name</label>
                    <input type="text" id="company" className={inputClass} placeholder="Your Company" value={formData.company} onChange={handleInputChange} />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className={labelClass}>Subject</label>
                  <input type="text" id="subject" className={inputClass} placeholder="How can we help?" value={formData.subject} onChange={handleInputChange} required />
                </div>
                <div>
                  <label htmlFor="message" className={labelClass}>Message</label>
                  <textarea id="message" rows={5} className={inputClass} placeholder="Tell us more about your inquiry..." value={formData.message} onChange={handleInputChange} required />
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#289685] px-8 py-4 font-medium text-[#fcfcfd] transition-colors hover:bg-[#237a71] text-base"
                >
                  <Send className="size-5" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-[#001c26] mb-2">Get in touch</h2>
              {contactDetails.map(({ icon: Icon, title, value, href, note }) => (
                <div key={title} className="flex flex-col gap-3 items-start rounded-2xl bg-white border-2 border-[#e6eced] px-7 py-6">
                  <div className="flex items-center gap-3">
                    <div className="flex size-[44px] shrink-0 items-center justify-center rounded-[12px] bg-[#d4f291]">
                      <Icon className="size-5 text-[#1e1f24]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#1d3b32]">{title}</h3>
                  </div>
                  {href ? (
                    <a href={href} className="text-[#289685] font-medium hover:underline text-base">{value}</a>
                  ) : (
                    <p className="text-[#289685] font-medium text-base">{value}</p>
                  )}
                  <p className="text-sm text-[#62636c]">{note}</p>
                </div>
              ))}

              {/* Office note */}
              <div className="rounded-2xl bg-[#e5f2f6] px-7 py-6 mt-2">
                <h3 className="mb-2 text-lg font-semibold text-[#1d3b32]">Headquartered in Africa</h3>
                <p className="text-sm text-[#62636c] leading-relaxed">
                  Kotulapay is built for African businesses and operates across multiple markets including Kenya, Nigeria, Ghana, Uganda, Tanzania, and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
