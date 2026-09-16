"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useSearchKeywordsQuery, useSearchPeoplesQuery } from "@/redux/api/productApi";
import { userRoleMapper } from "@/utils/userRoleMapper";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function GlobalItemAndMemberSearch() {

  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";

  const [query, setQuery] = React.useState(search);
  const { data } = useSearchKeywordsQuery({ query }, { skip: !query });
  const { data: peopleData } = useSearchPeoplesQuery({ query }, { skip: !query });

  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close on outside click — no Radix, just a manual listener.
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape.
  React.useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  React.useEffect(() => {
    if (search) {
      setQuery(search);
    }
  }, [search]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger / input */}
      <div className="relative w-full">
        <Search
          color="#808080"
          size={20}
          className="absolute top-1/2 -translate-y-1/2 left-2"
        />
        <Input
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
          }}
          onFocus={() => setOpen(true)}
          className="bg-zinc-50 focus:outline-0 shadow-none focus-visible:ring-0 w-full px-4 rounded-none md:rounded-sm pl-8 pr-8 py-5"
          placeholder="Search here for items or members"
        />

      </div>

      {/* Custom dropdown — plain absolutely-positioned div, width locked to parent */}
      {open && query && (
        <div className="absolute left-0 top-full mt-1 w-full bg-white border shadow-xl z-50 max-h-[70vh] min-h-96 overflow-y-auto p-6 space-y-5">

          <p className="w-full text-left text-gray-600">
            Suggestions for "{query}"
          </p>

          <div className="space-y-3 flex flex-col">
            {data?.data?.map((s) => (
              <HighlightMatch key={s?.displayName} text={s?.displayName} query={query} setOpen={setOpen} />
            ))}
          </div>

          {
            peopleData?.data && peopleData?.data?.length > 0 && (
              <>
                <p className="w-full text-left text-gray-600">
                  People also search for "{query}"
                </p>

                <div className="space-y-3 flex flex-col">
                  {peopleData?.data?.map((p) => (
                    <Link onClick={() => setOpen(false)} key={p?.userName} href={`/member/${p?.userName}`}>

                      <div className="flex flex-row gap-x-2 items-center ">

                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={p?.profilePictureUrl}
                            alt={p.userName}
                          />
                          <AvatarFallback>
                            {p?.userName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <p className="text-sm font-semibold text-primary-black">
                            @{p?.userName}
                          </p>

                          <p className="text-sm text-gray-600">
                            {userRoleMapper(p?.role)?.label}
                          </p>
                        </div>

                      </div>

                    </Link>
                  ))}
                </div>
              </>
            )
          }

        </div>
      )}
    </div>
  );
}

function HighlightMatch({ text, query, setOpen }: { text: string; query: string, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  if (!query || !text.toLowerCase().startsWith(query.toLowerCase())) {
    return <Link
      onClick={() => setOpen(false)}
      href={`/shop?search=${encodeURIComponent(text)}`}
      className="w-full"
    >
      {/* want to highligt prefix of the result that matches the query */}
      {text}
    </Link>
  }

  const matched = text.slice(0, query.length);
  const rest = text.slice(query.length);

  return (
    <Link
      href={`/shop?search=${encodeURIComponent(text)}`}
      className="w-full"
      onClick={() => setOpen(false)}
    >
      <span className="font-semibold text-zinc-900">{matched}</span>
      <span>{rest}</span>
    </Link>
  );
}