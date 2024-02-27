/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            source: '/(.*)', // Match all pages
            headers: [
              {
                key: 'Access-Control-Allow-Origin',
                value: "http://localhost:3000",
              },
            ],
          },
        ]
    },
};

export default nextConfig;
