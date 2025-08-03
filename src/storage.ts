import { AppSetting } from "./context/app";

const appSettingKey = "_APP_SETTING";

export const getAppSettingFromStorage = (): AppSetting | null => {
  const setting = localStorage.getItem(appSettingKey);

  if (setting) {
    return JSON.parse(setting) as AppSetting;
  }

  return null;
};

export const setAppSettingToStorage = (setting: AppSetting) => {
  localStorage.setItem(appSettingKey, JSON.stringify(setting));
};
