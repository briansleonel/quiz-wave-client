interface Props {
    name: string;
    score?: number;
}

export default function PlayerInfo({ name, score }: Props) {
    return (
        <div className="bg-white text-neutral-900 w-full flex justify-between p-4 md:px-8 text-2xl md:text-3xl font-bold">
            <span>{name}</span>

            {score && (
                <span className="bg-neutral-800 text-white rounded p-1 px-10 text-xl">
                    {score}
                </span>
            )}
        </div>
    );
}
