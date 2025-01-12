import { useState } from "react";
import type { NextPage } from "next";
import { useWallet, CardanoWallet } from "@meshsdk/react";

interface Asset {
    unit: string;
    quantity: string;
}

const Home: NextPage = () => {
    const { connected, wallet } = useWallet();
    const [assets, setAssets] = useState<Asset[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    async function getAssets() {
        if (wallet) {
            setLoading(true);
            try {
                const _assets: Asset[] = await wallet.getAssets();
                setAssets(_assets);
            } catch (error) {
                console.error("Failed to fetch wallet assets:", error);
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div>
            <h1>Connect Wallet</h1>
            <CardanoWallet />
            {connected && (
                <>
                    <h1>Get Wallet Assets</h1>
                    {assets ? (
                        <pre>
                            <code className="language-js">
                                {JSON.stringify(assets, null, 2)}
                            </code>
                        </pre>
                    ) : (
                        <button
                            type="button"
                            onClick={getAssets}
                            disabled={loading}
                            style={{
                                margin: "8px",
                                backgroundColor: loading ? "orange" : "grey",
                                cursor: loading ? "not-allowed" : "pointer",
                            }}
                        >
                            {loading ? "Loading..." : "Get Wallet Assets"}
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default Home;
