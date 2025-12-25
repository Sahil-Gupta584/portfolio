import { NextRequest, NextResponse } from "next/server";
import { getPrs } from "@/app/actions";

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        console.log("Cron job started: Refreshing PRs...");

        // Force re-fetch from GitHub and update Redis
        await getPrs(true);

        return NextResponse.json({ ok: true, message: "PR cache refreshed" });
    } catch (error) {
        console.error("Cron error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
