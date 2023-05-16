import IconWrapper from "./IconWrapper.tsx";
import { BASE_CLASS_NAMES } from "./base.ts";

interface ZonkCellProps {
  highlight?: boolean;
}

export default function ZonkCell({ highlight }: ZonkCellProps) {
  return (
    <div
      class={`${BASE_CLASS_NAMES} ${
        highlight ? "bg-red-600" : "bg-gray-400"
      } p-[4px] cursor-default`}
      aria-label="A bomb, game over"
    >
      <IconWrapper>💣</IconWrapper>
    </div>
  );
}
