import { InteractionLight } from './InteractionLight.jsx';

// figma node: 16215:22000 Tab/Resource/Tab (4 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "active=" + __venc(p.active) + '|' + "disabled=" + __venc(p.disabled);

export function TabResourceTab(_p = {}) {
  const props = { ..._p, text: _p.text ?? "텍스트", active: _p.active ?? false, disabled: _p.disabled ?? false };
  const __body0 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      height: 48,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "absolute",
        left: -12,
        top: 0,
        width: 69,
        height: 48,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            height: "auto",
            width: "auto",
          }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
      </div>
      <div style={{
        position: "relative",
        width: 45,
        minWidth: 32,
        display: "flex",
        flexDirection: "row",
        gap: 10,
        padding: "12px 0px 12px 0px",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <span style={{
          position: "relative",
          fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 17,
          textAlign: "center",
          lineHeight: 1.4119999408721924,
          color: "rgba(55,56,60,0.28)",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>{props.text}</span>
      </div>
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      height: 48,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "absolute",
        left: -12,
        top: 0,
        width: 69,
        height: 48,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            height: "auto",
            width: "auto",
          }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
      </div>
      <div style={{
        position: "relative",
        width: 45,
        minWidth: 32,
        display: "flex",
        flexDirection: "row",
        gap: 10,
        padding: "12px 0px 12px 0px",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <span style={{
          position: "relative",
          fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 17,
          textAlign: "center",
          lineHeight: 1.4119999408721924,
          color: "rgba(55,56,60,0.16)",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>{props.text}</span>
      </div>
    </div>
  );
  const __body2 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      height: 48,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "absolute",
        left: -12,
        top: 0,
        width: 69,
        height: 48,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            height: "auto",
            width: "auto",
          }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
      </div>
      <div style={{
        position: "relative",
        width: 45,
        minWidth: 32,
        display: "flex",
        flexDirection: "row",
        gap: 10,
        padding: "12px 0px 12px 0px",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <span style={{
          position: "relative",
          fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 17,
          textAlign: "center",
          lineHeight: 1.4119999408721924,
          color: "var(--label-strong)",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>{props.text}</span>
        <div style={{
          position: "absolute",
          left: 0,
          top: 46,
          width: 45,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
            position: "relative",
            height: 2,
            backgroundColor: "var(--label-strong)",
            flexShrink: 0,
            alignSelf: "stretch",
          }} />
        </div>
      </div>
    </div>
  );
  const __body3 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      height: 48,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "absolute",
        left: -12,
        top: 0,
        width: 69,
        height: 48,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            height: "auto",
            width: "auto",
          }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
      </div>
      <div style={{
        position: "relative",
        width: 45,
        minWidth: 32,
        display: "flex",
        flexDirection: "row",
        gap: 10,
        padding: "12px 0px 12px 0px",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <span style={{
          position: "relative",
          fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 17,
          textAlign: "center",
          lineHeight: 1.4119999408721924,
          color: "rgba(55,56,60,0.16)",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>{props.text}</span>
        <div style={{
          position: "absolute",
          left: 0,
          top: 46,
          width: 45,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
            position: "relative",
            height: 2,
            backgroundColor: "rgba(112,115,124,0.05)",
            flexShrink: 0,
            alignSelf: "stretch",
          }} />
        </div>
      </div>
    </div>
  );
  const __impls = {
    // figma: Active=False, Disabled=False
    "active=false|disabled=false": __body0,
    // figma: Active=False, Disabled=True
    "active=false|disabled=true": __body1,
    // figma: Active=True, Disabled=False
    "active=true|disabled=false": __body2,
    // figma: Active=True, Disabled=True
    "active=true|disabled=true": __body3,
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
export default TabResourceTab;
