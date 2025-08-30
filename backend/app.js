const corsOptions = {
  origin: [
    'http://localhost:3000', 
    'https://hybrid-app-deploy-g22.vercel.app', // YAHAN APNA VERCEL URL DALNA
    'https://*.vercel.app' // All Vercel subdomains
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));