import type { GatsbyConfig } from "gatsby";

require('dotenv').config()

const config: GatsbyConfig = {
  siteMetadata: {
    title: `gatsby-blog`,
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-emotion",
    // ...,
    {
      resolve: 'gatsby-source-microcms',
      options: {
        apiKey: process.env.MICROCMS_API_KEY ,
        serviceId: process.env.MICROCMS_SERVICE_ID,
        apis: [
    	  {
          endpoint: 'blog',
        },
        {
          endpoint: 'tags',
        },
        ],
      },
    },
    // ...
  ],
};

export default config;
