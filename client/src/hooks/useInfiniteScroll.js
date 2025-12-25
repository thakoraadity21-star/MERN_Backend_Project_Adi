import { useEffect } from "react";

export default function useInfiniteScroll(callback) {
  useEffect(() => {
    function handleScroll() {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300;

      if (bottom) {
        callback();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback]);
}
