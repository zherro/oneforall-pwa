"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@supabaseutils/utils/client";
import Avatar from "@component/avatar";
import { Button } from "@component/buttons";
import Icon from "@component/icon/Icon";

export default function AvatarLoad({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string | null;
  url: string | null | undefined;
  size: number;
  onUpload: (url: string) => void;
}) {
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = useState<string | null | undefined>(url);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {avatarUrl ? (
        <Avatar
          size={size}
          src={avatarUrl}
          alt="Avatar"
          className="avatar image"
          style={{ height: size, width: size }}
        />
      ) : (
        <div
          className="avatar no-image"
          style={{
            height: size,
            width: size,
            backgroundColor: "#cdcdcd",
            borderRadius: "50%",
          }}
        />
      )}

      <div style={{ width: size }}>
        <label htmlFor="profile-image">
          <Button
            p="6px"
            as="span"
            width="36px"
            height="auto"
            bg="gray.300"
            color="secondary"
            borderRadius="50%"
          >
            <Icon>camera</Icon>
          </Button>
        </label>
      </div>

      <input
        style={{
          visibility: "hidden",
          position: "absolute",
        }}
        type="file"
        id="profile-image"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
      />

      {/* <div style={{ width: size }}>
        <label className="button primary block" htmlFor="single">
          {uploading ? 'Uploading ...' : 'Upload'}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div> */}
    </div>
  );
}
