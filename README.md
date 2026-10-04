<img width="2172" height="724" alt="logo" src="https://github.com/user-attachments/assets/4ffff30d-33d7-4432-bd5b-f92c49660e46" />

# Obstructio Adscriptionum v0.3.0

Browser ad/privacy blocker by noviciususor.

## v0.3 additions
- Pre-roll/in-player ad fallback for detects visible ad-state UI, clicks Skip Ad when available, and fast-forwards short ad media.
- Existing popup/pop-under blocking retained.
- Existing network and cosmetic blocking retained.

## Install / update in Microsoft Edge
1. Extract the ZIP.
2. Open `edge://extensions`.
3. Remove the older unpacked build or point Load unpacked to the new folder.
4. Enable Developer mode and choose **Load unpacked**.
5. Reload already-open test pages (Ctrl+F5).

Note: in-player advertising changes frequently. This build uses a conservative DOM/player fallback so it does not blindly block all media requests and break the requested video.

Author
Created and maintained by noviciususor.
