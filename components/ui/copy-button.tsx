"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-foreground/5"
      aria-label="Kopiuj kod"
    >
      {copied ? (
        <>
          <Check className="size-3.5 text-primary" />
          <span className="text-primary">Skopiowano</span>
        </>
      ) : (
        <>
          <Copy className="size-3.5" />
          <span>Kopiuj</span>
        </>
      )}
    </button>
  );
}
