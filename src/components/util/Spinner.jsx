import { Loader2 } from "lucide-react";


const Spinner = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-black/80">
            <Loader2 size={48} className="animate-spin text-white"/>
        </div>
    );
};

export default Spinner;