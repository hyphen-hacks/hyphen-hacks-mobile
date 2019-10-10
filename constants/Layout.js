import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width <= 375,
  underlineFormula: (text, fontSize) => text.length * (fontSize * 0.58 + 1.71)
};
