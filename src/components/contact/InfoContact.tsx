"use client";

import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa";
import Button from "../ui/Button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const contactSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^(\+?61|0)[2-478](\s?\d){8}$/,
      "Please enter a valid Australian phone number",
    ),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const resetForm = () => {
    reset();
    setServerError("");
    setSuccessMessage("");
    setIsSubmitted(false);
  };

  const onSubmit = async (formData: ContactFormData) => {
    setServerError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setServerError(
          data.message || "Something went wrong. Please try again.",
        );
        toast.error(data.message || "Something went wrong. Please try again.");
        return;
      }

      setSuccessMessage(data.message || "Message sent successfully");
      setIsSubmitted(true);
    } catch {
      setServerError(
        "Unable to send message. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseClass =
    "w-full px-5 py-4 rounded-xl border bg-gray-50/50 outline-none focus:bg-white transition-all disabled:opacity-50";
  const inputNormalClass = `${inputBaseClass} border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20`;
  const inputErrorClass = `${inputBaseClass} border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200`;

  return (
    <section className="halfSection">
      <div className="container">
        {/* Top Cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {/* Address */}
          <a
            href="https://maps.app.goo.gl/eakWiGZmiMJntaLH8"
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-gray-50 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-3xl p-10 text-center transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <FaMapMarkerAlt className="text-2xl" />
            </div>
            <p className="text-gray-600 font-medium leading-relaxed tracking-wide">
              62–76 Kilmore Road,
              <br />
              Heathcote VIC 3523, Australia
            </p>
          </a>

          {/* Phone */}
          <a
            href="tel:0412713501"
            className="group block bg-gray-50 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-3xl p-10 text-center transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <FaPhoneAlt className="text-2xl" />
            </div>
            <p className="text-gray-600 font-medium text-base leading-relaxed tracking-wide">
              0412 713 501 <br />
              Mon – Thu: 10am–6pm <br />
              Fri: 8:30am – 7:00pm <br />
              Sat: 9am – 2pm <br />
              Sun: Closed
            </p>
          </a>

          {/* Email */}
          <a
            href="mailto:barn@gmail.com"
            className="group block bg-gray-50 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-3xl p-10 text-center transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <FaEnvelope className="text-2xl" />
            </div>
            <p className="text-gray-600 font-medium leading-relaxed tracking-wide">
              barn@gmail.com
            </p>
          </a>
        </div>

        {/* Bottom Section */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12" id="message">
          {/* Contact Form */}
          <form
            className="bg-gray-50 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-4 md:p-6 flex flex-col h-full"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
              Send Us a Message
            </h2>

            {isSubmitted ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-10">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-4xl mb-4">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Message Sent!
                </h3>
                <p className="text-gray-600 mb-4">
                  {successMessage ||
                    "Thank you for reaching out. We will get back to you shortly."}
                </p>
                <Button
                  text="Send Another Message"
                  onClick={resetForm}
                  className="mt-6 mx-auto"
                  type="button"
                />
              </div>
            ) : (
              <div className="flex flex-col flex-1">
                {serverError && (
                  <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium">
                    {serverError}
                  </div>
                )}

                <div className="space-y-5 flex-1">
                  {/* Name */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      disabled={isSubmitting}
                      {...register("name")}
                      className={
                        errors.name ? inputErrorClass : inputNormalClass
                      }
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-red-500 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      disabled={isSubmitting}
                      {...register("email")}
                      className={
                        errors.email ? inputErrorClass : inputNormalClass
                      }
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone (required) */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="0412 345 678"
                      disabled={isSubmitting}
                      {...register("phone")}
                      className={
                        errors.phone ? inputErrorClass : inputNormalClass
                      }
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-red-500 text-sm">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Message (optional) */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Message
                    </label>
                    <textarea
                      placeholder="How can we help you? (optional)"
                      rows={4}
                      disabled={isSubmitting}
                      {...register("message")}
                      className={`${inputNormalClass} resize-none`}
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button
                    text={isSubmitting ? "Sending..." : "Send Message"}
                    icon={isSubmitting ? undefined : FaPaperPlane}
                    className="w-full md:w-fit"
                    type="submit"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            )}
          </form>

          {/* Map Section */}
          <div className="bg-gray-50 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-4 md:p-6 flex flex-col gap-8 h-full">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Find Us On Map
            </h2>

            <div className="relative w-full flex-1 min-h-[300px] md:min-h-0 rounded-2xl overflow-hidden shadow-inner border border-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d942.172924331471!2d144.72474327295217!3d-36.94144883548362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad77d5b559ce235%3A0x82c9183634af623!2sTHE%20BARN%20PET%20STOCK%20AND%20FEED!5e1!3m2!1sen!2sin!4v1773636072069!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
