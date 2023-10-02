// SPDX-License-Identifier: AGPL-3.0-or-later
import { ComponentChild } from "preact";

interface Props {
  children: ComponentChild;
}

export default function Footer({ children }: Props) {
  return (
    <footer class="w-full flex justify-center bg-gray-200 py-2 mt-6">
      <div>{children}</div>
    </footer>
  );
}
