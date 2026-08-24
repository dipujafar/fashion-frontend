"use client";

import React, { useState, useRef, useEffect } from "react";
import { PlusCircle, Search, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SelectDonationOption from "./SelectDonationOption";
import { IUser } from "@/types";

// ─── Charity Select ───────────────────────────────────────────────────────────

function CharitySelect({
  charities,
  value,
  onChange,
  selectedIds = [],
}: {
  charities: IUser[];
  value: string;
  onChange: (id: string) => void;
  selectedIds?: string[];
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const selected = charities.find((c) => c.id === value);

  // Exclude charities already selected in other rows; keep own value selectable
  const available = charities.filter(
    (c) => c.id === value || !selectedIds.includes(c.id)
  );

  const filtered = search.trim()
    ? available.filter((c) =>
      c.userName.toLowerCase().includes(search.toLowerCase())
    )
    : available;

  function openPanel() {
    setSearch("");
    setOpen(true);
  }

  function closePanel() {
    setOpen(false);
    setSearch("");
  }

  function handleSelect(charity: IUser) {
    onChange(charity.id);
    closePanel();
  }

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

  // ── Shared search bar ────────────────────────────────────────────────────

  const searchBar = (withRef = false) => (
    <div className="px-3 pt-3 pb-2 border-b border-border shrink-0">
      <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2.5">
        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        <input
          ref={withRef ? searchRef : undefined}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search charities..."
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

  // ── Shared list ──────────────────────────────────────────────────────────

  const listContent = (
    <div className="overflow-y-auto" style={{ maxHeight: "320px" }}>
      {filtered.length === 0 ? (
        <p className="text-base text-muted-foreground text-center py-10">
          No charity found
        </p>
      ) : (
        filtered.map((charity) => {
          const isSelected = value === charity.id;
          return (
            <div
              key={charity.id}
              onClick={() => handleSelect(charity)}
              className={`flex items-center justify-between px-4 py-3.5 cursor-pointer hover:bg-muted/60 transition-colors border-b border-border/40 last:border-0 ${isSelected ? "bg-muted" : ""
                }`}
            >
              <span className="text-base text-foreground">{charity.fname} {charity.lname}</span>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ml-2 ${isSelected ? "border-primary" : "border-muted-foreground/40"
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

  return (
    <div className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={openPanel}
        className="flex items-center justify-between w-full bg-[#f2f2f2] rounded-md px-3 md:py-3 py-2 text-base text-left focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <span className={selected ? "text-foreground" : "text-muted-foreground"}>
          {selected ? selected.userName : "Select charity"}
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
            <div className="absolute inset-0 bg-black/50" />
            <div
              className="relative w-full max-w-sm bg-background rounded-2xl shadow-2xl flex flex-col overflow-hidden"
              style={{ maxHeight: "80dvh" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
                <div className="w-7" />
                <span className="font-semibold text-base text-foreground">
                  Select Charity
                </span>
                <button
                  type="button"
                  onClick={closePanel}
                  className="p-1 rounded hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              {searchBar()}
              {listContent}
            </div>
          </div>

          {/* ── DESKTOP: dropdown ── */}
          <div
            ref={panelRef}
            className="hidden md:flex md:flex-col absolute z-50 mt-1 w-full bg-background border border-border rounded-xl shadow-lg overflow-hidden"
          >
            {searchBar(true)}
            {listContent}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function InputCharityDonationInput({
  form,
  fields,
  append,
  remove,
  charities,
}: {
  form: any;
  fields: any[];
  append: (value: any) => void;
  remove: (index: number) => void;
  charities: IUser[];
}) {
  return (
    <>
      {fields.map((field: any, index: number) => (
        <div key={field.id} className="flex flex-row gap-x-3 items-center">

          {/* Charity Select */}
          <FormField
            control={form.control}
            name={`donations.${index}.donateToCharity`}
            render={({ field }) => {
              // Collect all selected charity IDs across all rows
              const allSelected: string[] = form
                .getValues("charities")
                ?.map((c: any) => c.donateToCharity)
                .filter(Boolean) ?? [];

              return (
                <FormItem className="w-full">
                  <FormLabel className="flex ">
                    Donate to charity
                    
                  </FormLabel>
                  <FormControl>
                    <CharitySelect
                      charities={charities}
                      value={field.value}
                      onChange={field.onChange}
                      selectedIds={allSelected}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* Donation Percent */}
          {index > 0 && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="self-end -translate-y-1 cursor-pointer"
              onClick={() => remove(index)}
            >
              ✕
            </Button>
          )}

        </div>
      ))}

      <Button
        type="button"
        variant="secondary"
        onClick={() => append({ donateToCharity: "" })}
        className="font-medium rounded-none border-b-2 border-r-2 border-black cursor-pointer mt-3"
      >
        <PlusCircle /> Add More
      </Button>
    </>
  );
}