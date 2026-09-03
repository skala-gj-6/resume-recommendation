import { CircularCircular } from './CircularCircular.jsx';
import { IconsIcons } from './IconsIcons.jsx';
import { InteractionLight } from './InteractionLight.jsx';
import { InteractionNormal } from './InteractionNormal.jsx';

// figma node: 16215:38291 Button/Text (8 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "variant=" + __venc(p.variant) + '|' + "size=" + __venc(p.size) + '|' + "disable=" + __venc(p.disable);

export function ButtonText(_p = {}) {
  const props = { ..._p, loading: _p.loading ?? false, label: _p.label ?? "텍스트", leadingIcon: _p.leadingIcon ?? false, variant: _p.variant ?? "primary", size: _p.size ?? "sm", disable: _p.disable ?? true, trailingIcon: _p.trailingIcon ?? false };
  const __body0 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      padding: "4px 0px 4px 0px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.loading && (
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 42,
          height: 24,
          display: "flex",
          flexDirection: "row",
          padding: "4px 0px 4px 0px",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          boxSizing: "border-box",
        }}>
          <div style={{
              position: "relative",
              width: 16,
              flexShrink: 0,
              alignSelf: "stretch",
              height: "auto",
            }}>{props.icon1 ?? <CircularCircular animate={false} />}</div>
        </div>
        )}
        {props.loading && (
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 42,
          height: 0,
        }} />
        )}
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          gap: 4,
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          {props.leadingIcon && (
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
            <div style={{
                position: "relative",
                width: 20,
                flexShrink: 0,
                alignSelf: "stretch",
                height: "auto",
              }}>{props.icon2 ?? <IconsIcons prop={"null"} />}</div>
          </div>
          )}
          <span style={{
            position: "relative",
            fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 16,
            textAlign: "center",
            whiteSpace: "nowrap",
            lineHeight: 1.5,
            letterSpacing: "0.006em",
            color: "var(--primary-normal)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.label}</span>
          {props.trailingIcon && (
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
            <div style={{
                position: "relative",
                width: 20,
                flexShrink: 0,
                alignSelf: "stretch",
                height: "auto",
              }}>{props.icon3 ?? <IconsIcons prop={"null"} />}</div>
          </div>
          )}
        </div>
      </div>
      <div style={{
        position: "absolute",
        left: -7,
        top: 0,
        width: 56,
        height: 32,
        overflow: "hidden",
        borderRadius: 6,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            height: "auto",
            width: "auto",
          }}>{props.icon4 ?? <InteractionNormal state={"normal"} />}</div>
      </div>
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      padding: "4px 0px 4px 0px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          gap: 4,
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          {props.leadingIcon && (
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
            <div style={{
                position: "relative",
                width: 20,
                flexShrink: 0,
                alignSelf: "stretch",
                height: "auto",
              }}>{props.icon1 ?? <IconsIcons prop={"null"} />}</div>
          </div>
          )}
          <span style={{
            position: "relative",
            fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 16,
            textAlign: "center",
            whiteSpace: "nowrap",
            lineHeight: 1.5,
            letterSpacing: "0.006em",
            color: "rgba(55,56,60,0.16)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.label}</span>
          {props.trailingIcon && (
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
            <div style={{
                position: "relative",
                width: 20,
                flexShrink: 0,
                alignSelf: "stretch",
                height: "auto",
              }}>{props.icon2 ?? <IconsIcons prop={"null"} />}</div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
  const __body2 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      padding: "4px 0px 4px 0px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.loading && (
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 37,
          height: 20,
          display: "flex",
          flexDirection: "row",
          padding: "3px 0px 3px 0px",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          boxSizing: "border-box",
        }}>
          <div style={{
              position: "relative",
              width: 14,
              flexShrink: 0,
              alignSelf: "stretch",
              height: "auto",
            }}>{props.icon1 ?? <CircularCircular animate={false} />}</div>
        </div>
        )}
        {props.loading && (
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 37,
          height: 0,
        }} />
        )}
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          gap: 4,
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          {props.leadingIcon && (
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
            <div style={{
                position: "relative",
                width: 16,
                flexShrink: 0,
                alignSelf: "stretch",
                height: "auto",
              }}>{props.icon2 ?? <IconsIcons prop={"null"} />}</div>
          </div>
          )}
          <span style={{
            position: "relative",
            fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 14,
            textAlign: "center",
            whiteSpace: "nowrap",
            lineHeight: 1.4290000200271606,
            letterSpacing: "0.015em",
            color: "var(--primary-normal)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.label}</span>
          {props.trailingIcon && (
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
            <div style={{
                position: "relative",
                width: 16,
                flexShrink: 0,
                alignSelf: "stretch",
                height: "auto",
              }}>{props.icon3 ?? <IconsIcons prop={"null"} />}</div>
          </div>
          )}
        </div>
      </div>
      <div style={{
        position: "absolute",
        left: -6,
        top: 0,
        width: 49,
        height: 28,
        overflow: "hidden",
        borderRadius: 6,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            height: "auto",
            width: "auto",
          }}>{props.icon4 ?? <InteractionNormal state={"normal"} />}</div>
      </div>
    </div>
  );
  const __body3 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      padding: "4px 0px 4px 0px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          gap: 4,
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          {props.leadingIcon && (
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
            <div style={{
                position: "relative",
                width: 16,
                flexShrink: 0,
                alignSelf: "stretch",
                height: "auto",
              }}>{props.icon1 ?? <IconsIcons prop={"null"} />}</div>
          </div>
          )}
          <span style={{
            position: "relative",
            fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 14,
            textAlign: "center",
            whiteSpace: "nowrap",
            lineHeight: 1.4290000200271606,
            letterSpacing: "0.015em",
            color: "rgba(55,56,60,0.16)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.label}</span>
          {props.trailingIcon && (
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
            <div style={{
                position: "relative",
                width: 16,
                flexShrink: 0,
                alignSelf: "stretch",
                height: "auto",
              }}>{props.icon2 ?? <IconsIcons prop={"null"} />}</div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
  const __body4 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      padding: "4px 0px 4px 0px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.loading && (
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 42,
          height: 24,
          display: "flex",
          flexDirection: "row",
          padding: "4px 0px 4px 0px",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          boxSizing: "border-box",
        }}>
          <div style={{
              position: "relative",
              width: 16,
              flexShrink: 0,
              alignSelf: "stretch",
              height: "auto",
            }}>{props.icon1 ?? <CircularCircular animate={false} />}</div>
        </div>
        )}
        {props.loading && (
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 42,
          height: 0,
        }} />
        )}
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          gap: 4,
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          {props.leadingIcon && (
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
            <div style={{
                position: "relative",
                width: 20,
                flexShrink: 0,
                alignSelf: "stretch",
                height: "auto",
              }}>{props.icon2 ?? <IconsIcons prop={"null"} />}</div>
          </div>
          )}
          <span style={{
            position: "relative",
            fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 16,
            textAlign: "center",
            whiteSpace: "nowrap",
            lineHeight: 1.5,
            letterSpacing: "0.006em",
            color: "rgba(55,56,60,0.61)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.label}</span>
          {props.trailingIcon && (
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
            <div style={{
                position: "relative",
                width: 20,
                flexShrink: 0,
                alignSelf: "stretch",
                height: "auto",
              }}>{props.icon3 ?? <IconsIcons prop={"null"} />}</div>
          </div>
          )}
        </div>
      </div>
      <div style={{
        position: "absolute",
        left: -7,
        top: 0,
        width: 56,
        height: 32,
        overflow: "hidden",
        borderRadius: 6,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            height: "auto",
            width: "auto",
          }}>{props.icon4 ?? <InteractionLight state={"normal"} />}</div>
      </div>
    </div>
  );
  const __body5 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      padding: "4px 0px 4px 0px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.loading && (
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 37,
          height: 20,
          display: "flex",
          flexDirection: "row",
          padding: "3px 0px 3px 0px",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          boxSizing: "border-box",
        }}>
          <div style={{
              position: "relative",
              width: 14,
              flexShrink: 0,
              alignSelf: "stretch",
              height: "auto",
            }}>{props.icon1 ?? <CircularCircular animate={false} />}</div>
        </div>
        )}
        {props.loading && (
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 37,
          height: 0,
        }} />
        )}
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          gap: 4,
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          {props.leadingIcon && (
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
            <div style={{
                position: "relative",
                width: 16,
                flexShrink: 0,
                alignSelf: "stretch",
                height: "auto",
              }}>{props.icon2 ?? <IconsIcons prop={"null"} />}</div>
          </div>
          )}
          <span style={{
            position: "relative",
            fontFamily: "\"Pretendard JP\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 14,
            textAlign: "center",
            whiteSpace: "nowrap",
            lineHeight: 1.4290000200271606,
            letterSpacing: "0.015em",
            color: "rgba(55,56,60,0.61)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.label}</span>
          {props.trailingIcon && (
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
            <div style={{
                position: "relative",
                width: 16,
                flexShrink: 0,
                alignSelf: "stretch",
                height: "auto",
              }}>{props.icon3 ?? <IconsIcons prop={"null"} />}</div>
          </div>
          )}
        </div>
      </div>
      <div style={{
        position: "absolute",
        left: -6,
        top: 0,
        width: 49,
        height: 28,
        overflow: "hidden",
        borderRadius: 6,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            height: "auto",
            width: "auto",
          }}>{props.icon4 ?? <InteractionLight state={"normal"} />}</div>
      </div>
    </div>
  );
  const __impls = {
    // figma: Variant=Primary, Size=Medium, Disable=False
    "variant=primary|size=md|disable=false": __body0,
    // figma: Variant=Primary, Size=Medium, Disable=True
    "variant=primary|size=md|disable=true": __body1,
    // figma: Variant=Primary, Size=Small, Disable=False
    "variant=primary|size=sm|disable=false": __body2,
    // figma: Variant=Primary, Size=Small, Disable=True
    "variant=primary|size=sm|disable=true": __body3,
    // figma: Variant=Assistive, Size=Medium, Disable=False
    "variant=assistive|size=md|disable=false": __body4,
    // figma: Variant=Assistive, Size=Medium, Disable=True
    "variant=assistive|size=md|disable=true": __body1,
    // figma: Variant=Assistive, Size=Small, Disable=False
    "variant=assistive|size=sm|disable=false": __body5,
    // figma: Variant=Assistive, Size=Small, Disable=True
    "variant=assistive|size=sm|disable=true": __body3,
  };
  return (__impls[__vkey(props)] ?? __body3)();
}
export default ButtonText;
