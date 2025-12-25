import { useEffect, useState } from "react";
import "./ScrollTop.css";

export default function ScrollTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const toggle = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  if (!show) return null;

  return (
    <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      ⬆
    </button>
  );
}
