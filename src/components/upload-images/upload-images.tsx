import { InboxOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { TImage } from "../../types/types";
import { Upload, Input, Tooltip, Pagination } from 'antd';
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

    const [elementsInPage, setElementsInPage] = React.useState<TImage[]>([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [currentPageSize, setCurrentPageSize] = React.useState(10);

    const handleChange = async (file: RcFile, fileList: RcFile[]) => {
            console.log('handleChange', fileList);
            const _images: TImage[] = [...value];
            for (const file of fileList) {
                _images.unshift({
                    description: '',
                    price: 0,
                    isEventPreview: _images.length === 0,
                    originalFileName: file.name,
                    isNewImage: true,
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
        onPaginationChange(currentPage, currentPageSize);
    };

    const handleSetGeneralPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            const price = Number(e.target.value);
            const newImages = [...value];
            newImages.forEach(image => image.price = price);
            onChange(newImages);
        }
    }

    const onPaginationChange = (page: number, pageSize: number) => {
        const imagesToBeShown = value.slice((page - 1) * pageSize, page * pageSize);
        setCurrentPage(page);
        setElementsInPage(imagesToBeShown);
    };

    React.useEffect(() => {
        onPaginationChange(currentPage, currentPageSize);
    }, [value]);

    return (
        <>
            <Upload.Dragger
                ref={uploadRef}
                name="event-pictures"
                listType="picture-card"
                maxCount={500}
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
                    Array.isArray(elementsInPage) && !!elementsInPage.length ? elementsInPage.map((image, index) => (
                        <UploadImagePreview
                        eventType={eventType}
                        key={index}
                        image={image}
                        selectPrevisualizeEnabled={!value.find((img) => img.isEventPreview) || image.isEventPreview}
                        onDelete={() => handleDelete(index)}
                        onUpdate={(img) => handleUpdate(img, index)}
                        isNewImage={image.isNewImage}
                        />
                    )
                ) : null}
                <Pagination responsive onChange={onPaginationChange} total={value.length} current={currentPage} pageSize={currentPageSize} pageSizeOptions={[10, 20, 30, 40, 50]}/>
            </div>
        </>
    );
};

export default UploadImages;
