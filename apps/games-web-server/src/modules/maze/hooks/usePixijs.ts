import * as PIXI from "pixi.js";
import { Application } from "pixi.js";
import { useEffect, useRef, useState } from "react";

export const usePixijs = (props?: Partial<PIXI.IApplicationOptions>) => {
  const viewRef = useRef(null);

  const app = useRef<Application>(null);

  useEffect(() => {
    if (!viewRef.current) {
      return;
    }

    app.current = new PIXI.Application(props);

    viewRef.current.appendChild(app.current.view);

    return () => {
      app.current.destroy(true);
    };
  }, [viewRef]);

  return { viewRef, app: app };
};
