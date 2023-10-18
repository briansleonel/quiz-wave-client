import TriviaForm from "../../components/Forms/TriviaForm/TriviaForm";
import { Title } from "../../components/Layout/TitleSubtitle";
import ContainerTrivia from "../../components/Trivia/ContainerTrivia";
import ContentTrivia from "../../components/Trivia/ContentTrivia";

export default function TriviaPage() {
    return (
        <ContainerTrivia>
            <ContentTrivia className="gap-6">
                <Title className="text-white !text-4xl ">QUIZZ</Title>
                <TriviaForm />
            </ContentTrivia>
        </ContainerTrivia>
    );
}
