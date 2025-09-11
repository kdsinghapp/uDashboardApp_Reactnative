import { base_url } from './index';
import ScreenNameEnum from '../routes/screenName.enum';
import { loginSuccess } from '../redux/feature/authSlice';
import { errorToast, successToast } from '../utils/customToast';
import { getSuccess } from '../redux/feature/featuresSlice';
import { MapApiKey } from '../redux/Api';
import moment from 'moment';

const LoginCustomer = (
    param: any,
    setLoading: (loading: boolean) => void,
    dispatch: any) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formdata = new FormData();
        formdata.append("email", param?.email);
        formdata.append("password", param?.password);
        // formdata.append("type", param?.roleType);
        // formdata.append("device_id", param?.token);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        console.log(param)
        const respons = fetch(`${base_url}auth/login`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    dispatch(loginSuccess({ userData: response?.user, token: response?.token, }));
                    param?.navigation.replace("MainDrawer")
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const SinupCustomer = (params: any,
    setLoading: (loading: boolean) => void,) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formdata = new FormData();
        formdata.append("first_name", params?.fname);
        formdata.append("last_name", params?.lName);
        // formdata.append("mobile", params?.phone);
        formdata.append("password", params?.password);
        formdata.append("email", params?.email);
        // formdata.append("type", params?.roleType);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        console.log(formdata)
        const respons = fetch(`${base_url}auth/signup`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response.status == '1') {
                    successToast(
                        response?.message
                    );
                    console.log(response)
                    params.navigation.navigate(ScreenNameEnum.LoginScreen);
                    return response
                } else {
                    errorToast(
                        response.message,
                    );
                    console.log(response)

                    return response
                }
            })
            .catch((error) => console.error(error));
        return respons
    } catch (error) {
        errorToast(
            'Network error',
        );
    }
};


