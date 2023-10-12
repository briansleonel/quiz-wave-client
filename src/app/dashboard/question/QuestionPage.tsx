import FiltersQuestion from "../../../components/Filter/FiltersQuestion";
import ContainerUtil from "../../../components/Layout/ContainerUtil";
import { Title } from "../../../components/Layout/TitleSubtitle";
import TableQuestions from "../../../components/Table/table-question/TableQuestion";

export default function QuestionPage() {
    return (
        <ContainerUtil>
            <Title>Preguntas</Title>
            <FiltersQuestion />
            <TableQuestions />
        </ContainerUtil>
    );
}
