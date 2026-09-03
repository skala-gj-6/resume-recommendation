// figma node: 16215:26062 Avatar/Resource/Image/Company (2 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "variant=" + __venc(p.variant);

export function AvatarResourceImageCompany(_p = {}) {
  const props = { ..._p, variant: _p.variant ?? "default" };
  const __body0 = () => (
    <div className={props.className} style={{
      width: 24,
      height: 24,
      backgroundColor: "var(--background-normal-normal)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 24,
        height: 24,
      }} />
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: 24,
      height: 24,
      position: "relative",
      ...props.style,
    }} />
  );
  const __impls = {
    // figma: 💎 Variant=Default
    "variant=default": __body0,
    // figma: 💎 Variant=원티드
    "variant=원티드": __body1,
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
export default AvatarResourceImageCompany;
