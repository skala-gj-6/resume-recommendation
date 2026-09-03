// figma node: 16215:43127 _Badge/Value (2 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "variant=" + __venc(p.variant);

export function BadgeValue(_p = {}) {
  const props = { ..._p, prop: _p.prop ?? false, text: _p.text ?? "value", variant: _p.variant ?? "normal" };
  const __body0 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      overflow: "hidden",
      borderRadius: 4,
      backgroundColor: "rgba(112,115,124,0.16)",
      backdropFilter: "blur(64px)",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      padding: "2px 6px 2px 6px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"SF Mono\", ui-monospace, \"SF Mono\", Menlo, Consolas, monospace",
        fontWeight: 500,
        fontSize: 12,
        textAlign: "center",
        whiteSpace: "nowrap",
        lineHeight: 1.3339999914169312,
        color: "var(--label-normal)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.text}</span>
      {props.prop && (
      <span style={{
        position: "relative",
        fontFamily: "\"SF Mono\", ui-monospace, \"SF Mono\", Menlo, Consolas, monospace",
        fontWeight: 500,
        fontSize: 10,
        whiteSpace: "nowrap",
        lineHeight: 1.2000000476837158,
        color: "rgba(55,56,60,0.61)",
        flexShrink: 0,
      }}>{props.text1 ?? "default"}</span>
      )}
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      overflow: "hidden",
      borderRadius: 4,
      backdropFilter: "blur(64px)",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      padding: "2px 6px 2px 6px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 50,
        height: 20,
        opacity: 0.12,
        backgroundColor: "var(--accent-background-violet)",
      }} />
      <span style={{
        position: "relative",
        fontFamily: "\"SF Mono\", ui-monospace, \"SF Mono\", Menlo, Consolas, monospace",
        fontWeight: 500,
        fontSize: 12,
        textAlign: "center",
        whiteSpace: "nowrap",
        lineHeight: 1.3339999914169312,
        color: "var(--accent-background-violet)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.text}</span>
    </div>
  );
  const __impls = {
    // figma: Variant=Normal
    "variant=normal": __body0,
    // figma: Variant=Customize
    "variant=customize": __body1,
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
export default BadgeValue;
