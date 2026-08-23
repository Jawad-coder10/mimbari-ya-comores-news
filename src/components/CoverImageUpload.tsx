import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";

const ACCEPTED = ["image/jpeg", "image/png"];
const MAX_SIZE = 5 * 1024 * 1024;
const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

export function CoverImageUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    if (!ACCEPTED.includes(file.type)) {
      toast.error("Format non supporté : choisissez un fichier JPEG ou PNG.");
      return;
    }
    if (file.size > MAX_SIZE) {
      toast.error("Image trop lourde (5 Mo maximum).");
      return;
    }
    setUploading(true);
    try {
      const ext = file.type === "image/png" ? "png" : "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("article-images")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (upErr) throw upErr;

      const { data, error } = await supabase.storage
        .from("article-images")
        .createSignedUrl(path, TEN_YEARS);
      if (error || !data?.signedUrl) throw error ?? new Error("Lien indisponible");

      const url = new URL(data.signedUrl, window.location.origin).toString();
      onChange(url);
      toast.success("Image téléversée");
    } catch (err: any) {
      toast.error(err?.message ?? "Échec du téléversement");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      {value && (
        <div className="relative">
          <img
            src={value}
            alt="Aperçu de l'image de couverture"
            className="w-full aspect-[4/3] object-cover border border-border"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Retirer l'image"
            className="absolute top-2 right-2 bg-background/90 border border-border p-1 hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleFile(f);
        }}
      />
      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="w-full border border-input bg-background px-3 py-2 text-sm flex items-center justify-center gap-2 hover:border-primary disabled:opacity-50"
      >
        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        {value ? "Remplacer l'image" : "Choisir une image (JPEG / PNG)"}
      </button>
    </div>
  );
}
