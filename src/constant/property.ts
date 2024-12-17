import { RecordableHistogram } from "perf_hooks";

export const PROPERTY_MAP: Record<string, string> = {
  color: "text",
  background: "bg",
  "background-color": "bg",
  "background-position": "bg",
  "background-repeat": "bg",
  "background-size": "bg",
  "background-clip": "bg-clip",
  "background-origin": "bg-origin",
  "background-blend-mode": "bg-blend",
  width: "w",
  "min-width": "min-w",
  "max-width": "max-w",
  height: "h",
  "min-height": "min-h",
  "max-height": "max-h",
  margin: "m",
  "margin-top": "mt",
  "margin-left": "ml",
  "margin-bottom": "mb",
  "margin-right": "mr",
  "margin-inline": "mx",
  "margin-block": "my",
  padding: "p",
  "padding-top": "pt",
  "padding-left": "pl",
  "padding-bottom": "pb",
  "padding-right": "pr",
  "padding-inline": "px",
  "padding-block": "py",
  "font-size": "text",
  "font-family": "font",
  "font-weight": "font",
  "line-height": "leading",
  "letter-spacing": "tracking",
  "object-position": "object",
  "object-fit": "object",
  "flex-basis": "basis",
  "flex-direction": "flex",
  "flex-wrap": "flex",
  flex: "flex",
  "flex-grow": "grow",
  "flex-shrink": "shrink",
  order: "order",
  "grid-template-columns": "grid-cols",
  "grid-column": "col",
  "grid-template-rows": "grid-rows",
  "grid-row": "row",
  "grid-auto-flow": "grid-auto",
  "grid-auto-columns": "auto-cols",
  "grid-auto-rows": "auto-rows",
  gap: "gap",
  "justify-content": "justify",
  "justify-items": "justify-items",
  "justify-self": "justify-self",
  "align-content": "content",
  "align-items": "items",
  "align-self": "self",
  "place-content": "place-content",
  "place-items": "place-items",
  "place-self": "place-self",
  "box-sizing": "box",
  "box-decoration-break": "box-decoration",
  "break-inside": "break-inside",
  "break-before": "break-before",
  "break-after": "break-after",
  "aspect-ratio": "aspect",
  columns: "columns",
  "border-radius": "rounded",
  "border-width": "border",
  "border-color": "border",
  "border-style": "border",
  "border-collapse": "border",
  "border-spacing": "border-spacing",
  "outline-width": "outline",
  "outline-color": "outline",
  "outline-style": "outline",
  "outline-offset": "outline-offset",
  "table-layout": "table",
  "caption-side": "caption",
  "transition-duration": "duration",
  "transition-timing-function": "ease",
  "transition-delay": "delay",
  "accent-color": "accent",
  appearance: "appearance",
  cursor: "cursor",
  "caret-color": "caret",
  "pointer-events": "pointer-events",
  resize: "resize",
  "scroll-behavior": "scroll",
  "scroll-margin": "scroll",
  "scroll-padding": "scroll",
  "scroll-snap-align": "snap",
  "scroll-snap-stop": "snap",
  "touch-action": "touch",
  "user-select": "select",
  "will-change": "will-change",
  fill: "fill",
  stroke: "stroke",
  "stroke-width": "stroke",
  "forced-color-adjust": "forced-color-adjust",
  "box-shadow": "shadow",
  opacity: "opacity",
  "mix-blend-mode": "mix-blend",
  overflow: "overflow",
  "overflow-y": "overflow-y",
  "overflow-x": "overflow-x",
  "overscroll-behavior": "overscroll",
  "overscroll-behavior-y": "overscroll-y",
  "overscroll-behavior-x": "overscroll-x",
  "list-style-image": "list-style",
  "list-style-position": "list",
  "list-style-type": "list",
  "text-align": "text",
  "text-wrap": "text",
  "text-decoration-color": "decoration",
  "text-decoration-style": "decoration",
  "text-decoration-thickness": "decoration",
  "text-underline-offset": "underline-offset",
  "text-indent": "indent",
  "vertical-align": "align",
  "white-space": "whitespace",
  hyphens: "hyphens",
  content: "content",
  "z-index": "z",
  inset: "inset",
  "inset-inline-start": "start",
  "inset-inline-end": "end",
  top: "top",
  right: "right",
  left: "left",
  bottom: "bottom",
  clear: "clear",
  float: "float",
  display: " ",
  position: " ",
  visibility: " ",
  isolation: " ",
  "font-style": " ",
  "font-variant-numeric": " ",
  "text-decoration-line": " ",
  "text-transform": " ",
};
export const THEME_PATH_MAP: Record<string, string> = {
  // Colors
  color: "colors",
  "background-color": "colors",
  "border-color": "colors",

  // Background
  "background-image": "backgroundImage",
  "background-position": "backgroundPosition",
  "background-size": "backgroundSize",
  "background-repeat": "backgroundRepeat",
  "gradient-color-stops": "colors",

  // Border
  "border-width": "borderWidth",
  "border-radius": "borderRadius",

  // Box Shadow
  "box-shadow": "boxShadow",
  "ring-width": "ringWidth",
  "ring-offset-width": "ringOffsetWidth",

  // Spacing
  margin: "spacing",
  padding: "spacing",
  gap: "spacing",
  inset: "spacing", // Used for top, right, bottom, left

  // Sizing
  width: "width",
  height: "height",
  "min-width": "minWidth",
  "max-width": "maxWidth",
  "min-height": "minHeight",
  "max-height": "maxHeight",
  "flex-basis": "spacing",

  // Typography
  "font-size": "fontSize",
  "font-family": "fontFamily",
  "font-weight": "fontWeight",
  "letter-spacing": "letterSpacing",
  "line-height": "lineHeight",
  "text-transform": "textTransform",
  "text-decoration": "textDecoration",
  "text-shadow": "textShadow",

  // Layout
  flex: "flex",
  "flex-grow": "flexGrow",
  "flex-shrink": "flexShrink",
  order: "order",
  "grid-template-columns": "gridTemplateColumns",
  "grid-template-rows": "gridTemplateRows",
  "grid-column": "gridColumn",
  "grid-row": "gridRow",
  "grid-auto-flow": "gridAutoFlow",
  "grid-auto-columns": "gridAutoColumns",
  "grid-auto-rows": "gridAutoRows",
  "gap-x": "spacing", // Horizontal grid gaps
  "gap-y": "spacing", // Vertical grid gaps

  // Animation
  "transition-duration": "transitionDuration",
  "transition-timing-function": "transitionTimingFunction",
  "transition-delay": "transitionDelay",

  // Opacity
  opacity: "opacity",

  // Z-Index
  "z-index": "zIndex",

  // Cursor
  cursor: "cursor",

  // List Styles
  "list-style-type": "listStyleType",
  "list-style-position": "listStylePosition",
};
export const PROPERTY_AS_VALUE_MAP: Record<string, Record<string, string>> = {
  display: {
    block: "block",
    "inline-block": "inline-block",
    inline: "inline",
    flex: "flex",
    "inline-flex": "inline-flex",
    table: "table",
    "inline-table": "inline-table",
    "table-caption": "table-caption",
    "table-cell": "table-cell",
    "table-column": "table-column",
    "table-column-group": "table-column-group",
    "table-footer-group": "table-footer-group",
    "table-header-group": "table-header-group",
    "table-row-group": "table-row-group",
    "table-row": "table-row",
    "flow-root": "flow-root",
    grid: "grid",
    "inline-grid": "inline-grid",
    contents: "contents",
    "list-item": "list-item",
    none: "hidden",
  },
  position: {
    static: "static",
    fixed: "fixed",
    absolute: "absolute",
    relative: "relative",
    sticky: "sticky",
  },
  visibility: {
    visible: "visible",
    hidden: "invisible",
    collapse: "collapse",
  },
  isolation: {
    isolate: "isolate",
    auto: "isolation-auto",
  },
  "font-style": {
    italic: "italic",
    normal: "not-italic",
  },
  "font-variant-numeric": {
    normal: "normal-nums",
    ordinal: "ordinal",
    "slashed-zero": "slashed-zero",
    "lining-nums": "lining-nums",
    "oldstyle-nums": "oldstyle-nums",
    "proportional-nums": "proportional-nums",
    "tabular-nums": "tabular-nums",
    "diagonal-fractions": "diagonal-fractions",
    "stacked-fractions": "stacked-fractions",
  },
  "text-decoration-line": {
    underline: "underline",
    overline: "overline",
    "line-through": "line-through",
    nonee: "no-underline",
  },
  "text-transform": {
    uppercase: "uppercase",
    lowercase: "lowercase",
    capitalize: "capitalize",
    none: "normal-case",
  },
};
