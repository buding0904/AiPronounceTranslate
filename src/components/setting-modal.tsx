import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Radio, RadioGroup } from "@heroui/radio";
import { useContext, useState } from "react";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";

import appCtx from "@/context/app";
import { doubaoModels, Model } from "@/config";
import EyeFilledIcon from "@/assets/icons/eye-filled.svg?react";
import EyeSlashFilledIcon from "@/assets/icons/eye-slash-filled.svg?react";

export const AppSetting = () => {
  const { setting, setAppSetting, showSettingModal, setShowSettingModal } =
    useContext(appCtx);
  const [isApikeyVisible, setIsApiKeyVisible] = useState(false);

  const setModel = (model: Model) => {
    setAppSetting((val) => ({
      ...val,
      model,
    }));
  };

  const setApiKey = (key: string) => {
    setAppSetting((val) => ({
      ...val,
      apiKey: key,
    }));
  };

  const toggleApiKeyVisibility = () => setIsApiKeyVisible((val) => !val);

  return (
    <Modal
      isOpen={showSettingModal}
      placement="top-center"
      onOpenChange={setShowSettingModal}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">设置</ModalHeader>
            <ModalBody className="pb-6">
              <Form
                action="javascript:void(0)"
                className="w-full max-w-xs"
                onSubmit={onClose}
              >
                <RadioGroup
                  label="模型"
                  orientation="horizontal"
                  value={setting.model}
                  onValueChange={(val) => setModel(val as Model)}
                >
                  {doubaoModels.map((item) => (
                    <Radio key={item} value={item}>
                      {item}
                    </Radio>
                  ))}
                </RadioGroup>
                <Input
                  classNames={{
                    label: "!text-foreground-500",
                  }}
                  endContent={
                    <button
                      aria-label="toggle password visibility"
                      className="focus:outline-solid outline-transparent cursor-pointer"
                      type="button"
                      onClick={toggleApiKeyVisibility}
                    >
                      {isApikeyVisible ? (
                        <EyeSlashFilledIcon
                          className="text-2xl text-default-400 pointer-events-none"
                          width={20}
                        />
                      ) : (
                        <EyeFilledIcon
                          className="text-2xl text-default-400 pointer-events-none"
                          width={20}
                        />
                      )}
                    </button>
                  }
                  label="API Key"
                  labelPlacement="outside"
                  placeholder="Enter your api key"
                  type={isApikeyVisible ? "text" : "password"}
                  value={setting.apiKey}
                  onValueChange={setApiKey}
                />
              </Form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
