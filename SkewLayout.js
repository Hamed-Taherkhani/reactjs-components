import { useEffect, useRef } from "react";

export default function SkewLayout({ skewAmount, transitionDuration }) {
  const SKEW_DOMAIN = 6 || skewAmount * 2;
  const element = useRef();
  const skewYValue = useRef(0);
  const skewXValue = useRef(0);
  const stepAmountX = useRef();
  const stepAmountY = useRef();

  useEffect(() => {
    calculateStepAmount();
  }, []);

  const calculateStepAmount = () => {
    const rect = element.current.getBoundingClientRect();
    stepAmountX.current = SKEW_DOMAIN / rect.width;
    stepAmountY.current = SKEW_DOMAIN / rect.height;
  };

  const handleMouseMoving = (e) => {
    const element = e.target;
    const elementRect = element.getBoundingClientRect();
    const x = e.clientX - elementRect.left;
    const y = e.clientY - elementRect.top;

    skewYValue.current = -(y * stepAmountY.current - SKEW_DOMAIN / 2);
    skewXValue.current = -(x * stepAmountX.current - SKEW_DOMAIN / 2);
    element.style.transform = `skewY(${skewYValue.current}deg) skewX(${skewXValue.current}deg)`;
  };

  const handleMouseLeaving = () => {
    element.current.style.transform = "skewY(0) skewX(0)";
  };

  return (
    <div
      ref={element}
      onMouseMove={handleMouseMoving}
      onMouseLeave={handleMouseLeaving}
      style={{
        transition: "200ms" || `${transitionDuration}ms`,
      }}
    ></div>
  );
}
