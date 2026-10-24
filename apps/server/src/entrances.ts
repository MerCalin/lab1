// apps/server/src/entrances.ts — the entrances API, in memory until week 4
import { Hono } from "hono";
import type { Entrance } from "@office/shared";

const entrances: Entrance[] = [
    { id: 1, address: "123 Main St", floors: 5, hasElevator: true },
    { id: 2, address: "456 Elm St", floors: 3, hasElevator: false },
    { id: 3, address: "789 Oak St", floors: 10, hasElevator: true },
];

export const entrancesApi = new Hono();

entrancesApi.get("/", (c) => c.json(entrances));

entrancesApi.get("/exit", )
