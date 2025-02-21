import { MenuOutlined } from "@ant-design/icons";
import AvailableStorage from "../available-storage/available-storage";
import EventUploadProgressStatus from "../event-upload-progress-status/event-upload-progress-status";

interface IHeader {
    openMenu: () => void;
}

const Header = ({openMenu}: IHeader) => {

    return (
        <header className="flex flex-col p-4 gap-y-4 shadow-lg">
            <MenuOutlined onClick={openMenu} role="button" className="basis-full cursor-pointer"/>
            <hr className="border-b-[1px] border-gray-200"/>
            <AvailableStorage/>
            <EventUploadProgressStatus/>
        </header>
    )
};

export default Header;