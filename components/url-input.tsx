"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function UrlInput() {
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddUrl = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim() || !isValidUrl(url)) return;

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5001/resources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to add URL");
      }

      const result = await response.json();
      console.log("Added:", result);

      setUrls([...urls, url]);
      setUrl("");
    } catch (err) {
      console.error("Error posting URL:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveUrl = (urlToRemove: string) => {
    setUrls(urls.filter((u) => u !== urlToRemove));
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  useEffect(() => {
    fetch("http://localhost:5001/resources")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUrls(data.map((item: { url: string }) => item.url));
      })
      .catch((error) => console.error("Error fetching URLs:", error));
  }, []);

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddUrl} className="flex gap-2">
        <Input
          type="url"
          placeholder="Enter article or documentation URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#8ab100]/50 focus:border-[#8ab100] transition-all shadow-[0_0_0px_rgba(138,177,0,0)] focus:shadow-[0_0_10px_rgba(138,177,0,0.2)]"
        />
        <Button
          type="submit"
          disabled={isLoading || !url.trim() || !isValidUrl(url)}
          className="bg-[#ff7700] hover:bg-[#ff8800] text-white font-medium"
        >
          {isLoading ? "Adding..." : "Add"}
          {!isLoading && <PlusCircle className="ml-2 h-4 w-4" />}
        </Button>
      </form>

      {urls.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Added Resources:
          </h3>
          <div className="flex flex-wrap gap-2">
            {urls.map((addedUrl, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                <span className="truncate max-w-[300px]">{addedUrl}</span>
                <button
                  onClick={() => handleRemoveUrl(addedUrl)}
                  className="text-gray-500 hover:text-[#8ab100]"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="text-sm text-gray-500 mt-2">
        Add articles, documentation, or other resources to build your knowledge
        base.
      </div>
    </div>
  );
}
