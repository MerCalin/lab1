// apps/server/src/entrances.ts — the entrances API, in memory until week 4

import { type Entrance, fieldErrors, NewEntrance } from "@office/shared";
import { Hono } from "hono";

const entrances: Entrance[] = [
  { address: "123 Main St", floors: 5, hasElevator: true, id: 1 },
  { address: "456 Elm St", floors: 3, hasElevator: false, id: 2 },
  { address: "789 Oak St", floors: 10, hasElevator: true, id: 3 },
];
let nextId = 4;

export const entrancesApi = new Hono();

entrancesApi.get("/api", (c) => c.json(entrances));

entrancesApi.post("/", async (c) => {
  const result = NewEntrance.safeParse(await c.req.json().catch(() => null));
  if (!result.success) {
    return c.json({ errors: fieldErrors(result.error) }, 400);
  }

  const entrance: Entrance = {
    id: nextId++,
    ...result.data,
  };
  entrances.push(entrance);
  return c.json(entrance, 201);
});
