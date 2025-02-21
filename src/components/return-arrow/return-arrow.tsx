import { ArrowLeftOutlined } from "@ant-design/icons";

interface IReturnArrow {
  onClick: () => void;
}

const ReturnArrow = ({ onClick }: IReturnArrow) => {
  return <div onClick={onClick} className="flex gap-x-2 items-center text-blue-500 cursor-pointer">
    <ArrowLeftOutlined />
    <p>Regresar</p>
  </div>
};

export default ReturnArrow;