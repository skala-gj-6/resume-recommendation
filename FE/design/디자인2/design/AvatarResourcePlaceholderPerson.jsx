// figma node: 16215:26089 Avatar/Resource/Placeholder/Person (1 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "prop=" + __venc(p.prop);

export function AvatarResourcePlaceholderPerson(_p = {}) {
  const props = { ..._p, prop: _p.prop ?? "null" };
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
      }}>
        <svg width={11.867} height={12.365} viewBox="0 0 11.867 12.365" fill="none" style={{
          position: "absolute",
          left: 6.067,
          top: 5.903,
          width: 11.867,
          height: 12.365,
          opacity: 0.185,
        }}>
          <path d={"M 5.933 0 C 4.313 0 3 1.313 3 2.933 M 8.867 2.933 C 8.867 1.313 7.553 0 5.933 0 M 5.933 5.867 C 7.553 5.867 8.867 4.553 8.867 2.933 M 3 2.933 C 3 4.553 4.313 5.867 5.933 5.867 Z"} fill="currentColor" fillRule="evenodd" />
          <path d={"M 1.878 8.045 C 2.954 7.466 4.392 7.164 5.933 7.164 M 0 10.764 C 0 9.542 0.802 8.625 1.878 8.045 M 0 10.983 L 0 10.764 M 0.009 11.342 C 0 11.234 0 11.107 0 10.983 M 0.12 11.764 C 0.042 11.612 0.019 11.462 0.009 11.342 M 0.601 12.245 C 0.394 12.139 0.225 11.971 0.12 11.764 M 1.023 12.356 C 0.902 12.346 0.753 12.322 0.601 12.245 M 1.382 12.365 C 1.258 12.365 1.131 12.365 1.023 12.356 M 10.485 12.364 L 1.382 12.365 M 10.844 12.355 C 10.736 12.364 10.609 12.364 10.485 12.364 M 11.266 12.244 C 11.114 12.322 10.964 12.345 10.844 12.355 M 11.747 11.763 C 11.641 11.97 11.473 12.139 11.266 12.244 M 11.858 11.341 C 11.848 11.462 11.824 11.611 11.747 11.763 M 11.867 10.982 C 11.867 11.106 11.867 11.233 11.858 11.341 M 11.867 10.764 L 11.867 10.982 M 9.989 8.045 C 11.064 8.625 11.867 9.542 11.867 10.764 M 5.933 7.164 C 7.475 7.164 8.913 7.466 9.989 8.045 Z"} fill="currentColor" fillRule="evenodd" />
        </svg>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 24,
          height: 24,
          border: "1px dashed currentColor",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          fontSize: 10,
          opacity: 0.45,
        }}>Subtract</div>
      </div>
    </div>
  );
  const __impls = {
    // figma: -=Null
    "prop=null": __body0,
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
export default AvatarResourcePlaceholderPerson;
