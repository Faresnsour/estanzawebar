import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const dynamic = "force-static";

export async function GET() {
  const logo = await readFile(join(process.cwd(), "public/logotube2.png"));
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "64px 72px", background: "#102B25", color: "#F5F4ED" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 38, fontWeight: 700 }}>
        {/* ImageResponse renders this to PNG; next/image is not supported here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/png;base64,${logo.toString("base64")}`} width={64} height={64} alt="" />
        Estanza
      </div>
      <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.12, maxWidth: 980, marginTop: 54 }}>Built around your business. Ready for your customers.</div>
      <div style={{ display: "flex", fontSize: 29, color: "#D6F0C2", marginTop: 26, maxWidth: 950 }}>AI voice agents. Custom booking and enquiry pages.</div>
      <div style={{ display: "flex", fontSize: 22, color: "#D5DDD1", marginTop: "auto" }}>www.estanza.dev</div>
    </div>,
    { width: 1200, height: 630, headers: { "Cache-Control": "public, max-age=86400" } },
  );
}