const restEmailOtpScreen = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formdata = new FormData();
        formdata.append("email", param?.email || param?.mobile);
        formdata.append("type", param?.type);
        console.log(formdata)
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        const respons = fetch(`${base_url}/forget_password`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    param.navigation.navigate(ScreenNameEnum.OtpScreen, {
                        id: response?.result?.id,
                        email: param?.email,
                        type: param?.type
                    })
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    console.log(response)
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const otp_Verify = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formdata = new FormData();
        formdata.append("user_id", param?.id);
        formdata.append("otp", param?.otp);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        const respons = fetch(`${base_url}/otpVerify`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    param.navigation.navigate(ScreenNameEnum.CreatePassword, {
                        userId: param?.id
                    })
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const updatePassword = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formdata = new FormData();
        formdata.append("user_id", param?.userId);
        formdata.append("password", param?.confirmPassword);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        const respons = fetch(`${base_url}/update_password`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response?.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const GetCallbackListApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);


        const requestOptions = {

            method: "GET",
            headers: myHeaders,
        };

        const respons = fetch(`${base_url}callbacks?page=1&limit=1000`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.status == '1') {
                    setLoading(false)

                    return response
                } else {
                    setLoading(false)
                    // errorToast(
                    //     response.error,
                    // );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};


const GetCallbackApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);

        const formData = new FormData();
        // formData.append("user_id", param?.id ?? '');

        const requestOptions = {

            method: "GET",
            headers: myHeaders,
            // body: formData,
        };
        console.log("formData", formData)
        const respons = fetch(`${base_url}callbacks/${param?.id}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.status == '1') {
                    setLoading(false)
                    // successToast(
                    //     response?.message
                    // );
                    // param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.error,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const GetDeletedCallbackApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);

        const formData = new FormData();
        // formData.append("user_id", param?.id ?? '');

        const requestOptions = {

            method: "GET",
            headers: myHeaders,
            // body: formData,
        };
        console.log("formData", formData)
        const respons = fetch(`${base_url}callbacks?page=1&limit=1000&callback=deleted`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.status) {
                    setLoading(false)
                    // successToast(
                    //     response?.message
                    // );
                    // param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.error,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const DeleteCallbackApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);

        const formData = new FormData();
        formData.append("_method", "PUT");
        const requestOptions = {

            method: "DELETE",
            headers: myHeaders,
            body: formData,
        };
        console.log("formData", formData)
        const respons = fetch(`${base_url}callbacks/${param?.id}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.status == '1') {
                    setLoading(false)
                    // successToast(
                    //     response?.message
                    // );
                    // param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.error,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};


const RestoreCallbackApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);

        const formData = new FormData();
        // formData.append("_method", "PUT");
        const requestOptions = {

            method: "POST",
            headers: myHeaders,
            // body: formData,
            redirect: "follow"
        };
        // console.log("formData", `${base_url}callbacks/${param?.id}/restore`)
        const respons = fetch(`${base_url}callbacks/${param?.id}/restore`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.status) {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    // param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.error,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const AddCallbackApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);


        const formdata = new FormData();
        formdata.append("task_name", param?.task);
        formdata.append("employee_id", (param?.employeeId) ?? "1"); // map actual employee id
        formdata.append("estimated_time", param?.estimateTime);
        formdata.append("start_date", param?.startDate.toISOString().split("T")[0]);
        formdata.append("start_time", moment(param?.startTime).format("HH:mm"));
        formdata.append("end_date", param?.endDate.toISOString().split("T")[0]);
        formdata.append("end_time", moment(param?.endTime).format("HH:mm"));
        formdata.append("priority_id", param?.priorityId ?? "1");
        // formdata.append("status_id", "2");
        formdata.append("status_id", param?.statusId ?? "1");
        formdata.append("details", param?.details);
        console.log(formdata, 'this is formdaata')
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        console.log("formData", formdata)
        const respons = fetch(`${base_url}callbacks`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    param.navigation.goBack()
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.error,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const UpdateCallbackApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);


        const formdata = new FormData();
        formdata.append("task_name", param?.task);
        formdata.append("employee_id", "1"); // map actual employee id
        formdata.append("estimated_time", param?.estimateTime);
        formdata.append("start_date", param?.startDate.toISOString().split("T")[0]);
        formdata.append("start_time", moment(param?.startTime).format("HH:mm"));
        formdata.append("end_date", param?.endDate.toISOString().split("T")[0]);
        formdata.append("end_time", moment(param?.endTime).format("HH:mm"));
        formdata.append("priority_id", param?.priorityId);
        formdata.append("status_id", param?.statusId);
        formdata.append("details", param?.details);
        formdata.append("_method", "PUT");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        console.log("formData", formdata)
        const respons = fetch(`${base_url}callbacks/${param?.id}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    param.navigation.goBack()
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.error,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};


const GetAllListApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);


        const requestOptions = {

            method: "GET",
            headers: myHeaders,
        };

        const respons = fetch(`${base_url}notes/create`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.status == '1') {
                    setLoading(false)

                    return response
                } else {
                    setLoading(false)
                    // errorToast(
                    //     response.error,
                    // );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
// Employ




const GetEmployListApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);


        const requestOptions = {

            method: "GET",
            headers: myHeaders,
        };

        const respons = fetch(`${base_url}employees?page=1&limit=100`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response employeee", response)
                if (response.status) {
                    setLoading(false)

                    return response
                } else {
                    setLoading(false)
                    // errorToast(
                    //     response.error,
                    // );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};


const GetEmployApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);

        const formData = new FormData();
        // formData.append("user_id", param?.id ?? '');

        const requestOptions = {

            method: "GET",
            headers: myHeaders,
            // body: formData,
        };
        console.log("formData", formData)
        const respons = fetch(`${base_url}employee/${param?.id}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.status == '1') {
                    setLoading(false)
                    // successToast(
                    //     response?.message
                    // );
                    // param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.error,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const GetDeletedEmployApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);

        const formData = new FormData();
        // formData.append("user_id", param?.id ?? '');

        const requestOptions = {

            method: "GET",
            headers: myHeaders,
            // body: formData,
        };
        console.log("formData", formData)
        const respons = fetch(`${base_url}employees?page=1&limit=1000&employee=deleted`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.status) {
                    setLoading(false)
                    // successToast(
                    //     response?.message
                    // );
                    // param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.error,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const DeleteEmployApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);

        const formData = new FormData();
        formData.append("_method", "PUT");
        const requestOptions = {

            method: "DELETE",
            headers: myHeaders,
            body: formData,
        };
        console.log("formData", formData)
        const respons = fetch(`${base_url}employees/${param?.id}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.success) {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    // param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};


const RestoreEmployApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);

        const formData = new FormData();
        // formData.append("_method", "PUT");
        const requestOptions = {

            method: "POST",
            headers: myHeaders,
            // body: formData,
            redirect: "follow"
        };
        // console.log("formData", `${base_url}callbacks/${param?.id}/restore`)
        const respons = fetch(`${base_url}employees/${param?.id}/restore`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.success) {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    // param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const AddEmployApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);


        const formdata = new FormData();
        formdata.append("first_name", param?.first_name ?? "");
        formdata.append("last_name", param?.last_name ?? "");
        formdata.append("email", param?.email ?? "");
        formdata.append("phone", param?.phone ?? "");
        formdata.append("country_phone_code", param?.countryCode ?? "");
        formdata.append("position_id", "1");
        // formdata.append("position_id", param?.position ?? "");
        formdata.append("salary", param?.salary ?? "");
        formdata.append("pay_type", param?.payType ?? "monthly");
        formdata.append("start_date", param?.startDate.toISOString().split("T")[0]);

        formdata.append("termination_date", param?.terminationDate.toISOString().split("T")[0]);
        formdata.append("status", param?.status ?? "");
        formdata.append("employment_type", param?.employmentType ?? "");
        formdata.append("last_increment_date", param?.lastIncrementDate.toISOString().split("T")[0]);
        formdata.append("bonus_eligible", param?.bonusEligible == 'yes' ? 1 : 0);
        formdata.append("notes", param?.notes ?? "");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        console.log("formData", formdata)
        const respons = fetch(`${base_url}employees`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.success) {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    param.navigation.goBack()
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const UpdateEmployApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);


        const formdata = new FormData();
        formdata.append("first_name", param?.first_name ?? "");
        formdata.append("last_name", param?.last_name ?? "");
        formdata.append("email", param?.email ?? "");
        formdata.append("phone", param?.phone ?? "");
        formdata.append("country_phone_code", param?.countryCode ?? "");
        formdata.append("position_id", "1");
        // formdata.append("position_id", param?.position ?? "");
        formdata.append("salary", param?.salary ?? "");
        formdata.append("pay_type", param?.payType ?? "monthly");
        formdata.append("start_date", param?.startDate.toISOString().split("T")[0]);

        formdata.append("termination_date", param?.terminationDate.toISOString().split("T")[0]);
        formdata.append("status", param?.status ?? "");
        formdata.append("employment_type", param?.employmentType ?? "");
        formdata.append("last_increment_date", param?.lastIncrementDate.toISOString().split("T")[0]);
        formdata.append("bonus_eligible", param?.bonusEligible == 'yes' ? 1 : 0);
        formdata.append("notes", param?.notes ?? "");
        formdata.append("_method", "PUT");


        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        console.log("formData", formdata)
        const respons = fetch(`${base_url}employees/${param?.id}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.success) {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    param.navigation.goBack()
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};


// Notes



const GetNotesListApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };
        const respons = fetch(`${base_url}notes?page=1&limit=100`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response employeee", response)
                if (response.success) {
                    setLoading(false)

                    return response
                } else {
                    setLoading(false)
                    // errorToast(
                    //     response.error,
                    // );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};


const GetNotesApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);

        const formData = new FormData();
        // formData.append("user_id", param?.id ?? '');

        const requestOptions = {

            method: "GET",
            headers: myHeaders,
            // body: formData,
        };
        console.log("formData", formData)
        const respons = fetch(`${base_url}notes/${param?.id}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.success) {
                    setLoading(false)
                    // successToast(
                    //     response?.message
                    // );
                    // param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const GetDeletedNotesApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);

        const formData = new FormData();
        // formData.append("user_id", param?.id ?? '');

        const requestOptions = {

            method: "GET",
            headers: myHeaders,
            // body: formData,
        };
        console.log("formData", formData)
        const respons = fetch(`${base_url}notes?page=1&limit=1000&note=deleted`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.success) {
                    setLoading(false)
                    // successToast(
                    //     response?.message
                    // );
                    // param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const DeleteNotesApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);

        const formData = new FormData();
        // formData.append("_method", "PUT");
        const requestOptions = {

            method: "GET",
            headers: myHeaders,
            // body: formData,
        };
        console.log("formData", formData)
        const respons = fetch(`${base_url}notes/delete/${param?.id}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.success) {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    // param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};


const RestoreNotesApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);

        const formData = new FormData();
        // formData.append("_method", "PUT");
        const requestOptions = {

            method: "GET",
            headers: myHeaders,
            // body: formData,
            redirect: "follow"
        };
        // console.log("formData", `${base_url}callbacks/${param?.id}/restore`)
        const respons = fetch(`${base_url}notes/restore/${param?.id}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.success) {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    // param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const AddNotesApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);


        const formdata = new FormData();
        formdata.append("task", param?.task ?? "");
        formdata.append("details", param?.details ?? "");
        formdata.append("category_id", param?.categoryId ?? "");
        formdata.append("callback_id", param?.callbackId ?? "");
        formdata.append("tags[0]", 1);
        // formdata.append("tags[0]", param?.tags ?? "");
        formdata.append("calendar_event_date", param?.calendarDate.toISOString().split("T")[0]);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        console.log("formData", formdata)
        const respons = fetch(`${base_url}notes`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.success) {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    param.navigation.goBack()
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const UpdateNotesApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);


        const formdata = new FormData();
        formdata.append("task", param?.task ?? "");
        formdata.append("details", param?.details ?? "");
        formdata.append("category_id", param?.categoryId ?? "");
        formdata.append("callback_id", param?.callbackId ?? "");
        formdata.append("tags[0]", 1);
        // formdata.append("tags[0]", param?.tags ?? "");
        formdata.append("calendar_event_date", param?.calendarDate.toISOString().split("T")[0]);
        formdata.append("_method", "PUT");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        console.log("formData", formdata)
        const respons = fetch(`${base_url}notes/update/${param?.id}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("--------ddv response", response)
                if (response.success) {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    param.navigation.goBack()
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const GetCategoryListApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };
        const respons = fetch(`${base_url}notes/categories/list?page=1&limit=100`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response employeee", response)
                if (response.success) {
                    setLoading(false)

                    return response
                } else {
                    setLoading(false)
                    // errorToast(
                    //     response.error,
                    // );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};


const GetCategoryApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);

        const formData = new FormData();
        // formData.append("user_id", param?.id ?? '');

        const requestOptions = {

            method: "GET",
            headers: myHeaders,
            // body: formData,
        };
        console.log("formData", formData)
        const respons = fetch(`${base_url}notes/categories/${param?.id}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.success) {
                    setLoading(false)
                    // successToast(
                    //     response?.message
                    // );
                    // param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const GetDeletedCategoryApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);

        const formData = new FormData();
        // formData.append("user_id", param?.id ?? '');

        const requestOptions = {

            method: "GET",
            headers: myHeaders,
            // body: formData,
        };
        console.log("formData", formData)
        const respons = fetch(`${base_url}notes/categories/list?page=1&limit=1000&category=deleted`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.success) {
                    setLoading(false)
                    // successToast(
                    //     response?.message
                    // );
                    // param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const DeleteCategoryApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);

        const formData = new FormData();
        // formData.append("_method", "PUT");
        const requestOptions = {

            method: "DELETE",
            headers: myHeaders,
            // body: formData,
        };
        console.log("formData", formData)
        const respons = fetch(`${base_url}notes/categories/delete/${param?.id}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.success) {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    // param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};


const RestoreCategoryApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);

        const formData = new FormData();
        // formData.append("_method", "PUT");
        const requestOptions = {

            method: "GET",
            headers: myHeaders,
            // body: formData,
            redirect: "follow"
        };
        // console.log("formData", `${base_url}callbacks/${param?.id}/restore`)
        const respons = fetch(`${base_url}notes/categories/restore/${param?.id}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.success) {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    // param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const AddCategoryApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);


        const formdata = new FormData();
        formdata.append("name", param?.name ?? "");
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        console.log("formData", formdata)
        const respons = fetch(`${base_url}notes/categories`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.success) {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    param.navigation.goBack()
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const UpdateCategoryApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);


        const formdata = new FormData();
        formdata.append("name", param?.name ?? "");
        formdata.append("_method", "PUT");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        console.log("formData", formdata)
        const respons = fetch(`${base_url}notes/categories/update/${param?.id}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("--------ddv response", response)
                if (response.success) {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    param.navigation.goBack()
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const GetTagListApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };
        const respons = fetch(`${base_url}notes/tags/list?page=1&limit=100`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response employeee", response)
                if (response.success) {
                    setLoading(false)

                    return response
                } else {
                    setLoading(false)
                    // errorToast(
                    //     response.error,
                    // );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};


const GetTagApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);

        const formData = new FormData();
        // formData.append("user_id", param?.id ?? '');

        const requestOptions = {

            method: "GET",
            headers: myHeaders,
            // body: formData,
        };
        console.log("formData", formData)
        const respons = fetch(`${base_url}notes/tags/${param?.id}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.success) {
                    setLoading(false)
                    // successToast(
                    //     response?.message
                    // );
                    // param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const GetDeletedTagApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);
        const formData = new FormData();
        // formData.append("user_id", param?.id ?? '');

        const requestOptions = {

            method: "GET",
            headers: myHeaders,
            // body: formData,
        };
        console.log("formData", formData)
        const respons = fetch(`${base_url}notes/tags/list?page=1&limit=1000&tag=deleted`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.success) {
                    setLoading(false)
                    // successToast(
                    //     response?.message
                    // );
                    // param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const DeleteTagApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);

        const formData = new FormData();
        // formData.append("_method", "PUT");
        const requestOptions = {

            method: "DELETE",
            headers: myHeaders,
            // body: formData,
        };
        console.log("formData", formData)
        const respons = fetch(`${base_url}notes/tags/delete/${param?.id}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.success) {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    // param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};


const RestoreTagApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);

        const formData = new FormData();
        // formData.append("_method", "PUT");
        const requestOptions = {

            method: "GET",
            headers: myHeaders,
            // body: formData,
            redirect: "follow"
        };
        // console.log("formData", `${base_url}callbacks/${param?.id}/restore`)
        const respons = fetch(`${base_url}notes/tags/restore/${param?.id}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.success) {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    // param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const AddTagApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);


        const formdata = new FormData();
        formdata.append("name", param?.name ?? "");
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        console.log("formData", formdata)
        const respons = fetch(`${base_url}notes/tags`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("---- ----ddv response", response)
                if (response.success) {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    param.navigation.goBack()
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const UpdateTagApi = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    console.log("param", param)
    try {

        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${param.token}`);


        const formdata = new FormData();
        formdata.append("name", param?.name ?? "");
        formdata.append("_method", "PUT");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        console.log("formData", formdata)
        const respons = fetch(`${base_url}notes/tags/update/${param?.id}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("--------ddv response", response)
                if (response.success) {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    param.navigation.goBack()
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const Get_Priority_Api = (
    setLoading: (loading: boolean) => void,
) => {
    try {
        setLoading(true)

        const requestOptions = {
            method: "GET",
        };
        const respons = fetch(`${base_url}common/callback-priorities`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("----response", response)
                if (response.status) {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    return response.data
                } else {
                    setLoading(false)

                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const Get_Status_Api = (
    setLoading: (loading: boolean) => void,
) => {
    try {
        setLoading(true)

        const requestOptions = {
            method: "GET",
        };
        const respons = fetch(`${base_url}common/callback-statuses`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("----response", response)
                if (response.status) {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    return response.data
                } else {
                    setLoading(false)
                    // errorToast(
                    //     response.error,
                    // );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const Policies_Api = (
    setLoading: (loading: boolean) => void,
) => {
    try {
        setLoading(true)

        const requestOptions = {
            method: "GET",
        };
        const respons = fetch(`${base_url}/privacy-policy.php`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("----response", response)
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.error,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const EditProfile_Api = (
    param: any,
    setLoading: (loading: boolean) => void,
    navigation: any
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formData = new FormData();
        if (param.images) {
            formData.append("image", {
                uri: param.images.path,          // Make sure param.image.path is a valid file URI
                type: 'image/jpeg',
                name: 'image.jpg'
            });
        }
        formData.append("first_name", param?.first_name);
        formData.append("last_name", param?.last_name);
        formData.append("user_id", param?.userId);
        formData.append("license_date", param?.date ?? null);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formData,
        };
        console.log(formData)
        const respons = fetch(`${base_url}/update_profile`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    getSuccess({
                        userGetData: response.result,
                    })
                    console.log(response)

                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const GetUserApi = async (params: any, setLoading: (loading: boolean) => void) => {
    // const dispatch = useDispatch()
    try {
        setLoading(true)

        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formdata = new FormData();
        formdata.append("user_id", params);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        const response = await fetch(`${base_url}/get_profile`, requestOptions);
        const resText = await response.text();
        const responseData = JSON.parse(resText);
        console.log(responseData)
        if (responseData.status === '1') {
            setLoading(false)
            return { userGetData: responseData.result, };
        } else {
            errorToast(responseData.message);
            setLoading(false)

            //   return thunkApi.rejectWithValue(responseData);
        }
    } catch (error) {
        errorToast('Network error');
        setLoading(false)

        // return thunkApi.rejectWithValue(error);
    }
}

const Support_Api = (
    supportHelp: any,
    setLoading: (loading: boolean) => void,
    id: any,
    navigation: any
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formData = new FormData();
        formData.append("user_id", id);
        formData.append("message", supportHelp);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formData,
        };
        const respons = fetch(`${base_url}/create-support-inquiries`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    navigation.goBack();
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const ChangePass_Api = (
    data: any,
    id: any,
    setLoading: (loading: boolean) => void,
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formData = new FormData();
        formData.append("old_password", data?.oldpassw);
        formData.append("password", data?.password);
        formData.append("confirm_password", data?.confirmPassword);
        formData.append("user_id", id);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formData,
        };
        const respons = fetch(`${base_url}change_password`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response?.status === "0") {
                    errorToast(
                        response.error,
                    );
                }
                if (response?.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    return response
                } else {
                    setLoading(false);
                    errorToast(
                        response.error,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const Get_Notification_Api = async (
    setLoading: (loading: boolean) => void,
    id: string
) => {
    setLoading(true); // Start loading
    try {
        const requestOptions = {
            method: "GET",
        };
        const response = await fetch(`${base_url}/get_post?user_id=${id}`, requestOptions);
        const resText = await response.text();
        const responseData = JSON.parse(resText);
        setLoading(false);
        // Check API response status
        if (responseData.status === "1") {
        } else {
            errorToast(responseData.error);
        }
        return responseData; // ✅ Return correct response object
    } catch (error) {
        errorToast("Network error");
        return null; // Return null in case of failure
    } finally {
        setLoading(false); // Stop loading regardless of success or failure
    }
};
export {
    GetUserApi,
    Get_Notification_Api, SinupCustomer,
    Support_Api, Policies_Api,
    ChangePass_Api, EditProfile_Api, updatePassword,
    restEmailOtpScreen, LoginCustomer, otp_Verify,
    GetCallbackListApi, GetCallbackApi, AddCallbackApi, DeleteCallbackApi, GetDeletedCallbackApi, RestoreCallbackApi, UpdateCallbackApi,
    GetEmployListApi, GetEmployApi, AddEmployApi, DeleteEmployApi, GetDeletedEmployApi, RestoreEmployApi, UpdateEmployApi,
    GetNotesListApi, GetNotesApi, AddNotesApi, DeleteNotesApi, GetDeletedNotesApi, RestoreNotesApi, UpdateNotesApi,
    Get_Status_Api, Get_Priority_Api, GetAllListApi,
    GetCategoryListApi, GetCategoryApi, AddCategoryApi, DeleteCategoryApi, GetDeletedCategoryApi, RestoreCategoryApi, UpdateCategoryApi,
    GetTagListApi, GetTagApi, AddTagApi, DeleteTagApi, GetDeletedTagApi, RestoreTagApi, UpdateTagApi,

}  