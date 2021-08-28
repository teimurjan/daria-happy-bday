import { forwardRef } from "react";
import { ReactNode } from "react";
import { Button, ButtonProps, Text } from "rebass";

interface Props extends ButtonProps {
  children: ReactNode;
}

const EmojiButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, sx, ...rest }, ref) => (
    <Button
      ref={ref}
      sx={{
        ...sx,
        background: "transparent",
        cursor: "pointer",
        padding: '2vw',
      }}
      {...rest}
    >
      <Text fontSize={6}>{children}</Text>
    </Button>
  )
);

export default EmojiButton;
