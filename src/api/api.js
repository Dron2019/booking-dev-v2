import axios from "axios";

import getBookInfoMock from "./mocks/getBookInfoMock.json";
import getDiscountRequestMock from "./mocks/getDiscountRequestMock.json";
import config from "../config.json";


export const isDev = /localhost/.test(window.location.href);
//checkFlatUpdates

export function getBookInfo(flatId) {

    if (isDev) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (config.DISABLE_DISCOUNT) {
                    resolve({
                        data:  {
                            data: {
                                data: {
                                    ...getBookInfoMock,
                                    discount_range: "2"
                                }
                            }
                        }
                    });
                    return 
                }
                resolve({
                    data: {
                        data: {
                            data: getBookInfoMock
                        }
                    }
                });
            }, 0);
        });
    }

    const fd = new FormData();
    fd.append("flat_id", flatId);
    fd.append("action", "getBookInfo");

    return axios.post(`/wp-admin/admin-ajax.php`, fd);
}


export function getDiscountRequest(data = {}) {

    if (isDev) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    data: getDiscountRequestMock
                });
            }, 1000);
        });
    }

    const fd = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        fd.append(key, value);
    });

    fd.append("action", "discountRequest");

    return axios.post(`/wp-admin/admin-ajax.php`, fd);
}


export const getPayment = (data = {}) => {


    if (isDev) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    data: {
                        'status': 'success',
                        'data': 'Booking get Payment is okay'
                    }
                });
            }, 1000);
        });
    }

    const fd = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        fd.append(key, value);
    });

    fd.append("action", "getPayment");
    return axios.post(`/wp-admin/admin-ajax.php`, fd);
}


export const getStatusPayment = (created_id) => {
    const fd = new FormData();

    if (isDev) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    data: {
                        "success": true,
                        "data": {
                            "status": "success",
                            "liqpay_order_id": "EF9LQTW31704960546270015",
                            "description": "Бронювання квартири 117",
                            "amount": 1500,
                            "currency": "UAH",
                            "email": "",
                            "phone": "3806666666",
                            "name": "Ім/я",
                            "second_name": "вапр",
                            "last_name": "",
                            "flat_id": "3619"
                        },
                        "errors": []
                    }
                });
            }, 1000);
        });
    }
    
    fd.append('order_id', created_id);
    fd.append("action", "getStatusPayment");

    return axios.post(`/wp-admin/admin-ajax.php`, fd);
}


export const getPaymentWithoutDiscount = (data) => {

    if (isDev) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    data: {
                        "data": {
                            "success": true,
                            "data": {
                                "flat_id": "3620",
                                "price_uah": "5530746.04",
                                "price_usd": 146786,
                                "price_m2_uah": 1,
                                "price_m2_usd": 4600,
                                "flat_number": "112",
                                "status": "1",
                                "build": "4",
                                "build_name": "3",
                                "sec": "1",
                                "sec_name": "1",
                                "rooms": "1",
                                "floor": "1",
                                "all_area": "31.91",
                                "life_area": "0",
                                "img_big": "https://bukovel-dev.smartorange.com.ua/wp-content/themes/3d/assets/img/projects/67/4/2-1.jpg",
                                "max_price_uah": 6139128,
                                "max_price_usd": 162932.46,
                                "booking_price": "1500",
                                "booking_currency": "UAH",
                                "booking_deadline": "24",
                                "booking_typ": "1",
                                "exchange_rate": 37.68,
                                "price_history": [
                                    {
                                        "date": "2023-06-29 15:26:43",
                                        "currency": {
                                            "label": "$",
                                            "id": "USD",
                                            "symb": "$",
                                            "name": "Доллар США",
                                            "id_form": 4
                                        },
                                        "price_uah": 5530746.04,
                                        "price_usd": "146786",
                                        "price_m2_uah": 173323.29,
                                        "price_m2_usd": 4600
                                    },
                                    {
                                        "date": "2022-09-23 16:18:30",
                                        "currency": {
                                            "label": "грн",
                                            "id": "UAH",
                                            "symb": "₴",
                                            "name": "Гривна",
                                            "id_form": 0
                                        },
                                        "price_uah": "833222",
                                        "price_usd": 22113.71,
                                        "price_m2_uah": 26111.63,
                                        "price_m2_usd": 693
                                    }
                                ],
                                "discount_range": "2",
                                "img_small": "/wp-content/themes/3d/assets/img/projects/67/4/2-1-400x85-76528.jpg"
                            },
                            "errors": []
                        },
                        "code": 200
                    }
                });
            }, 1000);
        });
    }
    
    const fd = new FormData();
    fd.append("action", "discountPayRequest");
    Object.entries(data).forEach(([key, value]) => {
        fd.append(key, value);
    });

    return axios.post(`/wp-admin/admin-ajax.php`, fd);
}
