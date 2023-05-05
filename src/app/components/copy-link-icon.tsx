'use client'

import { useState } from "react";

export default function CopyLinkIcon({ id }: { id: string }) {
  const [currentClipboard, setCurrentClipboard] = useState('');
  const copyToClipboard = (id: string) => {
    if (window?.location?.href && navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(`${window.location.href}#${id}`)
      setCurrentClipboard(`${window.location.href}#${id}`);
    }
  }

  return (
    <span id={id} onClick={(event) => { event.preventDefault(); copyToClipboard(id) }}>
      {' '}
      <span className="opacity-50 text-xs">
        {`${window?.location?.href}#${id}` === currentClipboard ? 'Copied' : '🔗'}
      </span>
    </span>
  )
}
