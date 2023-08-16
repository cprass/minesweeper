import IconWrapper from "./IconWrapper.tsx";
import { useBaseClassNames } from "./useBaseClassNames.ts";

interface ZonkCellProps {
  highlight?: boolean;
}

export default function ZonkCell({ highlight }: ZonkCellProps) {
  const classNames = useBaseClassNames();
  return (
    <div
      class={`${classNames} ${
        highlight ? "bg-red-600" : "bg-gray-400"
      } p-[4px] cursor-default`}
      aria-label="A bomb, game over"
    >
      <IconWrapper>💣</IconWrapper>
    </div>
  );
}
