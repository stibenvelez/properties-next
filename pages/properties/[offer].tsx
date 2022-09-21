import { FC, useEffect, useState } from "react";
import BgGlassmorphism from "../../components/BgGlassmorphism";
import SectionSubscribe2 from "../../components/SectionSubscribe2";
import SectionGridFilterCard from "../../components/SectionGridFilterCard";
import { useSearchParams } from "../../hooks/useSearchParams";
import { fetchAllProperties } from "../../redux/properties/propertiesActions";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../hooks/useDebounce";
import {
    fetchAllCitiesAction,
    fetchAllCitieswhitPropetiesAction,
} from "../../redux/cities/citiesActions";
import { useRouter } from "next/router";
import Layout from "../../components/Layout/Layout";
import Heading2 from "../../components/Heading/Heading2";
import SectionHeroArchivePage from "../../components/SectionHeroArchivePage/SectionHeroArchivePage";
import PropertyList from "../../components/PropertiesList";
import FilteProperties from "../../components/FiltersProperties";
import { request } from "http";
import useSWR from "swr";
import Range from "rc-slider";
import Slider from "rc-slider";

import { Popover, Transition } from "@headlessui/react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
    useQuery,
} from "@apollo/client";
import { GET_PROPERTIES } from "../../graphql/queries/properties";

export interface ListingStayPageProps {
    className?: string;
}

const CATEGORY: any = {
    arriendo: "rent",
    venta: "sell",
};

const PropertiesPage: FC<ListingStayPageProps> = ({ className = "" }) => {
    const router = useRouter();
    const [showFilters, setShowFilters] = useState(true);
    const dispatch: any = useDispatch();
    const filters: any = useSelector(
        ({ properties }: any) => properties.filters
    );
    const debouncedFilters = useDebounce<string>(filters, 500);
    let category = router.pathname.split("/")[1];
    const categoryProperty: any = CATEGORY[category];


    useEffect(() => {
        (() =>
            dispatch(fetchAllCitieswhitPropetiesAction(CATEGORY[category])))();
    }, []);

    return (
        <Layout container={false}>
            <BgGlassmorphism />
            <div className="flex ">
                <div className={`${!showFilters && "hidden"} sticky`}>
                    <div className={`sticky`}>
                        <Transition show={showFilters}>
                            <Transition.Child
                                enter="transition-opacity ease-linear duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity ease-linear duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <FilteProperties
                                    showFilters={showFilters}
                                    setShowFilters={setShowFilters}
                                />
                            </Transition.Child>
                        </Transition>
                    </div>
                </div>
                <div
                    className={` relative container overflow-hidden ${className}`}
                    data-nc-id="ListingStayPage"
                >
                    <div className="relative overflow-hidden">
                        <Heading2
                            heading={`${
                                categoryProperty === "rent"
                                    ? "Arriendo de propiedades"
                                    : "Venta de propiedades"
                            }`}
                        />
                        <SectionGridFilterCard
                            categoryProperty={categoryProperty}
                            setShowFilters={setShowFilters}
                            showFilters={showFilters}
                        />

                        <PropertyList />

                        {/* <div className="relative py-16">
                  <BackgroundSection />
                  <SectionSliderNewCategories
                      heading="Explore by types of stays"
                      subHeading="Explore houses based on 10 types of stays"
                      categoryCardType="card5"
                      itemPerRow={5}
                      sliderStyle="style2"
                      uniqueClassName="ListingStayMapPage"
                  />
              </div> */}
                        {/* <div className="relative py-16 mb-24 lg:mb-32">
                  <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
                  <SectionGridAuthorBox />
              </div> */}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PropertiesPage;

export async function getServerSideProps(context:any) {
    

    return {
        props: {
           
        },
    };
}