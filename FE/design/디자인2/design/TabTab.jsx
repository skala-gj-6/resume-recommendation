import { ButtonIconNormal } from './ButtonIconNormal.jsx';
import { GradientResourceMaskBase } from './GradientResourceMaskBase.jsx';
import { TabResourceTab } from './TabResourceTab.jsx';

// figma node: 16215:21806 Tab/Tab (12 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "resize=" + __venc(p.resize) + '|' + "size=" + __venc(p.size) + '|' + "horizontalPadding=" + __venc(p.horizontalPadding);

export function TabTab(_p = {}) {
  const props = { ..._p, trailingIconButton: _p.trailingIconButton ?? false, gradientLeading: _p.gradientLeading ?? false, gradientTrailing: _p.gradientTrailing ?? false, tab6: _p.tab6 ?? false, tab1: _p.tab1 ?? true, tab7: _p.tab7 ?? false, tab8: _p.tab8 ?? false, tab5: _p.tab5 ?? false, tab2: _p.tab2 ?? true, resize: _p.resize ?? "hug", size: _p.size ?? "sm", horizontalPadding: _p.horizontalPadding ?? false, tab4: _p.tab4 ?? false, tab3: _p.tab3 ?? true };
  const __body0 = () => (
    <div className={props.className} style={{
      width: 335,
      overflow: "hidden",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "nowrap",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "nowrap",
            flexGrow: 1,
            alignSelf: "stretch",
          }}>
            <div style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 335,
              height: 56,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "nowrap",
            }}>
              {props.gradientLeading && (
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                flexWrap: "nowrap",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>
                <div style={{
                  position: "relative",
                  width: 48,
                  flexShrink: 0,
                  alignSelf: "stretch",
                }}>
                  <div style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    transform: "matrix(0,1,-1,0,48,0)",
                    transformOrigin: "0 0",
                    width: 56,
                    height: 48,
                    background: "linear-gradient(180deg, rgb(0,0,0) 0.00%, rgba(0,0,0,0.8578) 14.03%, rgba(0,0,0,0.7307) 26.24%, rgba(0,0,0,0.6176) 36.80%, rgba(0,0,0,0.5176) 45.90%, rgba(0,0,0,0.4296) 53.70%, rgba(0,0,0,0.3528) 60.40%, rgba(0,0,0,0.2861) 66.16%, rgba(0,0,0,0.2286) 71.17%, rgba(0,0,0,0.1792) 75.60%, rgba(0,0,0,0.137) 79.63%, rgba(0,0,0,0.1011) 83.44%, rgba(0,0,0,0.0704) 87.20%, rgba(0,0,0,0.044) 91.10%, rgba(0,0,0,0.0208) 95.30%, rgba(0,0,0,0) 100.00%)",
                  }} />
                </div>
              </div>
              )}
              <div style={{
                position: "relative",
                backgroundColor: "rgb(0,0,0)",
                flexGrow: 1,
                alignSelf: "stretch",
              }} />
              {props.gradientTrailing && (
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
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
                  }}>{props.icon2 ?? <GradientResourceMaskBase />}</div>
              </div>
              )}
            </div>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: 24,
              alignItems: "center",
              flexWrap: "nowrap",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>
              {props.tab1 && (
              <div style={{
                  position: "relative",
                  width: 52,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}>{props.icon3 ?? <TabResourceTab active={false} disabled={false} />}</div>
              )}
              {props.tab2 && (
              <div style={{
                  position: "relative",
                  width: 52,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}>{props.icon4 ?? <TabResourceTab active={false} disabled={false} />}</div>
              )}
              {props.tab3 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  width: 52,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab4 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  width: 52,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab5 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  width: 52,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab6 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  width: 52,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab7 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  width: 52,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab8 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  width: 52,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
            </div>
          </div>
          {props.trailingIconButton && (
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
            <ButtonIconNormal
              style={{ position: "relative", height: 24, flexShrink: 0 }}
              disable={false}
            />
          </div>
          )}
        </div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 335,
          height: 56,
          borderTop: "1px solid rgba(112,115,124,0.08)",
          borderRight: "1px solid rgba(112,115,124,0.08)",
          borderBottom: "1px solid rgba(112,115,124,0.08)",
          borderLeft: "1px solid rgba(112,115,124,0.08)",
        }} />
      </div>
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: 375,
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "nowrap",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            padding: "0px 20px 0px 20px",
            alignItems: "center",
            flexWrap: "nowrap",
            boxSizing: "border-box",
            flexGrow: 1,
            alignSelf: "stretch",
          }}>
            {props.trailingIconButton && (
            <div style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 375,
              height: 56,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "nowrap",
            }}>
              <div style={{
                position: "relative",
                backgroundColor: "rgb(0,0,0)",
                flexGrow: 1,
                alignSelf: "stretch",
              }} />
              {props.gradientTrailing && (
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
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
                  }}>{props.icon1 ?? <GradientResourceMaskBase />}</div>
                {props.trailingIconButton && (
                <div style={{
                  position: "relative",
                  width: 20,
                  flexShrink: 0,
                  alignSelf: "stretch",
                }} />
                )}
              </div>
              )}
            </div>
            )}
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: 24,
              alignItems: "center",
              flexWrap: "nowrap",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>
              {props.tab1 && (
              <div style={{
                  position: "relative",
                  width: 52,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}>{props.icon2 ?? <TabResourceTab active={false} disabled={false} />}</div>
              )}
              {props.tab2 && (
              <div style={{
                  position: "relative",
                  width: 52,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}>{props.icon3 ?? <TabResourceTab active={false} disabled={false} />}</div>
              )}
              {props.tab3 && (
              <div style={{
                  position: "relative",
                  width: 52,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}>{props.icon4 ?? <TabResourceTab active={false} disabled={false} />}</div>
              )}
              {props.tab4 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  width: 52,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab5 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  width: 52,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab6 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  width: 52,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab7 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  width: 52,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab8 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  width: 52,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
            </div>
          </div>
          {props.trailingIconButton && (
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            padding: "0px 20px 0px 0px",
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
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "nowrap",
              flexShrink: 0,
            }}>
              <ButtonIconNormal
                style={{ position: "relative", height: 24, flexShrink: 0 }}
                disable={false}
              />
            </div>
          </div>
          )}
        </div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 375,
          height: 56,
          borderTop: "1px solid rgba(112,115,124,0.08)",
          borderRight: "1px solid rgba(112,115,124,0.08)",
          borderBottom: "1px solid rgba(112,115,124,0.08)",
          borderLeft: "1px solid rgba(112,115,124,0.08)",
        }} />
      </div>
    </div>
  );
  const __body2 = () => (
    <div className={props.className} style={{
      width: 335,
      overflow: "hidden",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "nowrap",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "nowrap",
            flexGrow: 1,
            alignSelf: "stretch",
          }}>
            <div style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 335,
              height: 48,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "nowrap",
            }}>
              {props.gradientLeading && (
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                flexWrap: "nowrap",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>
                <div style={{
                  position: "relative",
                  width: 48,
                  flexShrink: 0,
                  alignSelf: "stretch",
                }}>
                  <div style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    transform: "matrix(0,1,-1,0,48,0)",
                    transformOrigin: "0 0",
                    width: 48,
                    height: 48,
                    background: "linear-gradient(180deg, rgb(0,0,0) 0.00%, rgba(0,0,0,0.8578) 14.03%, rgba(0,0,0,0.7307) 26.24%, rgba(0,0,0,0.6176) 36.80%, rgba(0,0,0,0.5176) 45.90%, rgba(0,0,0,0.4296) 53.70%, rgba(0,0,0,0.3528) 60.40%, rgba(0,0,0,0.2861) 66.16%, rgba(0,0,0,0.2286) 71.17%, rgba(0,0,0,0.1792) 75.60%, rgba(0,0,0,0.137) 79.63%, rgba(0,0,0,0.1011) 83.44%, rgba(0,0,0,0.0704) 87.20%, rgba(0,0,0,0.044) 91.10%, rgba(0,0,0,0.0208) 95.30%, rgba(0,0,0,0) 100.00%)",
                  }} />
                </div>
              </div>
              )}
              <div style={{
                position: "relative",
                backgroundColor: "rgb(0,0,0)",
                flexGrow: 1,
                alignSelf: "stretch",
              }} />
              {props.gradientTrailing && (
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
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
                  }}>{props.icon2 ?? <GradientResourceMaskBase />}</div>
              </div>
              )}
            </div>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: 24,
              alignItems: "center",
              flexWrap: "nowrap",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>
              {props.tab1 && (
              <div style={{
                  position: "relative",
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}>{props.icon3 ?? <TabResourceTab active={false} disabled={false} />}</div>
              )}
              {props.tab2 && (
              <div style={{
                  position: "relative",
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}>{props.icon4 ?? <TabResourceTab active={false} disabled={false} />}</div>
              )}
              {props.tab3 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab4 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab5 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab6 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab7 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab8 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
            </div>
          </div>
          {props.trailingIconButton && (
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
            <ButtonIconNormal
              style={{ position: "relative", height: 22, flexShrink: 0 }}
              disable={false}
            />
          </div>
          )}
        </div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 335,
          height: 48,
          borderTop: "1px solid rgba(112,115,124,0.08)",
          borderRight: "1px solid rgba(112,115,124,0.08)",
          borderBottom: "1px solid rgba(112,115,124,0.08)",
          borderLeft: "1px solid rgba(112,115,124,0.08)",
        }} />
      </div>
    </div>
  );
  const __body3 = () => (
    <div className={props.className} style={{
      width: 375,
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "nowrap",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            padding: "0px 20px 0px 20px",
            alignItems: "center",
            flexWrap: "nowrap",
            boxSizing: "border-box",
            flexGrow: 1,
            alignSelf: "stretch",
          }}>
            {props.trailingIconButton && (
            <div style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 375,
              height: 48,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "nowrap",
            }}>
              <div style={{
                position: "relative",
                backgroundColor: "rgb(0,0,0)",
                flexGrow: 1,
                alignSelf: "stretch",
              }} />
              {props.gradientTrailing && (
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
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
                  }}>{props.icon1 ?? <GradientResourceMaskBase />}</div>
                {props.trailingIconButton && (
                <div style={{
                  position: "relative",
                  width: 20,
                  flexShrink: 0,
                  alignSelf: "stretch",
                }} />
                )}
              </div>
              )}
            </div>
            )}
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: 24,
              alignItems: "center",
              flexWrap: "nowrap",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>
              {props.tab1 && (
              <div style={{
                  position: "relative",
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}>{props.icon2 ?? <TabResourceTab active={false} disabled={false} />}</div>
              )}
              {props.tab2 && (
              <div style={{
                  position: "relative",
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}>{props.icon3 ?? <TabResourceTab active={false} disabled={false} />}</div>
              )}
              {props.tab3 && (
              <div style={{
                  position: "relative",
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}>{props.icon4 ?? <TabResourceTab active={false} disabled={false} />}</div>
              )}
              {props.tab4 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab5 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab6 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab7 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab8 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
            </div>
          </div>
          {props.trailingIconButton && (
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            padding: "0px 16px 0px 0px",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "nowrap",
            boxSizing: "border-box",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>
            <ButtonIconNormal
              style={{ position: "relative", height: 22, flexShrink: 0 }}
              disable={false}
            />
          </div>
          )}
        </div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 375,
          height: 48,
          borderTop: "1px solid rgba(112,115,124,0.08)",
          borderRight: "1px solid rgba(112,115,124,0.08)",
          borderBottom: "1px solid rgba(112,115,124,0.08)",
          borderLeft: "1px solid rgba(112,115,124,0.08)",
        }} />
      </div>
    </div>
  );
  const __body4 = () => (
    <div className={props.className} style={{
      width: 335,
      overflow: "hidden",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "nowrap",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "nowrap",
            flexGrow: 1,
            alignSelf: "stretch",
          }}>
            <div style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 335,
              height: 40,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "nowrap",
            }}>
              {props.gradientLeading && (
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                flexWrap: "nowrap",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>
                <div style={{
                  position: "relative",
                  width: 48,
                  flexShrink: 0,
                  alignSelf: "stretch",
                }}>
                  <div style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    transform: "matrix(0,1,-1,0,48,0)",
                    transformOrigin: "0 0",
                    width: 40,
                    height: 48,
                    background: "linear-gradient(180deg, rgb(0,0,0) 0.00%, rgba(0,0,0,0.8578) 14.03%, rgba(0,0,0,0.7307) 26.24%, rgba(0,0,0,0.6176) 36.80%, rgba(0,0,0,0.5176) 45.90%, rgba(0,0,0,0.4296) 53.70%, rgba(0,0,0,0.3528) 60.40%, rgba(0,0,0,0.2861) 66.16%, rgba(0,0,0,0.2286) 71.17%, rgba(0,0,0,0.1792) 75.60%, rgba(0,0,0,0.137) 79.63%, rgba(0,0,0,0.1011) 83.44%, rgba(0,0,0,0.0704) 87.20%, rgba(0,0,0,0.044) 91.10%, rgba(0,0,0,0.0208) 95.30%, rgba(0,0,0,0) 100.00%)",
                  }} />
                </div>
              </div>
              )}
              <div style={{
                position: "relative",
                backgroundColor: "rgb(0,0,0)",
                flexGrow: 1,
                alignSelf: "stretch",
              }} />
              {props.gradientTrailing && (
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
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
                  }}>{props.icon2 ?? <GradientResourceMaskBase />}</div>
              </div>
              )}
            </div>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: 24,
              alignItems: "center",
              flexWrap: "nowrap",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>
              {props.tab1 && (
              <div style={{
                  position: "relative",
                  width: 40,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}>{props.icon3 ?? <TabResourceTab active={false} disabled={false} />}</div>
              )}
              {props.tab2 && (
              <div style={{
                  position: "relative",
                  width: 40,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}>{props.icon4 ?? <TabResourceTab active={false} disabled={false} />}</div>
              )}
              {props.tab3 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  width: 40,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab4 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  width: 40,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab5 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  width: 40,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab6 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  width: 40,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab7 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  width: 40,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab8 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  width: 40,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
            </div>
          </div>
          {props.trailingIconButton && (
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
            <ButtonIconNormal
              style={{
                position: "relative",
                height: 20,
                width: 20,
                flexShrink: 0,
              }}
              disable={false}
            />
          </div>
          )}
        </div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 335,
          height: 40,
          borderTop: "1px solid rgba(112,115,124,0.08)",
          borderRight: "1px solid rgba(112,115,124,0.08)",
          borderBottom: "1px solid rgba(112,115,124,0.08)",
          borderLeft: "1px solid rgba(112,115,124,0.08)",
        }} />
      </div>
    </div>
  );
  const __body5 = () => (
    <div className={props.className} style={{
      width: 375,
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "nowrap",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            padding: "0px 20px 0px 20px",
            alignItems: "center",
            flexWrap: "nowrap",
            boxSizing: "border-box",
            flexGrow: 1,
            alignSelf: "stretch",
          }}>
            {props.trailingIconButton && (
            <div style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 375,
              height: 40,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "nowrap",
            }}>
              <div style={{
                position: "relative",
                backgroundColor: "rgb(0,0,0)",
                flexGrow: 1,
                alignSelf: "stretch",
              }} />
              {props.gradientTrailing && (
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
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
                  }}>{props.icon1 ?? <GradientResourceMaskBase />}</div>
                {props.trailingIconButton && (
                <div style={{
                  position: "relative",
                  width: 20,
                  flexShrink: 0,
                  alignSelf: "stretch",
                }} />
                )}
              </div>
              )}
            </div>
            )}
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: 24,
              alignItems: "center",
              flexWrap: "nowrap",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>
              {props.tab1 && (
              <div style={{
                  position: "relative",
                  width: 40,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}>{props.icon2 ?? <TabResourceTab active={false} disabled={false} />}</div>
              )}
              {props.tab2 && (
              <div style={{
                  position: "relative",
                  width: 40,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}>{props.icon3 ?? <TabResourceTab active={false} disabled={false} />}</div>
              )}
              {props.tab3 && (
              <div style={{
                  position: "relative",
                  width: 40,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}>{props.icon4 ?? <TabResourceTab active={false} disabled={false} />}</div>
              )}
              {props.tab4 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  width: 40,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab5 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  width: 40,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab6 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  width: 40,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab7 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  width: 40,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab8 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  width: 40,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
            </div>
          </div>
          {props.trailingIconButton && (
          <div style={{
            position: "relative",
            width: 36,
            display: "flex",
            flexDirection: "row",
            padding: "0px 16px 0px 0px",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "nowrap",
            boxSizing: "border-box",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>
            <ButtonIconNormal
              style={{ position: "relative", height: 20, flexShrink: 0 }}
              disable={false}
            />
          </div>
          )}
        </div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 375,
          height: 40,
          borderTop: "1px solid rgba(112,115,124,0.08)",
          borderRight: "1px solid rgba(112,115,124,0.08)",
          borderBottom: "1px solid rgba(112,115,124,0.08)",
          borderLeft: "1px solid rgba(112,115,124,0.08)",
        }} />
      </div>
    </div>
  );
  const __body6 = () => (
    <div className={props.className} style={{
      width: 335,
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "nowrap",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "nowrap",
            flexGrow: 1,
            alignSelf: "stretch",
          }}>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "nowrap",
              flexGrow: 1,
              alignSelf: "stretch",
            }}>
              {props.tab1 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexGrow: 1,
                  alignSelf: "stretch",
                  width: "auto",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab2 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexGrow: 1,
                  alignSelf: "stretch",
                  width: "auto",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab3 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexGrow: 1,
                  alignSelf: "stretch",
                  width: "auto",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab4 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexGrow: 1,
                  alignSelf: "stretch",
                  width: "auto",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
            </div>
          </div>
        </div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 335,
          height: 56,
          borderTop: "1px solid rgba(112,115,124,0.08)",
          borderRight: "1px solid rgba(112,115,124,0.08)",
          borderBottom: "1px solid rgba(112,115,124,0.08)",
          borderLeft: "1px solid rgba(112,115,124,0.08)",
        }} />
      </div>
    </div>
  );
  const __body7 = () => (
    <div className={props.className} style={{
      width: 375,
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "nowrap",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "nowrap",
            flexGrow: 1,
            alignSelf: "stretch",
          }}>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "nowrap",
              flexGrow: 1,
              alignSelf: "stretch",
            }}>
              {props.tab1 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexGrow: 1,
                  alignSelf: "stretch",
                  width: "auto",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab2 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexGrow: 1,
                  alignSelf: "stretch",
                  width: "auto",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab3 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexGrow: 1,
                  alignSelf: "stretch",
                  width: "auto",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab4 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexGrow: 1,
                  alignSelf: "stretch",
                  width: "auto",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
            </div>
          </div>
        </div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 375,
          height: 56,
          borderTop: "1px solid rgba(112,115,124,0.08)",
          borderRight: "1px solid rgba(112,115,124,0.08)",
          borderBottom: "1px solid rgba(112,115,124,0.08)",
          borderLeft: "1px solid rgba(112,115,124,0.08)",
        }} />
      </div>
    </div>
  );
  const __body8 = () => (
    <div className={props.className} style={{
      width: 335,
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "nowrap",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "nowrap",
            flexGrow: 1,
            alignSelf: "stretch",
          }}>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "nowrap",
              flexGrow: 1,
              alignSelf: "stretch",
            }}>
              {props.tab1 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexGrow: 1,
                  alignSelf: "stretch",
                  width: "auto",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab2 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexGrow: 1,
                  alignSelf: "stretch",
                  width: "auto",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab3 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexGrow: 1,
                  alignSelf: "stretch",
                  width: "auto",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab4 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexGrow: 1,
                  alignSelf: "stretch",
                  width: "auto",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
            </div>
          </div>
        </div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 335,
          height: 48,
          borderTop: "1px solid rgba(112,115,124,0.08)",
          borderRight: "1px solid rgba(112,115,124,0.08)",
          borderBottom: "1px solid rgba(112,115,124,0.08)",
          borderLeft: "1px solid rgba(112,115,124,0.08)",
        }} />
      </div>
    </div>
  );
  const __body9 = () => (
    <div className={props.className} style={{
      width: 375,
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "nowrap",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "nowrap",
            flexGrow: 1,
            alignSelf: "stretch",
          }}>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "nowrap",
              flexGrow: 1,
              alignSelf: "stretch",
            }}>
              {props.tab1 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexGrow: 1,
                  alignSelf: "stretch",
                  width: "auto",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab2 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexGrow: 1,
                  alignSelf: "stretch",
                  width: "auto",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab3 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexGrow: 1,
                  alignSelf: "stretch",
                  width: "auto",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab4 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexGrow: 1,
                  alignSelf: "stretch",
                  width: "auto",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
            </div>
          </div>
        </div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 375,
          height: 48,
          borderTop: "1px solid rgba(112,115,124,0.08)",
          borderRight: "1px solid rgba(112,115,124,0.08)",
          borderBottom: "1px solid rgba(112,115,124,0.08)",
          borderLeft: "1px solid rgba(112,115,124,0.08)",
        }} />
      </div>
    </div>
  );
  const __body10 = () => (
    <div className={props.className} style={{
      width: 335,
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "nowrap",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "nowrap",
            flexGrow: 1,
            alignSelf: "stretch",
          }}>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "nowrap",
              flexGrow: 1,
              alignSelf: "stretch",
            }}>
              {props.tab1 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexGrow: 1,
                  alignSelf: "stretch",
                  width: "auto",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab2 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexGrow: 1,
                  alignSelf: "stretch",
                  width: "auto",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab3 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexGrow: 1,
                  alignSelf: "stretch",
                  width: "auto",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab4 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexGrow: 1,
                  alignSelf: "stretch",
                  width: "auto",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
            </div>
          </div>
        </div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 335,
          height: 40,
          borderTop: "1px solid rgba(112,115,124,0.08)",
          borderRight: "1px solid rgba(112,115,124,0.08)",
          borderBottom: "1px solid rgba(112,115,124,0.08)",
          borderLeft: "1px solid rgba(112,115,124,0.08)",
        }} />
      </div>
    </div>
  );
  const __body11 = () => (
    <div className={props.className} style={{
      width: 375,
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "nowrap",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "nowrap",
            flexGrow: 1,
            alignSelf: "stretch",
          }}>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "nowrap",
              flexGrow: 1,
              alignSelf: "stretch",
            }}>
              {props.tab1 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexGrow: 1,
                  alignSelf: "stretch",
                  width: "auto",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab2 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexGrow: 1,
                  alignSelf: "stretch",
                  width: "auto",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab3 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexGrow: 1,
                  alignSelf: "stretch",
                  width: "auto",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
              {props.tab4 && (
              <TabResourceTab
                style={{
                  position: "relative",
                  flexGrow: 1,
                  alignSelf: "stretch",
                  width: "auto",
                  height: "auto",
                }}
                active={false}
                disabled={false}
              />
              )}
            </div>
          </div>
        </div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 375,
          height: 40,
          borderTop: "1px solid rgba(112,115,124,0.08)",
          borderRight: "1px solid rgba(112,115,124,0.08)",
          borderBottom: "1px solid rgba(112,115,124,0.08)",
          borderLeft: "1px solid rgba(112,115,124,0.08)",
        }} />
      </div>
    </div>
  );
  const __impls = {
    // figma: Resize=Hug, Size=Large, Horizontal Padding=False
    "resize=hug|size=lg|horizontalPadding=false": __body0,
    // figma: Resize=Hug, Size=Large, Horizontal Padding=True
    "resize=hug|size=lg|horizontalPadding=true": __body1,
    // figma: Resize=Hug, Size=Medium, Horizontal Padding=False
    "resize=hug|size=md|horizontalPadding=false": __body2,
    // figma: Resize=Hug, Size=Medium, Horizontal Padding=True
    "resize=hug|size=md|horizontalPadding=true": __body3,
    // figma: Resize=Hug, Size=Small, Horizontal Padding=False
    "resize=hug|size=sm|horizontalPadding=false": __body4,
    // figma: Resize=Hug, Size=Small, Horizontal Padding=True
    "resize=hug|size=sm|horizontalPadding=true": __body5,
    // figma: Resize=Fill, Size=Large, Horizontal Padding=False
    "resize=fill|size=lg|horizontalPadding=false": __body6,
    // figma: Resize=Fill, Size=Large, Horizontal Padding=True
    "resize=fill|size=lg|horizontalPadding=true": __body7,
    // figma: Resize=Fill, Size=Medium, Horizontal Padding=False
    "resize=fill|size=md|horizontalPadding=false": __body8,
    // figma: Resize=Fill, Size=Medium, Horizontal Padding=True
    "resize=fill|size=md|horizontalPadding=true": __body9,
    // figma: Resize=Fill, Size=Small, Horizontal Padding=False
    "resize=fill|size=sm|horizontalPadding=false": __body10,
    // figma: Resize=Fill, Size=Small, Horizontal Padding=True
    "resize=fill|size=sm|horizontalPadding=true": __body11,
  };
  return (__impls[__vkey(props)] ?? __body4)();
}
export default TabTab;
