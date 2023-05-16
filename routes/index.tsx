import { Head } from "$fresh/runtime.ts";
import Footer from "../components/Footer.tsx";
import Link from "../components/Link.tsx";
import Game from "../islands/Game.tsx";

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
        Made by <Link href="https://christiangitter.de">CG</Link>
        <Divider />
        <Link href="https://github.com/ChrisGitter/minesweeper/blob/main/LICENSE">
          GPL-3.0
        </Link>
        license
        <Divider />
        <Link href="https://github.com/ChrisGitter/minesweeper/fork">
          Fork me on Github
        </Link>
      </Footer>
    </div>
  );
}
