// SPDX-License-Identifier: AGPL-3.0-or-later
import { PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Minesweeper</title>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
