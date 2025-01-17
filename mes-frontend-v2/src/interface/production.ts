import moment from "moment";

export interface ProductionResponse {
  id: number;
  product_name: string;
  quantity: number;
  start_date: string | null;
  expected_end_date: string | null;
  actual_end_date: string | null;
  status: string;
  remarks: string;
}

export interface Production {
  id: number;
  product_name: string;
  quantity: number;
  start_date: Date;
  expected_end_date: Date;
  actual_end_date: Date;
  status: string;
  remarks: string;
}

export const ToProductionSchema = (
  response: ProductionResponse
): Production => {
  return {
    id: response.id,
    product_name: response.product_name,
    quantity: response.quantity,
    start_date: moment(response.start_date).toDate(),
    expected_end_date: moment(response.start_date).toDate(),
    actual_end_date: moment(response.start_date).toDate(),
    status: response.status,
    remarks: response.remarks,
  };
};
