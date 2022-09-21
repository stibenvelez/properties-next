import LayoutDashboard from "components/Dashboard/LayoutDashboard";
import Template from "components/Dashboard/Template";
import ToContactList from "components/ToContactList/ToContactList";
import { useRouter } from "next/router";


const ContactMeList = () => {
    const router = useRouter();

    return (
        <LayoutDashboard>
            <Template
                title=" Lista a contactar"
                description="Lista de prospectos pendientes por contactar"
            >
                <>
                    <div className="py-4">
                        <button
                            onClick={() => router.back()}
                            className="bg-gray-600 text-white py-1 px-4 rounded hover:bg-gray-500"
                        >
                            Volver
                        </button>
                    </div>
                    <ToContactList />
                </>
            </Template>
        </LayoutDashboard>
    );
};

export default ContactMeList;
