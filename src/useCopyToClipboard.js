import { useState, useCallback } from "react";

export default function useCopyToClipboard(resetInterval = 2000) {
  const [copied, setCopied] = useState(false);

  //copy fallback for old browsers
  const copyFallback = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);

    textarea.select();
    try {
      const result = document.execCommand("copy");
      document.body.removeChild(textarea);
      return result;
    } catch (e) {
      document.body.removeChild(textarea);
      return false;
    }
  };

  const copy = useCallback(async (text) => {
    if (!text) return false;

    // for modern browsers
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), resetInterval);
        return true;
      } catch (err) {
        console.error("Clipboard API failed, using fallback.", err);
      }
    }

    // Fallback
    const success = copyFallback(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), resetInterval);
      return true;
    }

    return false;
  }, [resetInterval]);

  return { copied, copy };
}
