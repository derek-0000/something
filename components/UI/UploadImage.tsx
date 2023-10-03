"use client";
import { ChangeEvent } from "react";
const IconPack = require("../../public/icons/Icons");
const Icons = new IconPack();

interface UploadImageProps {
  imageNumber: number;
  image?: string;
  onFileChange: (file: File | null, imageNumber: number ) => void;
}

const UploadImage: React.FC<UploadImageProps> = ({
  imageNumber,
  onFileChange,
  image,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    onFileChange(file || null, imageNumber);
  };

  return (
    <label htmlFor={"ProfilePictureUpload" + imageNumber}>
      <label
        htmlFor={"ProfilePictureUpload" + imageNumber}
        className={"w-full items-center justify-center flex flex-col h-full text-breta-blue text-sm font-semibold leading-6 rounded-lg cursor-pointer  overflow-hidden" + (image ? "" : " border-2 border-breta-gray border-dashed bg-breta-light-gray")}
      >
          {image ? (
            <img
              src={image}
              className="rounded-lg object-fit"
              alt={"Gallery Image" + imageNumber}
            />
          ) : (
            <Icons.AddImage />
          )}
        <input
          id={"ProfilePictureUpload" + imageNumber}
          name={"ProfilePictureUpload" + imageNumber}
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handleInputChange}
        />
      </label>
    </label>
  );
};

export default UploadImage;
