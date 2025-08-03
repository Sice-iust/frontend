const config = {
  reactStrictMode: true,
  images: {  
    domains: ['nanziback.liara.run'], 
  },
};

module.exports = {
  images: {
      domains: ['nanziback.liara.run'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ]
  }
}

export default config;
