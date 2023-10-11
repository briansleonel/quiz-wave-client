import ContainerUtil from "../../../components/Layout/ContainerUtil";
import { Title } from "../../../components/Layout/TitleSubtitle";
import ModalCategory from "../../../components/Modals/ModalCategory";
import TableQuestionCategory from "../../../components/Table/table-category/TableQuestionCategory";
import { Role } from "../../../libs/enums/role.enum";
import { useAppSelector } from "../../../store/hooks.redux";

export default function CategoryPage() {
    const { user } = useAppSelector((state) => state.auth);
    return (
        <ContainerUtil>
            <Title>Categorías</Title>
            {/*<CategoryForm />*/}
            {user.role === Role.ADMIN && (
                <div className="w-full flex justify-end">
                    <ModalCategory edit={false} />
                </div>
            )}
            <TableQuestionCategory />
        </ContainerUtil>
    );
}
