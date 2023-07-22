import {Image, useWindowDimensions, FlatList} from 'react-native';
import React, {FC, memo, useEffect, useState} from 'react';
import Box from '../themes/Box';
import firestore from '@react-native-firebase/firestore';
import {IPost} from '../screens/home/Home';
import {IUser} from '../screens/profile/Profile';

interface IProps {
  profile: IUser | undefined;
}

const PostGrid: FC<IProps> = ({profile}) => {
  const {width, height} = useWindowDimensions();
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    getUsersPost();
  }, [profile]);

  const getUsersPost = async () => {
    if (profile) {
      firestore()
        .collection('posts')
        .where('userId', '==', profile.userId)
        .get()
        .then(res => {
          const postData = res.docs.map(doc => {
            return doc.data() as IPost;
          });
          setPosts(postData);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <Box>
      <FlatList
        data={posts}
        scrollEnabled
        style={{marginBottom: 310}}
        numColumns={3}
        renderItem={({item}) => (
          <Box>
            <Image
              source={{
                uri: item.image,
              }}
              style={{width: (width - 4) / 3, height: 140}}
            />
          </Box>
        )}
        ItemSeparatorComponent={() => <Box height={2}></Box>}
        columnWrapperStyle={{gap: 2}}
      />
    </Box>
  );
};

export default memo(PostGrid);
