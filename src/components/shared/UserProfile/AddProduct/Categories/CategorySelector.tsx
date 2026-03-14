"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronRight, ArrowLeft, Search, X, ChevronDown } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  parentId: string | null;
  children: Category[];
}

interface CategorySelectorProps {
  categories: Category[];
  onSelect: (category: Category) => void;
  value?: Category | null;
  placeholder?: string;
}

interface FlatCategory extends Category {
  breadcrumb: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function flattenCategories(
  cats: Category[],
  ancestors: string[] = [],
  acc: FlatCategory[] = []
): FlatCategory[] {
  for (const cat of cats) {
    const path = [...ancestors, cat.name];
    acc.push({ ...cat, breadcrumb: path.join(" > ") });
    if (cat.children?.length) flattenCategories(cat.children, path, acc);
  }
  return acc;
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CategorySelector({
  categories,
  onSelect,
  value,
  placeholder = "Select category",
}: CategorySelectorProps) {
  const [open, setOpen] = useState(false);

  // Shared navigation & search state — lives here so both mobile/desktop use same instance
  const [stack, setStack] = useState<Category[]>([]);
  const [search, setSearch] = useState("");

  const searchRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const currentLevel: Category[] =
    stack.length === 0 ? categories : stack[stack.length - 1].children;

  const allFlat = flattenCategories(categories);
  const searchResults: FlatCategory[] = search.trim()
    ? allFlat.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Reset state when opening
  function openPanel() {
    setStack([]);
    setSearch("");
    setOpen(true);
  }

  function closePanel() {
    setOpen(false);
    setSearch("");
    setStack([]);
  }

  function handleSelect(cat: Category) {
    onSelect(cat);
    closePanel();
  }

  function drillInto(cat: Category) {
    setStack((s) => [...s, cat]);
    setSearch("");
  }

  function goBack() {
    setStack((s) => s.slice(0, -1));
    setSearch("");
  }

  // Focus search on open
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 80);
  }, [open]);

  // Close desktop dropdown on outside click (skip on mobile)
  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (window.innerWidth < 768) return;
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        closePanel();
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  const title =
    stack.length === 0 ? "Category" : stack[stack.length - 1].name;

  // ── Shared inner content ──────────────────────────────────────────────────

  const innerContent = (isMobile: boolean) => (
    <div className="flex flex-col h-full">

      {/* Mobile header */}
      {isMobile && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
          {stack.length > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="p-1 rounded hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-7" />
          )}
          <span className="font-semibold text-base text-foreground">{title}</span>
          <button
            type="button"
            onClick={closePanel}
            className="p-1 rounded hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      )}

      {/* Search bar */}
      <div className="px-3 pt-3 pb-2 border-b border-border shrink-0">
        <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2.5">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            ref={isMobile ? undefined : searchRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find a category"
            className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
          {search && (
            <button type="button" onClick={() => setSearch("")}>
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Desktop back/title */}
      {!isMobile && !search && (
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border shrink-0">
          {stack.length > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="p-1 rounded hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <span className="font-semibold text-base text-foreground">{title}</span>
        </div>
      )}

      {/* List */}
      <div className="overflow-y-auto" style={{ maxHeight: "320px" }}>
        {search ? (
          searchResults.length === 0 ? (
            <p className="text-base text-muted-foreground text-center py-10">
              No categories found
            </p>
          ) : (
            searchResults.map((cat) => (
              <SearchResultRow
                key={cat.id + cat.breadcrumb}
                cat={cat}
                isSelected={value?.id === cat.id}
                onSelect={() => handleSelect(cat)}
                onDrill={cat.children?.length ? () => drillInto(cat) : undefined}
              />
            ))
          )
        ) : (
          currentLevel.map((cat) => (
            <DrillRow
              key={cat.id}
              cat={cat}
              isSelected={value?.id === cat.id}
              onSelect={() => handleSelect(cat)}
              onDrill={cat.children?.length ? () => drillInto(cat) : undefined}
            />
          ))
        )}
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={openPanel}
        className="flex items-center justify-between w-full bg-[#f2f2f2] rounded-md px-3 md:py-3 py-2 text-sm text-left focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {value ? value.name : placeholder}
        </span>
        <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
      </button>

      {open && (
        <>
          {/* ── MOBILE: centered dialog ── */}
          <div
            className="md:hidden fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Backdrop — no onClick, does nothing */}
            <div className="absolute inset-0 bg-black/50" />
            {/* Dialog box — centered */}
            <div
              className="relative w-full max-w-sm bg-background rounded-2xl shadow-2xl flex flex-col overflow-hidden"
              style={{ maxHeight: "80dvh" }}
              onClick={(e) => e.stopPropagation()}
            >
              {innerContent(true)}
            </div>
          </div>

          {/* ── DESKTOP: dropdown ── */}
          <div
            ref={panelRef}
            className="hidden md:flex md:flex-col absolute z-50 mt-1 w-full min-w-[300px] bg-background border border-border rounded-xl shadow-lg overflow-hidden"
            style={{ maxHeight: 440 }}
          >
            {innerContent(false)}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Drill row ────────────────────────────────────────────────────────────────

interface DrillRowProps {
  cat: Category;
  isSelected: boolean;
  onSelect: () => void;
  onDrill?: () => void;
}

function DrillRow({ cat, isSelected, onSelect, onDrill }: DrillRowProps) {
  const hasChildren = !!onDrill;

  return (
    <div
      onClick={() => (hasChildren ? onDrill?.() : onSelect())}
      className={`flex items-center justify-between px-4 py-3.5 cursor-pointer hover:bg-muted/60 transition-colors border-b border-border/40 last:border-0 ${
        isSelected ? "bg-muted" : ""
      }`}
    >
      <span className="flex-1  text-foreground">{cat.name}</span>
      <div className="shrink-0 ml-2">
        {hasChildren ? (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        ) : (
          <RadioCircle selected={isSelected} />
        )}
      </div>
    </div>
  );
}

// ─── Search result row ────────────────────────────────────────────────────────

interface SearchResultRowProps {
  cat: FlatCategory;
  isSelected: boolean;
  onSelect: () => void;
  onDrill?: () => void;
}

function SearchResultRow({ cat, isSelected, onSelect, onDrill }: SearchResultRowProps) {
  const hasChildren = !!onDrill;
  const parts = cat.breadcrumb.split(" > ");
  const parentPath = parts.slice(0, -1).join(" > ");

  return (
    <div
      onClick={() => (hasChildren ? onDrill?.() : onSelect())}
      className={`flex items-center justify-between px-4 py-3.5 cursor-pointer hover:bg-muted/60 transition-colors border-b border-border/40 last:border-0 ${
        isSelected ? "bg-muted" : ""
      }`}
    >
      <div className="flex-1 min-w-0 pr-3">
        <p className="font-medium  text-foreground leading-tight">
          {cat.name}
        </p>
        {parentPath && (
          <p className="text-sm text-muted-foreground mt-0.5 truncate">
            {parentPath}
          </p>
        )}
      </div>
      <div className="shrink-0">
        {hasChildren ? (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        ) : (
          <RadioCircle selected={isSelected} />
        )}
      </div>
    </div>
  );
}

// ─── Radio circle ─────────────────────────────────────────────────────────────

function RadioCircle({ selected }: { selected: boolean }) {
  return (
    <div
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
        selected ? "border-primary" : "border-muted-foreground/40"
      }`}
    >
      {selected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
    </div>
  );
}