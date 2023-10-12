import FiltersQuestion from "../../../components/Filter/FiltersQuestion";
import ContainerUtil from "../../../components/Layout/ContainerUtil";
import { Title } from "../../../components/Layout/TitleSubtitle";

export default function QuestionPage() {
    return (
        <ContainerUtil>
            <Title>Preguntas</Title>
            <FiltersQuestion />
        </ContainerUtil>
    );
}
