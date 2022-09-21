import { gql } from "@apollo/client";

export const GET_CONFIG_HOME_VIDEOS = gql`
    query GetConfigHomeVideos {
        getConfigHomeVideos {
            id
            title
            idUrl
            thumbnail
            cityId
            state
        }
    }
`;