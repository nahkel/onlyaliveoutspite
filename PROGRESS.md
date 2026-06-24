# Portfolio Site Progress

Last updated: 2026-06-24 09:52 PDT

## What changed

- Rebuilt the site as an editable 90s-style videography archive.
- Matched the requested old-web direction: gray patterned background, white boxes, black text, blue links, and green hover states.
- Removed the visible `nahkel skylar` header title.
- Moved lowercase `archive*` into the top header.
- Removed the visible intro box title so the introduction text stands alone.
- Added intro copy: `videography, edits, shows, memory fragments, footage, proof of life...`
- Added scrolling banner copy:
  `* welcome to my portfolio! :L * all my work is listed here * feel free to browse my videography * my art work * my sound selections *`
- Fetched YouTube channel video data and listed 11 videos.
- Removed/unlinked `life as a collegiate esports player #1`.
- Added video preview panels below each title, with links to open on YouTube.
- Added the Gir dancing asset on the right side:
  - `assets/gir-dancing.gif`
  - `assets/gir-dancing.mp4`
- Moved social media links below the GIF.
- Added social links:
  - Instagram
  - TikTok
  - Discord community
  - `contact me: sickboydori@gmail.com`
- Removed the clickable Tumblr reference from the top navigation.
- Removed rates tab and visible rates box.
- Added two temporary artwork panels:
  - `assets/archive-art-1.png`
  - `assets/archive-art-2.png`
- Refreshed desktop/mobile previews:
  - `preview.png`
  - `preview-mobile.png`
- Moved `archive*` into the top header.
- Removed the intro box label and title.
- Styled the intro copy as italic bold Courier text so it fills the box more naturally.
- Replaced the plain browser music controls with a Winamp-like custom player.
- Added player controls, readout, seek bar, and a canvas visualizer.
- Tightened the Winamp-style player width so it fits inside the mobile music box.
- Restyled the music player with old Windows title-bar/buttons.
- Reworked the visualizer into a Geisswerks-inspired plasma/swirl canvas animation instead of simple bars.
- Prepared the folder for GitHub Pages publishing with `.nojekyll`.
- Confirmed GitHub CLI is installed, but it is not logged in yet in this OpenClaw session.
- Excluded local MP3 files from the public Git repo until the final publish-safe music track is chosen.
- Initialized `portfolio-site` as its own Git repo on branch `main`.
- Created local publish base commit `960e9f3` for the site files.
- Latest local commit includes the refreshed publish progress note.
- Published the site to a public GitHub repo:
  - `https://github.com/nahkel/onlyaliveoutspite`
  - `https://nahkel.github.io/onlyaliveoutspite/`
- Added a GitHub Actions Pages workflow after the first legacy Pages build failed.
- Cleared the stuck legacy Pages deployment and confirmed the Actions deployment succeeded.
- Verified the live site returns HTTP 200 and contains the expected `archive*` content.

## Unfinished

- Winamp-style music player still needs a publish-safe final audio file at `assets/music/site-track.mp3`, or the source in `index.html` needs to be changed to the chosen file name.
- Site is published on GitHub Pages at `https://nahkel.github.io/onlyaliveoutspite/`.
- Domain is not connected yet. `onlyaliveoutspite` is the desired site/domain name, but a full custom domain still needs an ending such as `.com`, `.net`, `.site`, etc.
- YouTube embeds may not fully play from local `file://`; this should be re-tested after hosting.
- Artwork panels are placeholders and can be replaced with final art.
- Contact/social section can be expanded with display names, icons, or descriptions later.
- Rates were removed for now; add back only if requested.

## Next steps

1. Add the final music file to `assets/music/`.
2. Re-test the music player locally.
3. Test YouTube playback on the hosted URL.
4. Choose or confirm a full custom domain name.
5. Connect domain DNS to GitHub Pages.
6. Replace placeholder art if desired.
7. Keep updating this file after each major change.

## Working rule

After every major site change, update this `PROGRESS.md` with:

- what changed
- what remains unfinished
- the next concrete step
