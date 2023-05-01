import Image, { StaticImageData } from 'next/image'

export default function ProfileImage({ src, alt }: { src: StaticImageData, alt: string }) {
  return (
    <Image
      className='rounded-lg drop-shadow-xl mx-2 w-52 sm:w-80'
      src={src}
      alt={alt}
    />
  )
}
