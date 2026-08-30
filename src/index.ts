/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import homeHtml from "./pages/home.html";

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname.startsWith("/assets/")) {
			return env.ASSETS.fetch(request);
		}

		if (url.pathname === "/") {
			return new Response(homeHtml, {
				headers: { "content-type": "text/html; charset=utf-8" },
			});
		}

		if (url.pathname === "/api/hello") {
			return Response.json({
				message: "Olá do Cloudflare Worker!",
				status: "online"
			});
		}

		return new Response("Página não encontrada", {
			status: 404
		});
	},
} satisfies ExportedHandler<Env>;
