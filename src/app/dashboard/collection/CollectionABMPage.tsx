import { useParams } from "react-router-dom";
import { ICollectionQuestion } from "../../../types/collection";

const pregsMock: Array<ICollectionQuestion> = [
    {
        duration: 20,
        question: {
            _id: "64c07d74479f3c5d5c2b1eea",
            question: "¿Cuál es el hueso más pequeño del cuerpo?",
            options: [
                "El estribo",
                "La falange",
                "El yunque",
                "Ninguna es correcta",
            ],
            correct: 0,
            category: {
                _id: "6490d5b75081691a8ac04056",
                name: "ciencia",
            },
            user: "6495c8caac05cd47cf02b0c7",
            verified: true,
            description: "",
        },
    },
    {
        duration: 20,
        question: {
            _id: "64c07d74479f3c5d5c2b1eea",
            question: "¿Qué estudia la icitología?",
            options: [
                "Los peces",
                "Los insectos",
                "Las erupciones cutáneas",
                "Las rocas",
            ],
            correct: 0,
            verified: true,
            category: {
                _id: "6490d5b75081691a8ac04056",
                name: "ciencia",
            },
            user: "6495c8caac05cd47cf02b0c7",
            description: "",
        },
    },
];

export default function CollectionABMPage() {
    const params = useParams<{ id: string }>();

    return (
        <>
            <section id="showQuestions">
                {pregsMock.map((questionColl, index) => (
                    <div>
                        <span>#{index + 1}</span>
                        <span>{questionColl.question.question}</span>
                    </div>
                ))}
            </section>
        </>
    );
}
