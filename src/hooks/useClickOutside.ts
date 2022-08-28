import { useEffect } from "react";

const useClickOutside = (ref: any, callback?: any) => {
  useEffect(() => {
    const handleClickOutside = (evt: any) => {
      if (ref.current && !ref.current.contains(evt.target)) {
        callback(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });
};

export default useClickOutside;
