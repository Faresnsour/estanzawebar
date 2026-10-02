import { getLocale } from "@/i18n/server";
import { source, getTranslator } from "@/i18n/messages";
import { notFound } from "next/navigation";
import { clientsData } from "@/data/mockStudio";
import { preferredDays } from "@/lib/booking";
import { pageMetadata } from "@/lib/metadata";
import CenterPortal from "./center-portal";
const findClient = (center: string) => Object.entries(clientsData).find(([key]) => key.toLowerCase() === center.toLowerCase())?.[1];
export async function generateMetadata({ params }: {
    params: Promise<{
        center: string;
    }>;
}) {
    const { center } = await params;
    const client = findClient(center);
    if (!client)
        return { title: getTranslator(await getLocale())("centre.centre_not_found"), robots: { index: false } };
    return pageMetadata(client.name, source("centre.explore_services_and_prices_at_value_choose", [client.name]), `/${center}`, client.id !== "eglow");
}
export default async function CenterPage({ params }: {
    params: Promise<{
        center: string;
    }>;
}) {
    const { center } = await params;
    const client = findClient(center);
    if (!client || client.services.length === 0)
        notFound();
    return <CenterPortal client={{ ...client, days: preferredDays(new Date(), "Asia/Amman", 3, await getLocale()) }}/>;
}
