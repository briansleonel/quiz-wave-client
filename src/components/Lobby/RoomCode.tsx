interface Props {
    code: number;
}

export default function RoomCode({ code }: Props) {
    return (
        <section className="flex w-fit rounded transform -skew-x-12 bg-indigo-600 shadow-md shadow-neutral-900 text-5xl">
            <div className="rounded py-4 px-8  bg-indigo-800">
                <div className="transform skew-x-12">
                    <h3 className="text-center text-white font-medium">PIN</h3>
                </div>
            </div>
            <div className="w-full rounded py-4 px-16 bg-indigo-600 ">
                <div className="transform skew-x-12 ">
                    <h3 className="transform text-center text-neutral-200 font-semibold tracking-wide">
                        {code}
                    </h3>
                </div>
            </div>
        </section>
    );
}
