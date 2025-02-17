import React from "react"
import { TDriveData, TUserLoginData } from "./types/types";
import LoginPage from "./pages/login/login-page";
import { GlobalProvider, useGlobal } from "./hooks/useGlobal";
import Spinner from "./components/spinner/spinner";
import Toast from "./components/toast/toast";
import MainSection from "./sections/main/main-section";
import useService from "./hooks/useService";
import Header from "./components/header/header";
import MenuResponsive from "./components/menu/menu";
import AddEventSection from "./sections/add-event/add-event-section";


type TSectionOption = 'main';

const App = () => {
    const { driveData, setDriveData } = useGlobal();
    const { data, fetchData } = useService();
    const [isLogged, setIsLogged] = React.useState<boolean>(false);
    const [menuOpened, setMenuOpened] = React.useState<boolean>(false);
    const [selectedSection, setSelectedSection] = React.useState<string>('main');
    
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLogged(true);
        }
    }, []);

    React.useEffect(() => {
        console.log(driveData);
        if (!driveData && isLogged) {
            fetchData({
                api: 'catalogs/drive-status',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    }, [isLogged]);

    React.useEffect(() => {
        if (data?.code === 200) {
            console.log(data);
            setDriveData(data.data as TDriveData);
        }
    }, [data]);

    const openMenu = () => {
        console.log(menuOpened);
        setMenuOpened(!menuOpened);
    }

    const getSection = () => {
      switch (selectedSection) {
        case 'main':
          return <MainSection />;
        case 'public-events-add':
            return <AddEventSection eventType="public"/>
        default:
            return <MainSection />;
      }
    }

    return (
        <main className="w-full h-full">
                {!isLogged && <LoginPage onLogin={() => setIsLogged(true)} />}
                {isLogged && <MenuResponsive onMenuClick={(e) => setSelectedSection(e)}  opened={menuOpened} onVeilClick={openMenu}/>}
                {isLogged && <Header openMenu={openMenu}/>}
                {isLogged && getSection()}
            <Spinner/>
            <Toast/>
        </main>
    )
};

export default App
