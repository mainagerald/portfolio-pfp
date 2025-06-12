import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ViewMore = () => {
  return (
<div className="flex justify-center items-center py-12 px-4">
        <Link 
          to="/projects" 
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-amber-500/80 hover:bg-amber-500/95 dark:bg-amber-600/80 dark:hover:bg-amber-600/95 backdrop-blur-sm shadow-lg hover:shadow-xl border border-amber-400/50 dark:border-amber-500/60 rounded-3xl transition-all duration-300 hover:scale-105"
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