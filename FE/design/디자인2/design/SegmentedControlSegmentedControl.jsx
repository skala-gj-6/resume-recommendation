import { IconsIcons } from './IconsIcons.jsx';
import { SegmentedControlResourceKnob } from './SegmentedControlResourceKnob.jsx';

// figma node: 16215:35115 Segmented Control/Segmented Control (12 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "variant=" + __venc(p.variant) + '|' + "size=" + __venc(p.size) + '|' + "icon=" + __venc(p.icon);

export function SegmentedControlSegmentedControl(_p = {}) {
  const props = { ..._p, segment3: _p.segment3 ?? true, segment4: _p.segment4 ?? false, segment6: _p.segment6 ?? false, segment5: _p.segment5 ?? false, variant: _p.variant ?? "solid", size: _p.size ?? "sm", icon: _p.icon ?? false };
  const __body0 = () => (
    <div className={props.className} style={{
      width: 335,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        height: 48,
        borderRadius: 12,
        backgroundColor: "rgba(112,115,124,0.08)",
        display: "flex",
        flexDirection: "row",
        padding: "3px 3px 3px 3px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
              width: 109.667,
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
                width: 109.667,
                height: 42,
                borderRadius: 10,
                backgroundColor: "var(--background-elevated-normal)",
                boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.08)",
              }} />
              <div style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 109.667,
                height: 42,
                opacity: 0.28,
                borderRadius: 10,
                backgroundColor: "var(--static-white)",
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
              }}>텍스트</span>
            </div>
          </div>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
              width: 109.667,
              height: 42,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flexWrap: "nowrap",
            }} />
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
              }}>텍스트</span>
            </div>
          </div>
        </div>
        {props.segment3 && (
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
              width: 109.667,
              height: 42,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flexWrap: "nowrap",
            }} />
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
              }}>텍스트</span>
            </div>
          </div>
        </div>
        )}
        {props.segment4 && (
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
              width: 82.25,
              height: 42,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flexWrap: "nowrap",
            }} />
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
              }}>텍스트</span>
            </div>
          </div>
        </div>
        )}
        {props.segment5 && (
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
              width: 82.25,
              height: 42,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flexWrap: "nowrap",
            }} />
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
              }}>텍스트</span>
            </div>
          </div>
        </div>
        )}
        {props.segment6 && (
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
            }} />
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
              }}>텍스트</span>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: 335,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        height: 40,
        borderRadius: 10,
        backgroundColor: "rgba(112,115,124,0.08)",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
              width: 110.333,
              height: 36,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flexWrap: "nowrap",
            }}>
              <div style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 110.333,
                height: 36,
                borderRadius: 8,
                backgroundColor: "var(--background-elevated-normal)",
                boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.08)",
              }} />
              <div style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 110.333,
                height: 36,
                opacity: 0.28,
                borderRadius: 8,
                backgroundColor: "var(--static-white)",
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
              }}>텍스트</span>
            </div>
          </div>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
              width: 110.333,
              height: 36,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flexWrap: "nowrap",
            }} />
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: 4,
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "nowrap",
              flexGrow: 1,
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
              }}>텍스트</span>
            </div>
          </div>
        </div>
        {props.segment3 && (
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
              width: 110.333,
              height: 36,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flexWrap: "nowrap",
            }} />
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: 4,
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "nowrap",
              flexGrow: 1,
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
              }}>텍스트</span>
            </div>
          </div>
        </div>
        )}
        {props.segment4 && (
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
            }} />
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
              }}>텍스트</span>
            </div>
          </div>
        </div>
        )}
        {props.segment5 && (
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
            }} />
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
              }}>텍스트</span>
            </div>
          </div>
        </div>
        )}
        {props.segment6 && (
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
            }} />
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
              }}>텍스트</span>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
  const __body2 = () => (
    <div className={props.className} style={{
      width: 335,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        height: 32,
        borderRadius: 8,
        backgroundColor: "rgba(112,115,124,0.08)",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
              width: 110.333,
              height: 28,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flexWrap: "nowrap",
            }}>
              <div style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 110.333,
                height: 28,
                borderRadius: 6,
                backgroundColor: "var(--background-elevated-normal)",
                boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.08)",
              }} />
              <div style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 110.333,
                height: 28,
                opacity: 0.28,
                borderRadius: 6,
                backgroundColor: "var(--static-white)",
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
              }}>텍스트</span>
            </div>
          </div>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
              width: 110.333,
              height: 28,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flexWrap: "nowrap",
            }} />
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: 4,
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "nowrap",
              flexGrow: 1,
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
              }}>텍스트</span>
            </div>
          </div>
        </div>
        {props.segment3 && (
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
              width: 110.333,
              height: 28,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flexWrap: "nowrap",
            }} />
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: 4,
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "nowrap",
              flexGrow: 1,
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
              }}>텍스트</span>
            </div>
          </div>
        </div>
        )}
        {props.segment4 && (
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
              width: 82.75,
              height: 28,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flexWrap: "nowrap",
            }} />
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: 4,
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "nowrap",
              flexGrow: 1,
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
              }}>텍스트</span>
            </div>
          </div>
        </div>
        )}
        {props.segment5 && (
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
              width: 82.75,
              height: 28,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flexWrap: "nowrap",
            }} />
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: 4,
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "nowrap",
              flexGrow: 1,
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
              }}>텍스트</span>
            </div>
          </div>
        </div>
        )}
        {props.segment6 && (
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
              width: 82.75,
              height: 28,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flexWrap: "nowrap",
            }} />
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: 4,
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "nowrap",
              flexGrow: 1,
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
              }}>텍스트</span>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
  const __body3 = () => (
    <div className={props.className} style={{
      width: 335,
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
        width: 335,
        height: 48,
        borderRadius: 12,
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.22)",
      }} />
      <div style={{
        position: "relative",
        height: 48,
        overflow: "hidden",
        borderRadius: 12,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <SegmentedControlResourceKnob
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          active={true}
        />
        <SegmentedControlResourceKnob
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          active={false}
        />
        {props.segment3 && (
        <SegmentedControlResourceKnob
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          active={false}
        />
        )}
        {props.segment4 && (
        <SegmentedControlResourceKnob
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          active={false}
        />
        )}
        {props.segment5 && (
        <SegmentedControlResourceKnob
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          active={false}
        />
        )}
        {props.segment6 && (
        <SegmentedControlResourceKnob
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          active={false}
        />
        )}
      </div>
    </div>
  );
  const __body4 = () => (
    <div className={props.className} style={{
      width: 335,
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
        width: 335,
        height: 40,
        borderRadius: 10,
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.22)",
      }} />
      <div style={{
        position: "relative",
        height: 40,
        overflow: "hidden",
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <SegmentedControlResourceKnob
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          active={true}
        />
        <SegmentedControlResourceKnob
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          active={false}
        />
        {props.segment3 && (
        <SegmentedControlResourceKnob
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          active={false}
        />
        )}
        {props.segment4 && (
        <SegmentedControlResourceKnob
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          active={false}
        />
        )}
        {props.segment5 && (
        <SegmentedControlResourceKnob
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          active={false}
        />
        )}
        {props.segment6 && (
        <SegmentedControlResourceKnob
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          active={false}
        />
        )}
      </div>
    </div>
  );
  const __body5 = () => (
    <div className={props.className} style={{
      width: 335,
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
        width: 335,
        height: 32,
        borderRadius: 8,
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.22)",
      }} />
      <div style={{
        position: "relative",
        height: 32,
        overflow: "hidden",
        borderRadius: 8,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <SegmentedControlResourceKnob
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          active={true}
        />
        <SegmentedControlResourceKnob
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          active={false}
        />
        {props.segment3 && (
        <SegmentedControlResourceKnob
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          active={false}
        />
        )}
        {props.segment4 && (
        <SegmentedControlResourceKnob
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          active={false}
        />
        )}
        {props.segment5 && (
        <SegmentedControlResourceKnob
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          active={false}
        />
        )}
        {props.segment6 && (
        <SegmentedControlResourceKnob
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          active={false}
        />
        )}
      </div>
    </div>
  );
  const __body6 = () => (
    <div className={props.className} style={{
      width: 335,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        height: 48,
        borderRadius: 12,
        backgroundColor: "rgba(112,115,124,0.08)",
        display: "flex",
        flexDirection: "row",
        padding: "3px 3px 3px 3px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
              width: 109.667,
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
                width: 109.667,
                height: 42,
                borderRadius: 10,
                backgroundColor: "var(--background-elevated-normal)",
                boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.08)",
              }} />
              <div style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 109.667,
                height: 42,
                opacity: 0.28,
                borderRadius: 10,
                backgroundColor: "var(--static-white)",
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
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                padding: "2px 0px 2px 0px",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "nowrap",
                boxSizing: "border-box",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>
                <IconsIcons
                  style={{
                    position: "relative",
                    width: 20,
                    flexShrink: 0,
                    alignSelf: "stretch",
                    height: "auto",
                  }}
                  prop={"null"}
                />
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 500,
                fontSize: 17,
                textAlign: "center",
                whiteSpace: "nowrap",
                lineHeight: 1.4119999408721924,
                color: "var(--primary-normal)",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>텍스트</span>
            </div>
          </div>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
              width: 109.667,
              height: 42,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flexWrap: "nowrap",
            }} />
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
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                padding: "2px 0px 2px 0px",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "nowrap",
                boxSizing: "border-box",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>
                <IconsIcons
                  style={{
                    position: "relative",
                    width: 20,
                    flexShrink: 0,
                    alignSelf: "stretch",
                    height: "auto",
                  }}
                  prop={"null"}
                />
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 500,
                fontSize: 17,
                textAlign: "center",
                whiteSpace: "nowrap",
                lineHeight: 1.4119999408721924,
                color: "rgba(55,56,60,0.61)",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>텍스트</span>
            </div>
          </div>
        </div>
        {props.segment3 && (
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
              width: 109.667,
              height: 42,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flexWrap: "nowrap",
            }} />
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
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                padding: "2px 0px 2px 0px",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "nowrap",
                boxSizing: "border-box",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>
                <IconsIcons
                  style={{
                    position: "relative",
                    width: 20,
                    flexShrink: 0,
                    alignSelf: "stretch",
                    height: "auto",
                  }}
                  prop={"null"}
                />
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 500,
                fontSize: 17,
                textAlign: "center",
                whiteSpace: "nowrap",
                lineHeight: 1.4119999408721924,
                color: "rgba(55,56,60,0.61)",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>텍스트</span>
            </div>
          </div>
        </div>
        )}
        {props.segment4 && (
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
            }} />
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
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                padding: "2px 0px 2px 0px",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "nowrap",
                boxSizing: "border-box",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>
                <IconsIcons
                  style={{
                    position: "relative",
                    width: 20,
                    flexShrink: 0,
                    alignSelf: "stretch",
                    height: "auto",
                  }}
                  prop={"null"}
                />
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 500,
                fontSize: 17,
                textAlign: "center",
                whiteSpace: "nowrap",
                lineHeight: 1.4119999408721924,
                color: "rgba(55,56,60,0.61)",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>텍스트</span>
            </div>
          </div>
        </div>
        )}
        {props.segment5 && (
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
            }} />
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
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                padding: "2px 0px 2px 0px",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "nowrap",
                boxSizing: "border-box",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>
                <IconsIcons
                  style={{
                    position: "relative",
                    width: 20,
                    flexShrink: 0,
                    alignSelf: "stretch",
                    height: "auto",
                  }}
                  prop={"null"}
                />
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 500,
                fontSize: 17,
                textAlign: "center",
                whiteSpace: "nowrap",
                lineHeight: 1.4119999408721924,
                color: "rgba(55,56,60,0.61)",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>텍스트</span>
            </div>
          </div>
        </div>
        )}
        {props.segment6 && (
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
            }} />
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
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                padding: "2px 0px 2px 0px",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "nowrap",
                boxSizing: "border-box",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>
                <IconsIcons
                  style={{
                    position: "relative",
                    width: 20,
                    flexShrink: 0,
                    alignSelf: "stretch",
                    height: "auto",
                  }}
                  prop={"null"}
                />
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 500,
                fontSize: 17,
                textAlign: "center",
                whiteSpace: "nowrap",
                lineHeight: 1.4119999408721924,
                color: "rgba(55,56,60,0.61)",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>텍스트</span>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
  const __body7 = () => (
    <div className={props.className} style={{
      width: 335,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        height: 40,
        borderRadius: 10,
        backgroundColor: "rgba(112,115,124,0.08)",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
              width: 110.333,
              height: 36,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flexWrap: "nowrap",
            }}>
              <div style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 110.333,
                height: 36,
                borderRadius: 8,
                backgroundColor: "var(--background-elevated-normal)",
                boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.08)",
              }} />
              <div style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 110.333,
                height: 36,
                opacity: 0.28,
                borderRadius: 8,
                backgroundColor: "var(--static-white)",
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
            }}>
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                padding: "2px 0px 2px 0px",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "nowrap",
                boxSizing: "border-box",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>
                <IconsIcons
                  style={{
                    position: "relative",
                    width: 18,
                    flexShrink: 0,
                    alignSelf: "stretch",
                    height: "auto",
                  }}
                  prop={"null"}
                />
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 500,
                fontSize: 17,
                textAlign: "center",
                whiteSpace: "nowrap",
                lineHeight: 1.4119999408721924,
                color: "var(--primary-normal)",
                flexShrink: 0,
              }}>텍스트</span>
            </div>
          </div>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
              width: 110.333,
              height: 36,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flexWrap: "nowrap",
            }} />
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: 4,
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "nowrap",
              flexGrow: 1,
            }}>
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                padding: "2px 0px 2px 0px",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "nowrap",
                boxSizing: "border-box",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>
                <IconsIcons
                  style={{
                    position: "relative",
                    width: 18,
                    flexShrink: 0,
                    alignSelf: "stretch",
                    height: "auto",
                  }}
                  prop={"null"}
                />
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 500,
                fontSize: 17,
                textAlign: "center",
                whiteSpace: "nowrap",
                lineHeight: 1.4119999408721924,
                color: "rgba(55,56,60,0.61)",
                flexShrink: 0,
              }}>텍스트</span>
            </div>
          </div>
        </div>
        {props.segment3 && (
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
              width: 110.333,
              height: 36,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flexWrap: "nowrap",
            }} />
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: 4,
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "nowrap",
              flexGrow: 1,
            }}>
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                padding: "2px 0px 2px 0px",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "nowrap",
                boxSizing: "border-box",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>
                <IconsIcons
                  style={{
                    position: "relative",
                    width: 18,
                    flexShrink: 0,
                    alignSelf: "stretch",
                    height: "auto",
                  }}
                  prop={"null"}
                />
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 500,
                fontSize: 17,
                textAlign: "center",
                whiteSpace: "nowrap",
                lineHeight: 1.4119999408721924,
                color: "rgba(55,56,60,0.61)",
                flexShrink: 0,
              }}>텍스트</span>
            </div>
          </div>
        </div>
        )}
        {props.segment4 && (
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
            }} />
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
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                padding: "2px 0px 2px 0px",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "nowrap",
                boxSizing: "border-box",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>
                <IconsIcons
                  style={{
                    position: "relative",
                    width: 20,
                    flexShrink: 0,
                    alignSelf: "stretch",
                    height: "auto",
                  }}
                  prop={"null"}
                />
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 500,
                fontSize: 17,
                textAlign: "center",
                whiteSpace: "nowrap",
                lineHeight: 1.4119999408721924,
                color: "rgba(55,56,60,0.61)",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>텍스트</span>
            </div>
          </div>
        </div>
        )}
        {props.segment5 && (
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
            }} />
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
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                padding: "2px 0px 2px 0px",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "nowrap",
                boxSizing: "border-box",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>
                <IconsIcons
                  style={{
                    position: "relative",
                    width: 20,
                    flexShrink: 0,
                    alignSelf: "stretch",
                    height: "auto",
                  }}
                  prop={"null"}
                />
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 500,
                fontSize: 17,
                textAlign: "center",
                whiteSpace: "nowrap",
                lineHeight: 1.4119999408721924,
                color: "rgba(55,56,60,0.61)",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>텍스트</span>
            </div>
          </div>
        </div>
        )}
        {props.segment6 && (
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
            }} />
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
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                padding: "2px 0px 2px 0px",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "nowrap",
                boxSizing: "border-box",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>
                <IconsIcons
                  style={{
                    position: "relative",
                    width: 20,
                    flexShrink: 0,
                    alignSelf: "stretch",
                    height: "auto",
                  }}
                  prop={"null"}
                />
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 500,
                fontSize: 17,
                textAlign: "center",
                whiteSpace: "nowrap",
                lineHeight: 1.4119999408721924,
                color: "rgba(55,56,60,0.61)",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>텍스트</span>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
  const __body8 = () => (
    <div className={props.className} style={{
      width: 335,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        height: 32,
        borderRadius: 8,
        backgroundColor: "rgba(112,115,124,0.08)",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
              width: 110.333,
              height: 28,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flexWrap: "nowrap",
            }}>
              <div style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 110.333,
                height: 28,
                borderRadius: 6,
                backgroundColor: "var(--background-elevated-normal)",
                boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.08)",
              }} />
              <div style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 110.333,
                height: 28,
                opacity: 0.28,
                borderRadius: 6,
                backgroundColor: "var(--static-white)",
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
            }}>
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                padding: "2px 0px 2px 0px",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "nowrap",
                boxSizing: "border-box",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>
                <IconsIcons
                  style={{
                    position: "relative",
                    width: 14,
                    flexShrink: 0,
                    alignSelf: "stretch",
                    height: "auto",
                  }}
                  prop={"null"}
                />
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 500,
                fontSize: 17,
                textAlign: "center",
                whiteSpace: "nowrap",
                lineHeight: 1.4119999408721924,
                color: "var(--primary-normal)",
                flexShrink: 0,
              }}>텍스트</span>
            </div>
          </div>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
              width: 110.333,
              height: 28,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flexWrap: "nowrap",
            }} />
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: 4,
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "nowrap",
              flexGrow: 1,
            }}>
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                padding: "2px 0px 2px 0px",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "nowrap",
                boxSizing: "border-box",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>
                <IconsIcons
                  style={{
                    position: "relative",
                    width: 14,
                    flexShrink: 0,
                    alignSelf: "stretch",
                    height: "auto",
                  }}
                  prop={"null"}
                />
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 500,
                fontSize: 17,
                textAlign: "center",
                whiteSpace: "nowrap",
                lineHeight: 1.4119999408721924,
                color: "rgba(55,56,60,0.61)",
                flexShrink: 0,
              }}>텍스트</span>
            </div>
          </div>
        </div>
        {props.segment3 && (
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
              width: 110.333,
              height: 28,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flexWrap: "nowrap",
            }} />
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: 4,
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "nowrap",
              flexGrow: 1,
            }}>
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                padding: "2px 0px 2px 0px",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "nowrap",
                boxSizing: "border-box",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>
                <IconsIcons
                  style={{
                    position: "relative",
                    width: 14,
                    flexShrink: 0,
                    alignSelf: "stretch",
                    height: "auto",
                  }}
                  prop={"null"}
                />
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 500,
                fontSize: 17,
                textAlign: "center",
                whiteSpace: "nowrap",
                lineHeight: 1.4119999408721924,
                color: "rgba(55,56,60,0.61)",
                flexShrink: 0,
              }}>텍스트</span>
            </div>
          </div>
        </div>
        )}
        {props.segment4 && (
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
            }} />
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
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                padding: "2px 0px 2px 0px",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "nowrap",
                boxSizing: "border-box",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>
                <IconsIcons
                  style={{
                    position: "relative",
                    width: 20,
                    flexShrink: 0,
                    alignSelf: "stretch",
                    height: "auto",
                  }}
                  prop={"null"}
                />
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 500,
                fontSize: 17,
                textAlign: "center",
                whiteSpace: "nowrap",
                lineHeight: 1.4119999408721924,
                color: "rgba(55,56,60,0.61)",
                flexShrink: 0,
              }}>텍스트</span>
            </div>
          </div>
        </div>
        )}
        {props.segment5 && (
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
            }} />
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
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                padding: "2px 0px 2px 0px",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "nowrap",
                boxSizing: "border-box",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>
                <IconsIcons
                  style={{
                    position: "relative",
                    width: 20,
                    flexShrink: 0,
                    alignSelf: "stretch",
                    height: "auto",
                  }}
                  prop={"null"}
                />
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 500,
                fontSize: 17,
                textAlign: "center",
                whiteSpace: "nowrap",
                lineHeight: 1.4119999408721924,
                color: "rgba(55,56,60,0.61)",
                flexShrink: 0,
              }}>텍스트</span>
            </div>
          </div>
        </div>
        )}
        {props.segment6 && (
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
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
            }} />
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
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                padding: "2px 0px 2px 0px",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "nowrap",
                boxSizing: "border-box",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>
                <IconsIcons
                  style={{
                    position: "relative",
                    width: 20,
                    flexShrink: 0,
                    alignSelf: "stretch",
                    height: "auto",
                  }}
                  prop={"null"}
                />
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 500,
                fontSize: 17,
                textAlign: "center",
                whiteSpace: "nowrap",
                lineHeight: 1.4119999408721924,
                color: "rgba(55,56,60,0.61)",
                flexShrink: 0,
              }}>텍스트</span>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
  const __impls = {
    // figma: Variant=Solid, Size=Large, Icon=False
    "variant=solid|size=lg|icon=false": __body0,
    // figma: Variant=Solid, Size=Medium, Icon=False
    "variant=solid|size=md|icon=false": __body1,
    // figma: Variant=Solid, Size=Small, Icon=False
    "variant=solid|size=sm|icon=false": __body2,
    // figma: Variant=Outlined, Size=Large, Icon=False
    "variant=outlined|size=lg|icon=false": __body3,
    // figma: Variant=Outlined, Size=Medium, Icon=False
    "variant=outlined|size=md|icon=false": __body4,
    // figma: Variant=Outlined, Size=Small, Icon=False
    "variant=outlined|size=sm|icon=false": __body5,
    // figma: Variant=Solid, Size=Large, Icon=True
    "variant=solid|size=lg|icon=true": __body6,
    // figma: Variant=Solid, Size=Medium, Icon=True
    "variant=solid|size=md|icon=true": __body7,
    // figma: Variant=Solid, Size=Small, Icon=True
    "variant=solid|size=sm|icon=true": __body8,
    // figma: Variant=Outlined, Size=Large, Icon=True
    "variant=outlined|size=lg|icon=true": __body3,
    // figma: Variant=Outlined, Size=Medium, Icon=True
    "variant=outlined|size=md|icon=true": __body4,
    // figma: Variant=Outlined, Size=Small, Icon=True
    "variant=outlined|size=sm|icon=true": __body5,
  };
  return (__impls[__vkey(props)] ?? __body2)();
}
export default SegmentedControlSegmentedControl;
