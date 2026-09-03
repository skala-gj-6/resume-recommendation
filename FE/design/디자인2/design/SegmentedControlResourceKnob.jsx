// figma node: 16215:35221 Segmented Control/Resource/Knob (2 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "active=" + __venc(p.active);

export function SegmentedControlResourceKnob(_p = {}) {
  const props = { ..._p, active: _p.active ?? true, text: _p.text ?? "텍스트" };
  const __body0 = () => (
    <div className={props.className} style={{
      width: 96,
      height: 42,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "9px 9px 9px 9px",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 96,
          height: 42,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexWrap: "nowrap",
        }}>
          <div style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 96,
            height: 42,
            opacity: 0.05,
            borderRadius: 12,
            backgroundColor: "var(--primary-normal)",
          }} />
          <div style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 96,
            height: 42,
            opacity: 0.43,
            borderRadius: 12,
            boxShadow: "inset 0 0 0 1px var(--primary-normal)",
          }} />
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          gap: 4,
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <span style={{
            position: "relative",
            fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 500,
            fontSize: 17,
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: 1.4119999408721924,
            color: "var(--primary-normal)",
            flexGrow: 1,
            alignSelf: "stretch",
          }}>{props.text}</span>
        </div>
      </div>
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: 96,
      height: 42,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "9px 9px 9px 9px",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 96,
          height: 42,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexWrap: "nowrap",
        }}>
          <div style={{
            position: "absolute",
            left: 0,
            top: 1,
            width: 96,
            height: 40,
            borderTop: "1px solid rgba(112,115,124,0.22)",
            borderRight: "1px solid rgba(112,115,124,0.22)",
            borderBottom: "1px solid rgba(112,115,124,0.22)",
            borderLeft: "1px solid rgba(112,115,124,0.22)",
          }} />
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          gap: 4,
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <span style={{
            position: "relative",
            fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 500,
            fontSize: 17,
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: 1.4119999408721924,
            color: "rgba(55,56,60,0.61)",
            flexGrow: 1,
            alignSelf: "stretch",
          }}>{props.text}</span>
        </div>
      </div>
    </div>
  );
  const __impls = {
    // figma: Active=True
    "active=true": __body0,
    // figma: Active=False
    "active=false": __body1,
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
export default SegmentedControlResourceKnob;
