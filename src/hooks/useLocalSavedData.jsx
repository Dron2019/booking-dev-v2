

export function isSavedDataExist() {
    const savedUserData = sessionStorage.getItem('userData');
    const savedDiscountInfo = sessionStorage.getItem('discountInfo');

    if (savedUserData && savedDiscountInfo) {
        return true;
    } else {
        return false;
    }
}

export function saveData(userData, discountInfo) {
    sessionStorage.setItem('userData', JSON.stringify(userData));
    sessionStorage.setItem('discountInfo', JSON.stringify(discountInfo));
}

export function clearData() {
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('discountInfo');
}

export function getSavedData() {
    const savedUserData = sessionStorage.getItem('userData');
    const savedDiscountInfo = sessionStorage.getItem('discountInfo');

    if (savedUserData && savedDiscountInfo) {
        clearData();
        return {
            userData: JSON.parse(savedUserData),
            discountInfo: JSON.parse(savedDiscountInfo)
        }
    } else {
        return false;
    }
}