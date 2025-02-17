import { CloseCircleOutlined } from "@ant-design/icons";

interface IPrevisualizeImageModal {
    imageSrc: string;
    onClose: () => void;
 }

const PrevisualizeImageModal = ({ imageSrc, onClose }: IPrevisualizeImageModal) => {
    return (
        <div className="fixed w-full h-full top-0 left-0 z-1000 flex items-center justify-center">
            <div onClick={onClose} className="bg-gray-600 opacity-50 fixed w-full h-full"></div>
            <div className="relative">
                <CloseCircleOutlined onClick={onClose} className="absolute top-2 right-2 cursor-pointer" style={{ color: 'white' }} />
                <img src={imageSrc} alt="Event image previsualize" />
            </div>
        </div>
    )
}

export default PrevisualizeImageModal;