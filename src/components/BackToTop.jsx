import { ArrowUp } from "lucide-react";
import { useScrollPosition } from "../hooks/useScrollPosition";

function BackToTop() {
  const scrollY = useScrollPosition();

  const showButton = scrollY > 400;

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (!showButton) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-teal-700 text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 animate-in fade-in slide-in-from-bottom-4"
    >
      <ArrowUp size={20} />
    </button>
  );
}

export default BackToTop;