// figma node: 16215:26105 Avatar/Resource/Placeholder/Academy (1 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "prop=" + __venc(p.prop);

export function AvatarResourcePlaceholderAcademy(_p = {}) {
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
        <svg width={15.043} height={13.043} viewBox="0 0 15.043 13.043" fill="none" style={{
          position: "absolute",
          left: 4.479,
          top: 5.735,
          width: 15.043,
          height: 13.043,
          opacity: 0.185,
        }}>
          <path d={"M 7.79 0.063 C 7.621 -0.021 7.422 -0.021 7.253 0.063 M 14.188 3.263 L 7.79 0.063 M 14.568 3.465 C 14.461 3.399 14.325 3.331 14.188 3.263 M 14.953 3.867 C 14.85 3.651 14.672 3.53 14.568 3.465 M 15.041 4.316 C 15.049 4.163 15.02 4.008 14.953 3.867 M 15.041 4.316 L 15.041 8.267 C 15.041 8.598 14.773 8.867 14.441 8.867 C 14.11 8.867 13.841 8.598 13.841 8.267 L 13.841 5.444 L 12.455 6.137 L 12.455 9.194 C 12.455 9.594 12.455 9.931 12.349 10.24 C 12.256 10.511 12.103 10.757 11.902 10.962 C 11.674 11.195 11.372 11.346 11.014 11.524 L 8.686 12.688 C 8.393 12.835 8.146 12.959 7.878 13.009 C 7.642 13.054 7.4 13.054 7.165 13.009 C 6.897 12.959 6.649 12.835 6.356 12.688 L 4.028 11.524 C 3.67 11.346 3.369 11.195 3.14 10.962 C 2.94 10.757 2.787 10.511 2.694 10.24 C 2.587 9.931 2.587 9.594 2.588 9.194 L 2.588 6.137 L 0.854 5.271 C 0.718 5.202 0.581 5.134 0.474 5.068 C 0.37 5.004 0.192 4.882 0.09 4.667 C -0.03 4.413 -0.03 4.12 0.09 3.867 C 0.192 3.651 0.37 3.53 0.474 3.465 C 0.581 3.399 0.718 3.331 0.854 3.263 L 7.253 0.063 Z M 11.255 6.737 L 7.79 8.47 M 11.255 9.115 L 11.255 6.737 M 11.215 9.848 C 11.247 9.755 11.255 9.637 11.255 9.115 M 11.045 10.122 C 11.121 10.045 11.179 9.951 11.215 9.848 M 10.407 10.486 C 10.874 10.253 10.976 10.193 11.045 10.122 M 8.207 11.586 L 10.407 10.486 M 7.657 11.83 C 7.738 11.815 7.826 11.777 8.207 11.586 M 7.386 11.83 C 7.475 11.847 7.567 11.847 7.657 11.83 M 6.836 11.586 C 7.216 11.777 7.305 11.815 7.386 11.83 M 4.636 10.486 L 6.836 11.586 M 3.997 10.122 C 4.067 10.193 4.169 10.253 4.636 10.486 M 3.828 9.848 C 3.864 9.951 3.921 10.045 3.997 10.122 M 3.788 9.115 C 3.788 9.637 3.796 9.755 3.828 9.848 M 3.788 6.737 L 3.788 9.115 M 7.253 8.47 L 3.788 6.737 M 7.79 8.47 C 7.621 8.554 7.422 8.554 7.253 8.47 Z M 7.521 7.263 L 1.53 4.267 M 13.513 4.267 L 7.521 7.263 M 7.521 1.271 L 13.513 4.267 M 1.53 4.267 L 7.521 1.271 Z"} fill="currentColor" fillRule="nonzero" />
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
export default AvatarResourcePlaceholderAcademy;
