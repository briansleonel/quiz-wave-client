import { Pencil, Trash, Trash3 } from "react-bootstrap-icons";
import ButtonPrimary from "../../../components/Button/ButtonPrimary";
import ContainerUtil from "../../../components/Layout/ContainerUtil";
import { collectionsMock } from "../../../services/collecttions.mock";
import { getTimeAgo } from "../../../libs/getTimeAgo";
import CollectionCard from "../../../components/Cards/CollectionCard";
import { Title } from "../../../components/Layout/TitleSubtitle";

export default function CollectionPage() {
    return (
        <>
            <ContainerUtil>
                <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    {collectionsMock.map((collection) => (
                        <CollectionCard
                            key={collection._id}
                            collection={collection}
                        />
                    ))}
                </section>
            </ContainerUtil>
        </>
    );
}
