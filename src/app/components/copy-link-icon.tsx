'use client'

import { useState } from "react";
import { usePathname } from 'next/navigation';

export default function CopyLinkIcon({ id }: { id: string }) {
  const [currentClipboard, setCurrentClipboard] = useState('');
  const pathname = usePathname();
  const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';
  const copyToClipboard = (id: string) => {
    navigator.clipboard.writeText(`${origin}${pathname}#${id}`)
    setCurrentClipboard(`${origin}${pathname}#${id}`);
  }

  return (
    <span id={id} onClick={(event) => { event.preventDefault(); copyToClipboard(id) }}>
      {' '}
      <span className="opacity-50 text-xs cursor-pointer">
        {`${origin}${pathname}#${id}` === currentClipboard ? 'Copied' : '🔗'}
      </span>
    </span>
  )
}
