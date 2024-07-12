import { Col, Form, Row } from "antd";
import ENDPOINTS from "api/endpoints/Endpoints";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";
import Button from "components/elements/Button";
import Input from "components/elements/Input";
import Select from "components/elements/Select";
import TextArea from "components/elements/Textarea";
import Toggle from "components/elements/Toggle";
import { MainContent, ModalFooter, ModalWidth } from "components/modal/BaseModal";
import { useEffect, useState } from "react";
import RequiredMessages from "utils/requiredMessages";
import { useTranslation } from "react-i18next";

const GlobalCodeModal = ({ close, data, setIsSuccess }: any) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [globalCodeCategory, setGlobalCodeCategory] = useState<any>();
  const [parentCode, setParentCode] = useState<any>({ id: data?.parentGlobalCodeId });
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [getParentGlobalCode, { response: parentGlobalCodeList, loading: parentCodeLoader }] =
    useRequest({
      path: ENDPOINTS.PARENT_GLOBAL_CODE,
      errorToast: true,
      method: HTTP_METHODS.GET,
    });
  const [getAllCategoryCodes, { response: globalCategoryList, loading: globalCategoryLoader }] =
    useRequest({
      path: ENDPOINTS.GLOBAL_CODE_CATEGORY,
      errorToast: true,
      method: HTTP_METHODS.GET,
    });
  const [createGlobalCode, { loading: globalCodeLoader }] = useRequest({
    successToast: true,
    path: ENDPOINTS.GLOBAL_CODE,
    errorToast: true,
    method: HTTP_METHODS.POST,
  });
  const [updateGlobalCode, { loading: updateLoader }] = useRequest({
    path: ENDPOINTS.GLOBAL_CODE,
    errorToast: true,
    method: HTTP_METHODS.PUT,
  });

  const onFinish = (values: any) => {
    const variables = {
      globalCodeCategoryId: globalCodeCategory?.id,
      codeName: values?.codeName,
      description: values?.description || "",
      status: isChecked ? 1 : 0,
      parentGlobalCodeId: parentCode?.id,
      organizationId: "",
    };
    if (data) {
      updateGlobalCode({
        id: data?._id,
        variables,
        onCompleted: () => {
          close();
          setIsSuccess(true);
        },
        onError: () => {},
      });
    } else {
      createGlobalCode({
        variables,
        onCompleted: () => {
          close();
          setIsSuccess(true);
        },
        onError: () => {},
      });
    }
  };
  const handleCheckbox = (value: boolean) => {
    setIsChecked(value);
  };
  const handleGlobalCodeCategory = (_: string[], record: any) => {
    setGlobalCodeCategory(record);
    form.setFieldsValue({ parentGlobalCode: "" });
  };

  const handleParentCode = (_: any, record: any) => {
    setParentCode(record);
  };

  useEffect(() => {
    if (data) {
      setIsChecked(data?.status);
      setGlobalCodeCategory({ id: data?.globalCodeCategoryId });
    }
    const params = {
      type: 1,
    };
    getAllCategoryCodes({
      params,
      onCompleted: () => {},
      onError: () => {},
    });
  }, []);

  useEffect(() => {
    if (globalCodeCategory) {
      getParentGlobalCode({
        id: globalCodeCategory?.id,
        onCompleted: () => {},
        onError: () => {},
      });
    }
  }, [globalCodeCategory]);

  const globalCategoryOptions =
    globalCategoryList?.data?.records?.map((item: any) => {
      return {
        id: item?._id,
        value: item?.categoryName,
      };
    }) || [];
  globalCategoryOptions.unshift({ label: "Please Select Global Category Code", value: "" });

  const parentCodeOptions =
    parentGlobalCodeList?.data?.map((item: any) => {
      return {
        id: item?._id,
        value: item?.codeName,
      };
    }) || [];
  parentCodeOptions?.unshift({
    label: "Please Select Parent Global Code",
    value: "",
  });
  return (
    <>
      <ModalWidth width="800px">
        <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
          <MainContent>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Select
                  options={globalCategoryOptions}
                  initialValue={data?.globalCodeCategory}
                  loading={globalCategoryLoader}
                  showSearch={true}
                  name="globalCodecategory"
                  onChange={handleGlobalCodeCategory}
                  label={t("globalCodeCategory") || "Global Code Category"}
                  requiredMessage={RequiredMessages.GLOBALCODECATEGORY}
                  required={true}
                  placeholder={t("pleaseSelect") || "Please Select"}
                />
              </Col>
              <Col span={12}>
                <Input
                  name="codeName"
                  initialValue={data?.codeName}
                  label={t("codeName") || "Code Name"}
                  requiredMessage={RequiredMessages.CODENAME}
                  required={true}
                  placeholder={t("codeName") || "Code Name"}
                />
              </Col>
              <Col span={24}>
                <Form.Item name="description" label="Description" initialValue={data?.description}>
                  <TextArea
                    placeholder={t("typeTheDescriptionHere") || "Type the description here"}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Select
                  name="parentGlobalCode"
                  showSearch={true}
                  onChange={(value: any, record: any) => handleParentCode(value, record)}
                  loading={parentCodeLoader}
                  initialValue={data?.parentGlobalCode}
                  requiredMessage={RequiredMessages.PARENTGLOBALCODE}
                  label={t("parentGlobalCode") || "Parent Global Code"}
                  placeholder={
                    t("pleaseSelectAdditionWorkRequestStatus") ||
                    "Please Select Addition Work Request Status"
                  }
                  options={parentCodeOptions}
                />
              </Col>
              <Col span={3} offset={1}>
                <Form.Item
                  name="checkbox"
                  label={t("status") || "Status"}
                  initialValue={data?.isChecked}
                >
                  <Toggle onChange={handleCheckbox} checked={isChecked} />
                </Form.Item>
              </Col>
            </Row>
          </MainContent>
          <Col span={24}>
            <Form.Item>
              <ModalFooter Justify="end" gap="10px">
                <Button variant="default" type="button" text={t("cancel")} onClick={close} />
                <Button
                  type="submit"
                  text={data ? t("update") : t("submit")}
                  loading={globalCodeLoader || updateLoader}
                />
              </ModalFooter>
            </Form.Item>
          </Col>
        </Form>
      </ModalWidth>
    </>
  );
};

export default GlobalCodeModal;
