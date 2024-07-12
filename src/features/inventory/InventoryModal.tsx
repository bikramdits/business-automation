import { Form, Col, Row } from "antd";
import { useState, useEffect } from "react";
import Toggle from "components/elements/Toggle";
import { MainContent, ModalFooter } from "components/modal/BaseModal";
import Button from "components/elements/Button";
import Input from "components/elements/Input";
import Select from "components/elements/Select";
import RequiredMessages from "utils/requiredMessages";
import { useTranslation } from "react-i18next";
// import { Spacer } from "components/SharedStyles";
import ENDPOINTS from "api/endpoints/Endpoints";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";

const InventoryModal = ({ close, data, setIsSuccess }: any) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [partsDetails, setPartsDetails] = useState<any>({ partId: data?.id });
  const [stockDetails, setStockDetails] = useState<any>();
  const [unitDetails, setUnitDetails] = useState<any>();

  const [getParentGlobalCode, { response: parentGlobalCodeList, loading: parentGlobalCodeLoader }] =
    useRequest({
      path: ENDPOINTS.PARENT_GLOBAL_CODE,
      errorToast: true,
      method: HTTP_METHODS.GET,
    });

  useEffect(() => {
    if (data) {
      setIsChecked(data?.status);
      setStockDetails(data?.stockTypeId);
      setPartsDetails({ id: data?.partId });
    }
    getParentGlobalCode({
      id: "Stock Type",
      onCompleted: () => {},
      onError: () => {},
    });
    console.log(parentGlobalCodeList, "parentGlobalCodeList");
  }, []);

  const parentGlobalCodeOptions =
    parentGlobalCodeList?.data?.map((item: any) => {
      return {
        value: item?.codeName,
        id: item?._id,
      };
    }) || [];
  parentGlobalCodeOptions.unshift({ label: "Please Select Stock type", value: "" });
  console.log(parentGlobalCodeOptions);
  const [getParts, { response: partsList, loading: partsLoader }] = useRequest({
    path: ENDPOINTS.PARTS,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });

  const getPartsID = (_: string[], record: any) => {
    setPartsDetails(record);
    // form.setFieldsValue({ partsDetails: "" });
  };

  const getStockID = (_: string[], record: any) => {
    setStockDetails(record);
  };

  const getUnitID = (_: string[], record: any) => {
    setUnitDetails(record);
  };

  useEffect(() => {
    getParts({
      onCompleted: () => {},
      onError: () => {},
    });
  }, []);

  const partListOptions =
    partsList?.data?.records?.map((item: any) => {
      return {
        value: item?.part,
        id: item?._id,
      };
    }) || [];
  partListOptions.unshift({ label: "Please Select Parts", value: "" });

  const [getUnitType, { response: unitTypeList, loading: unitTypeLoader }] = useRequest({
    path: ENDPOINTS.PARENT_GLOBAL_CODE,
    errorToast: true,
    method: HTTP_METHODS.GET,
  });

  useEffect(() => {
    getUnitType({
      id: "unit type",
      onCompleted: () => {},
      onError: () => {},
    });
    console.log("unitTypeList", unitTypeList);
  }, []);

  const unitTypeOptions: any =
    unitTypeList?.data?.map((item: any) => {
      return {
        value: item?.codeName,
        id: item?._id,
      };
    }) || [];
  unitTypeOptions.unshift({ label: "Please Select Unit Type", value: "" });

  const handleCheckbox = (checked: boolean) => {
    setIsChecked(checked);
  };

  const [createInventory, { loading: createInventoryLoader }] = useRequest({
    successToast: true,
    path: ENDPOINTS.INVENTORY,
    errorToast: true,
    method: HTTP_METHODS.POST,
  });

  const [updateInventory, { loading: updateInventoryLoader }] = useRequest({
    successToast: true,
    path: ENDPOINTS.INVENTORY,
    errorToast: true,
    method: HTTP_METHODS.PUT,
  });

  const onFinish = async (values: any) => {
    const variables: any = {
      partId: partsDetails?.id,
      stockCode: values.stockCode,
      stockName: values.stockName,
      stockTypeId: stockDetails?.id,
      unitTypeId: unitDetails?.id,
      sku: values.sku,
      reorderPoint: values.reorderPoint,
      quantity: values.quantity,
      status: isChecked ? 1 : 0,
    };

    if (data) {
      updateInventory({
        id: data?._id,
        variables,
        onCompleted: () => {
          close();
          setIsSuccess(true);
        },
        onError: () => {},
      });
    } else {
      createInventory({
        variables,
        onCompleted: () => {
          close();
          setIsSuccess(true);
        },
        onError: () => {},
      });
    }
  };

  return (
    <>
      <Form
        name="basic"
        layout="vertical"
        wrapperCol={{ span: 23 }}
        form={form}
        onFinish={onFinish}
        autoComplete="off"
      >
        <MainContent>
          <Row gutter={[10, 0]}>
            <Col span={12}>
              <Select
                options={partListOptions}
                loading={partsLoader}
                initialValue={data?.part}
                name="part"
                label={t("part") || "Part"}
                requiredMessage={RequiredMessages.PART}
                required={true}
                onChange={(value: any, e: any) => getPartsID(value, e)}
                placeholder={t("pleaseSelect") || "Please Select"}
              />
              <Input
                initialValue={data?.stockName}
                placeholder={t("stockName") || "Stock Name"}
                name="stockName"
                required={true}
                requiredMessage={RequiredMessages.STOCKNAME}
                label={t("stockName") || "Stock Name"}
              />
            </Col>
            <Col span={12}>
              <Input
                initialValue={data?.stockCode}
                placeholder={t("stockCode") || "Stock Code"}
                name="stockCode"
                required={true}
                requiredMessage={RequiredMessages.STOCKCODE}
                label={t("stockCode") || "Stock Code"}
              />
              <Select
                loading={parentGlobalCodeLoader}
                options={parentGlobalCodeOptions || []}
                initialValue={data?.stockType}
                name="stockType"
                label={t("stockType") || "Stock Type"}
                requiredMessage={RequiredMessages.STOCKTYPE}
                required={true}
                onChange={(value: any, e: any) => getStockID(value, e)}
                placeholder={t("pleaseSelect") || "Please Select"}
              />
            </Col>
            <Col span={12}>
              <Select
                loading={unitTypeLoader}
                options={unitTypeOptions || []}
                initialValue={data?.unitType}
                name="unitType"
                label={t("unitType") || "Unit Type"}
                requiredMessage={RequiredMessages.UNITTYPE}
                required={true}
                onChange={(value: any, e: any) => getUnitID(value, e)}
                placeholder={t("pleaseSelect") || "Please Select"}
              />
              <Input
                type="number"
                initialValue={data?.reorderPoint?.toString()}
                placeholder={t("reorderPoint") || "Reorder Point"}
                name="reorderPoint"
                required={true}
                requiredMessage={RequiredMessages.REORDERPOINT}
                label={t("reorderPoint") || "Reorder Point"}
              />
            </Col>
            <Col span={12}>
              <Input
                initialValue={data?.sku}
                placeholder={t("sku") || "SKU"}
                name="sku"
                required={true}
                requiredMessage={RequiredMessages.SKU}
                label={t("sku") || "SKU"}
              />
              <Input
                type="number"
                initialValue={data?.quantity?.toString()}
                placeholder={t("quantity") || "Quantity"}
                name="quantity"
                required={true}
                requiredMessage={RequiredMessages.QUANTITY}
                label={t("quantity") || "Quantity"}
              />
            </Col>
            <Col span={4}>
              <Form.Item
                name="checkbox"
                label={t("status") || "Status"}
                initialValue={data?.status}
              >
                <Toggle onChange={handleCheckbox} checked={isChecked} />
              </Form.Item>
            </Col>
          </Row>
        </MainContent>
        <Row>
          <Col span={24}>
            <Form.Item>
              <ModalFooter Justify="end" gap="10px">
                <Button variant="default" text={t("cancel")} type="button" onClick={close} />
                <Button
                  text={data ? t("update") : t("submit")}
                  type="submit"
                  loading={createInventoryLoader || updateInventoryLoader}
                />
              </ModalFooter>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default InventoryModal;
