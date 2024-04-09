interface Props {
    timer: number;
}

export default function Timer({ timer }: Props) {
    return (
        <div className="bg-indigo-700 border-indigo-900 border-8 p-4 px-8 md:p-2 md:px-10 shadow-2xl mx-auto flex items-center justify-center rounded">
            <span className="text-white text-5xl md:text-8xl block">
                {timer}
            </span>
        </div>
    );
}

/**
 * <div className="relative bg-indigo-600 w-24 h-24 md:w-36 md:h-36 rounded-full shadow-2xl mx-auto">
            <span className="text-white text-5xl md:text-7xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 block">
                {timer}
            </span>
        </div>
 */
