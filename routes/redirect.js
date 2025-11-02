"use strict";
import db from "../db.js";

export default async function (fastify, opts) {
  fastify.get("/:short", async (request, reply) => {
    const { short } = request.params;
    const row = db
      .prepare("SELECT original_url FROM links WHERE short_url = ?")
      .get(short);

    if (row) {
      return reply.redirect(row.original_url);
    } else {
      return reply.code(404);
    }
  });
}
