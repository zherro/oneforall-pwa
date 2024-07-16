import { Span } from "@component/Typography";
// STYLED COMPONENTS
import { BadgeContainer, StyledBadge } from "./styles";
import { CSSProperties } from "styled-components";

// ==========================================================
interface Props {
  title: string | number;
  children?: string | number;
  color?: string;
  bg?: string;
  style?: CSSProperties;
}
// ==========================================================

export default function Badge({ title, children, style, color, bg }: Props) {
  return (
    <BadgeContainer style={style}>
      {title && children && (
        <Span marginLeft="5px" className="nav-link">
          {children}
        </Span>
      )}

      <StyledBadge
        style={{
          color: color || "#e94560",
          background: bg || "#ffe1e6",
        }}
      >
        {title}
      </StyledBadge>
    </BadgeContainer>
  );
}
