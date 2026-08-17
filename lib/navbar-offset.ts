/**
 * The header pill is centered as `w-[95%] max-w-7xl`, so its right edge isn't
 * at a fixed inset — it depends on viewport width. These reproduce that edge
 * (and the panel's vertical offset below the pill) so viewport-`fixed`
 * dropdowns can align flush with the navbar regardless of where their
 * trigger sits in the row.
 */
export const NAVBAR_RIGHT_OFFSET = "calc((100vw - min(95vw, 80rem)) / 2)"
export const NAVBAR_PANEL_TOP = "4.5rem"
