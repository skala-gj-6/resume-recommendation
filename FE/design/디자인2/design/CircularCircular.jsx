import { RatioVertical } from './RatioVertical.jsx';

// figma node: 16215:24960 Circular/Circular (2 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "animate=" + __venc(p.animate);

export function CircularCircular(_p = {}) {
  const props = { ..._p, animate: _p.animate ?? false };
  const __body0 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      height: 28,
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      color: "var(--line-solid-normal)",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 28,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}>{props.icon1 ?? <RatioVertical ratio={"1:1"} />}</div>
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 28,
        height: 28,
      }}>
        <svg width={28} height={28} viewBox="0 0 28 28" fill="none" style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 28,
          height: 28,
        }}>
          <path d={"M 14 0 C 13.172 0 12.5 0.672 12.5 1.5 M 21.778 2.359 C 19.476 0.821 16.769 0 14 0 M 26.934 8.642 C 25.875 6.084 24.08 3.898 21.778 2.359 M 27.731 16.731 C 28.271 14.016 27.994 11.201 26.934 8.642 M 23.9 23.899 C 25.857 21.942 27.191 19.447 27.731 16.731 M 16.731 27.731 C 19.447 27.191 21.942 25.857 23.9 23.899 M 8.642 26.934 C 11.201 27.994 14.016 28.271 16.731 27.731 M 2.359 21.778 C 3.898 24.08 6.084 25.875 8.642 26.934 M 0 14 C 0 16.769 0.821 19.476 2.359 21.778 M 1.5 12.5 C 0.672 12.5 0 13.172 0 14 M 3 14 C 3 13.172 2.328 12.5 1.5 12.5 M 4.854 20.111 C 3.645 18.302 3 16.176 3 14 M 9.791 24.163 C 7.781 23.33 6.063 21.92 4.854 20.111 M 16.146 24.789 C 14.012 25.213 11.801 24.995 9.791 24.163 M 21.778 21.778 C 20.24 23.317 18.28 24.364 16.146 24.789 M 24.789 16.146 C 24.364 18.28 23.317 20.24 21.778 21.778 M 24.163 9.79 C 24.995 11.8 25.213 14.012 24.789 16.146 M 20.111 4.854 C 21.92 6.063 23.33 7.78 24.163 9.79 M 14 3 C 16.176 3 18.302 3.645 20.111 4.854 M 12.5 1.5 C 12.5 2.328 13.172 3 14 3 Z"} fill="currentColor" fillRule="evenodd" />
        </svg>
      </div>
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      height: 28,
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 28,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}>{props.icon1 ?? <RatioVertical ratio={"1:1"} />}</div>
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 28,
        height: 28,
      }}>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 28,
          height: 28,
        }} />
      </div>
    </div>
  );
  const __impls = {
    // figma:  Animate=False
    "animate=false": __body0,
    // figma:  Animate=True
    "animate=true": __body1,
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
export default CircularCircular;
