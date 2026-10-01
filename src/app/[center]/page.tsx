import { notFound } from "next/navigation";
import { clientsData } from "@/data/mockStudio";
import { preferredDays } from "@/lib/booking";
import { pageMetadata } from "@/lib/metadata";
import CenterPortal from "./center-portal";

const findClient = (center: string) => Object.entries(clientsData).find(([key]) => key.toLowerCase() === center.toLowerCase())?.[1];

export async function generateMetadata({ params }: { params: Promise<{ center: string }> }) {
  const { center } = await params;
  const client = findClient(center);
  if (!client) return { title: "المركز غير موجود", robots: { index: false } };
  return pageMetadata(client.name, `الخدمات والأسعار وطلب موعد لدى ${client.name}. اختر الخدمة والوقت المفضّل وتواصل مع الفريق عبر واتساب.`, `/${center}`, client.id !== "eglow");
}

export default async function CenterPage({ params }: { params: Promise<{ center: string }> }) {
  const { center } = await params;
  const client = findClient(center);
  if (!client || client.services.length === 0) notFound();
  return <CenterPortal client={{ ...client, days: preferredDays(new Date(), "Asia/Amman", 3) }} />;
}
