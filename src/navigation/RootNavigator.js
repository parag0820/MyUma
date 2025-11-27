import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Screens
import Splash from '../screens/Splash';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import Category from '../screens/Category';
import Search from '../screens/Search';
import Setting from '../screens/Setting';
import CategorySearchScreen from '../screens/CategorySearchScreen';
import WishList from '../screens/WishList';
import AboutUs from '../screens/AboutUs';
import Profile from '../screens/Profile';
import Blog from '../screens/Blog';
import CustomDrawerContent from '../custom/CustomDrawerContent';
import blogDetails from '../screens/BlogDetails';
import ForgetPassword from '../screens/ForgetPassword';
import ChangePassword from '../screens/ChangePassword';
import TermsAndConditions from '../screens/TermsAndConditions';
import MapScreen from '../screens/MapScreen';
import Pricing from '../screens/Pricing';
import MyBookingList from '../screens/MyBookingList';
import ServiceDetail from '../screens/ServiceDetail';
import BookingHistory from '../screens/BookingHistory';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ActivatedPlan from '../screens/ActivatedPlan';
import BlogDetails from '../screens/BlogDetails';
import Message from '../screens/Message';
import Checkout from '../screens/Checkout';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Category Stack
function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{headerShown: true}}
      />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen
        name="catSearch"
        component={CategorySearchScreen}
        options={{title: 'Search Result'}}
      />
      <Stack.Screen
        name="ServiceDetail"
        component={ServiceDetail}
        options={{title: 'Service Detail'}}
      />
    </Stack.Navigator>
  );
}
// Category Stack
function CategoryStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Category"
        component={Category}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen
        name="catSearch"
        component={CategorySearchScreen}
        options={{title: 'Search Result'}}
      />
      <Stack.Screen
        name="ServiceDetail"
        component={ServiceDetail}
        options={{title: 'Service Detail'}}
      />
    </Stack.Navigator>
  );
}

// Setting Stack
function SettingStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{headerShown: false}}
      />
      <Stack.Screen name="catSearch" component={CategorySearchScreen} />
      <Stack.Screen
        name="wishList"
        component={WishList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ActivePlan"
        component={ActivatedPlan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BookingHistory"
        component={BookingHistory}
        options={{headerShown: true, title: 'Booking History'}}
      />
      <Stack.Screen
        name="TearmsAndConditions"
        component={TermsAndConditions}
        options={{headerShown: true, title: 'Terms & Conditions'}}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{headerShown: true, title: 'About Us'}}
      />
      <Stack.Screen
        name="Message"
        component={Message}
        options={{headerShown: true, title: 'Message'}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: true, title: 'Profile'}}
      />
      <Stack.Screen
        name="Pricing"
        component={Pricing}
        options={{headerShown: true, title: 'Pricing'}}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{headerShown: true, title: 'Checkout'}}
      />
      <Stack.Screen
        name="MyBookingList"
        component={MyBookingList}
        options={{headerShown: true, title: 'My Booking'}}
      />
      <Stack.Screen
        name="map"
        component={MapScreen}
        options={{headerShown: true, title: 'map'}}
      />
      <Stack.Screen
        name="Blog"
        component={Blog}
        options={{headerShown: true, title: 'Blog'}}
      />
      <Stack.Screen
        name="blogDetail"
        component={BlogDetails}
        options={{headerShown: true, title: 'Blog Details'}}
      />
    </Stack.Navigator>
  );
}

// Bottom Tabs
function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          // backgroundColor: '#006064',
          // borderTopLeftRadius: 16,
          // borderTopRightRadius: 16,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        // tabBarActiveTintColor: '#154360',
        // tabBarInactiveTintColor: '#fff',

        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home')
            iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Category')
            iconName = focused ? 'grid' : 'grid-outline';
          else if (route.name === 'Search')
            iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Setting')
            iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarActiveTintColor: '#80cbc4',
          tabBarInactiveTintColor: 'gray',
        }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryStackNavigator}
        options={{
          tabBarActiveTintColor: '#80cbc4',
          tabBarInactiveTintColor: 'gray',
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarActiveTintColor: '#80cbc4',
          tabBarInactiveTintColor: 'gray',
        }}
      />

      <Tab.Screen
        name="Setting"
        component={SettingStackNavigator}
        options={{
          tabBarActiveTintColor: '#80cbc4',
          tabBarInactiveTintColor: 'gray',
        }}
      />
    </Tab.Navigator>
  );
}

// Drawer
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={({navigation}) => ({
        headerTintColor: '#000',
        headerTitle: () => (
          <Image
            source={require('../assets/myuma_logo.png')}
            style={{width: 100, height: 40, resizeMode: 'contain'}}
          />
        ),
        headerStyle: {backgroundColor: '#fff'},
        headerStyle: {
          backgroundColor: '#fff', // change this to any color you want
          // backgroundColor: '#2471a3', // change this to any color you want
        },

        headerRight: () => (
          <>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Main Tabs', {
                  screen: 'Setting',
                  params: {screen: 'ActivePlan'},
                })
              }>
              <Icon name="crown" size={24} color="#2b552dff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Main Tabs', {
                  screen: 'Setting',
                  params: {screen: 'wishList'},
                })
              }
              style={{marginHorizontal: 20}}>
              <Ionicons name="heart" color="#C11C84" size={24} />
            </TouchableOpacity>
          </>
        ),
      })}>
      <Drawer.Screen name="Main Tabs" component={BottomTabNavigator} />
      <Drawer.Screen name="Blog" component={Blog} />
      <Drawer.Screen name="blogDetail" component={blogDetails} />
    </Drawer.Navigator>
  );
}

// Root Navigator
export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="forget"
          component={ForgetPassword}
          options={{headerShown: true, title: 'Forget Password'}}
        />
        <Stack.Screen
          name="changePassword"
          component={ChangePassword}
          options={{headerShown: true, title: 'Change Password'}}
        />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="Pricing"
          component={Pricing}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{headerShown: true}}
        />
        <Stack.Screen name="BottomNav" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
