// Scrolle en douceur vers une ancre si on est déjà sur la home ;
// sinon navigue vers la home avec l'ancre en suffixe. Partagée entre
// DeskNav et MobNav (mêmes règles de navigation par ancre).
export function scrollToAnchor(href: string) {
  const id = href.replace("#", "");

  if (window.location.pathname === "/") {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    window.history.pushState(null, "", href);
  } else {
    window.location.href = "/" + href;
  }
}