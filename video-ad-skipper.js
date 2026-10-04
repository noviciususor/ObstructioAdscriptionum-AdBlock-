(() => {
  'use strict';

  // In-player/pre-roll fallback. This runs only on sites where a player may
  // insert an ad into the same <video> element as the requested media.
  const AD_TEXT = /^(ad|advertisement|διαφήμιση)$/i;
  const SKIP_TEXT = /(skip\s*ad|skip\s*advert|παράλειψη|παράλειψη\s*διαφήμισης)/i;
  let lastFastForward = 0;

  function visible(el) {
    if (!el) return false;
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && r.height > 0;
  }

  function adSignalPresent() {
    const candidates = document.querySelectorAll(
      '[class*="ad" i], [id*="ad" i], [aria-label*="ad" i], [data-testid*="ad" i], span, button'
    );
    for (const el of candidates) {
      if (!visible(el)) continue;
      const t = (el.textContent || '').trim().replace(/\s+/g, ' ');
      if (AD_TEXT.test(t) || /visit advertiser/i.test(t) || /your video will resume/i.test(t)) return true;
    }
    return false;
  }

  function clickSkip() {
    for (const el of document.querySelectorAll('button, [role="button"], a, div')) {
      if (!visible(el)) continue;
      const t = (el.textContent || '').trim().replace(/\s+/g, ' ');
      if (t && t.length < 80 && SKIP_TEXT.test(t)) {
        try { el.click(); return true; } catch {}
      }
    }
    return false;
  }

  function accelerateAd() {
    if (!adSignalPresent()) return;
    const now = Date.now();
    if (now - lastFastForward < 350) return;
    lastFastForward = now;

    clickSkip();
    for (const v of document.querySelectorAll('video')) {
      try {
        v.muted = true;
        v.playbackRate = 16;
        if (Number.isFinite(v.duration) && v.duration > 0 && v.duration < 180) {
          v.currentTime = Math.max(v.currentTime, v.duration - 0.12);
        }
        v.play?.().catch(() => {});
      } catch {}
    }
  }

  const observer = new MutationObserver(accelerateAd);
  observer.observe(document.documentElement || document, {subtree:true, childList:true, attributes:true});
  document.addEventListener('loadedmetadata', accelerateAd, true);
  document.addEventListener('timeupdate', accelerateAd, true);
  setInterval(accelerateAd, 500);
})();
