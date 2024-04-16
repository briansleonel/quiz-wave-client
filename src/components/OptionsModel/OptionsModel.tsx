import {
    CircleFill,
    DiamondFill,
    SquareFill,
    TriangleFill,
} from "react-bootstrap-icons";

interface OptionModel {
    color: string;
    icon: React.ReactElement;
}

export const optionsModel: Array<OptionModel> = [
    { color: "bg-red-600", icon: <CircleFill className="w-8 md:w-10 lg:w-12 h-fit" /> },
    { color: "bg-blue-600", icon: <SquareFill className="w-8 md:w-10 lg:w-12 h-fit" /> },
    { color: "bg-yellow-500", icon: <DiamondFill className="w-8 md:w-10 lg:w-12 h-fit" /> },
    { color: "bg-green-600", icon: <TriangleFill className="w-8 md:w-10 lg:w-12 h-fit" /> },
];
