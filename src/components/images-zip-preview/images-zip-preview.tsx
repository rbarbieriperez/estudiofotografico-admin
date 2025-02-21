import { Button } from 'antd';
import RarIcon from '../../images/rar-format.png';

interface IImagesZipPreviewProps {
  fileName: string;
  size: string;
  totalImages: string;
  downloadLink: string;
}

const ImagesZipPreview = ({
  fileName,
  size ,
  totalImages,
  downloadLink
}: IImagesZipPreviewProps) => {
  return <div className='flex gap-x-4 p-4 w-full bg-gray-100 rounded-xl mt-4'>
    <img className='w-12 h-12' src={RarIcon} alt="Rar Icon" />
    <div>
      <p className='font-poppinsBold! text-[.965rem]'>Archivo encontrado</p>
      <p>{fileName}</p>
      <p>{size}</p>
      <p>{totalImages} imágenes</p>
      <Button type='link' style={{ padding:0 }} onClick={() => window.open(downloadLink, '_blank')}>Descargar</Button>
    </div>
  </div>
};

export default ImagesZipPreview;