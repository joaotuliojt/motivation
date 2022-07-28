/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { AppProps } from "next/app";
import { getInitialPreloadedQuery, getRelayProps } from "relay-nextjs/app";
import { ChakraProvider } from "@chakra-ui/react";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { theme } from "../styles/theme";
import { getClientEnvironment } from "../relay/clientEnvironment";

const clientEnv = getClientEnvironment();
const initialPreloadedQuery = getInitialPreloadedQuery({
  createClientEnvironment: () => getClientEnvironment()!,
});

function MyApp({ Component, pageProps }: AppProps) {
  const relayProps = getRelayProps(pageProps, initialPreloadedQuery);
  const env = relayProps.preloadedQuery?.environment ?? clientEnv!;

  return (
    <RelayEnvironmentProvider environment={env}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} {...relayProps} />
      </ChakraProvider>
    </RelayEnvironmentProvider>
  );
}

export default MyApp;
