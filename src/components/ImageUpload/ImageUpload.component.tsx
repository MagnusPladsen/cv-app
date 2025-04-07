import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { CircleAlert, ImageUp, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn, formatBytes } from "@/lib/utils";
import { Tooltip } from "@/components/Tooltip/Tooltip.component";
import { useFormContext } from "react-hook-form";

export default function ImageUpload({
  name,
  label,
  optional,
  modalInfo,
  className,
  imgHeight,
  imgWidth,
  maxSize,
}: {
  name: string;
  label?: string;
  optional?: boolean;
  modalInfo?: string;
  className?: string;
  imgHeight: number;
  imgWidth: number;
  maxSize?: number;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const sizeLimit = maxSize ?? 10486760;
  const sizeLimitInMB = formatBytes(sizeLimit);

  const { watch, setValue } = useFormContext();
  const formValue = watch(name);

  useEffect(() => {
    if (formValue) {
      setPreviewUrl(formValue);
    }
  }, [formValue]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const isImageValid = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Filformat støttes ikke");
      return false;
    }
    if (file.size > sizeLimit) {
      setError(`Filstørrelsen overskrider ${sizeLimitInMB}`);
      return false;
    }
    setError(null);
    return true;
  };

  const handleFile = (file: File) => {
    if (!isImageValid(file)) return;
    const url = URL.createObjectURL(file);
    setValue(name, url);
    setFile(file);
    setPreviewUrl(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const selectedFile = e.target.files[0];
    handleFile(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selectedFile = e.dataTransfer.files[0];
      handleFile(selectedFile);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setValue(name, null);
  };

  return (
    <div className={cn(`flex flex-col gap-2 w-[${imgWidth}px]`, className)}>
      {label && (
        <div className="relative flex gap-1">
          <div className="flex items-center gap-3">
            <div className="flex gap-2 items-center">
              <label className="font-bold text-lg" htmlFor={name}>
                {label}
              </label>
              {optional && <p className={"text-xs "}>(valgfri)</p>}
            </div>
            {modalInfo && (
              <Tooltip className="max-w-72" content={modalInfo}>
                <Info
                  width={22}
                  height={22}
                  color="#0083B2"
                  className="cursor-pointer"
                />
              </Tooltip>
            )}
          </div>
        </div>
      )}
      {!file && !previewUrl && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer ${isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
            }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-3 rounded-full bg-primary/10">
              <ImageUp className="h-6 w-6 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">
                <span className="text-primary">Drag and drop</span> or click the
                icon
              </p>
              <p className="text-xs text-muted mt-1">
                SVG, PNG, JPG or GIF (max {sizeLimitInMB})
              </p>
            </div>
          </div>
        </div>
      )}
      <Input
        id={name}
        name={name}
        ref={fileInputRef}
        type="file"
        className={cn("hidden", { "border-red-600": !!error })}
        onChange={handleFileChange}
        accept="image/*"
      />
      {(file || previewUrl) && (
        <div
          style={{
            width: imgWidth,
            height: imgHeight,
          }}
          className={cn(
            "relative rounded-lg overflow-hidden",
            `w-[${imgWidth}px]`,
          )}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Image
            src={formValue ?? file}
            alt="Preview"
            className={cn(`h-[${imgHeight}px] object-cover rounded-lg`)}
            width={imgWidth}
            height={imgHeight}
            unoptimized
          />

          {isHovering && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity">
              <div className="absolute top-3 right-3">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 rounded-full bg-white/90 hover:bg-white"
                  onClick={removeFile}
                >
                  <X className="h-4 w-4 text-black" />
                </Button>
              </div>
              {imgWidth > 100 && (
                <Button
                  variant="secondary"
                  className="bg-white/90 hover:bg-white text-black"
                  onClick={handleClick}
                >
                  Endre bilde
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="text-red-500 -mt-2 flex gap-2 items-center">
          <CircleAlert className="w-4 h-4" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
