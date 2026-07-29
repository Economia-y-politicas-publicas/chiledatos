// assets/time-theme.js
//
// Cambia automáticamente entre el tema "light" (por defecto) y "dark"
// (alternate) según la hora local del navegador del visitante.
//
// Reutiliza la misma clave de localStorage que usa el toggle nativo de
// Quarto ("quarto-color-scheme"), así que sigue funcionando junto al botón
// de la navbar: si el usuario lo toca manualmente, respetamos su elección
// por el resto del día en vez de pisarla en la próxima página.

(function () {
  // Ajusta este rango a gusto. Acá "noche" = 20:00–07:59 hora local del visitante.
  function isNightTime() {
    var hour = new Date().getHours();
    return hour >= 20 || hour < 8;
  }

  var MANUAL_KEY = "quarto-color-scheme-manual-until";

  function hasRecentManualOverride() {
    var until = window.localStorage.getItem(MANUAL_KEY);
    if (!until) return false;
    return Date.now() < parseInt(until, 10);
  }

  function applyTimeBasedTheme() {
    if (hasRecentManualOverride()) return; // el usuario ya eligió, no lo pisamos

    var desired = isNightTime() ? "alternate" : null; // null = tema por defecto (light)
    var current = window.localStorage.getItem("quarto-color-scheme");
    var currentNormalized = current === null ? null : current;

    if (desired !== currentNormalized) {
      if (desired === null) {
        window.localStorage.removeItem("quarto-color-scheme");
      } else {
        window.localStorage.setItem("quarto-color-scheme", desired);
      }
    }
  }

  applyTimeBasedTheme();

  // Cuando el usuario toca el toggle manualmente, respeta su elección
  // por las próximas 6 horas antes de que el reloj vuelva a mandar.
  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector(".quarto-color-scheme-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var sixHours = 6 * 60 * 60 * 1000;
        window.localStorage.setItem(MANUAL_KEY, String(Date.now() + sixHours));
      });
    }
  });
})();
