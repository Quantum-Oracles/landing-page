import React, { useEffect, useState } from "react";

export default function useRect(element: React.MutableRefObject<HTMLElement>) {
  const [rect, setRect] = useState<DOMRect>();

  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (!flag) {
      setRect(element.current.getBoundingClientRect());
      setFlag(true);
    }
  }, [flag]);

  return rect;
}
