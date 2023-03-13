import {
  IconBathroom,
  IconBedroom,
  IconCloset,
  IconGarage,
  IconKitchen,
  IconLivingRoom,
  IconToilet,
} from '@/res/icons';

export const DISCORD_LINK = '';
export const TWITTER_LINK = 'https://twitter.com/Decolococo';

export const API_PATH_GET_DESIGN = '/public/getDesignBySlug';

export const API_PATH_POST_DESIGN_TOOL = '/restricted/redesign';

export const API_PATH_GET_REDESIGN = '/public/getRedesignById';
export const API_PATH_GET_REDESIGNS_BY_USER = '/public/getAllRedesignsByUserId';

export const API_PATH_ADD_SITE = '/restricted/createSite';
export const API_PATH_UPDATE_SITE = '/restricted/updateSite';
export const API_PATH_DELETE_SITE = '/restricted/deleteSite';
export const API_PATH_EDIT_SAVE = '/restricted/editSave';
export const API_PATH_GENERATE_MORE = '/restricted/generateMore';
export const API_PATH_GET_SITE = '/restricted/getSitesFromUserId';
export const API_PATH_SINGLE_TITLE = 'restricted/getTitle';
export const API_PATH_ADD_TITLE = '/restricted/createTitle';

export const API_PATH_GET_PORTAL = '/restricted/getPortalLink';
export const API_PATH_DELETE_TITLE = '/restricted/deleteTitle';
export const API_PATH_GET_TITLES = '/restricted/getTitlesFromUserId';
export const API_PATH_GET_USER = '/restricted/getUser';
export const API_PATH_CREATE_SESSION = '/restricted/createSession';

export const logoPositions = ['top-left', 'top-right', 'bot-left', 'bot-right'];

export const titlePositions = ['top', 'mid', 'bot'];

export const font = [
  'Arial',
  'Roboto',
  'Verdana',
  'Times New Roman',
  'Courier New',
  'serif',
  'sans-serif',
];

export const weight = ['lighter', 'normal', 'bold'];

export const styleList = [
  {
    image:
      'https://imageio.forbes.com/specials-images/imageserve/632d891161b9efabbc7d2c23/0x0.jpg?format=jpg&crop=2200,1232,x398,y0,safe&width=1200',
    label: 'Japanese',
    value: '1',
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2015/10/24/12/30/musee-des-confluances-1004423_960_720.jpg',
    label: 'Modern',
    value: '2',
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2015/06/27/16/34/wall-823611_1280.jpg',
    label: 'Industrial',
    value: '3',
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2014/12/06/12/47/fireplace-558985_1280.jpg',
    label: 'Christmas',
    value: '4',
  },
];

export const roomTypeList = [
  {
    image: IconBathroom.src,
    label: 'Bathroom',
    value: '1',
  },
  {
    image: IconBedroom.src,
    label: 'Bedroom',
    value: '2',
  },
  {
    image: IconKitchen.src,
    label: 'Kitchen',
    value: '3',
  },
  {
    image: IconLivingRoom.src,
    label: 'Living Room',
    value: '4',
  },
  {
    image: IconToilet.src,
    label: 'Toilet',
    value: '5',
  },
  {
    image: IconGarage.src,
    label: 'Garage',
    value: '6',
  },
  {
    image: IconCloset.src,
    label: 'Closet',
    value: '7',
  },
];
