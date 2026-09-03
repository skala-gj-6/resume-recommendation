import { AvatarResourceImageAcademy } from './AvatarResourceImageAcademy.jsx';
import { AvatarResourceImageCompany } from './AvatarResourceImageCompany.jsx';
import { AvatarResourceImagePerson } from './AvatarResourceImagePerson.jsx';
import { AvatarResourcePlaceholderAcademy } from './AvatarResourcePlaceholderAcademy.jsx';
import { AvatarResourcePlaceholderCompany } from './AvatarResourcePlaceholderCompany.jsx';
import { AvatarResourcePlaceholderPerson } from './AvatarResourcePlaceholderPerson.jsx';
import { InteractionLight } from './InteractionLight.jsx';
import { PushBadgePushBadge } from './PushBadgePushBadge.jsx';
import { RatioVertical } from './RatioVertical.jsx';

// figma node: 16215:25725 Avatar/Avatar (30 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "variant=" + __venc(p.variant) + '|' + "size=" + __venc(p.size) + '|' + "placeholder=" + __venc(p.placeholder);

export function AvatarAvatar(_p = {}) {
  const props = { ..._p, interaction: _p.interaction ?? true, pushBadge: _p.pushBadge ?? false, variant: _p.variant ?? "person", size: _p.size ?? "xs", placeholder: _p.placeholder ?? true };
  const __body0 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 10000,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.interaction && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 32,
        height: 32,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 48,
          height: 48,
          overflow: "hidden",
          borderRadius: 10000,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
        </div>
      </div>
      )}
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 10000,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 32,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 32,
          height: 32,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon3 ?? <AvatarResourceImagePerson variant={"default"} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 32,
        height: 32,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        {props.pushBadge && (
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"xs"} />}</div>
        )}
      </div>
      )}
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 10000,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.interaction && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 24,
        height: 24,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 40,
          height: 40,
          overflow: "hidden",
          borderRadius: 10000,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
        </div>
      </div>
      )}
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 10000,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 24,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 24,
          height: 24,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon3 ?? <AvatarResourceImagePerson variant={"default"} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 24,
        height: 24,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        {props.pushBadge && (
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"xs"} />}</div>
        )}
      </div>
      )}
    </div>
  );
  const __body2 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 10000,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.interaction && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 24,
        height: 24,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 40,
          height: 40,
          overflow: "hidden",
          borderRadius: 10000,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
        </div>
      </div>
      )}
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 10000,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 24,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 24,
          height: 24,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon3 ?? <AvatarResourcePlaceholderPerson prop={"null"} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 24,
        height: 24,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        {props.pushBadge && (
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"xs"} />}</div>
        )}
      </div>
      )}
    </div>
  );
  const __body3 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 10000,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.interaction && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 32,
        height: 32,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 48,
          height: 48,
          overflow: "hidden",
          borderRadius: 10000,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
        </div>
      </div>
      )}
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 10000,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 32,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 32,
          height: 32,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon3 ?? <AvatarResourcePlaceholderPerson prop={"null"} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 32,
        height: 32,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        {props.pushBadge && (
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"xs"} />}</div>
        )}
      </div>
      )}
    </div>
  );
  const __body4 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 10000,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.interaction && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 40,
        height: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 56,
          height: 56,
          overflow: "hidden",
          borderRadius: 10000,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
        </div>
      </div>
      )}
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 10000,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 40,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 40,
          height: 40,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon3 ?? <AvatarResourceImagePerson variant={"default"} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 40,
        height: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        {props.pushBadge && (
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"sm"} />}</div>
        )}
      </div>
      )}
    </div>
  );
  const __body5 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 10000,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.interaction && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 40,
        height: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 56,
          height: 56,
          overflow: "hidden",
          borderRadius: 10000,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
        </div>
      </div>
      )}
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 10000,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 40,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 40,
          height: 40,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon3 ?? <AvatarResourcePlaceholderPerson prop={"null"} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 40,
        height: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        {props.pushBadge && (
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"sm"} />}</div>
        )}
      </div>
      )}
    </div>
  );
  const __body6 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 10000,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.interaction && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 48,
        height: 48,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 64,
          height: 64,
          overflow: "hidden",
          borderRadius: 10000,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
        </div>
      </div>
      )}
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 10000,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 48,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 48,
          height: 48,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon3 ?? <AvatarResourceImagePerson variant={"default"} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 48,
        height: 48,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        {props.pushBadge && (
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"sm"} />}</div>
        )}
      </div>
      )}
    </div>
  );
  const __body7 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 10000,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.interaction && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 48,
        height: 48,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 64,
          height: 64,
          overflow: "hidden",
          borderRadius: 10000,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
        </div>
      </div>
      )}
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 10000,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 48,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 48,
          height: 48,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon3 ?? <AvatarResourcePlaceholderPerson prop={"null"} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 48,
        height: 48,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        {props.pushBadge && (
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"sm"} />}</div>
        )}
      </div>
      )}
    </div>
  );
  const __body8 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 10000,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.interaction && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 56,
        height: 56,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 72,
          height: 72,
          overflow: "hidden",
          borderRadius: 10000,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
        </div>
      </div>
      )}
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 10000,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 56,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 56,
          height: 56,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon3 ?? <AvatarResourceImagePerson variant={"default"} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 56,
        height: 56,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        {props.pushBadge && (
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"md"} />}</div>
        )}
      </div>
      )}
    </div>
  );
  const __body9 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 10000,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.interaction && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 56,
        height: 56,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 72,
          height: 72,
          overflow: "hidden",
          borderRadius: 10000,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
        </div>
      </div>
      )}
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 10000,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 56,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 56,
          height: 56,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon3 ?? <AvatarResourcePlaceholderPerson prop={"null"} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 56,
        height: 56,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        {props.pushBadge && (
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"md"} />}</div>
        )}
      </div>
      )}
    </div>
  );
  const __body10 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 6,
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
        left: 0,
        top: 0,
        width: 24,
        height: 24,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        {props.interaction && (
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 40,
          height: 40,
          overflow: "hidden",
          borderRadius: 14,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
        </div>
        )}
      </div>
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 6,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 24,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 24,
          height: 24,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon3 ?? <AvatarResourceImageCompany variant={"default"} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 24,
        height: 24,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"xs"} />}</div>
      </div>
      )}
    </div>
  );
  const __body11 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 6,
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
        left: 0,
        top: 0,
        width: 24,
        height: 24,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 40,
          height: 40,
          overflow: "hidden",
          borderRadius: 14,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          {props.interaction && (
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
          )}
        </div>
      </div>
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 6,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 24,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 24,
          height: 24,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon3 ?? <AvatarResourcePlaceholderCompany prop={"null"} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 24,
        height: 24,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"xs"} />}</div>
      </div>
      )}
    </div>
  );
  const __body12 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 8,
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
        left: 0,
        top: 0,
        width: 32,
        height: 32,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 48,
          height: 48,
          overflow: "hidden",
          borderRadius: 16,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          {props.interaction && (
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
          )}
        </div>
      </div>
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 8,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 32,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 32,
          height: 32,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon3 ?? <AvatarResourceImageCompany variant={"default"} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 32,
        height: 32,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"xs"} />}</div>
      </div>
      )}
    </div>
  );
  const __body13 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 8,
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
        left: 0,
        top: 0,
        width: 32,
        height: 32,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 48,
          height: 48,
          overflow: "hidden",
          borderRadius: 16,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          {props.interaction && (
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
          )}
        </div>
      </div>
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 8,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 32,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 32,
          height: 32,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon3 ?? <AvatarResourcePlaceholderCompany prop={"null"} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 32,
        height: 32,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"xs"} />}</div>
      </div>
      )}
    </div>
  );
  const __body14 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 10,
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
        left: 0,
        top: 0,
        width: 40,
        height: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        {props.interaction && (
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 56,
          height: 56,
          overflow: "hidden",
          borderRadius: 18,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }} />
        )}
      </div>
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 10,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 40,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon1 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 40,
          height: 40,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon2 ?? <AvatarResourceImageCompany variant={"default"} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 40,
        height: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon3 ?? <PushBadgePushBadge variant={"dot"} size={"sm"} />}</div>
      </div>
      )}
    </div>
  );
  const __body15 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 10,
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
        left: 0,
        top: 0,
        width: 40,
        height: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 56,
          height: 56,
          overflow: "hidden",
          borderRadius: 18,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          {props.interaction && (
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
          )}
        </div>
      </div>
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 10,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 40,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 40,
          height: 40,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon3 ?? <AvatarResourcePlaceholderCompany prop={"null"} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 40,
        height: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"sm"} />}</div>
      </div>
      )}
    </div>
  );
  const __body16 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 12,
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
        left: 0,
        top: 0,
        width: 48,
        height: 48,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 64,
          height: 64,
          overflow: "hidden",
          borderRadius: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          {props.interaction && (
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
          )}
        </div>
      </div>
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 12,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 48,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 48,
          height: 48,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon3 ?? <AvatarResourceImageCompany variant={"default"} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 48,
        height: 48,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"sm"} />}</div>
      </div>
      )}
    </div>
  );
  const __body17 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 12,
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
        left: 0,
        top: 0,
        width: 48,
        height: 48,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 64,
          height: 64,
          overflow: "hidden",
          borderRadius: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          {props.interaction && (
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
          )}
        </div>
      </div>
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 12,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 48,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 48,
          height: 48,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon3 ?? <AvatarResourcePlaceholderCompany prop={"null"} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 48,
        height: 48,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"sm"} />}</div>
      </div>
      )}
    </div>
  );
  const __body18 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 14,
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
        left: 0,
        top: 0,
        width: 56,
        height: 56,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 72,
          height: 72,
          overflow: "hidden",
          borderRadius: 22,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          {props.interaction && (
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
          )}
        </div>
      </div>
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 14,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 56,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 56,
          height: 56,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon3 ?? <AvatarResourceImageCompany variant={"default"} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 56,
        height: 56,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"md"} />}</div>
      </div>
      )}
    </div>
  );
  const __body19 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 14,
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
        left: 0,
        top: 0,
        width: 56,
        height: 56,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 72,
          height: 72,
          overflow: "hidden",
          borderRadius: 22,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          {props.interaction && (
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
          )}
        </div>
      </div>
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 14,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 56,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 56,
          height: 56,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon3 ?? <AvatarResourcePlaceholderCompany prop={"null"} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 56,
        height: 56,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"md"} />}</div>
      </div>
      )}
    </div>
  );
  const __body20 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 6,
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
        left: 0,
        top: 0,
        width: 24,
        height: 24,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 40,
          height: 40,
          overflow: "hidden",
          borderRadius: 14,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          {props.interaction && (
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
          )}
        </div>
      </div>
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 6,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 24,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 24,
          height: 24,
        }}>
          <div style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 24,
              height: 24,
            }}>{props.icon3 ?? <AvatarResourceImageAcademy variant={"default"} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 24,
        height: 24,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"xs"} />}</div>
      </div>
      )}
    </div>
  );
  const __body21 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 6,
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
        left: 0,
        top: 0,
        width: 24,
        height: 24,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 40,
          height: 40,
          overflow: "hidden",
          borderRadius: 14,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          {props.interaction && (
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
          )}
        </div>
      </div>
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 6,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 24,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 24,
          height: 24,
        }}>
          <div style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 24,
              height: 24,
            }}>{props.icon3 ?? <AvatarResourcePlaceholderAcademy prop={"null"} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 24,
        height: 24,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"xs"} />}</div>
      </div>
      )}
    </div>
  );
  const __body22 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 8,
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
        left: 0,
        top: 0,
        width: 32,
        height: 32,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 48,
          height: 48,
          overflow: "hidden",
          borderRadius: 16,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          {props.interaction && (
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
          )}
        </div>
      </div>
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 8,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 32,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 32,
          height: 32,
        }}>
          <div style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 32,
              height: 32,
            }}>{props.icon3 ?? <AvatarResourceImageAcademy variant={"default"} style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 32,
        height: 32,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"xs"} />}</div>
      </div>
      )}
    </div>
  );
  const __body23 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 8,
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
        left: 0,
        top: 0,
        width: 32,
        height: 32,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 48,
          height: 48,
          overflow: "hidden",
          borderRadius: 16,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          {props.interaction && (
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
          )}
        </div>
      </div>
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 8,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 32,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 32,
          height: 32,
        }}>
          <div style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 32,
              height: 32,
            }}>{props.icon3 ?? <AvatarResourcePlaceholderAcademy prop={"null"} style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 32,
        height: 32,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"xs"} />}</div>
      </div>
      )}
    </div>
  );
  const __body24 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 10,
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
        left: 0,
        top: 0,
        width: 40,
        height: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 56,
          height: 56,
          overflow: "hidden",
          borderRadius: 18,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          {props.interaction && (
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
          )}
        </div>
      </div>
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 10,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 40,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 40,
          height: 40,
        }}>
          <div style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 40,
              height: 40,
            }}>{props.icon3 ?? <AvatarResourceImageAcademy variant={"default"} style={{ transform: "scale(1.667, 1.667)", transformOrigin: "0 0" }} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 40,
        height: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"sm"} />}</div>
      </div>
      )}
    </div>
  );
  const __body25 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 10,
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
        left: 0,
        top: 0,
        width: 40,
        height: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 56,
          height: 56,
          overflow: "hidden",
          borderRadius: 18,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          {props.interaction && (
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
          )}
        </div>
      </div>
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 10,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 40,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 40,
          height: 40,
        }}>
          <div style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 40,
              height: 40,
            }}>{props.icon3 ?? <AvatarResourcePlaceholderAcademy prop={"null"} style={{ transform: "scale(1.667, 1.667)", transformOrigin: "0 0" }} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 40,
        height: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"sm"} />}</div>
      </div>
      )}
    </div>
  );
  const __body26 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 12,
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
        left: 0,
        top: 0,
        width: 48,
        height: 48,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 64,
          height: 64,
          overflow: "hidden",
          borderRadius: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          {props.interaction && (
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
          )}
        </div>
      </div>
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 12,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 48,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 48,
          height: 48,
        }}>
          <div style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 48,
              height: 48,
            }}>{props.icon3 ?? <AvatarResourceImageAcademy variant={"default"} style={{ transform: "scale(2, 2)", transformOrigin: "0 0" }} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 48,
        height: 48,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"sm"} />}</div>
      </div>
      )}
    </div>
  );
  const __body27 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 12,
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
        left: 0,
        top: 0,
        width: 48,
        height: 48,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 64,
          height: 64,
          overflow: "hidden",
          borderRadius: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          {props.interaction && (
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
          )}
        </div>
      </div>
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 12,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 48,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 48,
          height: 48,
        }}>
          <div style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 48,
              height: 48,
            }}>{props.icon3 ?? <AvatarResourcePlaceholderAcademy prop={"null"} style={{ transform: "scale(2, 2)", transformOrigin: "0 0" }} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 48,
        height: 48,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"sm"} />}</div>
      </div>
      )}
    </div>
  );
  const __body28 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 14,
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
        left: 0,
        top: 0,
        width: 56,
        height: 56,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 72,
          height: 72,
          overflow: "hidden",
          borderRadius: 22,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          {props.interaction && (
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
          )}
        </div>
      </div>
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 14,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 56,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 56,
          height: 56,
        }}>
          <div style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 56,
              height: 56,
            }}>{props.icon3 ?? <AvatarResourceImageAcademy variant={"default"} style={{ transform: "scale(2.333, 2.333)", transformOrigin: "0 0" }} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 56,
        height: 56,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"md"} />}</div>
      </div>
      )}
    </div>
  );
  const __body29 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      borderRadius: 14,
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
        left: 0,
        top: 0,
        width: 56,
        height: 56,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 72,
          height: 72,
          overflow: "hidden",
          borderRadius: 22,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
          {props.interaction && (
          <div style={{
              position: "relative",
              flexGrow: 1,
              alignSelf: "stretch",
              width: "auto",
              height: "auto",
            }}>{props.icon1 ?? <InteractionLight state={"normal"} />}</div>
          )}
        </div>
      </div>
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 14,
        backgroundColor: "var(--static-white)",
        boxShadow: "inset 0 0 0 1px rgba(112,115,124,0.08)",
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
            width: 56,
            flexShrink: 0,
            alignSelf: "stretch",
            height: "auto",
          }}>{props.icon2 ?? <RatioVertical ratio={"1:1"} />}</div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 56,
          height: 56,
        }}>
          <div style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 56,
              height: 56,
            }}>{props.icon3 ?? <AvatarResourcePlaceholderAcademy prop={"null"} style={{ transform: "scale(2.333, 2.333)", transformOrigin: "0 0" }} />}</div>
        </div>
      </div>
      {props.pushBadge && (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 56,
        height: 56,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}>
        <div style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}>{props.icon4 ?? <PushBadgePushBadge variant={"dot"} size={"md"} />}</div>
      </div>
      )}
    </div>
  );
  const __impls = {
    // figma: Variant=Person, Size=Small, Placeholder=False
    "variant=person|size=sm|placeholder=false": __body0,
    // figma: Variant=Person, Size=XSmall, Placeholder=False
    "variant=person|size=xs|placeholder=false": __body1,
    // figma: Variant=Person, Size=XSmall, Placeholder=True
    "variant=person|size=xs|placeholder=true": __body2,
    // figma: Variant=Person, Size=Small, Placeholder=True
    "variant=person|size=sm|placeholder=true": __body3,
    // figma: Variant=Person, Size=Medium, Placeholder=False
    "variant=person|size=md|placeholder=false": __body4,
    // figma: Variant=Person, Size=Medium, Placeholder=True
    "variant=person|size=md|placeholder=true": __body5,
    // figma: Variant=Person, Size=Large, Placeholder=False
    "variant=person|size=lg|placeholder=false": __body6,
    // figma: Variant=Person, Size=Large, Placeholder=True
    "variant=person|size=lg|placeholder=true": __body7,
    // figma: Variant=Person, Size=XLarge, Placeholder=False
    "variant=person|size=xl|placeholder=false": __body8,
    // figma: Variant=Person, Size=XLarge, Placeholder=True
    "variant=person|size=xl|placeholder=true": __body9,
    // figma: Variant=Company, Size=XSmall, Placeholder=False
    "variant=company|size=xs|placeholder=false": __body10,
    // figma: Variant=Company, Size=XSmall, Placeholder=True
    "variant=company|size=xs|placeholder=true": __body11,
    // figma: Variant=Company, Size=Small, Placeholder=False
    "variant=company|size=sm|placeholder=false": __body12,
    // figma: Variant=Company, Size=Small, Placeholder=True
    "variant=company|size=sm|placeholder=true": __body13,
    // figma: Variant=Company, Size=Medium, Placeholder=False
    "variant=company|size=md|placeholder=false": __body14,
    // figma: Variant=Company, Size=Medium, Placeholder=True
    "variant=company|size=md|placeholder=true": __body15,
    // figma: Variant=Company, Size=Large, Placeholder=False
    "variant=company|size=lg|placeholder=false": __body16,
    // figma: Variant=Company, Size=Large, Placeholder=True
    "variant=company|size=lg|placeholder=true": __body17,
    // figma: Variant=Company, Size=XLarge, Placeholder=False
    "variant=company|size=xl|placeholder=false": __body18,
    // figma: Variant=Company, Size=XLarge, Placeholder=True
    "variant=company|size=xl|placeholder=true": __body19,
    // figma: Variant=Academy, Size=XSmall, Placeholder=False
    "variant=academy|size=xs|placeholder=false": __body20,
    // figma: Variant=Academy, Size=XSmall, Placeholder=True
    "variant=academy|size=xs|placeholder=true": __body21,
    // figma: Variant=Academy, Size=Small, Placeholder=False
    "variant=academy|size=sm|placeholder=false": __body22,
    // figma: Variant=Academy, Size=Small, Placeholder=True
    "variant=academy|size=sm|placeholder=true": __body23,
    // figma: Variant=Academy, Size=Medium, Placeholder=False
    "variant=academy|size=md|placeholder=false": __body24,
    // figma: Variant=Academy, Size=Medium, Placeholder=True
    "variant=academy|size=md|placeholder=true": __body25,
    // figma: Variant=Academy, Size=Large, Placeholder=False
    "variant=academy|size=lg|placeholder=false": __body26,
    // figma: Variant=Academy, Size=Large, Placeholder=True
    "variant=academy|size=lg|placeholder=true": __body27,
    // figma: Variant=Academy, Size=XLarge, Placeholder=False
    "variant=academy|size=xl|placeholder=false": __body28,
    // figma: Variant=Academy, Size=XLarge, Placeholder=True
    "variant=academy|size=xl|placeholder=true": __body29,
  };
  return (__impls[__vkey(props)] ?? __body2)();
}
export default AvatarAvatar;
