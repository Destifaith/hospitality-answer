// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'placehold.co',
            'dynamic-media-cdn.tripadvisor.com', // ✅ add this
            'i.natgeofe.com',

    ],
  },
};

export default nextConfig;