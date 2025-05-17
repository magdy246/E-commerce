import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEnvelope, 
  faPhone, 
  faLocationDot,
  faMessage
} from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="p-4 sm:ml-64 min-h-screen bg-gradient-to-b from-[#C5EFCB] to-[#8FA38A]">
      <div className="max-w-4xl mx-auto">
        <div className="shadow-black shadow-lg text-4xl md:text-5xl px-3 pb-2 mb-11 font-bold text-[#020402] bg-[#C5EFCB] w-fit rounded-lg">
          <h1>Contact Us <FontAwesomeIcon icon={faMessage} /></h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-[#3C433B] mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faPhone} className="text-[#647A67] text-xl" />
                <div>
                  <h3 className="font-semibold text-[#3C433B]">Phone</h3>
                  <p className="text-[#647A67]">+1 234 567 890</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faEnvelope} className="text-[#647A67] text-xl" />
                <div>
                  <h3 className="font-semibold text-[#3C433B]">Email</h3>
                  <p className="text-[#647A67]">contact@freshcart.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faLocationDot} className="text-[#647A67] text-xl" />
                <div>
                  <h3 className="font-semibold text-[#3C433B]">Address</h3>
                  <p className="text-[#647A67]">123 Shopping Street, NY 10001</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-[#3C433B] mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#3C433B] mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-[#8FA38A] focus:outline-none focus:ring-2 focus:ring-[#647A67]"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3C433B] mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-[#8FA38A] focus:outline-none focus:ring-2 focus:ring-[#647A67]"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3C433B] mb-1">Message</label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border border-[#8FA38A] focus:outline-none focus:ring-2 focus:ring-[#647A67] h-32"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#647A67] text-white py-2 px-4 rounded-lg hover:bg-[#758173] transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}