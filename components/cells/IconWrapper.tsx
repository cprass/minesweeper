import { ComponentChildren } from "preact";

export default function IconWrapper({
  children,
}: {
  children: ComponentChildren;
}) {
  return (
    <span
      class={`bg-gray-200 rounded w-full h-full flex justify-center items-center`}
    >
      {children}
    </span>
  );
}
