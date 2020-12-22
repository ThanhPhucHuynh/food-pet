import { AVPlaybackSource } from 'expo-av/build/AV';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ImageSourcePropType } from 'react-native';
import { AvatarImageSource } from 'react-native-paper/lib/typescript/src/components/Avatar/AvatarImage';

interface slidesProps {
  label: string;
  title: string;
  description: string;
  color: string;
  picture: any;
}
interface PictureWelcomeProps {
  picture: any;
}
interface DrawerItemProps {
  icon: any;
  color: string;
  screen: string;
  label: string;
  ComponentScreen?: string[];
}
const DrawnItemList: DrawerItemProps[] = [
  {
    icon: 'home',
    color: 'color1',
    screen: 'HomeDraw',
    label: 'Home',
  },
  {
    icon: 'food',
    color: 'color2',
    screen: 'ProductStack',
    ComponentScreen: ['Product', 'Detail'],
    label: 'Product',
  },
  {
    icon: 'cart',
    color: 'color3',
    screen: 'CartDraw',
    label: 'Cart',
  },
  {
    icon: 'dns',
    color: 'color4',
    screen: 'OrderDraw',
    label: 'Order',
  },
  {
    icon: 'exit-to-app',
    color: 'black',
    screen: 'Logout',
    label: 'Logout',
  },
];
const slides: slidesProps[] = [
  {
    label: 'Food',
    title: 'The best foods for your pets',
    description:
      'Pet food, Bringing customers the best food & Commitment to selling genuine products, not selling fake goods, ensuring the health of your pets',
    color: '#BFEAF5',
    picture: require('../assets/images/c1.png'),
  },
  {
    label: 'Products',
    title: 'Products for pets',
    description:
      'The items for pets are diverse from food, drinks, toiletries, toys to clothes ...There are everything for pets.',
    color: '#BEECC4',
    picture: require('../assets/images/c3.png'),
  },
  {
    label: 'Relaxed',
    title: 'Relaxed for pets ',
    description:
      'Pets can help you relax because they prevent you from feeling as much isolation and pain as you might have felt without them',
    color: '#FFE4D9',
    picture: require('../assets/images/c2.png'),
  },
  {
    label: 'PetCare',
    title: 'Take cake of pets',
    description:
      'Here are some of the tips which will help you to take good care of your pet and keep them happy, active and healthy. We can look after your pets',
    color: '#FFDDDD',
    picture: require('../assets/images/c5.png'),
  },
];
const pictureContainer: ImageSourcePropType = require('../assets/images/background.jpg');
const BackgroundPicture: ImageSourcePropType = require('../assets/images/backgroundPicture_2.jpg');
const ButtonPicture: ImageSourcePropType = require('../assets/images/bottonPicture.jpg');
const pictureWelcome: ImageSourcePropType = require('../assets/images/c6.png');
const AvatarGuest = require('../assets/images/guest.png');
const iconFacebook = require('../assets/svg/facebook.svg');
const VideoInfo: AVPlaybackSource = require('../assets/video/Cat.mp4');
const VideoContainer: AVPlaybackSource = require('../assets/video/clip3.mp4');

export {
  slides,
  pictureWelcome,
  pictureContainer,
  VideoContainer,
  iconFacebook,
  AvatarGuest,
  DrawnItemList,
  ButtonPicture,
  BackgroundPicture,
  VideoInfo,
};
