import { Head } from "$fresh/runtime.ts";
import Game from "../islands/Game.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Minesweeper</title>
      </Head>
      <div class="w-full flex flex-col items-center">
        <h1 class="my-6 font-bold">
          Minesweeper
        </h1>
        <Game />
      </div>
    </>
  );
}
