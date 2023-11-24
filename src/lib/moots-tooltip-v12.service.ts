import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import {
  autoUpdate,
  computePosition,
  offset,
  Placement,
  shift,
} from "@floating-ui/dom";
import { ArrowsService } from "./arrows.service";
import { DIRECTION } from "arrows-svg";
import { IArrow } from "arrows-svg/types/interfaces/IArrow";

interface TooltipData {
  parent: HTMLElement;
  text: HTMLElement;
  arrow: IArrow;
}

interface ArrowsDirection {
  start: string;
  end: string;
}
@Injectable({
  providedIn: "root",
})
export class MootsTooltipService {
  private renderer: Renderer2;

  private tooltips = new Set<TooltipData>();

  private arrowsDirection = new Map<Placement, ArrowsDirection>();

  constructor(
    private rendererFactory: RendererFactory2,
    private arrowService: ArrowsService
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.arrowsDirection.set("top-end", {
      start: DIRECTION.RIGHT,
      end: DIRECTION.TOP,
    });
    this.arrowsDirection.set("top-start", {
      start: DIRECTION.LEFT,
      end: DIRECTION.TOP,
    });
    this.arrowsDirection.set("top", {
      start: DIRECTION.BOTTOM,
      end: DIRECTION.TOP,
    });
    this.arrowsDirection.set("bottom-end", {
      start: DIRECTION.LEFT,
      end: DIRECTION.BOTTOM,
    });
    this.arrowsDirection.set("bottom-start", {
      start: DIRECTION.RIGHT,
      end: DIRECTION.BOTTOM,
    });
    this.arrowsDirection.set("bottom", {
      start: DIRECTION.TOP,
      end: DIRECTION.BOTTOM,
    });
    this.arrowsDirection.set("left-start", {
      start: DIRECTION.RIGHT,
      end: DIRECTION.BOTTOM,
    });
    this.arrowsDirection.set("left-end", {
      start: DIRECTION.RIGHT,
      end: DIRECTION.TOP,
    });
    this.arrowsDirection.set("left", {
      start: DIRECTION.RIGHT,
      end: DIRECTION.LEFT,
    });
    this.arrowsDirection.set("right-end", {
      start: DIRECTION.LEFT,
      end: DIRECTION.TOP,
    });
    this.arrowsDirection.set("right-start", {
      start: DIRECTION.LEFT,
      end: DIRECTION.BOTTOM,
    });
    this.arrowsDirection.set("right", {
      start: DIRECTION.LEFT,
      end: DIRECTION.RIGHT,
    });
  }

  addTooltip(
    targetId: string,
    text: string,
    textPlacement: Placement = "top",
    parentId?: string
  ) {
    const parentNode: HTMLElement | null = parentId
      ? (document.querySelector(`#${parentId}`)?.parentElement as HTMLElement)
      : (document.querySelector(`#${targetId}`)?.parentElement
          ?.parentElement as HTMLElement);

    const targetNode: HTMLElement | null = document.querySelector(
      `#${targetId}`
    );

    const tooltip: HTMLElement = this.renderer.createElement("div");
    this.renderer.addClass(tooltip, "tooltip");
    tooltip.textContent = text;

    if (!parentNode || !targetNode) {
      console.log("Parent or target node not found");
      throw new Error("Parent or target node not found");
    }
    setTimeout(() => {
      autoUpdate(
        targetNode,
        tooltip,
        () => {
          computePosition(targetNode, tooltip, {
            placement: textPlacement,
            middleware: [
              offset(({ rects, placement }) => ({
                mainAxis:
                  placement.split("-")[0] === "bottom" ||
                  placement.split("-")[0] === "top"
                    ? rects.reference.width >= 0.5 * window.innerWidth
                      ? Math.min(
                          0.5 * rects.reference.width,
                          0.35 * window.innerHeight
                        )
                      : Math.min(0.35 * window.innerWidth, 250)
                    : rects.reference.width,
                alignmentAxis:
                  placement.split("-")[0] === "top"
                    ? 0.65 * rects.reference.width
                    : placement.split("-")[0] === "bottom"
                    ? rects.floating.width < 0.5 * rects.reference.width
                      ? (0.5 * rects.reference.width - rects.floating.width) / 2
                      : 0.25 * rects.reference.width - rects.floating.width
                    : placement.split("-")[0] === "left" ||
                      placement.split("-")[0] === "right"
                    ? rects.reference.height
                    : 0,
              })),
              shift({ padding: 5 }),
            ],
          }).then(({ x, y }) => {
            Object.assign(tooltip.style, {
              left: `${x}px`,
              top: `${y}px`,
            });
          });
        },
        {
          elementResize: false,
        }
      );
      this.renderer.appendChild(parentNode, tooltip);

      setTimeout(() => {
        const arrowD = this.arrowsDirection.get(textPlacement);
        if (!arrowD) {
          console.log("Arrow direction not found");
          throw new Error("Arrow direction not found");
        }

        const arrowT = this.arrowService.addArrow(
          tooltip,
          targetNode,
          arrowD.start,
          arrowD.end
        );

        this.renderer.appendChild(parentNode, arrowT.node);
        this.tooltips.add({
          parent: parentNode,
          text: tooltip,
          arrow: arrowT,
        });
      }, 5);
    }, 10);
  }

  clearAll() {
    this.tooltips.forEach((toolTip) => {
      this.renderer.removeChild(toolTip.parent, toolTip.text);
      toolTip.arrow.clear();
    });
    this.tooltips.clear();
  }
}
