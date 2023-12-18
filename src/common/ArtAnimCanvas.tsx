import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface ArtAnimProps {
  className?: string;
  colors: {
    from: [number, number, number];
    to: [number, number, number];
  };
  strength?: number;
  bumps?: number;
  radFactor?: number;
  speed?: number;
  radSize?: number;
  wavesCount?: number;
  pulsate?: boolean;
}

export default function ArtAnimCanvas(props: ArtAnimProps) {
  const [flag, setFlag] = useState(false);

  const canvasRef = useRef() as React.MutableRefObject<HTMLCanvasElement>;

  useEffect(() => {
    if (!flag) {
      setFlag(true);
      canvasApp();
    }
  }, []);

  function canvasApp() {
    var displayCanvas = canvasRef.current;

    displayCanvas.width = displayCanvas.offsetWidth;
    displayCanvas.height = displayCanvas.offsetHeight;

    var context = displayCanvas.getContext("2d") as CanvasRenderingContext2D;
    var displayWidth = displayCanvas.width;
    var displayHeight = displayCanvas.height;

    var exportCanvas = document.createElement("canvas");
    exportCanvas.width = displayWidth;
    exportCanvas.height = displayHeight;

    var numCircles: number;
    var maxMaxRad: number;
    var minMaxRad: number;
    var minRadFactor: number;
    var iterations: number;
    var numPoints: number;
    var timer: NodeJS.Timeout | null;
    var drawsPerFrame: number;
    var lineWidth: number;
    var colorArray: string[];
    var minX: number, maxX: number, minY: number, maxY: number;
    var lineNumber: number;
    var twistAmount: number;
    var fullTurn: number;
    var lineAlpha: number;
    var stepsPerSegment: number;
    var maxR: number, minR: number;
    var circles: {
      centerX: number;
      centerY: number;
      maxRad: number;
      minRad: number;
      phase: number;
      pointArray: any[];
    }[] = [];

    init();

    function init() {
      numCircles = props.bumps || 15; //35
      maxMaxRad = props.radSize || 200;
      minMaxRad = props.radSize || 200;
      minRadFactor = props.radFactor || 0;
      iterations = props.strength || 10;
      numPoints = props.wavesCount || Math.pow(2, iterations) + 1;
      drawsPerFrame = props.speed || 4;

      fullTurn = (Math.PI * 2 * numPoints) / (1 + numPoints);

      minX = -maxMaxRad;
      maxX = displayWidth + maxMaxRad;
      minY = displayHeight / 2 - 50;
      maxY = displayHeight / 2 + 50;

      twistAmount = 0.67 * Math.PI * 2;

      stepsPerSegment = Math.floor(800 / numCircles);

      lineAlpha = 0.1;

      lineWidth = 1.01;

      startGenerate();
    }

    function startGenerate() {
      context.setTransform(1, 0, 0, 1, 0, 0);

      context.clearRect(0, 0, displayWidth, displayHeight);

      setCircles();

      colorArray = setColorList(iterations);

      lineNumber = 0;

      if (timer) {
        clearInterval(timer);
      }
      timer = setInterval(onTimer, 1000 / 60);
    }

    function setColorList(iter: number) {
      var r0, g0, b0;
      var r1, g1, b1;
      var param;
      var colorArray;
      var i, len;

      r0 = props.colors.from[0];
      g0 = props.colors.from[1];
      b0 = props.colors.from[2];

      r1 = props.colors.to[0];
      g1 = props.colors.to[1];
      b1 = props.colors.to[2];

      var a = lineAlpha;

      var colorParamArray = setLinePoints(iter);
      colorArray = [];

      len = colorParamArray.length;

      for (i = 0; i < len; i++) {
        param = colorParamArray[i];

        let r = Math.floor(r0 + param * (r1 - r0));
        let g = Math.floor(g0 + param * (g1 - g0));
        let b = Math.floor(b0 + param * (b1 - b0));

        var newColor = "rgba(" + r + "," + g + "," + b + "," + a + ")";
        // var newColor = "#003344";

        colorArray.push(newColor);
      }

      return colorArray;
    }

    function setCircles() {
      var i;

      for (i = 0; i < numCircles; i++) {
        maxR = minMaxRad + Math.random() * (maxMaxRad - minMaxRad);
        minR = minRadFactor * maxR;

        var newCircle = {
          centerX: minX + (i / (numCircles - 1)) * (maxX - minX),
          centerY: minY + (i / (numCircles - 1)) * (maxY - minY),
          maxRad: maxR,
          minRad: minR,
          phase: (i / (numCircles - 1)) * twistAmount,
          pointArray: setLinePoints(iterations),
        };
        circles.push(newCircle);
      }
    }

    function onTimer() {
      var i;
      var theta;

      var numCircles = circles.length;

      var linParam;
      var cosParam;
      var centerX, centerY;
      var xSqueeze = 0.75;
      var x0, y0;
      var rad, rad0, rad1;
      var phase, phase0, phase1;

      for (var k = 0; k < drawsPerFrame; k++) {
        theta = (lineNumber / (numPoints - 1)) * fullTurn;

        context.globalCompositeOperation = "lighter";

        context.lineJoin = "miter";

        context.strokeStyle = colorArray[lineNumber];
        context.lineWidth = lineWidth;
        context.beginPath();

        centerX = circles[0].centerX;
        centerY = circles[0].centerY;
        rad =
          circles[0].minRad +
          circles[0].pointArray[lineNumber] *
            (circles[0].maxRad - circles[0].minRad);
        phase = circles[0].phase;
        x0 = centerX + xSqueeze * rad * Math.cos(theta + phase);
        y0 = centerY + rad * Math.sin(theta + phase);
        context.moveTo(x0, y0);

        for (i = 0; i < numCircles - 1; i++) {
          rad0 =
            circles[i].minRad +
            circles[i].pointArray[lineNumber] *
              (circles[i].maxRad - circles[i].minRad);
          rad1 =
            circles[i + 1].minRad +
            circles[i + 1].pointArray[lineNumber] *
              (circles[i + 1].maxRad - circles[i + 1].minRad);
          phase0 = circles[i].phase;
          phase1 = circles[i + 1].phase;

          for (let j = 0; j < stepsPerSegment; j++) {
            linParam = j / (stepsPerSegment - 1);
            cosParam = 0.5 - 0.5 * Math.cos(linParam * Math.PI);

            centerX =
              circles[i].centerX +
              linParam * (circles[i + 1].centerX - circles[i].centerX);
            centerY =
              circles[i].centerY +
              cosParam * (circles[i + 1].centerY - circles[i].centerY);

            rad = rad0 + cosParam * (rad1 - rad0);

            phase = phase0 + cosParam * (phase1 - phase0);

            x0 = centerX + xSqueeze * rad * Math.cos(theta + phase);
            y0 = centerY + rad * Math.sin(theta + phase);

            context.lineTo(x0, y0);
          }
        }

        context.stroke();

        lineNumber++;
        if (lineNumber > numPoints - 1) {
          clearInterval(timer as any);
          timer = null;
          break;
        }
      }
    }

    function setLinePoints(iterations: any) {
      var pointList: any = {};
      var pointArray = [];
      pointList.first = { x: 0, y: 1 };
      var lastPoint = { x: 1, y: 1 };
      var minY = 1;
      var maxY = 1;
      var point;
      var nextPoint: any;
      var dx, newX, newY;

      pointList.first.next = lastPoint;
      for (var i = 0; i < iterations; i++) {
        point = pointList.first;
        while (point.next != null) {
          nextPoint = point.next;

          dx = nextPoint.x - point.x;
          newX = 0.5 * (point.x + nextPoint.x);
          newY = 0.5 * (point.y + nextPoint.y);
          newY += dx * (Math.random() * 2 - 1);

          var newPoint: any = { x: newX, y: newY };

          if (newY < minY) {
            minY = newY;
          } else if (newY > maxY) {
            maxY = newY;
          }

          newPoint.next = nextPoint;
          point.next = newPoint;

          point = nextPoint;
        }
      }

      if (maxY != minY) {
        var normalizeRate = 1 / (maxY - minY);
        point = pointList.first;
        while (point != null) {
          point.y = normalizeRate * (point.y - minY);
          pointArray.push(point.y);
          point = point.next;
        }
      } else {
        point = pointList.first;
        while (point != null) {
          point.y = 1;
          pointArray.push(point.y);
          point = point.next;
        }
      }

      return pointArray;
    }
  }

  return (
    <canvas ref={canvasRef} className={twMerge("relative", props.className)} />
  );
}
