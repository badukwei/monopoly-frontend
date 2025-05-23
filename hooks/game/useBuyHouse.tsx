// hooks/game/useBuyHouse.tsx
"use client";

import { useCallback, useState } from "react";
import { useCustomWallet } from "@/contexts/WalletContext";
import { useGameActionContext } from "@/contexts/GameActionContext";
import { useSuiClient } from "@mysten/dapp-kit";
import { Action } from "@sui-dolphin/monopoly-sdk";

interface UseBuyHouseReturn {
	isLoading: boolean;
	error: string | null;
	executeBuy: (purchased: boolean) => Promise<any>;
}

export const useBuyHouse = (): UseBuyHouseReturn => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const { game } = useGameActionContext();
	const { address, executeTransactionWithoutSponsorship } = useCustomWallet();
	const suiClient = useSuiClient();

	// 執行購買操作
	const executeBuy = useCallback(
		async (purchased: boolean) => {
			if (!game) {
				setError("No active game selected");
				return null;
			}

			if (!address) {
				setError("No wallet connected");
				return null;
			}

			setIsLoading(true);
			setError(null);

			try {
				const requests = await game.getOwnedActionRequest(
					suiClient,
					address,
					Action.BUY_OR_UPGRADE
				);
				console.log("requests", requests);

				if (requests.length === 0) {
					setError("No buy request available");
					return null;
				}

				// 創建購買交易
				const ptb = game.playerExecuteBuyOrUpgarde(
					requests[0],
					purchased
				);

				// 執行交易
				const result = await executeTransactionWithoutSponsorship({
					tx: ptb,
					options: { showEvents: true },
				});

				// 解析購買事件
				// 這邊應該會由 socket 來處理
				if (!result) {
					throw new Error("Failed to execute buy");
				}
				const buyEvents =
					game.parsePlayerBuyOrUpgradeEvent(result);
				console.log("buyEvents", buyEvents);

				return buyEvents;
			} catch (err: any) {
				console.error("Error executing buy:", err);
				setError(err.message || "Failed to execute buy");
				return null;
			} finally {
				setIsLoading(false);
			}
		},
		[game, address, suiClient, executeTransactionWithoutSponsorship]
	);

	return {
		isLoading,
		error,
		executeBuy,
	};
};
