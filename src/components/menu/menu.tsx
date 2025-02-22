import { DeleteOutlined, EditOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { Menu } from 'antd'; 


type TMenuItem = Required<MenuProps>['items'][number];

const items: TMenuItem[] = [
    { key: 'dashboard', icon: '', label: 'Dashboard' },
    {
        key: 'public-events',
        label: 'Eventos públicos',
        icon: '',
        children: [
            { key: 'public-events-add', label: 'Nuevo evento', icon: <PlusSquareOutlined /> },
            { key: 'public-events-update', label: 'Modificar evento', icon: <EditOutlined />},
            { key: 'public-events-delete', label: 'Eliminar evento', icon: <DeleteOutlined />},
        ]
    },
    {
        key: 'private-events',
        label: 'Eventos privados - Proximamente',
        disabled: true,
        icon: '',
        children: [
            { key: 'private-events-add', label: 'Nuevo evento', icon: <PlusSquareOutlined /> },
            { key: 'private-events-update', label: 'Modificar evento', icon: <EditOutlined />},
            { key: 'private-events-delete', label: 'Eliminar evento', icon: <DeleteOutlined />},
        ]
    }
];

interface IMenu {
    opened: boolean;
    onVeilClick: () => void;
    onMenuClick: (option: string) => void;
    selectedKey: string;
}

const MenuResponsive = ({ opened, onVeilClick, onMenuClick, selectedKey }: IMenu) => {

    const onClick: MenuProps['onClick'] = (e) => {
        onVeilClick();
        onMenuClick(e.key);
    };
    

    return opened && <div className="fixed w-full h-full z-1000">
        <div className="flex flex-col gap-y-2 py-3 z-1000 absolute bottom-0 left-0 w-full bg-white">
            <hr className="border-b-[2px] w-[5rem] m-auto border-gray-200"/>
            <Menu
                className=""
                defaultSelectedKeys={[selectedKey]}
                mode="inline"
                items={items}
                onClick={onClick}
            />
        </div>

        <div className="bg-gray-200 h-full opacity-50" onClick={onVeilClick}></div>
    </div>
};

export default MenuResponsive;