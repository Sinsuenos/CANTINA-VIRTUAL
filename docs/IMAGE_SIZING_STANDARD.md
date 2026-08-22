# IMAGE SIZING STANDARD - 300x250 Card Requirements

## 1. Why This Matters

Every offer card in Cantina Virtual displays a banner image. If these images are not precisely 300px wide by 250px tall, they clip on one or more edges when rendered inside the card container. This has caused repeated production bugs where logos, text, or critical visual elements get cut off on the right edge, left edge, top, or bottom. The fix is always the same: use 300x250 images with proper CSS containment. This standard exists to prevent that class of bug from ever happening again.

## 2. The Rule

**All offer card images MUST be exactly 300px x 250px. No exceptions.**

Additionally, the image container MUST enforce these CSS properties:

- `width: 300px` (or `width: 100%` with a constrained parent)
- `height: 250px` (or equivalent aspect-ratio)
- `overflow: hidden` on the container
- `object-fit: cover` (for `<img>` tags) or `background-size: cover` (for background-image)
- `background-position: center` (never offset like `center 30%` unless intentionally tested)

## 3. CSS Template

Copy this template for every resident card image. Replace `resident-name` with the resident ID:

```css
/* Dating wing uses .dating-encounter-image (DatingRoom.tsx).
   All other wings use .encounter-card-image (EncounterCard.tsx).
   Always target BOTH to be safe. */
[data-resident="resident-name"] .dating-encounter-image,
[data-resident="resident-name"] .encounter-card-image {
  aspect-ratio: 300/250;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}
[data-resident="resident-name"] .dating-encounter-image::after,
[data-resident="resident-name"] .encounter-card-image::after {
  background: none;
}
```

Notes:
- The `::after { background: none; }` removes the default gradient overlay that can obscure banner content.
- **Critical**: The Dating wing renders cards via `DatingRoom.tsx` which uses `.dating-encounter-image`. All other wings use `EncounterCard.tsx` which uses `.encounter-card-image`. Your CSS MUST target both classes or it will silently fail on one wing.
- If the card uses a flat layout (name above, image below), also add `order` properties.
- If the card needs the gradient overlay for readability, omit the `::after` rule.

## 4. Production Verification

Before any image goes to production, you MUST:

1. Confirm the source image is exactly 300x250 pixels (use `identify` from ImageMagick or PIL).
2. Deploy to production.
3. Navigate to the wing containing the card.
4. Take a screenshot at the 300x250 bounding box.
5. Visually confirm ZERO clipping on all four edges:
   - Right edge: no text or logo cut off
   - Left edge: no text or logo cut off
   - Top edge: no content hidden
   - Bottom edge: no content hidden
6. If any clipping is detected, fix the image and/or CSS before considering the task complete.

## 5. History

This rule has been broken multiple times in the history of this project, causing repeated fixes:

- Images were created at wrong dimensions (e.g., 161x103, 179x81) instead of 300x250.
- Background-position offsets caused right-edge clipping of logos.
- The red dismiss-X button on Crossdressing Fun was clipped because the container lacked overflow: hidden.
- Banner text was obscured by the default gradient overlay because the ::after rule was not overridden.

Each of these required a separate production fix. This standard exists so that every card, every offer, every time, the image is 300x250 with proper containment. It will not be broken again.
