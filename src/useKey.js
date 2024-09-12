import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      function keyDown(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action(e);
        }
      }

      document.addEventListener("keydown", keyDown);

      return () => document.removeEventListener("keydown", keyDown);
    },
    [action]
  );
}
