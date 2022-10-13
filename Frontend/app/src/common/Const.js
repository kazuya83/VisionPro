const Const = {
    AppName: 'VisionPro',
    localStorage: {
        USER_NAME: 'USER_NAME',
        CORPORATE_ID: 'CORPORATE_ID',
        NAVIGATION_ID: 'NAVIGATION_ID',
        NAVIGATION_TOGGLE: 'NAVIGATION_TOGGLE',
        CUSTOMER_FOLDER_ID: 'CUSTOMER_FOLDER_ID',
        LINE_FOLDER_ID: 'LINE_FOLDER_ID',
        ACTION_SELECTED_TOGGLE: 'ACTION_SELECTED_TOGGLE',
        CUSTOMER_LIST: {
            DISPLAY_TYPE: 'DISPLAY_TYPE',
        },
    },
    NAVIGATION: {
        SETTING: 0,
        CUSTOMER_LIST: 1,
        WEB_HISTORY: 2,
        MA: 3,
        ANALYSIS: 4,
        SALES: 5,
        STOCK: 6,
        MARKETING: 7,
        CUSTOMIZE_VARIABLE: 8
    },
    NAVIGATION_TOGGLE_OPEN_OR_CLOSE: {
        OPEN: 0,
        CLOSE: 1
    },
    ACTION: {
        MAIL: 0,
        LINE: 1,
    },
    API: {
        URL: 'http://127.0.0.1:8000/'
    },
    CUSTOMER_LIST: {
        DISPLAY_COUNT: 8,
        DISPLAY_TYPE: {
            LIST: 0,
            CARD: 1
        }
    },
    STATUS_CODE: {
        SUCCESS: 200
    },
};

export default Const;