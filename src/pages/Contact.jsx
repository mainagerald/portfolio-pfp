import { HiUserCircle } from "react-icons/hi2";
import { IoMdBriefcase } from "react-icons/io";
import { MdEmail, MdOutlineWavingHand } from "react-icons/md";

const ContactPage = () => {
  return (
    <div className="fade-in w-full flex flex-col items-center p-5">
      <h1 className="text-5xl font-bold text-gray-800">Get In Touch</h1>
      <p className="text-lg text-gray-600 mt-2">I’d love to hear from you. Whether you have a question or just want to connect!</p>
      
      <MdOutlineWavingHand />

      <form className="mt-5 w-full max-w-md">
        <div className="flex flex-col mb-4">
          <label className="font-lato text-gray-700">Name</label>
          <input type="text" className="p-2 border border-gray-300 rounded-lg" placeholder="Your Name" required />
        </div>
        <div className="flex flex-col mb-4">
          <label className="font-lato text-gray-700">Email</label>
          <input type="email" className="p-2 border border-gray-300 rounded-lg" placeholder="Your Email" required />
        </div>
        <div className="flex flex-col mb-4">
          <label className="font-lato text-gray-700">Subject</label>
          <input type="text" className="p-2 border border-gray-300 rounded-lg" placeholder="Subject" required />
        </div>
        <div className="flex flex-col mb-4">
          <label className="font-lato text-gray-700">Message</label>
          <textarea className="p-2 border border-gray-300 rounded-lg" rows="5" placeholder="Your Message" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition">
          Send Message
        </button>
      </form>
        <footer className="mt-10 text-center">
        <p className="text-gray-600">Looking forward to connecting with you!</p>
        <p className="text-gray-600 italic">mainagerald910@gmail.com</p>
      </footer>
    </div>
  );
};

export default ContactPage;