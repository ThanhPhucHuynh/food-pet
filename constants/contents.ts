interface slidesProps {
  label: string;
  title: string;
  description: string;
  color: string;
  picture: any;
}
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
      'The items for pets are diverse from food, drinks, toiletries, toys to clothes ...',
    color: '#BEECC4',
    picture: require('../assets/images/c1.png'),
  },
  {
    label: 'Relaxed',
    title: 'Relaxed for pets ',
    description:
      'Pets can help you relax because they prevent you from feeling as much isolation and pain as you might have felt without them',
    color: '#FFE4D9',
    picture: require('../assets/images/c1.png'),
  },
  {
    label: 'PetCare',
    title: 'Take cake of pets',
    description:
      'Here are some of the tips which will help you to take good care of your pet and keep them happy, active and healthy. We can look after your pets',
    color: '#FFDDDD',
    picture: require('../assets/images/c1.png'),
  },
];

export { slides };
