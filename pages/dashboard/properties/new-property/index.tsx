import { useRouter } from "next/router";
import React from "react";
import Template from "../../../../components/Dashboard/Template";
import FormNewProperty from "components/Dashboard/FormNewProperty/FormNewProperty";
import Layout from "../../../../components/Layout/Layout";
import LayoutDashboard from "../../../../components/Dashboard/LayoutDashboard";

const NewPropertyPage = () => {
    return (
        <LayoutDashboard>
            <Template
                title="Registra Inmueble"
                description="Registre aqui un nuevo inmueble"
            >
                <FormNewProperty />
            </Template>
        </LayoutDashboard>
    );
};

export default NewPropertyPage;
