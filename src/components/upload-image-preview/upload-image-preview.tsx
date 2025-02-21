import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { TImage } from "../../types/types";
import { Skeleton, Input, Checkbox, Tooltip } from "antd";
import React from "react";
import PrevisualizeImageModal from "../previsualize-image-modal/previsualize-image-modal";

interface IUploadImagePreview {
    image: TImage;
    onDelete: () => void;
    onUpdate: (image: TImage) => void;
    selectPrevisualizeEnabled: boolean;
    mode?: "edit" | "view";
    eventType: "public" | "private";
}

const UploadImagePreview = ({
    image,
    onDelete,
    onUpdate,
    selectPrevisualizeEnabled = false,
    mode = "edit",
    eventType
}: IUploadImagePreview) => {
    const [previsualizeOpened, setPrevisualizeOpened] = React.useState(false);
    const [imageSrc, setImageSrc] = React.useState<string | ArrayBuffer | null>(null);

    React.useEffect(() => {
        if (image && !image.webContentLink) {
            const reader = new FileReader();

            reader.onload = () => setImageSrc(reader.result);

            reader.readAsDataURL(image.file)
        }
    }, [image]);


    return (
        <>
            {!image && <Skeleton active />}
            {image && (
                <div className="flex flex-row gap-x-2 w-full rounded-lg shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] p-4">
                    <div className="flex flex-row items-start">
                        <img
                            onClick={() => setPrevisualizeOpened(true)}
                            className="w-12 cursor-pointer"
                            src={imageSrc as string || image.webContentLink}
                            alt="Event image"
                            referrerPolicy="no-referrer"
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Input.TextArea
                            rows={2}
                            cols={6}
                            placeholder="Descripción"
                            autoSize={{ minRows: 2, maxRows: 2 }}
                            value={image.description}
                            onChange={(e) =>
                                onUpdate({
                                    ...image,
                                    description: e.target.value,
                                })
                            }
                            disabled={mode === "view" || eventType === "private"}
                        />
                        <div className="flex items-center">
                            <span className="basis-[10%] text-center">$</span>
                            <Input
                                style={{ flexBasis: "90%" }}
                                type="number"
                                placeholder="Precio"
                                value={image.price}
                                onChange={(e) =>
                                    onUpdate({
                                        ...image,
                                        price: Number(e.target.value),
                                    })
                                }
                                className="w-12"
                                disabled={mode === "view" || eventType === "private"}
                            />
                        </div>

                        <div className="flex justify-between">
                            <div className="flex flex-row items-center">
                                <Checkbox
                                    disabled={!selectPrevisualizeEnabled}
                                    checked={image.isEventPreview}
                                    onChange={(e) =>
                                        onUpdate({
                                            ...image,
                                            isEventPreview: e.target.checked,
                                        })
                                    }
                                >
                                    Previsualizar
                                </Checkbox>
                                <Tooltip title="Es la imagen que se utilizará para representar el evento en el listado de eventos.">
                                    <InfoCircleOutlined />
                                </Tooltip>
                            </div>
                            { mode === "edit" && <DeleteOutlined
                                className="cursor-pointer rounded-full p-2 bg-red-400"
                                style={{ color: "white" }}
                                onClick={onDelete}
                            />}
                        </div>
                    </div>
                </div>
            )}

            {previsualizeOpened && (
                <PrevisualizeImageModal
                    imageSrc={imageSrc as string || image.webContentLink || ''}
                    onClose={() => setPrevisualizeOpened(false)}
                />
            )}
        </>
    );
};

export default UploadImagePreview;
