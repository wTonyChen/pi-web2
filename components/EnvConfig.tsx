"use client";

import { useEffect } from "react";

export function GetConfig() {
  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then((data: Record<string, string>) => {
        document.documentElement.setAttribute("data-sym-ligatures", data.ENABLE_SYM_LIGATURE_FONT === "true" ? "true" : "false");
      })
      .catch(() => {
        // silently fail, default to no ligatures
      });
  }, []);

  return null;
}
