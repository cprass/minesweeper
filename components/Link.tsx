import { ComponentChild } from "preact";

interface Props {
  href: string;
  children: ComponentChild;
}

export default function Link({ href, children }: Props) {
  return (
    <a href={href} target="__blank" class="text-blue-500 hover:underline mx-1">
      {children}
    </a>
  );
}
