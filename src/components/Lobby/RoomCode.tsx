interface Props {
    code: number;
}

export default function RoomCode({ code }: Props) {
    return (
        <section className="flex w-fit rounded transform -skew-x-12 bg-indigo-600 shadow-xl shadow-neutral-950 text-7xl">
            <div className="rounded py-4 px-8  bg-indigo-800 flex items-center justify-center">
                <div className="transform skew-x-12 flex items-center justify-center">
                    <span className="text-center text-white font-medium text-2xl">PIN de juego:</span>
                </div>
            </div>
            <div className="w-full rounded py-4 px-16 bg-indigo-600 ">
                <div className="transform skew-x-12 ">
                    <h3 className="transform text-center text-neutral-200 font-extrabold tracking-widest">
                        {code}
                    </h3>
                </div>
            </div>
        </section>
    );
}
