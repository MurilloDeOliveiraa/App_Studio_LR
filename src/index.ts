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
import estetica from "./pages/estetica.html";
import nailDesign from "./pages/nail-design.html";
import lashDesign from "./pages/lash-design.html";
import sobrancelhas from "./pages/sobrancelhas.html";
import agendar from "./pages/agendar.html";
import privacidade from "./pages/privacidade.html";

// categorias que o formulario de agendamento aceita
const CATEGORIAS = ["Estética", "Nail Design", "Lash Design", "Sobrancelhas"];

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);

		// ---- API: salvar agendamento no D1 ----
		if (url.pathname === "/api/agendamento" && request.method === "POST") {
			try {
				const body = await request.json<{
					nome?: string;
					celular?: string;
					categoria?: string;
					consentimento?: boolean;
				}>();
				const nome = (body.nome ?? "").trim();
				const celular = (body.celular ?? "").trim();
				const categoria = (body.categoria ?? "").trim();
				const consentimento = body.consentimento === true;

				if (!nome || nome.length < 2 || !celular || celular.replace(/\D/g, "").length < 10) {
					return new Response(JSON.stringify({ ok: false, error: "Dados inválidos" }), {
						status: 400,
						headers: { "content-type": "application/json; charset=utf-8" },
					});
				}

				if (!CATEGORIAS.includes(categoria)) {
					return new Response(JSON.stringify({ ok: false, error: "Categoria inválida" }), {
						status: 400,
						headers: { "content-type": "application/json; charset=utf-8" },
					});
				}

				if (!consentimento) {
					return new Response(JSON.stringify({ ok: false, error: "Consentimento não informado" }), {
						status: 400,
						headers: { "content-type": "application/json; charset=utf-8" },
					});
				}

				await env.db_binding.prepare(
					"INSERT INTO Leads (nome, celular, categoria, consentimento, consentido_em) VALUES (?, ?, ?, 1, ?)"
				)
					.bind(nome, celular, categoria, new Date().toISOString())
					.run();

				return new Response(JSON.stringify({ ok: true }), {
					status: 201,
					headers: { "content-type": "application/json; charset=utf-8" },
				});
			} catch (err) {
				return new Response(JSON.stringify({ ok: false, error: "Erro ao salvar" }), {
					status: 500,
					headers: { "content-type": "application/json; charset=utf-8" },
				});
			}
		}

		if (url.pathname.startsWith("/assets/")) {
			// o binding serve a partir da raiz de ./src/assets, entao o prefixo sai daqui
			const destino = new URL(request.url);
			destino.pathname = url.pathname.slice("/assets".length);
			return env.ASSETS.fetch(new Request(destino, request));
		}

		if (url.pathname === "/") {
			return new Response(homeHtml, {
				headers: { "content-type": "text/html; charset=utf-8" },
			});
		}

		if (url.pathname === "/estetica") {
			return new Response(estetica, { headers: { "content-type": "text/html; charset=utf-8" } });
		}
		if (url.pathname === "/nail-design") {
			return new Response(nailDesign, { headers: { "content-type": "text/html; charset=utf-8" } });
		}
		if (url.pathname === "/lash-design") {
			return new Response(lashDesign, { headers: { "content-type": "text/html; charset=utf-8" } });
		}
		if (url.pathname === "/sobrancelhas") {
			return new Response(sobrancelhas, { headers: { "content-type": "text/html; charset=utf-8" } });
		}
		if (url.pathname === "/agendar") {
			return new Response(agendar, { headers: { "content-type": "text/html; charset=utf-8" } });
		}
		if (url.pathname === "/privacidade") {
			return new Response(privacidade, { headers: { "content-type": "text/html; charset=utf-8" } });
		}

		return new Response("Página não encontrada", {
			status: 404
		});
	},
} satisfies ExportedHandler<Env>;
