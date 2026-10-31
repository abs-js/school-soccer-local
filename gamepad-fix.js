// Normalize Xbox and PlayStation triggers so LT/L2 and RT/R2 are always buttons 6 and 7.
(function () {
  if (!navigator.getGamepads) return;
  const raw = navigator.getGamepads.bind(navigator);
  navigator.getGamepads = function () {
    const pads = raw();
    for (const g of pads) {
      if (!g) continue;
      const set = (i, on) => {
        const b = g.buttons[i];
        if (!b) return;
        if (on && !b.pressed) {
          try { Object.defineProperty(b, "pressed", { value: true }); } catch (e) {}
          try { Object.defineProperty(b, "value", { value: 1 }); } catch (e) {}
        }
      };
      set(6, (g.axes[4] ?? 0) > 0.35 || (g.buttons[6] && g.buttons[6].value > 0.35));
      set(7, (g.axes[5] ?? 0) > 0.35 || (g.buttons[7] && g.buttons[7].value > 0.35));
    }
    return pads;
  };
})();
