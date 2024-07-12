import { Col, Form, Row, Input as AntInput, ConfigProvider } from "antd";
import { MainContent, ModalFooter, ModalWidth } from "components/modal/BaseModal";
import DatePicker from "components/date-picker/DatePicker";
import Button from "components/elements/Button";
import Input from "components/elements/Input";
import RequiredMessages from "utils/requiredMessages";
import { useTranslation } from "react-i18next";
import useRequest, { HTTP_METHODS } from "api/hooks/useRequest";
import ENDPOINTS from "api/endpoints/Endpoints";
import dayjs from "dayjs";
import en from "dayjs/locale/en";

const HolidayModal = ({ close, data, setIsSuccess }: any) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [creatHoliday, { loading: createLoader }] = useRequest({
    successToast: true,
    path: ENDPOINTS.HOLIDAY,
    errorToast: true,
    method: HTTP_METHODS.POST,
  });

  const [updateHoliday, { loading: updateLoader }] = useRequest({
    path: ENDPOINTS.HOLIDAY,
    errorToast: true,
    successToast: true,
    method: HTTP_METHODS.PUT,
  });

  const onSubmit = (values: any) => {
    console.log("values", values);
    const variables: any = {
      occassion: values.occassion,
      description: values.description,
      date: dayjs(values.date * 1000).unix(),
    };
    if (data) {
      updateHoliday({
        id: data?._id,
        variables,
        onCompleted: () => {
          close();
          setIsSuccess(true);
        },
        onError: () => {},
      });
    } else {
      creatHoliday({
        variables,
        onCompleted: () => {
          close();
          setIsSuccess(true);
        },
        onError: () => {},
      });
    }
    console.log(variables);
  };
  console.log(dayjs);

  return (
    <>
      <ModalWidth width="600px">
        <Form form={form} layout="vertical" onFinish={onSubmit} autoComplete="off">
          <MainContent>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Input
                  initialValue={data?.occassion}
                  placeholder={t("occassion") || "Occassion"}
                  name="occassion"
                  required={true}
                  requiredMessage={RequiredMessages.OCCASSION}
                  label={t("occassion") || "Occassion"}
                />
              </Col>
              <Col span={12}>
                <ConfigProvider>
                  <DatePicker
                    name="date"
                    locale={en}
                    initialValue={data?.date ? dayjs(data?.date) : ""}
                    // format="DD/MM/YYYY"
                    label={t("date") || "Date"}
                    required={true}
                    onChange={() => {}}
                    requiredMessage={RequiredMessages.Date}
                    placeholder={t("date") || "Date"}
                  />
                </ConfigProvider>
              </Col>

              <Col span={24}>
                <Form.Item
                  label={t("description") || "Description"}
                  name="description"
                  initialValue={data?.description}
                >
                  <AntInput.TextArea
                    placeholder={t("typeTheDescriptionHere") || "Type the description here"}
                    showCount
                    maxLength={100}
                    style={{ height: 120, marginBottom: 24 }}
                  />
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
                    loading={createLoader || updateLoader}
                  />
                </ModalFooter>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </ModalWidth>
    </>
  );
};

export default HolidayModal;
