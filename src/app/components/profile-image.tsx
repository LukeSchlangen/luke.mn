import Image from 'next/image'

export default function ProfileImage({ src, alt }: { src: string, alt: string }) {
  return (
    <Image
      className='rounded-lg drop-shadow-xl mx-2'
      src={src}
      alt={alt}
      height={300}
      width={200}
      priority
    />
  )
}
