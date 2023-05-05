'use client'

import { useRouter } from "next/router";
import { useState } from "react";

export default function CopyLinkIcon({ id }: { id: string }) {
  const [currentClipboard, setCurrentClipboard] = useState('');
  const router = useRouter();
  const copyToClipboard = (id: string) => {
    navigator.clipboard.writeText(`${router.pathname}#${id}`)
    setCurrentClipboard(`${router.pathname}#${id}`);
  }

  return (
    <span id={id} onClick={(event) => { event.preventDefault(); copyToClipboard(id) }}>
      {' '}
      <span className="opacity-50 text-xs">
        {`${router.pathname}#${id}` === currentClipboard ? 'Copied' : '🔗'}
      </span>
    </span>
  )
}
