import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Phone, Mail, Clock, CheckCircle2, Calendar } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [booked, setBooked] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    showroom: 'New Delhi — Mehrauli Design District',
    date: '2026-11-12',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        />

        <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-[#FAF7F2] text-left shadow-2xl border border-[#EAE2D8]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white text-[#786E66] hover:text-[#26211E] shadow-2xs flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Showroom Details (5 cols) */}
              <div className="lg:col-span-5 p-6 sm:p-8 bg-[#F4EFEB] border-b lg:border-b-0 lg:border-r border-[#EAE2D8] flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#C86428]">
                    Showroom Network
                  </span>
                  <h3 className="font-serif text-2xl text-[#26211E] mt-1 mb-6">
                    Visit Our Spaces
                  </h3>

                  <div className="space-y-5 text-xs text-[#4A433E]">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#C86428] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#26211E] font-medium">New Delhi Flagship</strong>
                        <span>Gallery 14, Style Mile, Mehrauli, New Delhi 110030</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#C86428] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#26211E] font-medium">Mumbai Atelier</strong>
                        <span>Heritage Hall, Ropewalk Lane, Kala Ghoda, Mumbai 400001</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#C86428] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#26211E] font-medium">Bengaluru Studio</strong>
                        <span>100ft Road, Defence Colony, Indiranagar, Bengaluru 560038</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#EAE2D8] space-y-3 text-xs text-[#786E66]">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#C86428]" />
                    <span>+91 11 4982 7200</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#C86428]" />
                    <span>concierge@aurafurniture.in</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#C86428]" />
                    <span>Tuesday – Sunday, 10:30 AM – 8:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Consultation Booking (7 cols) */}
              <div className="lg:col-span-7 p-6 sm:p-8 bg-white">
                {booked ? (
                  <div className="py-12 text-center flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h4 className="font-serif text-2xl text-[#26211E] mb-2">
                      Appointment Confirmed
                    </h4>
                    <p className="text-xs text-[#786E66] max-w-sm mb-6 leading-relaxed">
                      We have reserved your private interior styling consultation. A senior designer will prepare bespoke fabric swatches and layout blueprints for your visit.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 bg-[#26211E] text-white text-xs font-medium rounded-xl hover:bg-[#3B3632]"
                    >
                      Close Window
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#C86428]">
                        Complimentary Session
                      </span>
                      <h3 className="font-serif text-2xl text-[#26211E] mt-0.5">
                        Book a Private Consultation
                      </h3>
                      <p className="text-xs text-[#786E66] mt-1">
                        Meet with an interior design specialist for floor plan advice and fabric selection.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-[#4A433E] mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="e.g. Priya Sharma"
                          className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EAE2D8] rounded-xl focus:outline-none focus:border-[#C86428]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#4A433E] mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+91 98765 43210"
                          className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EAE2D8] rounded-xl focus:outline-none focus:border-[#C86428]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#4A433E] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="priya@example.com"
                        className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EAE2D8] rounded-xl focus:outline-none focus:border-[#C86428]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-[#4A433E] mb-1">
                          Preferred Showroom *
                        </label>
                        <select
                          value={formData.showroom}
                          onChange={(e) =>
                            setFormData({ ...formData, showroom: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EAE2D8] rounded-xl focus:outline-none focus:border-[#C86428]"
                        >
                          <option>New Delhi — Mehrauli Design District</option>
                          <option>Mumbai — Kala Ghoda Arts Quarter</option>
                          <option>Bengaluru — Indiranagar Design Loft</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#4A433E] mb-1">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EAE2D8] rounded-xl focus:outline-none focus:border-[#C86428]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#4A433E] mb-1">
                        Space Notes / Room Type (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        placeholder="e.g. Furnishing 3BHK living room with focus on warm minimalism..."
                        className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EAE2D8] rounded-xl focus:outline-none focus:border-[#C86428]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-6 rounded-xl bg-[#C86428] hover:bg-[#B2531D] text-white text-xs font-medium transition-colors shadow-xs"
                    >
                      Confirm Private Appointment
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
