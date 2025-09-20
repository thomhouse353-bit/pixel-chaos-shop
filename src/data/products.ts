import { Product } from '@/types/product';

// Import all product images
import elefanteCocofanto from '@/assets/elefante-cocofanto.png';
import gattatinoNyanino from '@/assets/gattatino-nyanino.png';
import girafaCelestial from '@/assets/girafa-celestial.png';
import tralalerotralala from '@/assets/tralalero-tralala.png';
import odindindindun from '@/assets/odin-din-din-dun.png';
import unclitoSamito from '@/assets/unclito-samito.png';
import tralalitaTralala from '@/assets/tralalita-tralala.png';
import tukannoBanano from '@/assets/tukanno-banano.png';
import laVaccaSaturnoSaturnita from '@/assets/la-vacca-saturno-saturnita.png';
import agarriniLaPalini from '@/assets/agarrini-la-palini.png';
import osTralaleritos from '@/assets/os-tralaleritos.png';
import karkerkarKurkur from '@/assets/karkerkar-kurkur.png';
import graipussMedussi from '@/assets/graipuss-medussi.png';
import chicleteiraDeBicicleta from '@/assets/chicleteira-de-bicicleta.png';

export const products: Product[] = [
  // Brainrot God Rarity
  {
    id: 'elefante-cocofanto',
    name: 'Elefante Cocofanto',
    price: 0.25,
    rarity: 'brainrot',
    image: elefanteCocofanto,
    gameValue: '70M',
  },
  {
    id: 'gattatino-nyanino',
    name: 'Gattatino Nyanino',
    price: 0.50,
    rarity: 'brainrot',
    image: gattatinoNyanino,
    gameValue: '120M',
  },
  {
    id: 'girafa-celestial',
    name: 'Girafa Celestial',
    price: 0.25,
    rarity: 'brainrot',
    image: girafaCelestial,
    gameValue: '85M',
  },
  {
    id: 'tralalero-tralala',
    name: 'Tralalero Tralala',
    price: 0.50,
    rarity: 'brainrot',
    image: tralalerotralala,
    gameValue: '150M',
  },
  {
    id: 'odin-din-din-dun',
    name: 'Odin Din Din Dun',
    price: 1.00,
    rarity: 'brainrot',
    image: odindindindun,
    gameValue: '300M',
  },
  {
    id: 'unclito-samito',
    name: 'Unclito Samito',
    price: 2.00,
    rarity: 'brainrot',
    image: unclitoSamito,
    gameValue: '500M',
  },
  {
    id: 'tralalita-tralala',
    name: 'Tralalita Tralala',
    price: 2.00,
    rarity: 'brainrot',
    image: tralalitaTralala,
    gameValue: '450M',
  },
  {
    id: 'tukanno-banano',
    name: 'Tukanno Banano',
    price: 2.50,
    rarity: 'brainrot',
    image: tukannoBanano,
    gameValue: '650M',
  },
  // Secreto Rarity
  {
    id: 'la-vacca-saturno-saturnita',
    name: 'La Vacca Saturno Saturnita',
    price: 5.00,
    rarity: 'secreto',
    image: laVaccaSaturnoSaturnita,
    gameValue: '1.2B',
  },
  {
    id: 'agarrini-la-palini',
    name: 'Agarrini la Palini',
    price: 5.00,
    rarity: 'secreto',
    image: agarriniLaPalini,
    gameValue: '1.5B',
  },
  {
    id: 'os-tralaleritos',
    name: 'Os Tralaleritos',
    price: 7.00,
    rarity: 'secreto',
    image: osTralaleritos,
    gameValue: '2B',
  },
  {
    id: 'karkerkar-kurkur',
    name: 'Karkerkar Kurkur',
    price: 7.00,
    rarity: 'secreto',
    image: karkerkarKurkur,
    gameValue: '2.5B',
  },
  {
    id: 'graipuss-medussi',
    name: 'Graipuss Medussi',
    price: 10.00,
    rarity: 'secreto',
    image: graipussMedussi,
    gameValue: '5B',
  },
  {
    id: 'chicleteira-de-bicicleta',
    name: 'Chicleteira de Bicicleta',
    price: 15.00,
    rarity: 'secreto',
    image: chicleteiraDeBicicleta,
    gameValue: '1T',
  },
];