// figma node: 16215:17327 Ratio/Vertical (4 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "ratio=" + __venc(p.ratio);

export function RatioVertical(_p = {}) {
  const props = { ..._p, ratio: _p.ratio ?? "1:1" };
  const __body0 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      height: 100,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: "matrix(0.943,-0.333,0.333,0.943,0,14.645)",
        transformOrigin: "0 0",
        height: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 1,
          height: 100,
          border: "1px dashed currentColor",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          fontSize: 10,
          opacity: 0.45,
        }}>Ratio</div>
      </div>
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      height: 100,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: "matrix(0.999,-0.044,0.044,0.999,0,1.588)",
        transformOrigin: "0 0",
        height: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 1,
          height: 100,
          border: "1px dashed currentColor",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          fontSize: 10,
          opacity: 0.45,
        }}>Ratio</div>
      </div>
    </div>
  );
  const __body2 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      height: 100,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1,
        height: 100,
        border: "1px dashed currentColor",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontSize: 10,
        opacity: 0.45,
      }}>Ratio</div>
    </div>
  );
  const __impls = {
    // figma: Ratio=1:1
    "ratio=1:1": __body0,
    // figma: Ratio=3:4
    "ratio=3:4": __body1,
    // figma: Ratio=2:3
    "ratio=2:3": __body2,
    // figma: Ratio=1:2
    "ratio=1:2": __body2,
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
export default RatioVertical;
