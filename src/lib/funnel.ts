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
export function trackFunnelEvent(
  event: "page_view" | "question_reached",
  questionKey?: string,
  source: "quiz" | "solicitud" = "quiz",
) {
  supabase
    .rpc("track_funnel_event", {
      p_session_id: getFunnelSessionId(),
      p_event: event,
      p_question_key: questionKey ?? null,
      p_source: source,
    })
    .then(() => {});
}
