import { serve, ServerRequest } from "https://deno.land/std@v0.23.0/http/server.ts";
import { createRouter, createRouteMap, textResponse, NotFoundError } from "./deps.ts";

const PORT = '8002';

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short"
  });

const logRequest = (req: ServerRequest) => {
  console.log(`[${formatDate(new Date())}] Request for ${req.url}`);
};

const createErrorResponse = (status: number, { message }: Error) => ({
  status,
  ...textResponse(message)
});

// TODO: use HTTP's Status enum
const notFound = (e: NotFoundError) => createErrorResponse(404, e);
const serverError = (e: Error) => createErrorResponse(500, e);

const onError = (e: Error) => {
  console.error(e);
  return e instanceof NotFoundError ? notFound(e) : serverError(e);
};

const router = createRouter(
  createRouteMap([
    ["/", () => textResponse(
      "<p>Hello world!</p>",
      {
        "Content-Type": "text/html",
      }
    )]
  ]),
);

(async () => {
  console.log("Listening for requests...");

  for await (const req of serve(`:${PORT}`)) {
    logRequest(req);

    await req.respond(await router(req).catch(onError));
  }
})();
