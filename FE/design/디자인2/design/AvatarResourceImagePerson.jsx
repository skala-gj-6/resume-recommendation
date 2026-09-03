// figma node: 16215:26029 Avatar/Resource/Image/Person (3 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "variant=" + __venc(p.variant);

export function AvatarResourceImagePerson(_p = {}) {
  const props = { ..._p, variant: _p.variant ?? "deactivate" };
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
  const __impls = {
    // figma: 💎 Variant=Default
    "variant=default": __body0,
    // figma: 💎 Variant=Official
    "variant=official": __body0,
    // figma: 💎 Variant=Deactivate
    "variant=deactivate": __body0,
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
export default AvatarResourceImagePerson;
