module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*', // Apply to all API routes
        headers: [
          { 
            key: 'Access-Control-Allow-Origin', 
            value: 'http://192.168.2.14:8080' // Exact origin
          },
          { 
            key: 'Access-Control-Allow-Methods', 
            value: 'GET, POST, PUT, DELETE, OPTIONS' 
          },
          { 
            key: 'Access-Control-Allow-Headers', 
            value: 'Content-Type, Authorization' 
          },
          { 
            key: 'Access-Control-Allow-Credentials', 
            value: 'true' 
          },
        ],
      },
    ];
  },
};