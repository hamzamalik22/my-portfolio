# Portfolio Frontend

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS. Features a dual-backend architecture supporting both Supabase and Django APIs.

## 🚀 Features

- **Dual Backend Support**: Seamlessly switch between Supabase and Django backends
- **Modern UI**: Built with React, Vite, and Tailwind CSS
- **Responsive Design**: Optimized for all devices
- **Real-time Updates**: Dynamic backend switching without page reload
- **Error Handling**: Comprehensive error handling with fallback mechanisms
- **Image Optimization**: Cloudinary integration for optimized images

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **State Management**: Redux Toolkit
- **Backend Options**: 
  - Supabase (PostgreSQL + Real-time)
  - Django REST API
- **Image Storage**: Cloudinary
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-portfolio/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the frontend directory:
   ```env
   # Backend Configuration
   VITE_BACKEND_TYPE=supabase
   
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_ENABLE_REALTIME=true
   
   # Django Configuration (fallback)
   VITE_DJANGO_BACKEND_URL=http://localhost:8000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🔧 Backend Configuration

### Supabase (Recommended)
- Set `VITE_BACKEND_TYPE=supabase`
- Configure your Supabase project URL and anon key
- Database schema should match Django models with `api_` prefix

### Django (Fallback)
- Set `VITE_BACKEND_TYPE=django`
- Ensure Django backend is running on the configured URL
- API endpoints should match the expected structure

### Dynamic Switching
The application supports dynamic backend switching:
- Backend preference is stored in localStorage
- Real-time switching without page reload
- Automatic fallback if primary backend fails

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   ├── store/              # Redux store and actions
│   │   ├── actions/        # Redux actions with dual-backend support
│   │   └── reducers/       # Redux slices
│   ├── lib/
│   │   ├── supabase/       # Supabase integration
│   │   │   ├── client.js   # Supabase client configuration
│   │   │   ├── queries/    # Database queries for each model
│   │   │   └── errorHandler.js
│   │   └── backendConfig.js # Backend switching logic
│   ├── utils/              # Utility functions
│   └── styles/             # CSS styles
├── public/                 # Static assets
└── package.json
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production
```env
VITE_BACKEND_TYPE=supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_production_anon_key
VITE_ENABLE_REALTIME=true
```

## 🔄 Backend Migration

This project supports seamless migration between backends:

1. **Supabase Setup**: Configure Supabase project and database schema
2. **Data Migration**: Use existing Django data in Supabase
3. **Switch Backend**: Change `VITE_BACKEND_TYPE` environment variable
4. **Test**: Verify all functionality works with new backend

## 📊 Performance

- **Lazy Loading**: Components load on demand
- **Image Optimization**: Cloudinary integration for optimized images
- **Caching**: Redux state management with persistence
- **Error Boundaries**: Graceful error handling and fallbacks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Review environment configuration
- Verify backend connectivity
- Check browser console for errors
