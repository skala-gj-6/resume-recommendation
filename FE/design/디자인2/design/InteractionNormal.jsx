// figma node: 16215:17256 Interaction/Normal (4 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "state=" + __venc(p.state);

export function InteractionNormal(_p = {}) {
  const props = { ..._p, state: _p.state ?? "normal" };
  const __body0 = () => (
    <div className={props.className} style={{
      width: 64,
      height: 64,
      opacity: 0,
      overflow: "hidden",
      backgroundColor: "var(--label-normal)",
      position: "relative",
      ...props.style,
    }} />
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: 64,
      height: 64,
      opacity: 0.05,
      overflow: "hidden",
      backgroundColor: "var(--label-normal)",
      position: "relative",
      ...props.style,
    }} />
  );
  const __body2 = () => (
    <div className={props.className} style={{
      width: 64,
      height: 64,
      opacity: 0.08,
      overflow: "hidden",
      backgroundColor: "var(--label-normal)",
      position: "relative",
      ...props.style,
    }} />
  );
  const __body3 = () => (
    <div className={props.className} style={{
      width: 64,
      height: 64,
      opacity: 0.12,
      overflow: "hidden",
      backgroundColor: "var(--label-normal)",
      position: "relative",
      ...props.style,
    }} />
  );
  const __impls = {
    // figma: State=Normal
    "state=normal": __body0,
    // figma: State=Hovered
    "state=hovered": __body1,
    // figma: State=Focused
    "state=focused": __body2,
    // figma: State=Pressed
    "state=pressed": __body3,
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
export default InteractionNormal;
