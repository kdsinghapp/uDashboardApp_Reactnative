import { Platform, PermissionsAndroid, Alert } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { MapApiKey } from '../redux/Api';

 
// Request Location Permission
const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn('Permission Error:', err);
            return false;
        }
    } else if (Platform.OS === 'ios') {
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        return result === RESULTS.GRANTED;
    }
    return false;
};

// Fetch Current Location (with retry mechanism)
const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
        Alert.alert('Permission Denied', 'Location permission is required to fetch your address.');
        return null;
    }

    // const fetchLocation = (highAccuracy) => {
    //     return new Promise((resolve, reject) => {
    //         Geolocation.getCurrentPosition(
    //             (position) => {
    //                 const { latitude, longitude } = position.coords;
    //                 resolve({ latitude, longitude });
    //             },
    //             (error) => {
    //                 if (highAccuracy) {
    //                     fetchLocation(false) // Retry with low accuracy
    //                         .then(resolve)
    //                         .catch(reject);
    //                 } else {
    //                     reject(error);
    //                 }
    //             },
    //             {
    //                 enableHighAccuracy: highAccuracy,
    //                 timeout: 20000,
    //                 maximumAge: 10000,
    //             }
    //         );
    //     });
    // };

    try {
        // const location = await fetchLocation(true); // Start with high accuracy
        // console.log('User Location:', location);
        // return location;
    } catch (error) {
        // Alert.alert('Location Error', error.message);
        // console.error('Location Error:', error.message);
        return null;
    }
};

// Fetch Address from Latitude & Longitude
// const getAddressFromCoordinates = async (latitude, longitude) => {
//     try {
//         const response = await fetch(
//             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MapApiKey}`
//         );
//         const data = await response.json();
//         if (data.status === 'OK' && data.results.length > 0) {
//             return data.results[0].formatted_address;
//         } else {
//             return 'Address not found';
//         }
//     } catch (error) {
//         console.error('Geocoding Error:', error);
//         return 'Error fetching address';
//     }
// };

// Function to Fetch Location and Address
 

export { getCurrentLocation,requestLocationPermission };
