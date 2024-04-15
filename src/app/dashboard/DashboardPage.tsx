import { Link } from "react-router-dom";
import ContainerUtil from "../../components/Layout/ContainerUtil";
import { Title } from "../../components/Layout/TitleSubtitle";
import { useAppSelector } from "../../store/hooks.redux";
import { Role } from "../../libs/enums/role.enum";
import routes from "../../libs/routes";
import {
    Collection,
    Diagram2Fill,
    Journal,
    PeopleFill,
} from "react-bootstrap-icons";

export default function DashboardPage() {
    const { user } = useAppSelector((state) => state.auth);

    return (
        <ContainerUtil>
            <Title>Inicio</Title>

            <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                <Link
                    to={routes.collections}
                    className="w-full p-4 md:p-8 bg-indigo-700 hover:bg-indigo-700/95 shadow-lg text-white text-center rounded text-2xl md:text-5xl uppercase font-light flex items-center justify-center gap-6 transition-all duration-500"
                >
                    <Collection className="h-full" />
                    Colecciones
                </Link>
                <Link
                    to={routes.questions}
                    className="w-full p-4 md:p-8 bg-emerald-600 hover:bg-emerald-600/95 shadow-lg text-white text-center rounded text-2xl md:text-5xl uppercase font-light flex items-center justify-center gap-6 transition-all duration-500"
                >
                    <Journal className="h-full" />
                    Preguntas
                </Link>
                <Link
                    to={routes.categories}
                    className="w-full p-4 md:p-8 bg-rose-600 hover:bg-rose-600/90 shadow-lg text-white text-center rounded text-2xl md:text-5xl uppercase font-light flex items-center justify-center gap-6 transition-all duration-500"
                >
                    <Diagram2Fill className="h-full" />
                    Categorías
                </Link>
                {user.role === Role.ADMIN ? (
                    <Link
                        to={routes.users}
                        className="w-full p-4 md:p-8 bg-neutral-900 hover:bg-neutral-800 shadow-lg text-white text-center rounded text-2xl md:text-5xl uppercase font-light flex items-center justify-center gap-6 transition-all duration-500"
                    >
                        <PeopleFill className="h-full" />
                        Usuarios
                    </Link>
                ) : null}
            </section>
        </ContainerUtil>
    );
}
