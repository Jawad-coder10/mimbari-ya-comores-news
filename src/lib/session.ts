// Anonymous viewer session id, stored in localStorage. Used to deduplicate article views.
const KEY = "mimbari_session_id";

export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = window.localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(KEY, id);
  }
  return id;
}
