import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ViewMore = () => {
  return (
<div className="flex justify-center items-center py-12 px-4">
        <Link 
          to="/projects" 
          className="hover:bg-white hover:text-black relative inline-flex items-center justify-center px-8 py-4 font-bold text-white border transition-all duration-300 hover:scale-105 rounded-xl"
        >
          <span className="relative z-10 flex items-center">
            View More
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </Link>
      </div>
  );
};

export default ViewMore;