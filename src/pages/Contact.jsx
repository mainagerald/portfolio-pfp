import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { motion } from "framer-motion";
import '../components/Layout/responsive.css';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  const payload = formData.message + `\r\n From Phone: ${formData.phone}`

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: `${formData.name} ${formData.lastName}`,
          mail: formData.email,
          phone: formData.phone,
          message: payload,
        },
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUB_KEY,
        }
      );

      setMessage("Message sent successfully!");
      setSeverity("success");
      setOpen(true);
      setFormData({ name: "", lastName: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setMessage("Failed to send message. Please try again.");
      setSeverity("error");
      setOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-black via-blue-900/80 to-black flex items-center justify-center py-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col md:flex-row w-full max-w-6xl shadow-2xl rounded-2xl overflow-hidden bg-black/30 backdrop-blur-md">
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-t from-[#111827] to-[#F97316]/80 text-white flex items-center justify-center p-6 md:p-10 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-64 h-64 border-2 border-dashed border-orange-300/30 rounded-full animate-spin-slow"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 border-2 border-dashed border-orange-300/30 rounded-full animate-spin-slow"></div>
          </div>
          <motion.h1
            className="text-3xl md:text-5xl font-bold tracking-wide z-10 text-orange-100"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Let's Connect<br />and Create
          </motion.h1>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 bg-[#1C1C1E] p-6 md:p-10">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-medium text-orange-400 mb-2">First Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-b border-orange-500 py-2 px-1 text-white bg-transparent focus:outline-none focus:border-orange-400 transition-colors"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-medium text-orange-400 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border-b border-orange-500 py-2 px-1 text-white bg-transparent focus:outline-none focus:border-orange-400 transition-colors"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-medium text-orange-400 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b border-orange-500 py-2 px-1 text-white bg-transparent focus:outline-none focus:border-orange-400 transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-medium text-orange-400 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border-b border-orange-500 py-2 px-1 text-white bg-transparent focus:outline-none focus:border-orange-400 transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-orange-400 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border-b border-orange-500 py-2 px-1 text-white bg-transparent focus:outline-none focus:border-orange-400 transition-colors"
                rows="4"
                placeholder="What's on your mind?"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center bg-orange-600 text-white font-medium rounded-full px-6 py-3 hover:bg-orange-500 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Message"} <span className="ml-2">→</span>
            </button>
          </form>
          <footer className="mt-5">
            <p className="text-sm text-orange-400 font-medium mb-1">Email Me</p>
            <p className="text-sm text-orange-500 hover:underline">
              <a href="mailto:mainagerald910@gmail.com">mainagerald910@gmail.com</a>
            </p>
            <p className="text-sm text-orange-400 font-medium mb-1">Phone</p>
            <p className="text-sm text-orange-500 hover:underline">
              <a href="tel:+254763819120">+254763819120</a>
            </p>
          </footer>
        </div>
      </div>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </motion.div>
  );
};

export default ContactPage;
