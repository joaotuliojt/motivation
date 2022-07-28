import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Heading Font Name';
        font-style: normal;
      }
      /* latin */
      @font-face {
        font-family: 'Body Font Name';
      }
      `}
  />
);

export { Fonts };
