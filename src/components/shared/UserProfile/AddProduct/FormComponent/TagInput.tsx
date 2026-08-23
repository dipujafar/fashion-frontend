"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export function TagInput({ value, onChange, placeholder }: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const addTag = () => {
    const newTag = inputValue.trim();
    if (newTag && !value.includes(newTag)) {
      onChange([...value, newTag]);
    }
    setInputValue("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 py-0.5 px-3 bg-white border border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base">
      {value.map((tag, i) => (
        <span
          key={i}
          className="flex items-center bg-black text-white px-2 py-0.5 rounded-full gap-1 text-sm"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="text-white/80  hover:text-red-500 duration-500 cursor-pointer"
          >
            <X size={14} />
          </button>
        </span>
      ))}

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-sm py-2 min-w-[120px]"
      />
    </div>
  );
}
