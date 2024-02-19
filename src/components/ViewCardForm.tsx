"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function ViewCardForm() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!url) return;
    const sheetId = url.match(/\/d\/([^/]+)\/edit/)?.[1];
    if (!sheetId) {
      ref.current?.setCustomValidity("URLが正しくありません");
      return;
    }
    router.push(`./card/${sheetId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={ref}
        name="url"
        type="url"
        value={url}
        onChange={(ev) => setUrl(ev.target.value)}
        className="w-full max-w-screen-lg border border-gray-300 px-2"
        placeholder="シートURL"
      />
    </form>
  );
}
