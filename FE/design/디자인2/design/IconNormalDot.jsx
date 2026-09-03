import { RatioVertical } from './RatioVertical.jsx';

// figma node: 16215:14958 Icon/Normal/Dot (1 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "name=" + __venc(p.name);

export function IconNormalDot(_p = {}) {
  const props = { ..._p, name: _p.name ?? "dot" };
  const __body0 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      height: 24,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      color: "var(--label-normal)",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          flexGrow: 1,
          alignSelf: "stretch",
          height: "auto",
          width: "auto",
        }}>{props.icon1 ?? <RatioVertical ratio={"1:1"} />}</div>
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 24,
        height: 24,
      }}>
        <svg width={12} height={12} viewBox="0 0 12 12" fill="none" style={{
          position: "absolute",
          left: 6,
          top: 6,
          width: 12,
          height: 12,
        }}>
          <path d={"M 12 6 C 12 9.312 9.312 12 6 12 C 2.688 12 0 9.312 0 6 C 0 2.688 2.688 0 6 0 C 9.312 0 12 2.688 12 6 Z"} fill="currentColor" fillRule="evenodd" />
        </svg>
      </div>
    </div>
  );
  const __impls = {
    // figma: Name=dot
    "name=dot": __body0,
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
export default IconNormalDot;
