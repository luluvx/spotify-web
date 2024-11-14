import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import GeneroDashboard from './pages/Genero/GeneroDashboard.jsx'
import GeneroList from './pages/Genero/GeneroList.jsx';

import './styles/fonts.css'
import FormGenero from './pages/Genero/FormGenero.jsx'
import PhotoGenero from './pages/Genero/PhotoGenero.jsx'
import ArtistaDashboard from './pages/Artista/ArtistaDashboard.jsx'
import FormArtista from './pages/Artista/FormArtista';
import PhotoArtista from './pages/Artista/PhotoArtista';
import CancionDashboard from './pages/Cancion/CancionDashboard';
import AlbumDashboard from './pages/Album/AlbumDashboard';
import FormAlbum from './pages/Album/FormAlbum';
import PhotoAlbum from './pages/Album/PhotoAlbum.jsx'
import FormCancion from './pages/Cancion/FormCancion.jsx'
import ArchivoCancion from './pages/Cancion/ArchivoCancion.jsx'
import ArtistaList from './pages/Genero/GeneroDetail.jsx'
import ArtistaDetail from './pages/Artista/ArtistaDetail.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/generos',
    element: <GeneroList />,
  },
  {
    path: '/generos/:id/detail',
    element: <ArtistaList />,
  },
  {
    path: '/artistas/:id/detail',
    element: <ArtistaDetail />,
  },
  {
    path: '/admin/generos',
    element: <GeneroDashboard />,
  },
  {
    path: '/admin/generos/create',
    element: <FormGenero />,
  },
  {
    path: '/admin/generos/edit/:id',
    element: <FormGenero />,
  },
  {
    path: '/admin/generos/:id/photo',
    element: <PhotoGenero />,
  },
  {
    path: '/admin/artistas',
    element: <ArtistaDashboard/>,
  },
  {
    path: '/admin/artistas/create',
    element: <FormArtista />,
  },
  {
    path: '/admin/artistas/edit/:id',
    element: <FormArtista />,
  },
  {
    path: '/admin/artistas/:id/photo',
    element: <PhotoArtista />,
  },
  {
    path: '/admin/canciones',
    element: <CancionDashboard />,
  },
  {
    path: '/admin/albums',
    element: <AlbumDashboard />,
  },
  {
    path: '/admin/albums/create',
    element: <FormAlbum />,
  },
  {
    path: '/admin/albums/edit/:id',
    element: <FormAlbum />,
  },
  {
    path: '/admin/albums/:id/photo',
    element: <PhotoAlbum />,
  },
  {
    path: '/admin/canciones/create',
    element: <FormCancion />,
  },
  {
    path: '/admin/canciones/edit/:id',
    element: <FormCancion />,
  },
  {
    path: '/admin/canciones/:id/archivo',
    element: <ArchivoCancion />,
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
