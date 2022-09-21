import SectionSliderNewCategories from "../components/SectionSliderNewCategories";
import { Suspense, useEffect } from "react";
import SectionSubscribe2 from "../components/SectionSubscribe2";
import SectionHowItWork from "../components/SectionHowItWork";
import BackgroundSection from "../components/BackgroundSection";
import BgGlassmorphism from "../components/BgGlassmorphism";
import SectionVideos from "../components/SectionVideos";
import SectionClientSay from "../components/SectionClientSay";
import Layout from "../components/Layout/Layout";
import {} from "jsonwebtoken";
import { getCookie } from "cookies-next";
import client from "../lib/apollo";
import { gql, useQuery } from "@apollo/client";
import { setAuthSuccess } from "../redux/auth";
import dynamic from "next/dynamic";
import SectionHero from "components/SectionHero";
import { getSession } from "next-auth/react";

const CITIES_IMAGES: any = {
    MEDELLIN:
        "https://cdn.pixabay.com/photo/2017/09/06/19/35/colombia-2722716_960_720.jpg",
    BELLO: "https://elbellanita.com/wp-content/uploads/2020/03/Iglesia-Nuestra-Se%C3%B1ora-del-Rosario-Parque-Santander-de-Bello.jpg",
    ITAGUI: "https://www.eje21.com.co/site/wp-content/uploads/2020/02/itagui-se-transforma-por-la-construccion.jpg",
    ENVIGADO: "https://telemedellin.tv/wp-content/uploads/2020/02/Envigado.jpg",
    RIONEGRO:
        "https://i1.wp.com/orienteantioqueno.com/wp-content/uploads/2020/11/plaza-de-la-libertad-rionegro-oriente-antioque%C3%B1o.jpg?fit=900%2C460&ssl=1",
    "LA ESTRELLA":
        "https://www.bienesonline.com/colombia/photos/venta-hermosa-casa-en-toledo-casasn-la-estrella-14817346181.jpg",
};

function HomePage() {

    /*
    const dispatch: any = useDispatch();
    useEffect(() => {
        (() => dispatch(fetchAllCitieswhitPropetiesAction()))();
    }, []);

    const { loading, cities } = useSelector(({ cities }: any) => cities);

    const CITIES_CARDS =
        cities &&
        cities.map((city: any) => ({
            id: city.cityId,
            href: "/#",
            name: city.city,
            taxonomy: "category",
            count: 188288,
            thumbnail: CITIES_IMAGES[city.city],
            countSell: city.countSell,
            countRent: city.countRent,
        }));
*/
    return (
        <Layout>
            <div className="relative overflow-hidden nc-PageHome">
                <BgGlassmorphism />

                <div className="container relative mb-24 space-y-24 lg:space-y-32 lg:mb-32">
                    <SectionHero className="pt-10 pb-16 lg:pt-20" />

                    {/* 
                    {!loading && (
                        <SectionSliderNewCategories
                            categories={CITIES_CARDS}
                            uniqueClassName="PageHome_s1"
                        />
                    )} */}

                    <SectionHowItWork />
                    <SectionSubscribe2 />
                    <SectionVideos />
                    <div className="relative py-16">
                        <BackgroundSection />
                        <SectionClientSay uniqueClassName="PageHome_" />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default HomePage;

export const getServerSideProps = (context:any) => {

    return {
        props: {},
    };
};
