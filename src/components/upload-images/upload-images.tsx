import { InboxOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { TImage } from "../../types/types";
import { Upload, Input, Tooltip } from 'antd';
import { RcFile } from "antd/es/upload";
import UploadImagePreview from "../upload-image-preview/upload-image-preview";
import React from "react";
import { UploadProps, UploadRef } from "antd/es/upload/Upload";

interface IUploadImages {
    value: TImage[];
    onChange: (images: TImage[]) => void;
    eventType: 'public' | 'private';

}


const UploadImages = ({ value, onChange, eventType }: IUploadImages) => {
    const uploadRef = React.createRef<UploadRef<UploadProps>>();

    const handleChange = async (file: RcFile, fileList: RcFile[]) => {
            console.log('handleChange', fileList);
            const _images: TImage[] = [...value];
            for (const file of fileList) {
                _images.push({
                    description: '',
                    price: 0,
                    isEventPreview: _images.length === 0,
                    originalFileName: file.name,
                    file,
                });
            }
            onChange(_images);
            return false;
    };

    const handleUpdate = (image: TImage, index: number) => {
        const newImages = [...value];
        newImages[index] = image;
        onChange(newImages);
    };
    
    const handleDelete = (index: number) => {
        const newImages = [...value];
        newImages.splice(index, 1);
        onChange(newImages);
    };

    const handleSetGeneralPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            const price = Number(e.target.value);
            const newImages = [...value];
            newImages.forEach(image => image.price = price);
            onChange(newImages);
        }
    }

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

            <div className="flex flex-col gap-y-10 mt-6">
                {eventType === 'public' && !!value.length && <div className="flex flex-wrap flex-row gap-2 items-center justify-center">
                    <p className="basis-full text-center">Precio general</p>
                    <span>$</span>
                    <Input
                        className="basis-[40%]"
                        type="number"
                        placeholder="Precio general"
                        onChange={handleSetGeneralPrice}
                        defaultValue={0}
                        min={0}

                        suffix={
                            <Tooltip title="El precio general se aplica a todas las imagenes.">
                              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                          }
                    />
                </div>}

                {
                    Array.isArray(value) && value.length ? value.map((image, index) => (
                        <UploadImagePreview
                            eventType={eventType}
                            key={index}
                            image={image}
                            selectPrevisualizeEnabled={!value.find((img) => img.isEventPreview) || image.isEventPreview}
                            onDelete={() => handleDelete(index)}
                            onUpdate={(img) => handleUpdate(img, index)}
                        />
                    )
                ) : null}
            </div>
        </>
    );
};

export default UploadImages;
