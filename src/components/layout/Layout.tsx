import { Flex } from "rebass";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => (
  <Flex
    sx={{
      height: "100vh",
      width: "100vw",
      background: "linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%);",
    }}
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
  >
    {children}
  </Flex>
);

export default Layout;
