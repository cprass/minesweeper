// SPDX-License-Identifier: AGPL-3.0-or-later
import Footer from "../components/Footer.tsx";
import Link from "../components/Link.tsx";
import Game from "../islands/Game.tsx";
import { Head } from "$fresh/runtime.ts";

function Divider() {
  return <span class="mx-2">&mdash;</span>;
}

export default function Home() {
  return (
    <div class="flex flex-col h-screen w-full items-center">
      <Head>
        <title>Minesweeper</title>
      </Head>
      <header>
        <h1 class="my-6 font-bold">Minesweeper</h1>
      </header>
      <main class="flex-grow">
        <Game />
      </main>
      <Footer>
        Made by <Link href="https://prass.tech">CP</Link>
        <Divider />
        <Link href="https://github.com/cprass/minesweeper/blob/main/LICENSE">
          AGPL-3.0-or-later
        </Link>
        <Divider />
        <Link href="https://github.com/cprass/minesweeper">Source</Link>
      </Footer>
    </div>
  );
}
