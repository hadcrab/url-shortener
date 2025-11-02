"use strict";
import db from "../db.js";
import { nanoid } from "nanoid";

export default async function (fastify, opts) {
  fastify.post("/shorten", async (request, reply) => {
    const { url } = request.body;
    const short = nanoid(6);
    const existing = db
      .prepare("SELECT short_url FROM links WHERE original_url = ?")
      .get(url);

    if (existing) {
      return { short_url: existing.short_url, original_url: url };
    }

    const statement = db.prepare(
      "INSERT INTO links (short_url, original_url) VALUES (?, ?)",
    );
    const shortLink = `${request.protocol}://${request.hostname}/${short}`;
    statement.run(short, url);
    return { short_url: shortLink, original_url: url };
  });
}
