import "../styles/globals.css";
import "@meshsdk/react/styles.css";
import type { AppProps } from "next/app";
import { MeshProvider } from "@meshsdk/react";
import "regenerator-runtime/runtime";


function App({ Component, pageProps }: AppProps) {
    return (
        <MeshProvider>
            <Component {...pageProps} />
        </MeshProvider>
    );
}

export default App;