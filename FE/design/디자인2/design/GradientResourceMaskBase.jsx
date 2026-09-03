// figma node: 16215:17207 Gradient/Resource/Mask/Base
export function GradientResourceMaskBase(_p = {}) {
  const props = _p;
  return (
    <div className={props.className} style={{
      width: 64,
      height: 64,
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: "matrix(0,1,-1,0,64,0)",
        transformOrigin: "0 0",
        width: 64,
        height: 64,
        background: "linear-gradient(180deg, rgba(0,0,0,0) 0.00%, rgba(0,0,0,0.0208) 4.70%, rgba(0,0,0,0.044) 8.90%, rgba(0,0,0,0.0704) 12.80%, rgba(0,0,0,0.1011) 16.56%, rgba(0,0,0,0.137) 20.37%, rgba(0,0,0,0.1792) 24.40%, rgba(0,0,0,0.2286) 28.83%, rgba(0,0,0,0.2861) 33.84%, rgba(0,0,0,0.3528) 39.60%, rgba(0,0,0,0.4296) 46.30%, rgba(0,0,0,0.5176) 54.10%, rgba(0,0,0,0.6176) 63.20%, rgba(0,0,0,0.7307) 73.76%, rgba(0,0,0,0.8578) 85.97%, rgb(0,0,0) 100.00%)",
      }} />
    </div>
  );
}
export default GradientResourceMaskBase;
