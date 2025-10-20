import DustCardList from "@/components/dustcard";
import OptionProvider from "@/components/provider";
import SidoSelector from "@/components/sidoselector";
import { getDusts } from "./action";

export default function Home() {
    const dusts = getDusts();
    return (
        <main>
            <OptionProvider>
                <DustCardList dusts={dusts} />
                <SidoSelector dusts={dusts} />
            </OptionProvider>
        </main>
    )
}
