"use strict";
import db from "../db.js";
import { nanoid } from "nanoid";

export default async function (fastify, opts) {
  fastify.post("/shorten", async (request, reply) => {
    const { url } = request.body;
    const short = nanoid(6);
    const statement = db.prepare(
      "INSERT INTO links (short_url, original_url) VALUES (?, ?)",
    );
    statement.run(short, url);
  });
}
