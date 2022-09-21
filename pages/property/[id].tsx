import { useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FC, Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout/Layout";
import { GET_PROPERTY } from "../../graphql/queries/properties";
import Logo from "../../shared/Logo/Logo";
import SpinnerButton from "../../shared/SpinnerButton/SpinnerButton";
//import PropertyDetail from "../../components/PropertyDetail";

const PropertyDetail = dynamic(() => import("../../components/PropertyDetail"));

const PropertyDetailPage: FC = () => {
    const router = useRouter();
    const query = router.query;

    return (
        <Layout>
            <div
                className={`nc-ListingStayDetailPage`}
                data-nc-id="ListingStayDetailPage"
            >
                <PropertyDetail />
            </div>
        </Layout>
    );
};

export default PropertyDetailPage;

export async function getServerSideProps(context: any) {
    return {
        props: {},
    };
}
