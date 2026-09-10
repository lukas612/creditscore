import { supabase } from "./supabase";

const SESSION_KEY = "funnel_session_id";

function getFunnelSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

// Best-effort: nunca debe romper la experiencia del quiz si falla.
// sessionIdOverride: para offer_click usamos el quiz_session_id real (en vez
// del id de sesión anónimo) para poder asociar cada click a un lead concreto
// en el panel admin.
export function trackFunnelEvent(
  event: "page_view" | "question_reached" | "offer_click",
  questionKey?: string,
  source: "quiz" | "solicitud" | "pingtree" = "quiz",
  sessionIdOverride?: string,
) {
  supabase
    .rpc("track_funnel_event", {
      p_session_id: sessionIdOverride ?? getFunnelSessionId(),
      p_event: event,
      p_question_key: questionKey ?? null,
      p_source: source,
    })
    .then(() => {});
}
