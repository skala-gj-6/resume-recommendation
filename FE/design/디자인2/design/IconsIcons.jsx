import { IconNormalBlank } from './IconNormalBlank.jsx';

// figma node: 16215:25199 Icons/Icons (1 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "prop=" + __venc(p.prop);

export function IconsIcons(_p = {}) {
  const props = { ..._p, prop: _p.prop ?? "null" };
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
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          flexGrow: 1,
          alignSelf: "stretch",
          height: "auto",
          width: "auto",
        }}>{props.icon ?? <IconNormalBlank name={"blank"} />}</div>
    </div>
  );
  const __impls = {
    // figma: -=Null
    "prop=null": __body0,
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
export default IconsIcons;
