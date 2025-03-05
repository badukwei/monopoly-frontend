import Image from "next/image";
import { CellData } from "@/types/cell";

const JailCell = ({ data }: { data: CellData }) => {
	return (
		<div className="w-full h-full relative border border-gray-300">
			<Image
				src="/cells/jail.png"
				alt="Jail"
				fill
				className="object-cover"
			/>
		</div>
	);
};

export default JailCell;
