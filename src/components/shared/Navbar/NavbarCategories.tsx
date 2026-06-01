"use client";
import * as React from "react";
import { ChevronRight, ChevronDown, X, Menu, Grid3X3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUpdateSearchParamsWithRedirect } from "@/hooks/useUpdateSearchParamsWithRedirct";
import { useGetCategoryQuery } from "@/redux/api/categoryApi";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Category {
  id: string;
  name: string;
  parentId: string | null;
  children: Category[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const COLLAPSE_THRESHOLD = 6;

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Leaf item – no children */
function LeafItem({
  item,
  onSelect,
}: {
  item: Category;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      onClick={() => onSelect(item.id)}
      className={cn(
        "w-full text-left px-3 py-2 cursor-pointer rounded transition-colors  text-gray-600 hover:text-black hover:bg-gray-50 hover:font-medium text-base",
      )}
    >
      {item.name}
    </button>
  );
}

/**
 * Renders a list of leaf children with a "See X more / See less" toggle
 * when the count exceeds COLLAPSE_THRESHOLD.
 */
function CollapsibleLeafList({
  items,
  onSelect,
}: {
  items: Category[];
  onSelect: (id: string) => void;
}) {

  return (
    <div className={`grid grid-cols-2 max-w-xl`}>
      {items.map((item) => (
        <LeafItem
          key={item.id}
          item={item}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

/** Mobile accordion item — collapses children list beyond COLLAPSE_THRESHOLD */
function MobileAccordionItem({
  item,
  depth,
  onSelect,
}: {
  item: Category;
  depth: number;
  onSelect: (id: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [childrenExpanded, setChildrenExpanded] = React.useState(false);
  const canShowChildren = depth < 1;
  const hasChildren = canShowChildren && item.children.length > 0;
  const needsCollapse = hasChildren && item.children.length > COLLAPSE_THRESHOLD;
  const visibleChildren =
    needsCollapse && !childrenExpanded
      ? item.children.slice(0, COLLAPSE_THRESHOLD)
      : item.children;
  const hiddenCount = item.children.length - COLLAPSE_THRESHOLD;

  return (
    <div>
      <div
        className={cn(
          "flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors",
          depth === 0 ? "font-semibold text-sm" : "text-sm",
          "hover:bg-gray-100"
        )}
        style={{ paddingLeft: `${(depth + 1) * 12}px` }}
        onClick={() => {
          if (hasChildren) {
            setOpen((p) => !p);
          } else {
            onSelect(item.id);
          }
        }}
      >
        <span>{item.name}</span>
        {hasChildren && (
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform flex-shrink-0",
              open && "rotate-180"
            )}
          />
        )}
      </div>

      {hasChildren && open && (
        <div className="mt-0.5 space-y-0.5">
          {visibleChildren.map((child) => (
            <MobileAccordionItem
              key={child.id}
              item={child}
              depth={depth + 1}
              onSelect={onSelect}
            />
          ))}
          {needsCollapse && (
            <button
              onClick={() => setChildrenExpanded((p) => !p)}
              style={{ paddingLeft: `${(depth + 2) * 12}px` }}
              className="flex items-center gap-1 py-2 text-xs font-medium text-gray-400 hover:text-black transition-colors w-full"
            >
              {childrenExpanded ? (
                <>
                  <ChevronDown className="h-3 w-3 rotate-180 flex-shrink-0" />
                  See less
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3 flex-shrink-0" />
                  See {hiddenCount} more
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MegaNavigation() {
  const { data: categoryData } = useGetCategoryQuery(undefined);
  const categories: Category[] = categoryData?.data ?? [];

  const updateParams = useUpdateSearchParamsWithRedirect();

  // Desktop state
  const [activeRootId, setActiveRootId] = React.useState<string | null>(null);
  const [hoveredL2Id, setHoveredL2Id] = React.useState<string | null>(null);

  // Mobile state
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileRootId, setMobileRootId] = React.useState<string | null>(null);

  const navRef = React.useRef<HTMLDivElement>(null);

  // Active root node
  const activeRoot = activeRootId
    ? categories.find((c) => c.id === activeRootId) ?? null
    : null;

  // The L2 subcategory whose children to show on the right panel
  const activeL2: Category | null = React.useMemo(() => {
    if (!activeRoot) return null;
    if (hoveredL2Id) {
      return activeRoot.children.find((c) => c.id === hoveredL2Id) ?? null;
    }
    // default: first child with grandchildren, or just first child
    return (
      activeRoot.children.find((c) => c.children.length > 0) ??
      activeRoot.children[0] ??
      null
    );
  }, [activeRoot, hoveredL2Id]);

  // Navigate – set last selected id in search params
  const handleSelect = React.useCallback(
    (id: string) => {
      updateParams({
        path: "/shop",
        params: { category: id },
      });
      setActiveRootId(null);
      setHoveredL2Id(null);
      setMobileOpen(false);
      setMobileRootId(null);
    },
    [updateParams]
  );

  const handleNavLeave = () => {
    setActiveRootId(null);
    setHoveredL2Id(null);
  };

  // Mobile root node
  const mobileRoot = mobileRootId
    ? categories.find((c) => c.id === mobileRootId) ?? null
    : null;

  return (
    <>
      {/* ── Desktop Nav ─────────────────────────────────────────────────────── */}
      <div
        ref={navRef}
        className="hidden md:block relative border-y "
        onMouseLeave={handleNavLeave}
      >
        {/* Top bar */}
        <nav className="bg-white border-b border-gray-200">
          <div className="flex justify-center px-6">
            <div className="flex items-center overflow-x-auto scrollbar-hide">
              {categories.map((root) => (
                <button
                  key={root.id}
                  onMouseEnter={() => {
                    setActiveRootId(root.id);
                    setHoveredL2Id(null);
                  }}
                  onClick={() => {
                    if (root.children.length === 0) {
                      handleSelect(root.id);
                    } else {
                      setActiveRootId((p) =>
                        p === root.id ? null : root.id
                      );
                      setHoveredL2Id(null);
                    }
                  }}
                  className={cn(
                    "relative px-4 py-3 text-base font-semibold whitespace-nowrap transition-colors cursor-pointer flex-shrink-0",
                    activeRootId === root.id
                      ? "text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black"
                      : "text-gray-600 hover:text-black"
                  )}
                >
                  {root.name}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Dropdown panel */}
        {activeRoot && activeRoot.children.length > 0 && (
          <div className="absolute left-0 top-full z-50 w-full bg-white shadow-xl border-t border-gray-100">
            <div className="max-w-6xl mx-auto flex">
              {/* L2 sidebar */}
              <div className="w-56 border-r border-gray-100 bg-gray-50/60 py-4">
                {/* "All" option */}
                <button
                  onClick={() => handleSelect(activeRoot.id)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-base font-semibold text-gray-500 hover:text-black hover:bg-white transition-colors"
                >
                  <Grid3X3 className="h-4 w-4" />
                  <span>All</span>
                </button>

                <div className="mt-1 space-y-0.5 px-2">
                  {activeRoot.children.map((l2) => {
                    const isActive =
                      hoveredL2Id === l2.id ||
                      (!hoveredL2Id && activeL2?.id === l2.id);
                    return (
                      <div
                        key={l2.id}
                        onMouseEnter={() => setHoveredL2Id(l2.id)}
                        onClick={() => {
                          if (l2.children.length === 0) {
                            handleSelect(l2.id);
                          }
                          // if has children, just keep it expanded
                        }}
                        className={cn(
                          "flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors text-base",
                          isActive
                            ? "bg-white shadow-sm text-black font-semibold"
                            : "text-gray-600 hover:bg-white hover:text-black"
                        )}
                      >
                        <span>{l2.name}</span>
                        {l2.children.length > 0 && (
                          <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 opacity-50" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* L3/L4 content panel */}
              <div className="flex-1 p-6">
                {activeL2 && activeL2.children.length > 0 ? (
                  <div>
                    {/* L2 name as section header, clickable */}
                    <button
                      onClick={() => handleSelect(activeL2.id)}
                      className="text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-black mb-4 block transition-colors"
                    >
                      {activeL2.name}
                    </button>

                    <CollapsibleLeafList
                      items={activeL2.children}
                      onSelect={handleSelect}
                    />

                    {/* {activeL2.children.every((c) => c.children.length === 0) ? (
                      // All L3s are leaves — render as a single collapsible flat list
                      <CollapsibleLeafList
                        items={activeL2.children}
                        onSelect={handleSelect}
                        selectedId={selectedId}
                      />
                    ) : (
                      // L3s have their own children — grid of collapsible groups
                      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-1 items-start">
                        {activeL2.children.map((l3) =>
                          l3.children.length > 0 ? (
                            <div key={l3.id} className="mb-4">
                              <button
                                onClick={() => handleSelect(l3.id)}
                                className="text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-black mb-1.5 block transition-colors"
                              >
                                {l3.name}
                              </button>
                              <CollapsibleLeafList
                                items={l3.children}
                                onSelect={handleSelect}
                                selectedId={selectedId}
                              />
                            </div>
                          ) : (
                            <LeafItem
                              key={l3.id}
                              item={l3}
                              onSelect={handleSelect}
                              isSelected={selectedId === l3.id}
                            />
                          )
                        )}
                      </div>
                    )} */}

                  </div>
                ) : (
                  activeL2 && (
                    <div className="flex items-start pt-2">
                      <button
                        onClick={() => handleSelect(activeL2.id)}
                        className="text-sm text-gray-600 hover:text-black underline underline-offset-2 transition-colors"
                      >
                        Browse all {activeL2.name}
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Mobile Nav ──────────────────────────────────────────────────────── */}
      <div className="md:hidden">
        {/* Horizontal scroll pill tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex items-center gap-1 px-3 py-2 overflow-x-auto scrollbar-hide">
            {categories.map((root) => (
              <button
                key={root.id}
                onClick={() => {
                  if (root.children.length === 0) {
                    handleSelect(root.id);
                  } else {
                    setMobileRootId((p) => (p === root.id ? null : root.id));
                    setMobileOpen(true);
                  }
                }}
                className={cn(
                  "flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap border",
                  mobileRootId === root.id && mobileOpen
                    ? "bg-black text-white border-black"
                    : "text-gray-700 border-gray-200 hover:border-gray-400"
                )}
              >
                {root.name}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile dropdown sheet */}
        {mobileOpen && mobileRoot && (
          <div className="fixed inset-0 z-50 flex flex-col bg-white">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <span className="font-semibold text-base">{mobileRoot.name}</span>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setMobileRootId(null);
                }}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              {/* "All" root option */}
              <button
                onClick={() => handleSelect(mobileRoot.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 border-b border-gray-100"
              >
                <Grid3X3 className="h-4 w-4" />
                All {mobileRoot.name}
              </button>

              <div className="p-3 space-y-1">
                {mobileRoot.children.map((child) => (
                  <MobileAccordionItem
                    key={child.id}
                    item={child}
                    depth={0}
                    onSelect={handleSelect}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}