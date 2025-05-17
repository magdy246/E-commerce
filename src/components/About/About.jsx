import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function About() {
  return (
    <div className="p-4 sm:ml-64 min-h-screen bg-gradient-to-b from-[#C5EFCB] to-[#8FA38A]">
      <div className="max-w-4xl mx-auto">
        <div className="shadow-black shadow-lg text-4xl md:text-5xl px-3 pb-2 mb-11 font-bold text-[#020402] bg-[#C5EFCB] w-fit rounded-lg">
          <h1>About Us <FontAwesomeIcon icon={faInfoCircle} /></h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8 transform hover:scale-[1.02] transition-transform duration-300">
          <h2 className="text-3xl font-bold text-[#3C433B] mb-6">Our Story</h2>
          <p className="text-[#647A67] leading-relaxed mb-6">
            FreshCart was born from a simple idea: everyone deserves access to fresh, quality products at fair prices. 
            Since our founding in 2024, we've been committed to revolutionizing the online shopping experience by 
            combining convenience with quality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-xl p-8 transform hover:scale-[1.02] transition-transform duration-300">
            <h3 className="text-2xl font-bold text-[#3C433B] mb-4">Our Mission</h3>
            <p className="text-[#647A67] leading-relaxed">
              To provide an exceptional shopping experience by offering high-quality products, 
              outstanding customer service, and innovative solutions that make online shopping 
              easier and more enjoyable.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8 transform hover:scale-[1.02] transition-transform duration-300">
            <h3 className="text-2xl font-bold text-[#3C433B] mb-4">Our Values</h3>
            <ul className="text-[#647A67] space-y-2">
              <li>• Quality First</li>
              <li>• Customer Satisfaction</li>
              <li>• Innovation</li>
              <li>• Sustainability</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-xl p-8 transform hover:scale-[1.02] transition-transform duration-300">
          <h2 className="text-3xl font-bold text-[#3C433B] mb-6">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#647A67] mb-2">10K+</div>
              <div className="text-[#3C433B]">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#647A67] mb-2">5K+</div>
              <div className="text-[#3C433B]">Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#647A67] mb-2">99%</div>
              <div className="text-[#3C433B]">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}