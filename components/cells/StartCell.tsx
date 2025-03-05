import Image from "next/image";
import { CellData } from "@/types/cell";

const StartCell = ({ data }: { data: CellData }) => {
	return (
		<div className="w-full h-full relative">
			<Image
				src="/cells/start.png"
				alt="Start"
				fill
				className="object-cover"
			/>
		</div>
	);
};

export default StartCell;
