"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronRight, Search, X, Check, ChevronDown } from "lucide-react";
import { Control, Controller } from "react-hook-form";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BrandOption {
    id: string;
    name: string;
    order: number;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
}

interface BrandSelectorProps {
    /** Brands array from API */
    brands: BrandOption[];
    /** react-hook-form control */
    control: Control<any>;
    /** Field name in your form schema */
    name: string;
    /** If null, field is disabled and shows tooltip */
    selectedCategory: { id: string; name: string } | null;
    placeholder?: string;
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function BrandSelector({
    brands,
    control,
    name,
    selectedCategory,
    placeholder = "Select brand",
}: BrandSelectorProps) {
    const isDisabled = !selectedCategory;

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1">
                    <BrandSelectorInner
                        brands={brands}
                        value={field.value}
                        onChange={field.onChange}
                        isDisabled={isDisabled}
                        placeholder={placeholder}
                    />
                    {fieldState.error && (
                        <p className="text-sm text-destructive">{fieldState.error.message}</p>
                    )}
                </div>
            )}
        />
    );
}

// ─── Inner selector (handles open/close, search, modal) ──────────────────────

interface BrandSelectorInnerProps {
    brands: BrandOption[];
    value: string | undefined;
    onChange: (id: string) => void;
    isDisabled: boolean;
    placeholder: string;
}

function BrandSelectorInner({
    brands,
    value,
    onChange,
    isDisabled,
    placeholder,
}: BrandSelectorInnerProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [showTooltip, setShowTooltip] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const selectedBrand = brands.find((s) => s.id === value);

    const filtered = search.trim()
        ? brands.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
        : brands;

    function openPanel() {
        if (isDisabled) return;
        setSearch("");
        setOpen(true);
    }

    function closePanel() {
        setOpen(false);
        setSearch("");
    }

    function handleSelect(brand: BrandOption) {
        onChange(brand.id);
        closePanel();
    }

    // Focus search on open
    useEffect(() => {
        if (open) setTimeout(() => searchRef.current?.focus(), 80);
    }, [open]);

    // Close desktop dropdown on outside click
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

    // ── Shared list content ──────────────────────────────────────────────────

    const listContent = (
        <div className="overflow-y-auto" style={{ maxHeight: "320px" }}>
            {filtered.length === 0 ? (
                <p className="text-base text-muted-foreground text-center py-10">
                    No brands found
                </p>
            ) : (
                filtered.map((brand) => {
                    const isSelected = value === brand.id;
                    return (
                        <div
                            key={brand.id}
                            onClick={() => handleSelect(brand)}
                            className={`flex items-center justify-between px-4 py-3.5 cursor-pointer hover:bg-muted/60 transition-colors border-b border-border/40 last:border-0 ${isSelected ? "bg-muted" : ""
                                }`}
                        >
                            <span className="text-lg text-foreground">{brand.name}</span>
                            <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? "border-primary" : "border-muted-foreground/40"
                                    }`}
                            >
                                {isSelected && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                                )}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );

    const searchBar = (
        <div className="px-3 pt-3 pb-2 border-b border-border shrink-0">
            <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2.5">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                    ref={searchRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search brand..."
                    className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
                />
                {search && (
                    <button type="button" onClick={() => setSearch("")}>
                        <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div ref={wrapperRef} className="relative w-full">
            {/* Tooltip wrapper */}
            <div
                className="relative"
                onMouseEnter={() => isDisabled && setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                {/* Trigger button */}
                <button
                    type="button"
                    onClick={openPanel}
                    disabled={isDisabled}
                    className={`flex items-center justify-between w-full bg-[#f2f2f2] rounded-md px-3 md:py-3 py-2 text-sm text-left focus:outline-none focus:ring-2 focus:ring-ring transition-opacity ${isDisabled ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    <span className={selectedBrand ? "text-foreground" : "text-muted-foreground"}>
                        {selectedBrand ? selectedBrand.name : placeholder}
                    </span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                </button>

                {/* Tooltip */}
                {isDisabled && showTooltip && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none">
                        <div className="bg-foreground text-background text-xs rounded-md px-3 py-1.5 whitespace-nowrap shadow-lg">
                            Please select a category first
                        </div>
                        {/* Arrow */}
                        <div className="w-2 h-2 bg-foreground rotate-45 mx-auto -mt-1" />
                    </div>
                )}
            </div>

            {open && (
                <>
                    {/* ── MOBILE: centered modal ── */}
                    <div
                        className="md:hidden fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="absolute inset-0 bg-black/50" />
                        <div
                            className="relative w-full max-w-sm bg-background rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                            style={{ maxHeight: "80dvh" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal header */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
                                <div className="w-7" />
                                <span className="font-semibold text-base text-foreground">Brand</span>
                                <button
                                    type="button"
                                    onClick={closePanel}
                                    className="p-1 rounded hover:bg-muted transition-colors"
                                >
                                    <X className="w-5 h-5 text-muted-foreground" />
                                </button>
                            </div>
                            {searchBar}
                            {listContent}
                        </div>
                    </div>

                    {/* ── DESKTOP: dropdown ── */}
                    <div
                        ref={panelRef}
                        className="hidden md:flex md:flex-col absolute z-50 mt-1 w-full min-w-[200px] bg-background border border-border rounded-xl shadow-lg overflow-hidden"
                    >
                        {searchBar}
                        {listContent}
                    </div>
                </>
            )}
        </div>
    );
}