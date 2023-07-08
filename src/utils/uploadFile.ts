import storage from '@react-native-firebase/storage';

const uploadFile = async (fileName: string, pathToFile: string) => {
  try {
    const reference = storage().ref(fileName);
    await reference.putFile(pathToFile);
    const imageUrl = await storage().ref(fileName).getDownloadURL();
    return imageUrl;
  } catch (error) {
    console.log(error);
  }
};

export default uploadFile;
