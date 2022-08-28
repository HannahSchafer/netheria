import { useEffect } from "react";

const useClickOutside = (ref: any, callback?: any) => {
  useEffect(() => {
    const handleClickOutside = (evt: any) => {
      console.log("HIHIHI");
      if (ref.current && !ref.current.contains(evt.target)) {
        console.log("HIHI");
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
