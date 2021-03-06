import React, { forwardRef } from "react"

import {
  container,
  dotLineInvert,
  dotLineStyle,
  dotLineTitle,
  dotLineSubTitle,
  dotLineContainer,
} from "./style"
import DotLine from "@/components/DotLine"

const Card = forwardRef(
  ({ src, alt, height, width, title, subTitle, innerRef, ...props }, ref) => (
    <div css={container} ref={ref || innerRef} {...props}>
      <img
        css={dotLineInvert}
        height={height}
        width={width}
        src={src}
        alt={alt}
      />
      <DotLine css={dotLineContainer} invert={false} />
      <div css={dotLineInvert}>
        <p css={theme => [dotLineStyle(theme), dotLineTitle]}>
          {title}
          <span css={theme => [dotLineStyle(theme), dotLineSubTitle]}>
            {" "}
            {subTitle}
          </span>
        </p>
      </div>
    </div>
  )
)

export default Card
