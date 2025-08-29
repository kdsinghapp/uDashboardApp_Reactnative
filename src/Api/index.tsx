import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { PermissionsAndroid, Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export interface ApiRequest {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT';
  data?: any;
  headers?: Record<string, string>;
  token?: string;
  redirect?:any
}

export const base_url = 'https://server-php-8-3.technorizen.com/GiantWallet/api/';
export const image_url = 'https://server-php-8-3.technorizen.com/GiantWallet/api/';

 
export const callMultipleApis = async (requests: ApiRequest[]) => {
  try {
    const responses: AxiosResponse[] = await Promise.all(
      requests.map((req) => {
 
        const config: AxiosRequestConfig = {
          method: req.method || 'GET',
          url: `${base_url}${req.endpoint}`,
          data: (req.method === 'POST' || req.method === 'PUT') ? req.data : undefined,
          headers: {
            'Content-Type': req.data instanceof FormData ? 'multipart/form-data' : 'application/json',
            ...(req.token ? { Authorization: `Bearer ${req.token}` } : {}),
            ...req.headers,
          },
        };

        return axios(config);
      })
    );

    // Return only data from all responses
    return responses.map((res) => res.data);

  } catch (error) {
    console.error('API Error:', error);

    // Optional: You can customize how you want to handle the error (log, rethrow, etc.)
    throw error;
  }
};


export const callApi = async (
  method: string, 
  url: string, 
  headers: any = {}, 
  data: any = null
): Promise<any> => {
  try {
    // Configure the API request
    const config: AxiosRequestConfig = {
      method: method,
      url: url,
      headers: {
        'Content-Type': 'application/json',
        ...headers, // Add custom headers if provided
      },
      data: data, // Add request body if method is POST/PUT
    };

    // Make the API call using axios
    const response: AxiosResponse = await axios(config);

    // Return the response data
    return response.data;

  } catch (error) {
    console.error('Error occurred while making API call:', error);

    // Handle error, you can throw or return a custom error message
    if (error.response) {
      // Server responded with an error
      throw new Error(`API call failed: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      // No response was received
      throw new Error('No response received from API');
    } else {
      // Something else went wrong
      throw new Error(`API call failed: ${error.message}`);
    }
  }
};



export const requestCameraPermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      ]);

      return (
        granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (error) {
      console.warn('Permission request error:', error);
      return false;
    }
  }
  return true; // iOS handles permissions automatically
};

export const captureImage = async () => {
  const hasPermissions = await requestCameraPermissions();
  if (!hasPermissions) {
    console.log('Camera permission denied');
    return null;
  }

  try {
    const image = await ImagePicker.openCamera({
      cameraType: 'front', // Opens the front camera only
      cropping: false, // You can enable cropping if needed
      compressImageQuality: 0.8, // Adjust image quality
    });
    return image; // Return the image object
  } catch (error) {
    console.log('Camera error:', error);
    return null;
  }
};
