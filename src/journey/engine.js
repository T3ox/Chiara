// The journey's scroll engine. The page scrolls vertically (native scroll: wheel, trackpad, touch, keyboard,
// scrollbar all work); a sticky viewport turns that distance into a horizontal translation of the track.
// One store holds the numbers; components subscribe to what they need and re-render only when it changes.
import { createContext, useContext, useSyncExternalStore } from "react";
import { FILES } from "./data";

const listeners = new Set();
export const state = {
  top: 0, // where the journey starts on the page, px from the top of the document (0 on its own page)
  x: 0, // current horizontal offset of the track, px
  max: 1, // track width - viewport width
  vw: typeof window !== "undefined" ? window.innerWidth : 1440,
  vh: typeof window !== "undefined" ? window.innerHeight : 900,
  stations: [], // [{ left, width }]
};

export function emit() {
  for (const fn of listeners) fn();
}
export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** progress of the whole journey, 0..1 */
export const progress = () => clamp(state.x / state.max);

/*
  Local progress of station i. It plays only while the station is on screen and readable:
  0 when it is aligned with the screen (the demo window is whole at every width, and that is where goToStation()
  lands, so a jump always starts the demo at its first step), 1 when it has moved a quarter of a screen past the
  left edge, before its exit (Journey.jsx) begins.
*/
export const PLAY_FROM = 0;
export const PLAY_TO = -0.25;
/** stationT without the clamp: below 0 before the demo starts, above 1 after it ends */
function stationU(i) {
  const s = state.stations[i];
  if (!s) return 0;
  const rel = (s.left - state.x) / state.vw;
  return (PLAY_FROM - rel) / (PLAY_FROM - PLAY_TO);
}
export function stationT(i) {
  return clamp(stationU(i));
}

/** the station whose box holds the middle of the screen */
export function currentStation() {
  const mid = state.x + state.vw / 2;
  let cur = 0;
  state.stations.forEach((s, i) => {
    if (mid >= s.left) cur = i;
  });
  return cur;
}

const q = (v, steps = 160) => Math.round(v * steps) / steps;

/*
  When a file reaches its folder: file.lands = [station, moment in that station's demo] (data.js). One schedule
  for the three places that show it: the demo (the file appears in its folder), the HUD counter, the 3D card.
*/
/** has file f reached its folder? Quantized like useStationT, so the demo and the counter flip on the same frame */
export const hasLanded = (f) => q(stationT(f.lands[0])) >= f.lands[1];
export const landedCount = () => FILES.filter(hasLanded).length;
/** 0..1: the 3D card's flight toward its folder, ending exactly when the file lands */
export const flight = (f, span = 0.6) => clamp((stationU(f.lands[0]) - f.lands[1] + span) / span);

export function useLandedCount() {
  return useSyncExternalStore(subscribe, landedCount, () => 0);
}
/*
  A demo's clock. On the journey it is the scroll (stationT). Anywhere else a demo can be given its own clock
  through this context: the home page plays the same demos like short films (home/DemoPlayer.jsx).
*/
export const DemoClock = createContext(null);
export function useStationT(i) {
  const own = useContext(DemoClock);
  const fromScroll = useSyncExternalStore(subscribe, () => q(stationT(i)), () => 0);
  return own ?? fromScroll;
}
export function useCurrentStation() {
  return useSyncExternalStore(subscribe, currentStation, () => 0);
}
export function useProgress(steps = 200) {
  return useSyncExternalStore(subscribe, () => q(progress(), steps), () => 0);
}

/** scroll the page to station i, at the point where its demo starts */
export function goToStation(i, smooth = true) {
  const s = state.stations[i];
  if (!s) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: state.top + clamp(s.left - PLAY_FROM * state.vw, 0, state.max), behavior: smooth && !reduce ? "smooth" : "auto" });
}

/** a value that moves 0..1 between two points of a 0..1 timeline */
export const seg = (t, a, b) => clamp((t - a) / (b - a));
