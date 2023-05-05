'use client'

import { useRouter } from "next/router";
import { useState } from "react";

export default function CopyLinkIcon({ id, pathname }: { id: string, pathname: string }) {
  const [currentClipboard, setCurrentClipboard] = useState('');
  const copyToClipboard = (id: string) => {
    navigator.clipboard.writeText(`${pathname}#${id}`)
    setCurrentClipboard(`${pathname}#${id}`);
  }

  return (
    <span id={id} onClick={(event) => { event.preventDefault(); copyToClipboard(id) }}>
      {' '}
      <span className="opacity-50 text-xs">
        {`${pathname}#${id}` === currentClipboard ? 'Copied' : '🔗'}
      </span>
    </span>
  )
}
