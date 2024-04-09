interface Props {
    text: string;
}

export default function LoaderRoom({ text }: Props) {
    return (
        <span className="font-medium text-neutral-200 text-3xl transform -skew-x-12">
            {text}...
        </span>
    );
}
