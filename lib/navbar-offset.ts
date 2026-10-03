/**
 * The header is a full-width bar whose content sits in the `.cs-container`
 * (max 86rem, 3rem gutters on desktop), so its right edge isn't at a fixed
 * inset — it depends on viewport width. These reproduce that edge (and the
 * panel's offset below the 4rem bar) so viewport-`fixed` dropdowns can align
 * flush with the navbar regardless of where their trigger sits in the row.
 */
export const NAVBAR_RIGHT_OFFSET = "max(1.25rem, calc((100vw - 86rem) / 2 + 3rem))"
export const NAVBAR_PANEL_TOP = "4.5rem"
