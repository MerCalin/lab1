// apps/server/src/entrances.ts — the entrances API, in memory until week 4
import { Hono } from "hono";
import type { Entrance } from "@office/shared";

const entrances: Entrance[] = [
    { id: 1, address: "123 Main St", floors: 5, hasElevator: true },
    { id: 2, address: "456 Elm St", floors: 3, hasElevator: false },
    { id: 3, address: "789 Oak St", floors: 10, hasElevator: true },
];
let nextId = 4;

export const entrancesApi = new Hono();

entrancesApi.get("/api", (c) => c.json(entrances));

entrancesApi.post("/", async (c) => {
    const body = await c.req.json().catch(() => null);

    const errors: Record<string, string> = {};
    if (typeof body?.address !== "string" || body.address.trim() === ""){
        errors.address = "Address is required";
    }
    if (!Number.isInteger(body?.floors) || body.floors < 0){
        errors.floors = "Floors must be a whole number, 0 or more";
    }
    if (typeof body?.hasElevator !== "boolean"){
        errors.hasElevator = "Say whether there is an elevator or not";
    }
    if (Object.keys(errors).length > 0) {
        return c.json({ errors }, 400);
    }
    const entrance: Entrance = {
        id : nextId++,
        address : body.address.trim(),
        floors: body.floors,
        hasElevator : body.hasElevator,
    };
    entrances.push(entrance);
    return c.json(entrance, 201);
});