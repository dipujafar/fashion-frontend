"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ImageEditor,
  createBuiltinTools,
  ICONS,
  button,
  h,
  selectors,
  ToolDefinition,
  ToolContext,
} from "@jodit/image-editor";

interface ImageEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: Blob | File | null;
  onSave: (blob: Blob) => void;
}

export default function ImageEditorModal({
  isOpen,
  onClose,
  image,
  onSave,
}: ImageEditorModalProps) {
  // Container is kept in STATE (not a ref) so the effect re-runs once the
  // Radix portal has actually mounted the element.
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const editorRef = useRef<ImageEditor | null>(null);

  // Keep latest callbacks in refs so effect does not re-trigger on parent re-renders
  const onSaveRef = useRef(onSave);
  onSaveRef.current = onSave;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen || !image || !container) return;

    // Clean up any existing editor instance
    if (editorRef.current) {
      try {
        editorRef.current.destroy();
      } catch (err) {
        console.error("Error destroying previous editor instance:", err);
      }
      editorRef.current = null;
    }

    // Ensure container is empty
    container.innerHTML = "";

    // Builtin tools: Crop, Rotate & Resize only
    const builtinTools = createBuiltinTools();
    const resizeTool = builtinTools.find((tool) => tool.id === "resize");

    const cropRotateTool: ToolDefinition = {
      id: "adjust",
      label: "Crop & Rotate",
      icon: ICONS.crop,
      order: 0,
      defaultTool: "crop",
      renderPanel({ state, update, t }: ToolContext) {
        const design = selectors.selectDesign(state);
        const cropping = selectors.selectIsCropping(state);

        return h("div", { class: "jie-toolrow" }, [
          button({
            label: t ? t("Crop") : "Crop",
            icon: ICONS.crop,
            active: cropping,
            onClick: () =>
              update({
                activeTab: "adjust",
                activeTool: cropping ? null : "crop",
              }),
          }),
          button({
            label: t ? t("Rotate") : "Rotate",
            icon: ICONS.rotate,
            onClick: () =>
              update({
                design: { rotate: design.rotate + 90 },
              }),
          }),
        ]);
      },
    };

    const tools: ToolDefinition[] = [cropRotateTool];
    if (resizeTool) {
      tools.push(resizeTool);
    }

    const editor = new ImageEditor({
      container,
      state: {
        theme: "light",
        activeTab: "adjust",
        activeTool: "crop",
      },
      tools,
      onSave: (blob) => {
        onSaveRef.current(blob);
        onCloseRef.current();
      },
      onSaveAs: (blob) => {
        onSaveRef.current(blob);
        onCloseRef.current();
      },
    });

    editorRef.current = editor;

    // Helper to synchronize canvas viewport when modal layout finishes
    const syncViewport = () => {
      if (!editorRef.current) return;
      const wrap =
        container.querySelector<HTMLElement>("[data-jie-canvas-wrap]") ||
        container.querySelector<HTMLElement>(".jie-canvas-wrap");
      if (wrap && wrap.clientWidth > 0 && wrap.clientHeight > 0) {
        const cur = editorRef.current.state.viewport;
        if (
          !cur ||
          cur.width !== wrap.clientWidth ||
          cur.height !== wrap.clientHeight
        ) {
          editorRef.current.update({
            viewport: { width: wrap.clientWidth, height: wrap.clientHeight },
          });
        }
      }
    };

    // Load the image blob explicitly and ensure canvas receives valid viewport dimensions
    editor
      .fromBlob(image)
      .then(() => {
        syncViewport();
        requestAnimationFrame(syncViewport);
      })
      .catch((err) => {
        console.error("Failed to load image in @jodit/image-editor:", err);
      });

    // Observer to re-sync viewport when modal or container resizes
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        syncViewport();
      });
      ro.observe(container);
    }

    window.addEventListener("resize", syncViewport);

    // Staggered timers to catch post-animation layout changes
    const t1 = setTimeout(syncViewport, 60);
    const t2 = setTimeout(syncViewport, 180);
    const t3 = setTimeout(syncViewport, 350);

    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", syncViewport);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (editorRef.current) {
        try {
          editorRef.current.destroy();
        } catch (err) {
          console.error("Error destroying editor on cleanup:", err);
        }
        editorRef.current = null;
      }
    };
  }, [isOpen, image, container]);

  const handleManualSave = async () => {
    if (!editorRef.current) return;
    try {
      const blob = await editorRef.current.toBlob({
        type: "image/jpeg",
        quality: 0.92,
      });
      if (blob) {
        onSaveRef.current(blob);
        onCloseRef.current();
      }
    } catch (err) {
      console.error("Failed to export image from editor", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 gap-0 rounded-none max-w-4xl md:min-w-xl lg:min-w-2xl overflow-hidden bg-white border border-gray-200 shadow-2xl">
        {/* Custom Black & White Theme Styles for Jodit Image Editor */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .jodit-bw-wrapper {
            --jie-accent: #000000 !important;
            --jie-accent-soft: #f4f4f5 !important;
            --jie-bg: #ffffff !important;
            --jie-surface: #ffffff !important;
            --jie-stage: #f4f4f5 !important;
            --jie-border: #e4e4e7 !important;
            --jie-text: #09090b !important;
            --jie-text-dim: #71717a !important;
            --jie-control-h: 36px !important;
            --jie-radius: 4px !important;
            --jie-radius-sm: 2px !important;
            font-family: inherit !important;
          }

          .jodit-bw-wrapper .jie {
            background: #ffffff !important;
            color: #09090b !important;
            height: 100% !important;
            width: 100% !important;
            border-radius: 0 !important;
            display: flex !important;
            flex-direction: column !important;
          }

          .jodit-bw-wrapper .jie-topbar {
            background: #ffffff !important;
            border-bottom: 1px solid #e4e4e7 !important;
            padding: 8px 16px !important;
          }

          .jodit-bw-wrapper .jie-topbar__save .jie-btn:nth-child(2) {
            display: none !important;
          }

          .jodit-bw-wrapper .jie-body {
            display: flex !important;
            flex: 1 !important;
            min-height: 0 !important;
          }

          .jodit-bw-wrapper .jie-rail {
            background: #ffffff !important;
            border-right: 1px solid #e4e4e7 !important;
          }

          .jodit-bw-wrapper .jie-tab {
            color: #71717a !important;
            border-radius: 0 !important;
            transition: all 0.15s ease !important;
          }

          .jodit-bw-wrapper .jie-tab:hover {
            color: #09090b !important;
            background: #f4f4f5 !important;
          }

          .jodit-bw-wrapper .jie-tab[aria-selected="true"] {
            color: #000000 !important;
            background: #f4f4f5 !important;
            font-weight: 600 !important;
            border-left: 3px solid #000000 !important;
          }

          .jodit-bw-wrapper .jie-stage {
            background: #f4f4f5 !important;
            display: flex !important;
            flex: 1 !important;
            flex-direction: column !important;
            min-width: 0 !important;
            min-height: 0 !important;
          }

          .jodit-bw-wrapper .jie-canvas-wrap {
            position: relative !important;
            flex: 1 !important;
            min-height: 250px !important;
            margin: 16px !important;
            border-radius: 4px !important;
            background: #f4f4f5 !important;
            overflow: hidden !important;
          }

          .jodit-bw-wrapper .jie-canvas {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            display: block !important;
          }

          .jodit-bw-wrapper .jie-panel {
            background: #ffffff !important;
            border-top: 1px solid #e4e4e7 !important;
            padding: 10px 16px !important;
          }

          .jodit-bw-wrapper .jie-btn--primary {
            background-color: #000000 !important;
            color: #ffffff !important;
            border: 1px solid #000000 !important;
            font-weight: 600 !important;
            border-radius: 0 !important;
          }

          .jodit-bw-wrapper .jie-btn--primary:hover:not(:disabled) {
            background-color: #27272a !important;
            border-color: #27272a !important;
          }

          .jodit-bw-wrapper .jie-btn--active {
            background-color: #000000 !important;
            color: #ffffff !important;
            border-color: #000000 !important;
          }

          .jodit-bw-wrapper .jie-btn {
            border-radius: 0 !important;
            border-color: #e4e4e7 !important;
            cursor: pointer !important;
          }

          .jodit-bw-wrapper .jie-btn:hover:not(:disabled):not(.jie-btn--primary):not(.jie-btn--active) {
            background-color: #f4f4f5 !important;
            color: #000000 !important;
          }

          .jodit-bw-wrapper .jie-input {
            border: 1px solid #e4e4e7 !important;
            border-radius: 0 !important;
            background: #ffffff !important;
            color: #09090b !important;
          }

          .jodit-bw-wrapper .jie-input:focus {
            border-color: #000000 !important;
            outline: 2px solid rgba(0, 0, 0, 0.1) !important;
          }

          .jodit-bw-wrapper .jie-crop {
            border: 2px solid #000000 !important;
          }

          .jodit-bw-wrapper .jie-crop__handle {
            background-color: #000000 !important;
            border: 2px solid #ffffff !important;
          }

          .jodit-bw-wrapper .jie-crop__rotate {
            background-color: #000000 !important;
            color: #ffffff !important;
          }

          .jodit-bw-wrapper .jie-zoom {
            color: #09090b !important;
            font-weight: 500 !important;
          }
        `,
          }}
        />

        {/* Modal Header */}
        <DialogHeader className="p-4 border-b border-gray-200 flex flex-row items-center justify-between">
          <DialogTitle className="text-base font-semibold text-gray-900 tracking-tight">
            Photo Editor
          </DialogTitle>
        </DialogHeader>

        {/* Editor Mount Container */}
        <div className="jodit-bw-wrapper relative w-full h-[520px] md:h-[600px] bg-white">
          <div ref={setContainer} className="w-full h-full flex flex-col" />
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-white border-t border-gray-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 cursor-pointer duration-150"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleManualSave}
            className="px-5 py-2 text-sm font-medium text-white bg-black hover:bg-zinc-800 cursor-pointer duration-150"
          >
            Save & Apply
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}