import React from "react"
import { TDriveData, TEvent, TUserLoginData } from "./types/types";
import LoginPage from "./pages/login/login-page";
import { GlobalProvider, useGlobal } from "./hooks/useGlobal";
import Spinner from "./components/spinner/spinner";
import Toast from "./components/toast/toast";
import MainSection from "./sections/main/main-section";
import useService from "./hooks/useService";
import Header from "./components/header/header";
import MenuResponsive from "./components/menu/menu";
import AddEventSection from "./sections/add-event/add-event-section";
import UpdateEventSection from "./sections/update-event/update-event-section";
import DeleteEventSection from "./sections/delete-event/delete-event-section";


type TSectionOption = 'main';

const App = () => {
    const { driveData, setDriveData } = useGlobal();
    const { data, fetchData } = useService();
    const [isLogged, setIsLogged] = React.useState<boolean>(false);
    const [menuOpened, setMenuOpened] = React.useState<boolean>(false);
    const [selectedSection, setSelectedSection] = React.useState<string>('dashboard');

    const [selectedEventFromMainSection, setSelectedEventFromMainSection] = React.useState<TEvent>();
    
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
        case 'dashboard':
          return <MainSection onUpdate={handleUpdateEvent} onDelete={handleDeleteEvent} />;
        case 'public-events-add':
            return <AddEventSection shouldClose={() => {
                setSelectedSection('dashboard');
                setSelectedEventFromMainSection(undefined);
            }} eventType="public"/>
        case 'private-events-add':
            return <AddEventSection shouldClose={() => {
                setSelectedSection('dashboard');
                setSelectedEventFromMainSection(undefined);
            }} eventType="private"/>
        case 'public-events-update':
            return <UpdateEventSection shouldClose={() => {
                setSelectedSection('dashboard');
                setSelectedEventFromMainSection(undefined);
            }} eventToBeUpdated={selectedEventFromMainSection} eventType="public"/>
        case 'private-events-update':
            return <UpdateEventSection shouldClose={() => {
                setSelectedSection('dashboard');
                setSelectedEventFromMainSection(undefined);
            }} eventToBeUpdated={selectedEventFromMainSection} eventType="private"/>
        case 'public-events-delete':
            return <DeleteEventSection shouldClose={() => {
                setSelectedSection('dashboard');
                setSelectedEventFromMainSection(undefined);
            }} eventToBeDeleted={selectedEventFromMainSection} eventType="public"/>
        case 'private-events-delete':
            return <DeleteEventSection shouldClose={() => {
                setSelectedSection('dashboard');
                setSelectedEventFromMainSection(undefined);
            }} eventType="private"/>
        default:
            return <MainSection onUpdate={handleUpdateEvent} onDelete={handleDeleteEvent} />;
      }
    }

    const handleUpdateEvent = (event: TEvent) => {
        setSelectedEventFromMainSection(event);
        const eventType = event.event_type_id === 1 ? 'public' : 'private';
        setSelectedSection(`${eventType}-events-update`);
    }

    const handleDeleteEvent = (event: TEvent) => {
        setSelectedEventFromMainSection(event);
        const eventType = event.event_type_id === 1 ? 'public' : 'private';
        setSelectedSection(`${eventType}-events-delete`);
    }

    return (
        <main className="w-full h-full">
                {!isLogged && <LoginPage onLogin={() => setIsLogged(true)} />}
                {isLogged && <MenuResponsive selectedKey={selectedSection} onMenuClick={(e) => setSelectedSection(e)}  opened={menuOpened} onVeilClick={openMenu}/>}
                {isLogged && <Header openMenu={openMenu}/>}
                {isLogged && getSection()}
            <Spinner/>
            <Toast/>
        </main>
    )
};

export default App
