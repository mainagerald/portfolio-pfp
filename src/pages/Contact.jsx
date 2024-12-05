import { HiUserCircle } from "react-icons/hi2";
import { IoMdBriefcase } from "react-icons/io";
import { MdEmail, MdOutlineWavingHand } from "react-icons/md";

const ContactPage = () => {
  return (
    <div className="fade-in w-full flex flex-col items-center p-5">
      <h1 className="text-4xl md:text-5xl text-cyan-900 font-lato font-semibold">Get In Touch</h1>
      <p className="text-base md:text-lg text-gray-600 mt-2 text-center max-w-lg">
        I’d love to hear from you, whether you have a question or just want to connect!
      </p>
      
      <MdOutlineWavingHand className="mt-3 w-16 h-16 text-cyan-900" />

      <form className="mt-5 w-full max-w-md">
        <div className="flex flex-col mb-4">
          <label className="font-lato text-gray-700">Name</label>
          <input type="text" className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Your Name" required />
        </div>
        <div className="flex flex-col mb-4">
          <label className="font-lato text-gray-700">Email</label>
          <input type="email" className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Your Email" required />
        </div>
        <div className="flex flex-col mb-4">
          <label className="font-lato text-gray-700">Subject</label>
          <input type="text" className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Subject" required />
        </div>
        <div className="flex flex-col mb-4">
          <label className="font-lato text-gray-700">Message</label>
          <textarea className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500" rows="5" placeholder="Your Message" required />
        </div>
        <button type="submit" className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-lg p-2 hover:scale-110 transition">
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
