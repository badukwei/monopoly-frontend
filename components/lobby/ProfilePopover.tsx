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
import { useEffect, useState } from "react";
import { toast } from "sonner";
interface ProfilePopoverProps {
	suiBalance: string | null;
}

export default function ProfilePopover({ suiBalance }: ProfilePopoverProps) {
	const { isConnected, logout, redirectToAuthUrl, emailAddress, address } =
		useCustomWallet();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(false);
	}, []);

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
										<Button
											variant="ghost"
											size="icon"
											className="h-6 w-6 p-0"
											onClick={() => {
												navigator.clipboard.writeText(address || "");
												toast.success("Address copied to clipboard");
											}}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="14"
												height="14"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="opacity-50 hover:opacity-100"
											>
												<rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
												<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
											</svg>
										</Button>
									</div>
								</div>
								<div className="flex flex-row items-center justify-between p-2 rounded-lg bg-muted/50 mt-2">
									<span className="text-sm font-medium text-muted-foreground">
										SUI Balance:
									</span>
									<span className="font-mono text-sm">
										{suiBalance !== null
											? Number(suiBalance) / 1e9
											: "Loading..."}
									</span>
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
