"use client";

import { Component, type ReactNode } from "react";

/* Error boundary for the WebGL scenes. On devices/webviews without WebGL the
   R3F Canvas throws during render — uncontained, that crashes the WHOLE app
   and the visitor sees a near-blank page. Contained, they just lose the 3D. */
export default class SafeMount extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
