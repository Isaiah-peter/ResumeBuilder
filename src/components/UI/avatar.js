// src/components/UI/Avatar.js
export default function Avatar({ src, alt = '', size = 40 }) {
  return (
    <img
      src={src}
      alt={alt}
      className="rounded-full object-cover border border-gray-300"
      style={{ width: size, height: size }}
    />
  );
}
