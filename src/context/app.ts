import { createContext, useEffect, useState } from "react";

import { doubaoModels, Model, ModelType } from "@/config";
import { getAppSettingFromStorage, setAppSettingToStorage } from "@/storage";

export interface AppSetting {
  apiKey: string;
  modelType: ModelType;
  model: Model;
}

interface AppContext {
  setting: AppSetting;
  setAppSetting: ContextSetter<AppSetting>;
  showSettingModal: boolean;
  setShowSettingModal: ContextSetter<boolean>;
}

const ctx = createContext<AppContext>({} as AppContext);

export function useInitialAppContext(): AppContext {
  const storageSetting = getAppSettingFromStorage();
  const [setting, setAppSetting] = useState<AppSetting>(
    storageSetting ?? {
      apiKey: "",
      modelType: ModelType.doubao,
      model: doubaoModels[0],
    },
  );
  const [showSettingModal, setShowSettingModal] = useState<boolean>(false);

  useEffect(() => {
    setAppSettingToStorage(setting);
  }, [setting]);

  return { setting, setAppSetting, showSettingModal, setShowSettingModal };
}

export default ctx;
