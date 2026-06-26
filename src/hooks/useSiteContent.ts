import { useEffect, useState } from "react";
import { defaultContent, type SiteContent } from "@/lib/site-content";

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(() => setContent(defaultContent))
      .finally(() => setLoading(false));
  }, []);

  return { content, loading };
}
