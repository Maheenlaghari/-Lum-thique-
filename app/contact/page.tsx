"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { siteData } from "../../data/siteData";
import { MapPin, Mail, Phone, Clock, Check } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Routine Consultation",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "Routine Consultation",
        message: ""
      });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-neutral-900 selection:bg-neutral-900 selection:text-white flex flex-col justify-between">
      <div>
        <Header data={siteData.header} />

        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="mb-12 border-b border-[#ecece8] pb-8 text-center sm:text-left">
            <span className="text-xs font-semibold tracking-wider uppercase text-neutral-400">
              Client Concierge
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-neutral-950 mt-2">
              Get in Touch
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-light mt-3 max-w-2xl">
              Our botanical specialists are at your disposal for personalized skincare consultations, formulation guidance, and order assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#ecece8] shadow-xs">
              <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-neutral-950 mb-6">
                Send an Inquiry
              </h3>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-[#e1f1f5] border border-neutral-200 text-center flex flex-col items-center gap-3 animate-in fade-in duration-200">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-xs">
                    <Check className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <h4 className="text-lg font-bold text-neutral-900">
                    Message Dispatched
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 max-w-md">
                    Thank you for reaching out to Luméthique. Our formulation concierge will reply to your inquiry within 24 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Elena Vance"
                        className="w-full px-4 py-3 rounded-xl border border-[#ecece8] bg-[#fbfbf9] text-sm focus:outline-none focus:border-neutral-900 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="elena@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#ecece8] bg-[#fbfbf9] text-sm focus:outline-none focus:border-neutral-900 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-[#ecece8] bg-[#fbfbf9] text-sm focus:outline-none focus:border-neutral-900 transition-colors"
                    >
                      <option value="Routine Consultation">Routine Consultation</option>
                      <option value="Order Support">Order Support</option>
                      <option value="Ingredient Transparency">Ingredient Transparency</option>
                      <option value="Press and Partnership">Press and Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Share your skin profile, questions, or specific formulation interests..."
                      className="w-full px-4 py-3 rounded-xl border border-[#ecece8] bg-[#fbfbf9] text-sm focus:outline-none focus:border-neutral-900 transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 mt-2 rounded-xl bg-neutral-900 hover:bg-[#eb865a] text-white text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer shadow-md"
                  >
                    DISPATCH INQUIRY
                  </button>
                </form>
              )}
            </div>

            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="bg-[#ede7f6]/40 rounded-3xl p-6 sm:p-8 border border-neutral-200/60">
                <h3 className="text-lg font-bold tracking-tight text-neutral-950 mb-4">
                  Flagship Showroom
                </h3>
                <div className="flex flex-col gap-4 text-xs sm:text-sm text-neutral-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-neutral-800 flex-shrink-0 mt-0.5" />
                    <span>Australian Capital Territory, Australia 2601</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-neutral-800 flex-shrink-0 mt-0.5" />
                    <span>Monday to Friday, 9:00 to 18:00 AEST</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-neutral-800 flex-shrink-0 mt-0.5" />
                    <span>contact@egrounde.co</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-neutral-800 flex-shrink-0 mt-0.5" />
                    <span>(812) 527 0320</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#faebc3]/30 rounded-3xl p-6 sm:p-8 border border-neutral-200/60">
                <h3 className="text-lg font-bold tracking-tight text-neutral-950 mb-2">
                  Personalized Routine Guidance
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                  Unsure which serum combination suits your barrier requirements? Attach your current routine details in your message for a custom evaluation by our formulation specialists.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer data={siteData.footer} />
    </div>
  );
}
