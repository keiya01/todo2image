const getCenterPosition = (position: number, pageOffset: number, clientRect: number, clientSize: number = 0) => {
  const relativePosition = position - (clientRect + pageOffset);
  return Math.floor(clientSize === 0 ? relativePosition - (clientSize / 2) : relativePosition);
}

const getClickPosition = ($canvas: HTMLCanvasElement, position: { x: number, y: number }) => {
  const { clientHeight, getBoundingClientRect } = $canvas;
  const { top, left } = getBoundingClientRect.call($canvas);
  const { pageXOffset, pageYOffset } = window;
  const x = getCenterPosition(position.x, pageXOffset, left);
  const y = getCenterPosition(position.y, pageYOffset, top, clientHeight);
  return {
    x,
    y,
  }
}

const drawCircle = ($canvas: HTMLCanvasElement, clickPosition: { x: number, y: number }, size: number = 5) => () => {
  const ctx = $canvas.getContext("2d");
  if (!ctx) {
    return;
  }
  
  const { clientWidth, clientHeight } = $canvas
  ctx.clearRect(0, 0, clientWidth, clientHeight);
  const animationSize = clientWidth * 1.5;
  if (size > animationSize) {
    return;
  }
  
  ctx.beginPath();
  ctx.arc(clickPosition.x, clickPosition.y, size, 0, 2 * Math.PI);
  ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
  ctx.fill();

  if (size > (animationSize / 20)) {
    requestAnimationFrame(drawCircle($canvas, clickPosition, size + 30));
    return;
  }

  requestAnimationFrame(drawCircle($canvas, clickPosition, size + 5));
}

export const clickCircleAnimation = ($canvas: HTMLCanvasElement | null, position: { x: number, y: number }) => {
  if (!$canvas) {
    return;
  }
  
  const clickPosition = getClickPosition($canvas, position);
  requestAnimationFrame(drawCircle($canvas, clickPosition));
}