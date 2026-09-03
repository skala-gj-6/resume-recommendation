import { InteractionLight } from './InteractionLight.jsx';
import { PushBadgePushBadge } from './PushBadgePushBadge.jsx';
import { RatioVertical } from './RatioVertical.jsx';

// figma node: 16215:38424 Button/Icon/Normal (2 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "disable=" + __venc(p.disable);

export function ButtonIconNormal(_p = {}) {
  const props = { ..._p, badge: _p.badge ?? false, disable: _p.disable ?? false };
  const __body0 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      height: 24,
      borderRadius: 1000,
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <RatioVertical
            style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              height: "auto",
              width: "auto",
            }}
            ratio={"1:1"}
          />
          <div style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 24,
            height: 24,
          }}>
            <svg width={19.300} height={19.300} viewBox="0 0 19.300 19.300" fill="none" style={{
              position: "absolute",
              left: 2.35,
              top: 2.35,
              width: 19.3,
              height: 19.3,
              color: "var(--label-normal)",
            }}>
              <path d={"M 6.995 0.9 C 6.995 0.403 7.398 0 7.895 0 L 11.392 0 C 11.889 0 12.292 0.403 12.292 0.9 C 12.292 1.397 11.889 1.8 11.392 1.8 L 7.895 1.8 C 7.398 1.8 6.995 1.397 6.995 0.9 Z"} fill="currentColor" fillRule="nonzero" />
              <path d={"M 5.297 0.886 C 5.312 1.383 4.921 1.797 4.425 1.813 C 3.568 1.839 3.211 1.906 2.957 2.037 L 2.948 2.042 C 2.562 2.235 2.241 2.557 2.023 2.972 C 1.893 3.226 1.825 3.584 1.8 4.438 C 1.785 4.934 1.37 5.325 0.873 5.31 C 0.376 5.295 -0.015 4.88 0 4.383 C 0.026 3.53 0.088 2.799 0.423 2.146 L 0.426 2.141 C 0.804 1.419 1.387 0.811 2.138 0.434 C 2.789 0.101 3.519 0.039 4.37 0.013 C 4.867 -0.002 5.282 0.389 5.297 0.886 Z"} fill="currentColor" fillRule="nonzero" />
              <path d={"M 13.99 0.886 C 14.005 0.389 14.42 -0.002 14.917 0.013 C 15.768 0.039 16.498 0.101 17.149 0.434 C 17.9 0.811 18.483 1.419 18.861 2.141 L 18.864 2.146 C 19.199 2.799 19.261 3.53 19.287 4.383 C 19.302 4.88 18.911 5.295 18.414 5.31 C 17.917 5.325 17.502 4.934 17.487 4.438 C 17.462 3.584 17.394 3.226 17.264 2.972 C 17.046 2.557 16.725 2.235 16.339 2.042 L 16.33 2.037 C 16.076 1.906 15.719 1.839 14.862 1.813 C 14.366 1.797 13.975 1.383 13.99 0.886 Z"} fill="currentColor" fillRule="nonzero" />
              <path d={"M 0.9 6.995 C 1.397 6.995 1.8 7.398 1.8 7.895 L 1.8 11.392 C 1.8 11.889 1.397 12.292 0.9 12.292 C 0.403 12.292 0 11.889 0 11.392 L 0 7.895 C 0 7.398 0.403 6.995 0.9 6.995 Z"} fill="currentColor" fillRule="nonzero" />
              <path d={"M 18.387 6.995 C 18.884 6.995 19.287 7.398 19.287 7.895 L 19.287 11.392 C 19.287 11.889 18.884 12.292 18.387 12.292 C 17.89 12.292 17.487 11.889 17.487 11.392 L 17.487 7.895 C 17.487 7.398 17.89 6.995 18.387 6.995 Z"} fill="currentColor" fillRule="nonzero" />
              <path d={"M 18.427 13.99 C 18.924 14.005 19.315 14.42 19.3 14.917 C 19.274 15.77 19.212 16.501 18.876 17.154 L 18.874 17.159 C 18.496 17.881 17.913 18.489 17.162 18.866 C 16.51 19.199 15.781 19.261 14.93 19.287 C 14.433 19.302 14.018 18.911 14.003 18.414 C 13.988 17.917 14.378 17.503 14.875 17.487 C 15.732 17.461 16.089 17.394 16.343 17.263 L 16.352 17.258 C 16.738 17.065 17.059 16.743 17.277 16.328 C 17.407 16.074 17.474 15.716 17.5 14.862 C 17.515 14.366 17.93 13.975 18.427 13.99 Z"} fill="currentColor" fillRule="nonzero" />
              <path d={"M 0.873 14.003 C 1.37 13.988 1.785 14.379 1.8 14.875 C 1.826 15.732 1.893 16.089 2.024 16.343 L 2.029 16.352 C 2.222 16.738 2.544 17.059 2.959 17.277 C 3.213 17.407 3.571 17.475 4.425 17.5 C 4.921 17.515 5.312 17.93 5.297 18.427 C 5.282 18.924 4.867 19.315 4.37 19.3 C 3.517 19.274 2.786 19.212 2.133 18.877 L 2.128 18.874 C 1.406 18.496 0.798 17.913 0.421 17.162 C 0.088 16.511 0.026 15.781 0 14.93 C -0.015 14.433 0.376 14.018 0.873 14.003 Z"} fill="currentColor" fillRule="nonzero" />
              <path d={"M 6.995 18.387 C 6.995 17.89 7.398 17.487 7.895 17.487 L 11.392 17.487 C 11.889 17.487 12.292 17.89 12.292 18.387 C 12.292 18.884 11.889 19.287 11.392 19.287 L 7.895 19.287 C 7.398 19.287 6.995 18.884 6.995 18.387 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
        </div>
      </div>
      <div style={{
        position: "absolute",
        left: -8,
        top: -8,
        width: 40,
        height: 40,
      }}>
        <div style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 40,
            height: 40,
          }}>{props.icon2 ?? <InteractionLight state={"normal"} style={{ transform: "scale(0.625, 0.625)", transformOrigin: "0 0" }} />}</div>
      </div>
      {props.badge && (
      <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 24,
          height: 24,
        }}>{props.icon3 ?? <PushBadgePushBadge variant={"dot"} size={"xs"} />}</div>
      )}
    </div>
  );
  const __body1 = () => (
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <RatioVertical
            style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              height: "auto",
              width: "auto",
            }}
            ratio={"1:1"}
          />
          <div style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 24,
            height: 24,
          }}>
            <svg width={19.300} height={19.300} viewBox="0 0 19.300 19.300" fill="none" style={{
              position: "absolute",
              left: 2.35,
              top: 2.35,
              width: 19.3,
              height: 19.3,
              color: "var(--label-normal)",
            }}>
              <path d={"M 6.995 0.9 C 6.995 0.403 7.398 0 7.895 0 L 11.392 0 C 11.889 0 12.292 0.403 12.292 0.9 C 12.292 1.397 11.889 1.8 11.392 1.8 L 7.895 1.8 C 7.398 1.8 6.995 1.397 6.995 0.9 Z"} fill="currentColor" fillRule="nonzero" />
              <path d={"M 5.297 0.886 C 5.312 1.383 4.921 1.797 4.425 1.813 C 3.568 1.839 3.211 1.906 2.957 2.037 L 2.948 2.042 C 2.562 2.235 2.241 2.557 2.023 2.972 C 1.893 3.226 1.825 3.584 1.8 4.438 C 1.785 4.934 1.37 5.325 0.873 5.31 C 0.376 5.295 -0.015 4.88 0 4.383 C 0.026 3.53 0.088 2.799 0.423 2.146 L 0.426 2.141 C 0.804 1.419 1.387 0.811 2.138 0.434 C 2.789 0.101 3.519 0.039 4.37 0.013 C 4.867 -0.002 5.282 0.389 5.297 0.886 Z"} fill="currentColor" fillRule="nonzero" />
              <path d={"M 13.99 0.886 C 14.005 0.389 14.42 -0.002 14.917 0.013 C 15.768 0.039 16.498 0.101 17.149 0.434 C 17.9 0.811 18.483 1.419 18.861 2.141 L 18.864 2.146 C 19.199 2.799 19.261 3.53 19.287 4.383 C 19.302 4.88 18.911 5.295 18.414 5.31 C 17.917 5.325 17.502 4.934 17.487 4.438 C 17.462 3.584 17.394 3.226 17.264 2.972 C 17.046 2.557 16.725 2.235 16.339 2.042 L 16.33 2.037 C 16.076 1.906 15.719 1.839 14.862 1.813 C 14.366 1.797 13.975 1.383 13.99 0.886 Z"} fill="currentColor" fillRule="nonzero" />
              <path d={"M 0.9 6.995 C 1.397 6.995 1.8 7.398 1.8 7.895 L 1.8 11.392 C 1.8 11.889 1.397 12.292 0.9 12.292 C 0.403 12.292 0 11.889 0 11.392 L 0 7.895 C 0 7.398 0.403 6.995 0.9 6.995 Z"} fill="currentColor" fillRule="nonzero" />
              <path d={"M 18.387 6.995 C 18.884 6.995 19.287 7.398 19.287 7.895 L 19.287 11.392 C 19.287 11.889 18.884 12.292 18.387 12.292 C 17.89 12.292 17.487 11.889 17.487 11.392 L 17.487 7.895 C 17.487 7.398 17.89 6.995 18.387 6.995 Z"} fill="currentColor" fillRule="nonzero" />
              <path d={"M 18.427 13.99 C 18.924 14.005 19.315 14.42 19.3 14.917 C 19.274 15.77 19.212 16.501 18.876 17.154 L 18.874 17.159 C 18.496 17.881 17.913 18.489 17.162 18.866 C 16.51 19.199 15.781 19.261 14.93 19.287 C 14.433 19.302 14.018 18.911 14.003 18.414 C 13.988 17.917 14.378 17.503 14.875 17.487 C 15.732 17.461 16.089 17.394 16.343 17.263 L 16.352 17.258 C 16.738 17.065 17.059 16.743 17.277 16.328 C 17.407 16.074 17.474 15.716 17.5 14.862 C 17.515 14.366 17.93 13.975 18.427 13.99 Z"} fill="currentColor" fillRule="nonzero" />
              <path d={"M 0.873 14.003 C 1.37 13.988 1.785 14.379 1.8 14.875 C 1.826 15.732 1.893 16.089 2.024 16.343 L 2.029 16.352 C 2.222 16.738 2.544 17.059 2.959 17.277 C 3.213 17.407 3.571 17.475 4.425 17.5 C 4.921 17.515 5.312 17.93 5.297 18.427 C 5.282 18.924 4.867 19.315 4.37 19.3 C 3.517 19.274 2.786 19.212 2.133 18.877 L 2.128 18.874 C 1.406 18.496 0.798 17.913 0.421 17.162 C 0.088 16.511 0.026 15.781 0 14.93 C -0.015 14.433 0.376 14.018 0.873 14.003 Z"} fill="currentColor" fillRule="nonzero" />
              <path d={"M 6.995 18.387 C 6.995 17.89 7.398 17.487 7.895 17.487 L 11.392 17.487 C 11.889 17.487 12.292 17.89 12.292 18.387 C 12.292 18.884 11.889 19.287 11.392 19.287 L 7.895 19.287 C 7.398 19.287 6.995 18.884 6.995 18.387 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
  const __impls = {
    // figma: Disable=False
    "disable=false": __body0,
    // figma: Disable=True
    "disable=true": __body1,
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
export default ButtonIconNormal;
