import {IUser} from '../screens/Profile';

export type IRootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Main: undefined;
  Notifications: undefined;
  ShowStory: undefined;
  EditProfile: {profile: IUser | undefined};
  AddReels: undefined;
};

export type IRootTabParamList = {
  Home: undefined;
  Search: undefined;
  AddPost: undefined;
  Reels: undefined;
  Profile: undefined;
};
