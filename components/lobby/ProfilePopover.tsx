"use client";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useCustomWallet } from "@/contexts/WalletContext";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProfilePopover() {
	const { isConnected, logout, redirectToAuthUrl, emailAddress, address } =
		useCustomWallet();

	// Add a loading state to handle initial SSR render
	const [isLoading, setIsLoading] = useState(true);

	// Use effect to update loading state after first client render
	useEffect(() => {
		setIsLoading(false);
	}, []);

	// Show simple loading state during SSR and initial hydration
	if (isLoading) {
		return (
			<Button size="sm" variant="secondary">
				Loading...
			</Button>
		);
	}

	if (isConnected) {
		return (
			<Popover>
				<PopoverTrigger asChild>
					<Button size="sm" variant="secondary">
						{emailAddress}
					</Button>
				</PopoverTrigger>
				<PopoverContent>
					<Card className="border-none shadow-none">
						<CardHeader>
							<CardTitle>Account Info</CardTitle>
							<CardDescription>
								View the account generated by Enoki&apos;s
								zkLogin flow.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<>
								<div className="flex flex-row items-center justify-between p-2 rounded-lg bg-muted/50">
									<span className="text-sm font-medium text-muted-foreground">
										Address:
									</span>
									<div className="flex flex-row items-center gap-2">
										<span className="font-mono text-sm">{`${address?.slice(
											0,
											5
										)}...${address?.slice(63)}`}</span>
										<a
											href={`https://suiscan.xyz/testnet/account/${address}`}
											target="_blank"
											className="text-primary hover:text-primary/80 transition-colors"
										>
											<ExternalLink width={14} />
										</a>
									</div>
								</div>
							</>
						</CardContent>
						<CardFooter className="flex flex-row gap-2 items-center justify-between">
							<Button
								variant="outline"
								size="sm"
								className="w-full text-center"
								onClick={logout}
							>
								Logout
							</Button>
						</CardFooter>
					</Card>
				</PopoverContent>
			</Popover>
		);
	}

	return (
		<Button
			onClick={() => {
				redirectToAuthUrl();
			}}
		>
			Sign in with Google
		</Button>
	);
}
