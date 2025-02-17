import { InboxOutlined } from "@ant-design/icons";
import { TImage } from "../../types/types";
import { Upload } from "antd";
import { RcFile } from "antd/es/upload";
import UploadImagePreview from "../upload-image-preview/upload-image-preview";
import React from "react";
import { UploadProps, UploadRef } from "antd/es/upload/Upload";

interface IUploadImages {
    images: TImage[];
    onChange: (images: TImage[]) => void;
}

const UploadImages = ({ images, onChange }: IUploadImages) => {
    const uploadRef = React.createRef<UploadRef<UploadProps>>();

    const getBase64 = (file: RcFile) => {
        return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => resolve(false);
        });
    }

    const handleChange = async (file: RcFile, fileList: RcFile[]) => {
            console.log('handleChange', fileList);
            const _images: TImage[] = [...images];
            for (const file of fileList) {
                const base64 = await getBase64(file);
                if (base64) {
                    _images.push({
                        description: '',
                        price: 0,
                        isImagePreview: false,
                        base64: base64 as string,
                    });
                }
            }
            onChange(_images);
            return false;
    };

    const handleUpdate = (image: TImage, index: number) => {
        const newImages = [...images];
        newImages[index] = image;
        onChange(newImages);
    };
    
    const handleDelete = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        onChange(newImages);
    };

    return (
        <>
            <Upload.Dragger
                ref={uploadRef}
                name="event-pictures"
                listType="picture-card"
                maxCount={5}
                height={200}
                beforeUpload={handleChange}
                showUploadList={false}
                multiple
                action={""}
                
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                    Clic o arrastra para subir
                </p>
            </Upload.Dragger>

            <div className="flex flex-col gap-y-10">
                {images.length && (
                    images.map((image, index) => (
                        <UploadImagePreview
                            key={index}
                            image={image}
                            selectPrevisualizeEnabled={!images.find((img) => img.isImagePreview) || image.isImagePreview}
                            onDelete={() => handleDelete(index)}
                            onUpdate={(img) => handleUpdate(img, index)}
                        />
                    ))
                )}
            </div>
        </>
    );
};

export default UploadImages;
