import { env, exit } from "node:process";
import { prisma } from ".";

interface FetchedData {
    stationCode: string,
    sidoName: string,
    stationName: string,
    pm25Value: string,
    pm25Grade: string,
}

async function main() {
    const params = new URLSearchParams({
        serviceKey: env["FETCH_SERVICEKEY"]!,
        returnType: env["FETCH_RETURNTYPE"]!,
        sidoName: env["NEXT_PUBLIC_DEFAULT_SIDO"]!,
        ver: env["FETCH_VER"]!,
        numOfRows: env["FETCH_NUMOFROWS"]!,
    });
    const address = `${env["FETCH_BASEURL"]!}?${params.toString()}`;
    console.log(address);

    try {
        const dusts = await fetch(address)
            .then(x => x.json())
            .then(x => x["response"]["body"]["items"] as Array<FetchedData>)
            .then(x => x.map(a => ({
                id: a.stationCode,
                sido: a.sidoName,
                station: a.stationName,
                value: Number(a.pm25Value),
                grade: Number(a.pm25Grade)
            })));

        for (const dust of dusts) {
            await prisma.dust.upsert({
                where: {
                    id: dust.id,
                },
                update: {
                    ...dust
                },
                create: {
                    ...dust
                },
            })
        }
    }
    catch (e) {
        console.error(e)
    }
}

main()
    .catch(async (e) => {
        console.error(e)
    })
    .finally(async () => {
        await prisma.$disconnect();
        exit(1);
    })