import React, { useState } from "react";
import { MdOutlineWavingHand } from "react-icons/md";
import emailjs from "@emailjs/browser";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          mail: formData.email,
          subject: formData.subject,
          message: formData.message
        }, {
          publicKey: import.meta.env.VITE_EMAILJS_PUB_KEY,
        });

      // Success
      setMessage("Message sent successfully!");
      setSeverity("success");
      setOpen(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
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
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="fade-in w-full flex flex-col items-center p-5">
      <h1 className="text-4xl md:text-5xl text-cyan-900 font-lato font-semibold">Get In Touch</h1>
      <p className="text-base md:text-lg text-gray-600 mt-2 text-center max-w-lg">
        I would love to hear from you, whether you have a question or just want to connect!
      </p>
      
      <MdOutlineWavingHand className="mt-3 w-16 h-16 text-cyan-900" />

      <form className="mt-5 w-full max-w-md" onSubmit={handleSubmit}>
      <div className="flex flex-col mb-4">
          <label htmlFor="name" className="font-lato text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="font-lato text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="subject" className="font-lato text-gray-700">Subject</label>
          <input
            id="subject"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Subject"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="message" className="font-lato text-gray-700">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            rows="5"
            placeholder="Your Message"
            required
          />
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-lg p-2 hover:scale-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      <footer className="mt-10 text-center">
        <p className="text-gray-600">Looking forward to connecting with you!</p>
        <p className="text-gray-600 italic">mainagerald910@gmail.com</p>
      </footer>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ContactPage;
