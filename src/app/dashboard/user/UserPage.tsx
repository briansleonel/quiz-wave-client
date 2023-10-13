import Filters from "../../../components/Filter/Filters";
import ContainerUtil from "../../../components/Layout/ContainerUtil";
import { Title } from "../../../components/Layout/TitleSubtitle";
import TableUsers from "../../../components/Table/table-user/TableUsers";

export default function UserPage() {
    return (
        <ContainerUtil>
            <Title>Usuarios</Title>
            <Filters />
            <TableUsers />
        </ContainerUtil>
    );
}
