import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React from "react";
import Image from "next/image";

interface ImagePreviewProps {
    imagePreviews: string[];
    handleDeleteImage: (index: number) => void;
}

const ImagePreviews: React.FC<ImagePreviewProps> = ({
    imagePreviews,
    handleDeleteImage,
}) => {
    return (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                    <Image
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md"
                        width={320} // optional, set the width of the image
                        height={200} // optional, set the height of the image
                    />
                    <Button
                        type="button"
                        onClick={() => handleDeleteImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <X size={16} />
                    </Button>
                </div>
            ))}
        </div>
    );
};

export default ImagePreviews;
