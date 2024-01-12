interface Props {
    timer: number;
}

export default function Timer({ timer }: Props) {
    return (
        <div className="relative bg-indigo-600 w-24 h-24 rounded-full shadow-2xl">
            <span className="text-white text-5xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 block">
                {timer}
            </span>
        </div>
    );
}
