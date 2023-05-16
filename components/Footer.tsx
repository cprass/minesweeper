import { ComponentChild } from "preact";

interface Props {
  children: ComponentChild;
}

export default function Footer({ children }: Props) {
  return (
    <footer class="w-full flex justify-center bg-gray-200 py-2">
      <div>{children}</div>
    </footer>
  );
}
