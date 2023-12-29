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
    { color: "bg-red-600", icon: <CircleFill /> },
    { color: "bg-blue-600", icon: <SquareFill /> },
    { color: "bg-yellow-500", icon: <DiamondFill /> },
    { color: "bg-green-600", icon: <TriangleFill /> },
];
