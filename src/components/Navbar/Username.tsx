import { PersonCircle } from "react-bootstrap-icons";
import { useAppSelector } from "../../store/hooks.redux";

export default function Username() {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    return (
        <>
            {isAuthenticated && (
                <div className="flex items-center justify-center gap-2 md:gap-1 text-neutral-400 italic font-light">
                    <PersonCircle />
                    <span className=" text-neutral-400">{user.username}</span>
                </div>
            )}
        </>
    );
}
