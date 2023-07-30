/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        swcPlugins: [["next-superjson-plugin", {}]],
    },
    images: {
        domains: ['wubpmygcxfkkllmvhixb.supabase.co'],
    },
}

module.exports = nextConfig
