import { serve } from "https://deno.land/std@v0.23.0/http/server.ts";
import { createRouter, createRouteMap, textResponse } from "https://raw.githubusercontent.com/jamesseanwright/reno/v0.5.1/reno/mod.ts";

const PORT = '8002';

const router = createRouter(
  createRouteMap([
    ["/home", () => textResponse(
      '<p>Hello world!</p>',
      new Headers({
        'Content-Type': 'text/html',
      })
    )]
  ]),
);

(async () => {
  console.log('Listening for requests...');

  for await (const req of serve(`:${PORT}`)) {
    await req.respond(await router(req)).catch(console.error);
  }
})();
