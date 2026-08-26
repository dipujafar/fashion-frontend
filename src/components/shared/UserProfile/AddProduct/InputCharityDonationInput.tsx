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
import { IUser } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      c.fname.toLowerCase().includes(search.toLowerCase()) ||
      c.lname.toLowerCase().includes(search.toLowerCase()) ||
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
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded px-2 py-2 focus-within:border-primary-black">
        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        <input
          ref={withRef ? searchRef : undefined}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search charities..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
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
              className={`flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-muted/60 transition-colors border-b border-border/40 last:border-0 ${isSelected ? "bg-muted" : ""
                }`}
            >
              <div className="flex flex-row gap-x-2 items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={charity.picture?.url} className='bg-card object-cover ring-4 ring-card' />
                  <AvatarFallback className='text-sm capitalize font-medium'>{charity.fname.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <span className="text-base text-foreground">{charity.fname} {charity.lname}</span>
              </div>
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
        className="flex items-center justify-between w-full rounded px-3 md:py-2.5 py-2 text-sm text-left focus:outline-none border border-gray-200 focus:border-primary-black cursor-pointer"
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
              className="relative w-full max-w-sm bg-background shadow-2xl flex flex-col overflow-hidden"
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
            className="hidden md:flex md:flex-col absolute z-50 mt-1 w-full bg-background border border-border shadow-lg overflow-hidden"
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
                    Charity
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
              variant="default"
              size="icon"
              className="cursor-pointer bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/30 rounded"
              onClick={() => remove(index)}
            >
              ✕
            </Button>
          )}

        </div>
      ))}

      <div className="col-span-1 lg:col-span-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => append({ donateToCharity: "" })}
          className="border-primary-black w-auto rounded cursor-pointer"
        >
          <PlusCircle /> Add More
        </Button>
      </div>
    </>
  );
}