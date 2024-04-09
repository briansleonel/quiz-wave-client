import { Icon } from "react-bootstrap-icons";

export interface IData {
    label: string;
    value: string;
}

export interface NavLink {
    name: string;
    icon: Icon;
    href: string;
}

export interface InputPropType {
    value: string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}
export interface InputTextAreaPropType {
    value: string;
    onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
}
